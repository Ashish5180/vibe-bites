const express = require('express');
const { body, param, validationResult } = require('express-validator');
const { protect, admin } = require('../middleware/auth');
const { asyncHandler } = require('../middleware/errorHandler');
const Category = require('../models/Category');
const { logger } = require('../utils/logger');

const router = express.Router();

// Public: list active categories
router.get('/', asyncHandler(async (req, res) => {
  const categories = await Category.find({ isActive: true }).sort({ name: 1 }).select('-__v');
  res.json({ success: true, data: { categories } });
}));

// Admin: list all categories (active & inactive)
router.get('/all', protect, admin, asyncHandler(async (req, res) => {
  const categories = await Category.find().sort({ createdAt: -1 }).select('-__v');
  res.json({ success: true, data: { categories } });
}));

// Create category (admin)
router.post('/', protect, admin, [
  body('name').trim().isLength({ min: 2, max: 50 }).withMessage('Name must be 2-50 chars'),
  body('description').optional().isLength({ max: 300 }).withMessage('Description too long'),
  body('image').optional().isURL().withMessage('Image must be a valid URL')
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  try {
    const existing = await Category.findOne({ name: req.body.name.trim() });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Category already exists' });
    }
    const category = await Category.create(req.body);
    res.status(201).json({ success: true, message: 'Category created', data: { category } });
  } catch (e) {
    logger.error('Create category error:', e);
    res.status(500).json({ success: false, message: 'Error creating category' });
  }
}));

// Update category
router.put('/:id', protect, admin, [
  param('id').isMongoId().withMessage('Invalid ID'),
  body('name').optional().trim().isLength({ min: 2, max: 50 }).withMessage('Name must be 2-50 chars'),
  body('description').optional().isLength({ max: 300 }).withMessage('Description too long'),
  body('image').optional().isURL().withMessage('Image must be a valid URL'),
  body('isActive').optional().isBoolean().withMessage('isActive must be boolean')
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  const category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(404).json({ success: false, message: 'Category not found' });
  }
  const updatable = ['name', 'description', 'image', 'isActive'];
  updatable.forEach(f => { if (req.body[f] !== undefined) category[f] = req.body[f]; });
  await category.save();
  res.json({ success: true, message: 'Category updated', data: { category } });
}));

// Toggle status (shortcut)
router.patch('/:id/status', protect, admin, [
  param('id').isMongoId().withMessage('Invalid ID'),
  body('isActive').isBoolean().withMessage('isActive must be boolean')
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { isActive: req.body.isActive },
    { new: true }
  );
  if (!category) {
    return res.status(404).json({ success: false, message: 'Category not found' });
  }
  res.json({ success: true, message: 'Status updated', data: { category } });
}));

// Delete category (hard delete; does not affect Product schema)
router.delete('/:id', protect, admin, [
  param('id').isMongoId().withMessage('Invalid ID')
], asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) {
    return res.status(404).json({ success: false, message: 'Category not found' });
  }
  res.json({ success: true, message: 'Category deleted' });
}));

module.exports = router;
