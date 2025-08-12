const express = require('express');
const { body, validationResult } = require('express-validator');
const Coupon = require('../models/Coupon');
const { protect, admin } = require('../middleware/auth');
const { asyncHandler } = require('../middleware/errorHandler');

const router = express.Router();

// @route   GET /api/coupons
// @desc    Get all active coupons
// @access  Public
router.get('/', asyncHandler(async (req, res) => {
  const coupons = await Coupon.find({ isActive: true })
    .select('code description discount type category minOrderAmount maxDiscount validUntil')
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    data: { coupons }
  });
}));

// @route   POST /api/coupons/validate
// @desc    Validate a coupon code
// @access  Private
router.post('/validate', protect, [
  body('code')
    .notEmpty()
    .withMessage('Coupon code is required')
    .toUpperCase(),
  body('orderAmount')
    .isFloat({ min: 0 })
    .withMessage('Order amount must be a positive number')
], asyncHandler(async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  const { code, orderAmount, items = [] } = req.body;

  const coupon = await Coupon.findOne({ code });
  if (!coupon) {
    return res.status(400).json({
      success: false,
      message: 'Invalid coupon code'
    });
  }

  // Check if coupon can be applied
  const isFirstTime = !req.user.orders || req.user.orders.length === 0;
  const canBeApplied = coupon.canBeApplied(orderAmount, req.user._id, isFirstTime);

  if (!canBeApplied) {
    return res.status(400).json({
      success: false,
      message: 'Coupon cannot be applied to this order'
    });
  }

  // Calculate discount
  const categoryItems = coupon.category ? 
    items.filter(item => item.category === coupon.category) : [];
  
  const discountAmount = coupon.calculateDiscount(orderAmount, categoryItems);

  res.json({
    success: true,
    message: 'Coupon applied successfully',
    data: {
      coupon: {
        code: coupon.code,
        description: coupon.description,
        discount: coupon.discount,
        type: coupon.type,
        category: coupon.category
      },
      discountAmount
    }
  });
}));

// @route   POST /api/coupons
// @desc    Create a new coupon (Admin only)
// @access  Private/Admin
router.post('/', protect, admin, [
  body('code')
    .notEmpty()
    .withMessage('Coupon code is required')
    .isLength({ max: 20 })
    .withMessage('Coupon code cannot exceed 20 characters'),
  body('description')
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ max: 200 })
    .withMessage('Description cannot exceed 200 characters'),
  body('discount')
    .isFloat({ min: 0 })
    .withMessage('Discount must be a positive number'),
  body('type')
    .isIn(['percentage', 'fixed'])
    .withMessage('Type must be percentage or fixed'),
  body('category')
    .optional()
    .isIn(['Makhana', 'Chips', 'Bites', 'Nuts', 'Seeds'])
    .withMessage('Invalid category'),
  body('minOrderAmount')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Minimum order amount must be positive'),
  body('maxDiscount')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Maximum discount must be positive'),
  body('usageLimit')
    .optional()
    .isInt({ min: -1 })
    .withMessage('Usage limit must be -1 or positive'),
  body('validUntil')
    .isISO8601()
    .withMessage('Valid until must be a valid date')
], asyncHandler(async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  const coupon = await Coupon.create(req.body);

  res.status(201).json({
    success: true,
    message: 'Coupon created successfully',
    data: { coupon }
  });
}));

// @route   PUT /api/coupons/:id
// @desc    Update a coupon (Admin only)
// @access  Private/Admin
router.put('/:id', protect, admin, [
  body('description')
    .optional()
    .isLength({ max: 200 })
    .withMessage('Description cannot exceed 200 characters'),
  body('discount')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Discount must be a positive number'),
  body('type')
    .optional()
    .isIn(['percentage', 'fixed'])
    .withMessage('Type must be percentage or fixed'),
  body('category')
    .optional()
    .isIn(['Makhana', 'Chips', 'Bites', 'Nuts', 'Seeds'])
    .withMessage('Invalid category'),
  body('minOrderAmount')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Minimum order amount must be positive'),
  body('maxDiscount')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Maximum discount must be positive'),
  body('usageLimit')
    .optional()
    .isInt({ min: -1 })
    .withMessage('Usage limit must be -1 or positive'),
  body('validUntil')
    .optional()
    .isISO8601()
    .withMessage('Valid until must be a valid date')
], asyncHandler(async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  const coupon = await Coupon.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!coupon) {
    return res.status(404).json({
      success: false,
      message: 'Coupon not found'
    });
  }

  res.json({
    success: true,
    message: 'Coupon updated successfully',
    data: { coupon }
  });
}));

// @route   DELETE /api/coupons/:id
// @desc    Delete a coupon (Admin only)
// @access  Private/Admin
router.delete('/:id', protect, admin, asyncHandler(async (req, res) => {
  const coupon = await Coupon.findByIdAndUpdate(
    req.params.id,
    { isActive: false },
    { new: true }
  );

  if (!coupon) {
    return res.status(404).json({
      success: false,
      message: 'Coupon not found'
    });
  }

  res.json({
    success: true,
    message: 'Coupon deleted successfully'
  });
}));

module.exports = router; 