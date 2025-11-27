const express = require('express')
const router = express.Router()
const menuController = require('../controllers/menuController')

// Get all menu items for a restaurant
router.get('/restaurant/:restaurant_id', menuController.getMenuItems)

// POST /api/menus/:id (id is restaurant_id)
// We use the ID in the URL to specify which restaurant gets the new item
// Note: We could also use router.post('/', ...) and put the restaurant_id in the body.
router.post('/restaurant/:restaurant_id', menuController.createMenuItem)

// PUT /api/menus/:menu_id - Update a specific menu item (ID is menu_item_id)
router.put('/:menu_id', menuController.updateMenuItem)

// DELETE /api/menus/:menu_id - Delete a specific menu item (ID is menu_item_id)
router.delete('/:menu_id', menuController.deleteMenuItem)

module.exports = router;