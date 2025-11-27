const express = require('express')
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware')

// Public routes
router.post('/register', authController.register)
router.post('/login', authController.login)

// Protected route (requires authentication)
router.get('/me', protect, authController.getMe)

module.exports = router