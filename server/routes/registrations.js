import express from 'express';
import { Registration, Event, PromoCode } from '../models/index.js';
import { z } from 'zod';

const router = express.Router();

// Validation schema
const registrationSchema = z.object({
    eventId: z.string().optional(),
    fullName: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(10),
    countryCode: z.string(),
    country: z.string(),
    profession: z.enum(['dentist', 'student', 'hygienist', 'other']),
    experienceYears: z.number().min(0).max(60),
    licenseNumber: z.string().optional(),
    accommodationType: z.enum(['single', 'shared', 'none']),
    foodPreference: z.enum(['halal', 'vegetarian', 'vegan', 'none']),
    dietaryRestrictions: z.string().optional(),
    certificateType: z.enum(['hardcopy', 'digital']),
    materialsKit: z.boolean(),
    networkingDinner: z.boolean(),
    promoCode: z.string().optional(),
    agreedToTerms: z.literal(true)
});

// Pricing configuration
const PRICING = {
    basePrice: 499,
    accommodation: { single: 200, shared: 150, none: 0 },
    food: { halal: 0, vegetarian: 0, vegan: 0, none: -50 },
    certificate: { hardcopy: 25, digital: 0 },
    materialsKit: 75,
    networkingDinner: 100
};

// Calculate pricing
function calculatePricing(data, discountAmount = 0) {
    const accommodation = PRICING.accommodation[data.accommodationType] || 0;
    const food = PRICING.food[data.foodPreference] || 0;
    const certificate = PRICING.certificate[data.certificateType] || 0;
    const materialsKit = data.materialsKit ? PRICING.materialsKit : 0;
    const networkingDinner = data.networkingDinner ? PRICING.networkingDinner : 0;

    const subtotal = PRICING.basePrice + accommodation + food + certificate + materialsKit + networkingDinner;
    const total = Math.max(0, subtotal - discountAmount);

    return {
        basePrice: PRICING.basePrice,
        accommodation,
        food,
        certificate,
        materialsKit,
        networkingDinner,
        discount: discountAmount,
        total
    };
}

// Calculate pricing endpoint
router.post('/calculate-pricing', async (req, res) => {
    try {
        const { accommodationType, foodPreference, certificateType, materialsKit, networkingDinner, promoCode } = req.body;

        let discountAmount = 0;
        let promoDetails = null;

        // Validate promo code if provided
        if (promoCode) {
            const code = await PromoCode.findOne({
                code: promoCode.toUpperCase(),
                isActive: true
            });

            if (code && code.isValid) {
                if (code.discountType === 'percentage') {
                    discountAmount = Math.round(PRICING.basePrice * (code.discountValue / 100));
                } else {
                    discountAmount = code.discountValue;
                }
                promoDetails = {
                    code: code.code,
                    discountType: code.discountType,
                    discountValue: code.discountValue
                };
            }
        }

        const pricing = calculatePricing({
            accommodationType: accommodationType || 'none',
            foodPreference: foodPreference || 'halal',
            certificateType: certificateType || 'digital',
            materialsKit: materialsKit || false,
            networkingDinner: networkingDinner || false
        }, discountAmount);

        res.json({
            success: true,
            data: {
                pricing,
                promoApplied: promoDetails
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Validate promo code
router.post('/validate-promo', async (req, res) => {
    try {
        const { code } = req.body;

        if (!code) {
            return res.status(400).json({ success: false, error: 'Promo code is required' });
        }

        const promoCode = await PromoCode.findOne({
            code: code.toUpperCase(),
            isActive: true
        });

        if (!promoCode) {
            return res.json({
                success: false,
                valid: false,
                error: 'Invalid promo code'
            });
        }

        if (!promoCode.isValid) {
            return res.json({
                success: false,
                valid: false,
                error: 'This promo code has expired or reached its limit'
            });
        }

        res.json({
            success: true,
            valid: true,
            data: {
                discountType: promoCode.discountType,
                discountValue: promoCode.discountValue
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Create registration
router.post('/', async (req, res) => {
    try {
        // Validate request body
        const validatedData = registrationSchema.parse(req.body);

        // Calculate pricing
        let discountAmount = 0;
        if (validatedData.promoCode) {
            const code = await PromoCode.findOne({
                code: validatedData.promoCode.toUpperCase(),
                isActive: true
            });
            if (code && code.isValid) {
                discountAmount = code.discountType === 'percentage'
                    ? Math.round(PRICING.basePrice * (code.discountValue / 100))
                    : code.discountValue;

                // Increment usage
                code.currentUses += 1;
                await code.save();
            }
        }

        const pricing = calculatePricing(validatedData, discountAmount);

        // Find event or use default
        let eventId = validatedData.eventId;
        if (!eventId) {
            const upcomingEvent = await Event.findOne({
                status: 'upcoming',
                isActive: true
            });
            eventId = upcomingEvent?._id;
        }

        // Create registration
        const registration = new Registration({
            ...validatedData,
            event: eventId,
            pricing,
            status: 'pending',
            paymentStatus: 'pending'
        });

        await registration.save();

        // Increment event registrations
        if (eventId) {
            await Event.findByIdAndUpdate(eventId, {
                $inc: { currentRegistrations: 1 }
            });
        }

        res.status(201).json({
            success: true,
            data: {
                registrationId: registration._id,
                confirmationNumber: registration.confirmationNumber,
                pricing: registration.pricing
            }
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                success: false,
                error: 'Validation failed',
                details: error.errors
            });
        }
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get registration by confirmation number
router.get('/:confirmationNumber', async (req, res) => {
    try {
        const registration = await Registration.findOne({
            confirmationNumber: req.params.confirmationNumber
        }).populate('event', 'name date startTime endTime platform');

        if (!registration) {
            return res.status(404).json({ success: false, error: 'Registration not found' });
        }

        res.json({ success: true, data: registration });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

export default router;
