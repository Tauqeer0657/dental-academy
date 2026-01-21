import express from 'express';
import { Registration } from '../models/index.js';

const router = express.Router();

// Simple admin auth middleware (demo - in production use JWT or session)
const adminAuth = (req, res, next) => {
    const adminKey = req.headers['x-admin-key'];
    // Demo mode: accept any key or no key for development
    if (process.env.NODE_ENV === 'production' && adminKey !== process.env.ADMIN_SECRET_KEY) {
        return res.status(401).json({ success: false, error: 'Unauthorized' });
    }
    next();
};

// GET /api/admin/stats - Dashboard statistics
router.get('/stats', adminAuth, async (req, res) => {
    try {
        const [
            totalRegistrations,
            paidRegistrations,
            pendingRegistrations,
            totalRevenue,
            recentRegistrations
        ] = await Promise.all([
            Registration.countDocuments(),
            Registration.countDocuments({ paymentStatus: 'paid' }),
            Registration.countDocuments({ paymentStatus: 'pending' }),
            Registration.aggregate([
                { $match: { paymentStatus: 'paid' } },
                { $group: { _id: null, total: { $sum: '$pricingBreakdown.total' } } }
            ]),
            Registration.find()
                .sort({ createdAt: -1 })
                .limit(5)
                .select('fullName email pricingBreakdown.total paymentStatus createdAt')
        ]);

        res.json({
            success: true,
            data: {
                totalRegistrations,
                paidRegistrations,
                pendingRegistrations,
                totalRevenue: totalRevenue[0]?.total || 0,
                recentRegistrations,
                conversionRate: totalRegistrations > 0
                    ? ((paidRegistrations / totalRegistrations) * 100).toFixed(1)
                    : 0
            }
        });
    } catch (error) {
        // Demo mode fallback
        res.json({
            success: true,
            source: 'demo',
            data: {
                totalRegistrations: 342,
                paidRegistrations: 298,
                pendingRegistrations: 44,
                totalRevenue: 148902,
                recentRegistrations: [
                    { fullName: 'Dr. John Smith', email: 'john@clinic.com', pricingTotal: 499, paymentStatus: 'paid', createdAt: new Date() },
                    { fullName: 'Dr. Sarah Johnson', email: 'sarah@dental.com', pricingTotal: 699, paymentStatus: 'paid', createdAt: new Date(Date.now() - 3600000) },
                    { fullName: 'Dr. Michael Brown', email: 'michael@dentalpro.com', pricingTotal: 499, paymentStatus: 'pending', createdAt: new Date(Date.now() - 7200000) }
                ],
                conversionRate: 87.1
            }
        });
    }
});

// GET /api/admin/registrations - List all registrations
router.get('/registrations', adminAuth, async (req, res) => {
    try {
        const { page = 1, limit = 20, status, search } = req.query;
        const skip = (page - 1) * limit;

        const query = {};
        if (status) query.paymentStatus = status;
        if (search) {
            query.$or = [
                { fullName: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { confirmationNumber: { $regex: search, $options: 'i' } }
            ];
        }

        const [registrations, total] = await Promise.all([
            Registration.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(parseInt(limit))
                .select('-__v'),
            Registration.countDocuments(query)
        ]);

        res.json({
            success: true,
            data: registrations,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        // Demo mode fallback
        res.json({
            success: true,
            source: 'demo',
            data: [
                {
                    _id: '1',
                    confirmationNumber: 'DM-ABC123',
                    fullName: 'Dr. John Smith',
                    email: 'john@clinic.com',
                    phone: '+1 555-123-4567',
                    country: 'United States',
                    profession: 'dentist',
                    accommodationType: 'single',
                    paymentStatus: 'paid',
                    pricingBreakdown: { basePrice: 499, total: 699 },
                    createdAt: new Date()
                },
                {
                    _id: '2',
                    confirmationNumber: 'DM-XYZ789',
                    fullName: 'Dr. Sarah Johnson',
                    email: 'sarah@dental.com',
                    phone: '+1 555-987-6543',
                    country: 'Canada',
                    profession: 'dentist',
                    accommodationType: 'shared',
                    paymentStatus: 'paid',
                    pricingBreakdown: { basePrice: 499, total: 649 },
                    createdAt: new Date(Date.now() - 86400000)
                }
            ],
            pagination: { page: 1, limit: 20, total: 2, pages: 1 }
        });
    }
});

// GET /api/admin/registrations/:id - Get single registration details
router.get('/registrations/:id', adminAuth, async (req, res) => {
    try {
        const registration = await Registration.findById(req.params.id);
        if (!registration) {
            return res.status(404).json({ success: false, error: 'Registration not found' });
        }
        res.json({ success: true, data: registration });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// PATCH /api/admin/registrations/:id - Update registration
router.patch('/registrations/:id', adminAuth, async (req, res) => {
    try {
        const registration = await Registration.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if (!registration) {
            return res.status(404).json({ success: false, error: 'Registration not found' });
        }
        res.json({ success: true, data: registration });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET /api/admin/export - Export registrations as CSV
router.get('/export', adminAuth, async (req, res) => {
    try {
        const registrations = await Registration.find({ paymentStatus: 'paid' })
            .sort({ createdAt: -1 })
            .select('confirmationNumber fullName email phone country profession accommodationType foodPreference pricingBreakdown.total paymentStatus createdAt');

        // Convert to CSV
        const headers = ['Confirmation', 'Name', 'Email', 'Phone', 'Country', 'Profession', 'Accommodation', 'Food', 'Total', 'Status', 'Date'];
        const rows = registrations.map(r => [
            r.confirmationNumber,
            r.fullName,
            r.email,
            r.phone,
            r.country,
            r.profession,
            r.accommodationType,
            r.foodPreference,
            r.pricingBreakdown?.total || 0,
            r.paymentStatus,
            r.createdAt?.toISOString().split('T')[0]
        ].join(','));

        const csv = [headers.join(','), ...rows].join('\n');

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=registrations.csv');
        res.send(csv);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

export default router;
