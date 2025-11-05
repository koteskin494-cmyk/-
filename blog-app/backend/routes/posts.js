const express = require('express');
const { body } = require('express-validator');
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  likePost,
  addComment
} = require('../controllers/postController');
const { auth, optionalAuth } = require('../middleware/auth');
const { handleValidationErrors } = require('../middleware/validation');
const upload = require('../middleware/upload');

const router = express.Router();

// Validation rules
const postValidation = [
  body('title')
    .isLength({ min: 5, max: 200 })
    .withMessage('Title must be between 5 and 200 characters'),
  body('content')
    .isLength({ min: 10 })
    .withMessage('Content must be at least 10 characters long'),
  body('tags')
    .optional()
    .isString()
    .withMessage('Tags must be a string of comma-separated values')
];

const commentValidation = [
  body('content')
    .isLength({ min: 1, max: 1000 })
    .withMessage('Comment must be between 1 and 1000 characters')
];

// Routes
router.get('/', optionalAuth, getPosts);
router.get('/:id', optionalAuth, getPost);
router.post('/', auth, upload.single('featuredImage'), postValidation, handleValidationErrors, createPost);
router.put('/:id', auth, upload.single('featuredImage'), postValidation, handleValidationErrors, updatePost);
router.delete('/:id', auth, deletePost);
router.post('/:id/like', auth, likePost);
router.post('/:id/comments', auth, commentValidation, handleValidationErrors, addComment);

module.exports = router;