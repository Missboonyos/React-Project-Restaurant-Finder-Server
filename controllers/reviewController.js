const db = require('../config/database');

// Add review
exports.addReview = async (req, res) => {
    try {
        const {restaurant_id} = req.params;
        const {user_name, rating, comment} = req.body;

        const [result] = await db.query(
            'INSERT INTO reviews (restaurant_id, user_name, rating, comment) VALUES (?, ?, ?, ?)',
            [restaurant_id, user_name, rating, comment]
        )

        // Update restaurant average rating
        const [avgRating] = await db.query(
            'SELECT AVG(rating) as avg_rating FROM reviews WHERE restaurant_id = ?',
            [restaurant_id]
        )

        await db.query(
            'UPDATE restaurants SET rating = ? WHERE id = ?',
            [avgRating[0].avg_rating, restaurant_id]
        )

        res.status(201).json({
            message: 'Review added',
            id: result.insertId
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Update review
exports.updateReview = async (req, res) => {
    try {
        const {review_id} = req.params;
        const {rating, comment} = req.body;

        const [result] = await db.query(
            'UPDATE reviews SET rating = ?, comment = ? WHERE id = ?',
            [rating, comment, review_id]
        )

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Review not found'})
        }

        // Update restaurant average rating
        const [review] = await db.query('SELECT restaurant_id FROM reviews WHERE id = ?', [review_id])
        const restaurant_id = review[0].restaurant_id;

        const [avgRating] = await db.query(
            'SELECT AVG(rating) as avg_rating FROM reviews WHERE restaurant_id = ?',
            [restaurant_id]
        )

        await db.query(
            'UPDATE restaurants SET rating = ? WHERE id = ?',
            [avgRating[0].avg_rating, restaurant_id]
        )

        res.json({ message: 'Review updated'})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

// Delete review
exports.deleteReview = async (req, res) => {
    try {
        const {review_id} = req.params;

        const [review] = await db.query('SELECT restaurant_id FROM reviews WHERE id = ?', [review_id])

        if (review.length === 0) {
            return res.status(404).json({message: 'Review not found'})
        }

        const restaurant_id = review[0].restaurant_id

        await db.query('DELETE FROM reviews WHERE id = ?', [review_id])

        // Update restaurant average rating
        const [avgRating] = await db.query(
            'SELECT AVG(rating) as avg_rating FROM reviews WHERE restaurant_id = ?',
            [restaurant_id]
        )

        const newRating = avgRating[0].avg_rating || 0;
        await db.query(
            'UPDATE restaurants SET rating = ? WHERE id = ?',
            [newRating, restaurant_id]
        )

        res.json({message: 'Review deleted '})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}