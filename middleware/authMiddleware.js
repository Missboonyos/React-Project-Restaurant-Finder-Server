const jwt = require('jsonwebtoken')

// Protect routes - verify JWT token
exports.protect = async (req, res, next) => {
    try {
        let token;

        // Check if token exists in header
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                error: 'Not authorized to access this route'
            })        
    } 

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Add user info to request
        req.user = {
            id: decoded.id,
            email: decoded.email
        }

        next();
    } catch (error) {
        return res.status(401).json({
            error: 'Token is invalid or expired'
        })
    }
    
    } catch (error) {
        console.error('Auth middleware error:', error)
        res.status(500).json({error: error.message})
    }
}