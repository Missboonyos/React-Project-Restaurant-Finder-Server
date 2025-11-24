// Get all favorites
const db = require('../config/database');

// Get all favorites
exports.getFavorites = async (req, res) => {
    try {
        const user_id = 1; // Hardcoded for now

        const [favorites] = await db.query(
            `SELECT r.* FROM restaurants r
            INNER JOIN favorites f ON r.id = f.restaurant_id
            WHERE f.user_id = ?`,
            [user_id]
        )

        res.json(favorites);
    } catch (error) {
        res.status(500).json({error: error.message})   
    }
}

// Add to favorites
exports.addFavorite = async (req, res) => {
    try {
        const {restaurant_id} = req.body;
        const user_id = 1; // Hardcoded for now

        await db.query(
            'INSERT INTO favorites (restaurant_id, user_id) VALUE (?, ?)',
            [restaurant_id, user_id]
        )

        res.status(201).json({ message: 'Added to favorites'})
    } catch (error) {
        if (error.code === 'ER-DUP_ENTRY'){
            return res.status(400).json({message: 'Already in favorites'})
        }
        res.status(500).json({error: error.message})
    }
}

// Remove from favorites
exports.removeFavorite = async (req, res) => {
    try {
        const {restaurant_id} = req.params;
        const user_id = 1; // Hardcoded for now

        const [result] = await db.query(
            'DELETE FROM favorites WHERE restaurant_id = ? AND user_id = ?',
            [restaurant_id, user_id]
        )

        if (result.affectedRows === 0){
            return res.status(404).json({message: 'Favorite not found'})
        }

        res.json({message: 'Remove from favorites'})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

// Check if restaurant is favorite
exports.isFavorite = async (req, res) => {
    try {
        const {restaurant_id} = req.params;
        const user_id = 1;

        const [result] = await db.query(
            'SELECT * FROM favorites WHERE restaurant_id = ? AND user_id = ?',
            [restaurant_id, user_id]
        )

        res.json({ isFavorite: result.length > 0})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}