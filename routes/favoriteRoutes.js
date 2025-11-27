const express = require('express')
const router = express.Router()
const favoritesController = require('../controllers/favoritesController')
const {protect} = require('../middleware/authMiddleware')

// router.get('/', favoritesController.getFavorites)
// router.post('/', favoritesController.addFavorite)
// router.delete('/:restaurant_id', favoritesController.removeFavorite)
// router.get('/check/:restaurant_id', favoritesController.isFavorite)


// All favorites routes require authentication
router.get('/', protect, favoritesController.getFavorites)
router.post('/', protect, favoritesController.addFavorite)
router.delete('/:restaurant_id', protect, favoritesController.removeFavorite)
router.get('/check/:restaurant_id', protect, favoritesController.isFavorite)

module.exports = router