import express from 'express';
import { Dentist } from '../models/index.js';
import { dentists as mockDentists } from '../data/mockData.js';

const router = express.Router();

// GET all dentists
router.get('/', async (req, res) => {
    try {
        // Try to fetch from database first
        let dentists = await Dentist.find({ isActive: true }).sort('displayOrder');

        // If no dentists in DB, return mock data
        if (!dentists.length) {
            dentists = mockDentists;
        }

        res.json({
            success: true,
            count: dentists.length,
            data: dentists
        });
    } catch (error) {
        // Fallback to mock data on any error
        res.json({
            success: true,
            count: mockDentists.length,
            data: mockDentists,
            source: 'mock'
        });
    }
});

// GET single dentist by ID
router.get('/:id', async (req, res) => {
    try {
        const dentist = await Dentist.findById(req.params.id);

        if (!dentist) {
            // Try to find in mock data
            const mockDentist = mockDentists.find(d => d.id === req.params.id);
            if (mockDentist) {
                return res.json({ success: true, data: mockDentist });
            }
            return res.status(404).json({ success: false, error: 'Dentist not found' });
        }

        res.json({ success: true, data: dentist });
    } catch (error) {
        // Try mock data as fallback
        const mockDentist = mockDentists.find(d => d.id === req.params.id);
        if (mockDentist) {
            return res.json({ success: true, data: mockDentist });
        }
        res.status(500).json({ success: false, error: error.message });
    }
});

export default router;
