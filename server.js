const express = require('express')
const cors = require('cors')
require('dotenv').config()

const restaurantRoutes = require('./routes/restaurants')
const reviewRoutes = require('./routes/reviews')
const favoriteRoutes = require('./routes/favorites')

const app = express()

// Middleware
app.use(cors());
app.use(express.json())

// Routes
app.use('/api/restaurants', restaurantRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/favorites', favoriteRoutes)

// Test Route
app.get('/api/test', (req, res) => {
    res.json({message: 'API is working!'})
})

// Error handling
app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).json({error: 'Something went wrong!'})
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
})