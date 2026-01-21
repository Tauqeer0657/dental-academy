import express from 'express';
import { Event } from '../models/index.js';
import { upcomingEvent as mockEvent } from '../data/mockData.js';

const router = express.Router();

// GET all events
router.get('/', async (req, res) => {
    try {
        const { status } = req.query;
        const filter = { isActive: true };

        if (status) {
            filter.status = status;
        }

        let events = await Event.find(filter)
            .populate('dentists', 'name credentials specialty profileImageUrl')
            .sort({ date: 1 });

        if (!events.length) {
            events = [mockEvent];
        }

        res.json({
            success: true,
            count: events.length,
            data: events
        });
    } catch (error) {
        res.json({
            success: true,
            count: 1,
            data: [mockEvent],
            source: 'mock'
        });
    }
});

// GET upcoming event (for homepage)
router.get('/upcoming', async (req, res) => {
    try {
        const event = await Event.findOne({
            status: 'upcoming',
            isActive: true,
            date: { $gte: new Date() }
        })
            .populate('dentists', 'name credentials specialty profileImageUrl')
            .sort({ date: 1 });

        if (!event) {
            return res.json({ success: true, data: mockEvent });
        }

        res.json({ success: true, data: event });
    } catch (error) {
        res.json({ success: true, data: mockEvent, source: 'mock' });
    }
});

// GET single event by ID
router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
            .populate('dentists', 'name credentials specialty profileImageUrl');

        if (!event) {
            // Try mock data
            if (req.params.id === mockEvent.id) {
                return res.json({ success: true, data: mockEvent });
            }
            return res.status(404).json({ success: false, error: 'Event not found' });
        }

        res.json({ success: true, data: event });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// GET event availability
router.get('/:id/availability', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.json({
                success: true,
                data: {
                    maxCapacity: mockEvent.maxCapacity,
                    currentRegistrations: mockEvent.currentRegistrations,
                    availableSpots: mockEvent.maxCapacity - mockEvent.currentRegistrations,
                    isFull: false
                }
            });
        }

        res.json({
            success: true,
            data: {
                maxCapacity: event.maxCapacity,
                currentRegistrations: event.currentRegistrations,
                availableSpots: event.availableSpots,
                isFull: event.isFull
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

export default router;
