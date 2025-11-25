const db = require('../config/database')

// Get all restaurants with optional filters
exports.getAllRestaurants = async (req, res) => {
    try {
        const { category, search } = req.query;
        
        console.log('Query params:', { category, search }); // Debug

        // Case 1: Filter by category
        if (category && category.trim() !== '') {
            const [restaurants] = await db.query(
                'SELECT * FROM restaurants WHERE category = ?',
                [category]
            );
            console.log('Found restaurants:', restaurants.length);
            return res.json(restaurants);
        }
        
        // Case 2: Search by name/address
        if (search && search.trim() !== '') {
            const [restaurants] = await db.query(
                'SELECT * FROM restaurants WHERE name LIKE ? OR address LIKE ?',
                [`%${search}%`, `%${search}%`]
            );
            console.log('Found restaurants:', restaurants.length);
            return res.json(restaurants);
        }
        
        // Case 3: Get all restaurants (no filter)
        const [restaurants] = await db.query('SELECT * FROM restaurants');
        console.log('Found restaurants:', restaurants.length);
        return res.json(restaurants);
        
    } catch (error) {
        console.error('Database error details:', error);
        res.status(500).json({ 
            error: error.message,
            sqlMessage: error.sqlMessage,
            sql: error.sql
        });
    }
};

// Get single restaurant with menu and reviews
exports.getRestaurantById = async (req, res) => {
    try {
        const {id} = req.params;

        const [restaurants] = await db.query('SELECT * FROM restaurants WHERE id = ?', [id])

        if (restaurants.length === 0) {
            return res.status(404).json({ message: 'Restaurant not found'})
        }

        const [menuItems] = await db.query('SELECT * FROM menu_items WHERE restaurant_id = ?', [id])
        const [reviews] = await db.query('SELECT * FROM reviews WHERE restaurant_id = ? ORDER BY created_at DESC', [id])

        const restaurant = {
            ...restaurants[0],
            menu: menuItems,
            reviews: reviews
        }

        res.json(restaurant)
    } catch (error) {
        console.error('Database error:', error) // Debug log
        res.status(500).json({ error: error.message })
    }   
}

// Create new restaurant
exports.createRestaurant = async (req, res) => {
    try {
        const {name, category, latitude, longitude, address, phone, image_url } = req.body;

        const [result] = await db.query(
            'INSERT INTO restaurants (name, category, latitude, longitude, address, phone, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [name, category, latitude, longitude, address, phone, image_url]
        )

        res.status(201).json({
            message: 'Restaurant created',
            id: result.insertId
        })
    } catch (error) {
        console.error('Database error:', error)
        res.status(500).json({ error: error.message })
    }
}

// Update restaurant
exports.updateRestaurant = async (req, res) => {
    try {
        const {id} = req.params;
        const {name, category, latitude, longitude, address, phone, image_url} = req.body;

        const [result] = await db.query(
            'UPDATE restaurants SET name = ?, category = ?, latitude = ?, longitude = ?, address = ?, phone = ?, image_url = ? WHERE id = ?',
            [name, category, latitude, longitude, address, phone, image_url, id]
        )

        if (result.affectedRows === 0) {
            return res.status(404).json( {message: 'Restaurant not found'})
        }

        res.json({ message: 'Restaurant updated'})
    } catch (error) {
        console.error('Database error:', error)
        res.status(500).json({ error: error.message})
    }
}

// Delete restaurant
exports.deleteRestaurant = async (req, res) => {
    try {
        const {id} = req.params;

        const [result] = await db.query('DELETE FROM restaurants WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Restaurant not found'})
        }

        res.json({message: 'Restaurant deleted'})
    } catch (error) {
        console.error('Database error:', error)
        res.status(500).json({error: error.message})
    }
}