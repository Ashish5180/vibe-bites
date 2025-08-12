const express = require('express');
const { body, validationResult } = require('express-validator');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/auth');
const { asyncHandler } = require('../middleware/errorHandler');
const { logger } = require('../utils/logger');
const { sendEmail } = require('../utils/email');

const router = express.Router();

// @route   POST /api/orders
// @desc    Create a new order
// @access  Private
router.post('/', protect, [
  body('items')
    .isArray({ min: 1 })
    .withMessage('At least one item is required'),
  body('items.*.productId')
    .notEmpty()
    .withMessage('Product ID is required'),
  body('items.*.size')
    .notEmpty()
    .withMessage('Size is required'),
  body('items.*.quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1'),
  body('shippingAddress.firstName')
    .notEmpty()
    .withMessage('First name is required'),
  body('shippingAddress.lastName')
    .notEmpty()
    .withMessage('Last name is required'),
  body('shippingAddress.address')
    .notEmpty()
    .withMessage('Address is required'),
  body('shippingAddress.city')
    .notEmpty()
    .withMessage('City is required'),
  body('shippingAddress.state')
    .notEmpty()
    .withMessage('State is required'),
  body('shippingAddress.pincode')
    .matches(/^[0-9]{6}$/)
    .withMessage('Pincode must be 6 digits'),
  body('shippingAddress.phone')
    .matches(/^[0-9]{10}$/)
    .withMessage('Phone must be 10 digits'),
  body('paymentMethod')
    .isIn(['card', 'cod', 'upi', 'netbanking'])
    .withMessage('Invalid payment method')
], asyncHandler(async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  const { items, shippingAddress, paymentMethod, appliedCoupon } = req.body;

  // Validate products and check stock
  const orderItems = [];
  let subtotal = 0;

  for (const item of items) {
    const product = await Product.findById(item.productId);
    if (!product) {
      return res.status(400).json({
        success: false,
        message: `Product ${item.productId} not found`
      });
    }

    if (!product.isInStock(item.size)) {
      return res.status(400).json({
        success: false,
        message: `${product.name} (${item.size}) is out of stock`
      });
    }

    const sizeObj = product.sizes.find(s => s.size === item.size);
    const itemTotal = sizeObj.price * item.quantity;
    subtotal += itemTotal;

    orderItems.push({
      product: product._id,
      name: product.name,
      size: item.size,
      price: sizeObj.price,
      quantity: item.quantity,
      image: product.image,
      category: product.category
    });
  }

  // Calculate totals
  const shippingCost = 0; // Free shipping
  let discount = 0;

  if (appliedCoupon) {
    // Apply coupon logic here
    if (appliedCoupon.type === 'percentage') {
      discount = (subtotal * appliedCoupon.discount) / 100;
    } else {
      discount = appliedCoupon.discount;
    }
    discount = Math.min(discount, subtotal);
  }

  const total = subtotal + shippingCost - discount;

  // Create order
  const order = new Order({
    user: req.user._id,
    items: orderItems,
    shippingAddress,
    paymentMethod,
    subtotal,
    shippingCost,
    discount,
    total,
    appliedCoupon
  });

  await order.save();

  // Update product stock
  for (const item of items) {
    const product = await Product.findById(item.productId);
    product.updateStock(item.size, item.quantity);
    await product.save();
  }

  // Send order confirmation email
  try {
    await sendEmail({
      to: req.user.email,
      subject: `Order Confirmation - ${order.orderNumber}`,
      template: 'orderConfirmation',
      data: {
        name: req.user.firstName,
        orderNumber: order.orderNumber,
        orderDate: order.createdAt.toLocaleDateString(),
        total: order.total
      }
    });
  } catch (error) {
    logger.error('Order confirmation email error:', error);
  }

  res.status(201).json({
    success: true,
    message: 'Order created successfully',
    data: { order }
  });
}));

// @route   GET /api/orders
// @desc    Get user's orders
// @access  Private
router.get('/', protect, asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, status } = req.query;
  const skip = (parseInt(page) - 1) * parseInt(limit);

  const filter = { user: req.user._id };
  if (status) filter.orderStatus = status;

  const orders = await Order.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit))
    .populate('items.product', 'name image');

  const total = await Order.countDocuments(filter);

  res.json({
    success: true,
    data: {
      orders,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    }
  });
}));

// @route   GET /api/orders/:id
// @desc    Get order details
// @access  Private
router.get('/:id', protect, asyncHandler(async (req, res) => {
  const order = await Order.findOne({
    _id: req.params.id,
    user: req.user._id
  }).populate('items.product', 'name image description');

  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Order not found'
    });
  }

  res.json({
    success: true,
    data: { order }
  });
}));

// @route   PUT /api/orders/:id/status
// @desc    Update order status (Admin only)
// @access  Private/Admin
router.put('/:id/status', protect, admin, [
  body('status')
    .isIn(['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'])
    .withMessage('Invalid order status'),
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Notes cannot exceed 500 characters')
], asyncHandler(async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  const { status, notes } = req.body;

  const order = await Order.findById(req.params.id).populate('user', 'email firstName');
  if (!order) {
    return res.status(404).json({
      success: false,
      message: 'Order not found'
    });
  }

  await order.updateStatus(status, notes);

  // Send email notifications for status changes
  if (status === 'shipped') {
    try {
      await sendEmail({
        to: order.user.email,
        subject: `Your order has been shipped - ${order.orderNumber}`,
        template: 'orderShipped',
        data: {
          name: order.shippingAddress.firstName,
          orderNumber: order.orderNumber,
          trackingNumber: order.shippingDetails.trackingNumber || 'N/A',
          carrier: order.shippingDetails.carrier || 'Standard Shipping',
          estimatedDelivery: order.shippingDetails.estimatedDelivery?.toLocaleDateString() || '3-5 business days'
        }
      });
    } catch (error) {
      logger.error('Order shipped email error:', error);
    }
  }

  res.json({
    success: true,
    message: 'Order status updated successfully',
    data: { order }
  });
}));

module.exports = router; 