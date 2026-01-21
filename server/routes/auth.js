import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Default admin credentials (in production, use hashed passwords in database)
const ADMIN_CREDENTIALS = {
    username: process.env.ADMIN_USERNAME || 'admin',
    password: process.env.ADMIN_PASSWORD || 'dental2024'
};

const JWT_SECRET = process.env.JWT_SECRET || 'dental-webinar-secret-key-change-in-production';
const JWT_EXPIRY = '24h';

// POST /api/auth/login - Admin login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate credentials
        if (username !== ADMIN_CREDENTIALS.username || password !== ADMIN_CREDENTIALS.password) {
            return res.status(401).json({
                success: false,
                error: 'Invalid username or password'
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { username, role: 'admin' },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRY }
        );

        res.json({
            success: true,
            data: {
                token,
                user: { username, role: 'admin' },
                expiresIn: JWT_EXPIRY
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Login failed'
        });
    }
});

// POST /api/auth/verify - Verify token
router.post('/verify', async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                error: 'No token provided'
            });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET);

        res.json({
            success: true,
            data: {
                user: { username: decoded.username, role: decoded.role },
                valid: true
            }
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            error: 'Invalid or expired token'
        });
    }
});

// Middleware to protect admin routes
export const requireAdmin = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // In development, allow access without auth
        if (process.env.NODE_ENV !== 'production' && !authHeader) {
            return next();
        }

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                error: 'Authentication required'
            });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, JWT_SECRET);

        if (decoded.role !== 'admin') {
            return res.status(403).json({
                success: false,
                error: 'Admin access required'
            });
        }

        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            error: 'Invalid or expired token'
        });
    }
};

export default router;
