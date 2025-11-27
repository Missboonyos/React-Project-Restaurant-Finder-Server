const db = require('../config/database')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Register new user
exports.register = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        // Validate input
        if (!name || !email || !password){
            return res.status(400).json({
                error: 'Please provide name, email and password'
            })
        }

        // Check if user already exists
        const [existingUsers] = await db.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        )

        if (existingUsers.length > 0) {
            return res.status(400).json({
                error: 'Email already registered'
            })
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const [result] = await db.query(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword]
        )

        // Generate JWT token
        const token = jwt.sign(
            { id: result.insertId, email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE}
        )

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: result.insertId,
                name,
                email
            }
        })
    } catch (error) {
        console.error('Registration error:', error)
        res.status(500).json({ error: error.message })
    }
}

// Login user
exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;

        // Validate input
        if (!email || !password){
            return res.status(400).json({
                error: 'Please provide email and password'
            })
        }

        // Find user
        const [users] = await db.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        )

        if (users.length === 0) {
            return res.status(401).json({
                error: 'Invalid email or password'
            })
        }

        const user = users[0];

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                error: 'Invalid email or password'
            })
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email},
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE }
        )

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        })

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({error: error.message})
    }
}

// Get current user (protected route)
exports.getMe = async (req, res) => {
    try {
        const [users] = await db.query(
            'SELECT id, name, email, created_at FROM users WHERE id = ?',
            [req.user.id]
        )

        if (users.length === 0) {
            return res.status(404).json({error: 'User not found'});
        }

        res.json(users[0])
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({error: error.message})
    }
}