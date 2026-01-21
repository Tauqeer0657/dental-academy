import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import {
    dentistsRouter,
    eventsRouter,
    registrationsRouter,
    paymentsRouter,
    reviewsRouter,
    adminRouter,
    authRouter
} from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));

// Parse JSON bodies (except for webhook route which needs raw body)
app.use((req, res, next) => {
    if (req.originalUrl === '/api/payments/webhook') {
        next();
    } else {
        express.json()(req, res, next);
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// API Routes
app.use('/api/dentists', dentistsRouter);
app.use('/api/events', eventsRouter);
app.use('/api/registrations', registrationsRouter);
app.use('/api/payments', paymentsRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/admin', adminRouter);
app.use('/api/auth', authRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.statusCode || 500).json({
        success: false,
        error: err.message || 'Internal Server Error'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint not found'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   🦷 Dental Webinar API Server                            ║
║                                                            ║
║   Server running at: http://localhost:${PORT}              ║
║   Environment: ${process.env.NODE_ENV || 'development'}                               ║
║                                                            ║
║   Endpoints:                                               ║
║   • GET  /api/health           - Health check              ║
║   • GET  /api/dentists         - List dentists             ║
║   • GET  /api/events           - List events               ║
║   • GET  /api/events/upcoming  - Get upcoming event        ║
║   • POST /api/registrations    - Create registration       ║
║   • GET  /api/reviews          - List reviews              ║
║   • POST /api/payments/create-intent - Create payment      ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
  `);
});

export default app;
