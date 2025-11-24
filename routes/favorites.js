const express = require('express')
const router = express.Router()
const favoritesController = require('../controllers/favoritesController')

router.get('/', favoritesController.getFavorites)
router.post('/', favoritesController.addFavorite)
router.delete('/:restaurant_id', favoritesController.removeFavorite)
router.get('/check/:restaurant_id', favoritesController.isFavorite)

module.exports = router