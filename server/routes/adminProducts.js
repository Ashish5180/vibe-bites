const express = require('express');
const { body, validationResult } = require('express-validator');
const { protect, admin } = require('../middleware/auth');
const { asyncHandler } = require('../middleware/errorHandler');
const Product = require('../models/Product');
const { logger } = require('../utils/logger');

const router = express.Router();

const CATEGORY_ENUM = ['Makhana', 'Chips', 'Bites', 'Nuts', 'Seeds'];

// Create a full product (Admin)
router.post('/', protect, admin, [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name 2-100 chars'),
  body('description').trim().isLength({ min: 10, max: 1000 }).withMessage('Description 10-1000 chars'),
  body('category').isIn(CATEGORY_ENUM).withMessage('Invalid category'),
  body('image').notEmpty().withMessage('Main image is required'),
  body('sizes').isArray({ min: 1 }).withMessage('At least one size required'),
  body('sizes.*.size').notEmpty().withMessage('Size label required'),
  body('sizes.*.price').isFloat({ min: 0 }).withMessage('Price must be >= 0'),
  body('sizes.*.stock').isInt({ min: 0 }).withMessage('Stock must be >= 0'),
  body('ingredients').notEmpty().withMessage('Ingredients required'),
  body('nutrition.calories').notEmpty().withMessage('Calories required'),
  body('nutrition.protein').notEmpty().withMessage('Protein required'),
  body('nutrition.carbs').notEmpty().withMessage('Carbs required'),
  body('nutrition.fat').notEmpty().withMessage('Fat required'),
  body('nutrition.fiber').notEmpty().withMessage('Fiber required'),
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, message: 'Product created', data: { product } });
  } catch (e) {
    logger.error('Admin product create error:', e);
    res.status(500).json({ success: false, message: 'Error creating product' });
  }
}));

module.exports = router;
