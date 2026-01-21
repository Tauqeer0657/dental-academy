import express from 'express';
import { Review } from '../models/index.js';
import { testimonials as mockTestimonials } from '../data/mockData.js';

const router = express.Router();

// GET all approved reviews
router.get('/', async (req, res) => {
    try {
        let reviews = await Review.find({ isApproved: true })
            .sort({ isFeatured: -1, createdAt: -1 })
            .limit(20);

        if (!reviews.length) {
            reviews = mockTestimonials;
        }

        res.json({
            success: true,
            count: reviews.length,
            data: reviews
        });
    } catch (error) {
        res.json({
            success: true,
            count: mockTestimonials.length,
            data: mockTestimonials,
            source: 'mock'
        });
    }
});

// GET featured reviews (for homepage carousel)
router.get('/featured', async (req, res) => {
    try {
        let reviews = await Review.find({
            isApproved: true,
            isFeatured: true
        })
            .sort({ createdAt: -1 })
            .limit(10);

        if (!reviews.length) {
            reviews = mockTestimonials.slice(0, 5);
        }

        res.json({
            success: true,
            count: reviews.length,
            data: reviews
        });
    } catch (error) {
        res.json({
            success: true,
            data: mockTestimonials.slice(0, 5),
            source: 'mock'
        });
    }
});

// Submit a new review
router.post('/', async (req, res) => {
    try {
        const { attendeeName, attendeeCredential, rating, reviewText, eventId } = req.body;

        if (!attendeeName || !rating || !reviewText) {
            return res.status(400).json({
                success: false,
                error: 'Name, rating, and review text are required'
            });
        }

        const review = new Review({
            attendeeName,
            attendeeCredential,
            rating,
            reviewText,
            event: eventId,
            isApproved: false, // Requires admin approval
            isFeatured: false
        });

        await review.save();

        res.status(201).json({
            success: true,
            message: 'Thank you for your review! It will be visible after approval.',
            data: { id: review._id }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

export default router;
