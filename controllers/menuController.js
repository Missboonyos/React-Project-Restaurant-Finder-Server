const db = require('../config/database')

// Create new Menu Item
// POST /api/restaurants/:restaurant_id/menu
exports.createMenuItem = async (req, res) => {
    try {
        // The restaurant ID comes from the URL parameter
        const {restaurant_id} = req.params; // Extracts restaurant_id
        const {name, description, price} = req.body;

        const [result] = await db.query(
            'INSERT INTO menu_items (restaurant_id, name, description, price) VALUES (?, ?, ?, ?)',
            [restaurant_id, name, description, price]
        );

        res.status(201).json({
            message: 'Menu item created',
            id: result.insertId
        })
    } catch (error) {
        console.error('Database error:', error)
        res.status(500).json({error: error.message})
    }
}

// Update existing menu item (PUT)
exports.updateMenuItem = async (req, res) => {
    try {
        // Use :menu_id from the URL to identify the item
        const {menu_id} = req.params;
        const {name, description, price} = req.body;

        const [result] = await db.query(
            'UPDATE menu_items SET name = ?, description = ?, price = ? WHERE id = ?',
            [name, description, price, menu_id]
        )

        if (result.affectedRows === 0) {
            return res.status(404).json({message: 'Meu item not found'})
        }

        res.json({message: 'Menu item updated'})
    } catch (error) {
        console.error('Database error:', error)
        res.status(500).json({error: error.message})
    }
}

// Delete menu item (DELETE)
exports.deleteMenuItem = async (req, res) => {
    try {
        // Use :menu_id from the URL
        const {menu_id} = req.params;

        const [result] = await db.query(
            'DELETE FROM menu_items WHERE id = ?',
            [menu_id]
        )

        if (result.affectedRows === 0) {
            return res.status(404).json({message: 'Menu item not found'})
        }

        res.json({message: 'Menu item deleted'})
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({error: error.message})
    }
}
