import express from 'express';
import Stripe from 'stripe';
import { Registration } from '../models/index.js';

const router = express.Router();

// Initialize Stripe with secret key
const stripe = process.env.STRIPE_SECRET_KEY
    ? new Stripe(process.env.STRIPE_SECRET_KEY)
    : null;

// Create payment intent
router.post('/create-intent', async (req, res) => {
    try {
        const { registrationId, amount } = req.body;

        // Demo mode - if no Stripe key or demo registration ID
        if (!stripe || !registrationId || registrationId.startsWith('demo-')) {
            return res.json({
                success: true,
                data: {
                    clientSecret: 'demo_client_secret_' + Date.now(),
                    paymentIntentId: 'demo_pi_' + Date.now(),
                    demo: true
                }
            });
        }

        // Try to find registration in MongoDB (only for real registrations)
        let registration = null;
        try {
            registration = await Registration.findById(registrationId);
        } catch (err) {
            // Invalid ObjectId format - treat as demo
            return res.json({
                success: true,
                data: {
                    clientSecret: 'demo_client_secret_' + Date.now(),
                    paymentIntentId: 'demo_pi_' + Date.now(),
                    demo: true
                }
            });
        }

        if (!registration) {
            // No registration found - use demo mode
            return res.json({
                success: true,
                data: {
                    clientSecret: 'demo_client_secret_' + Date.now(),
                    paymentIntentId: 'demo_pi_' + Date.now(),
                    demo: true
                }
            });
        }

        // Create real Stripe payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round((amount || registration.pricingBreakdown?.total || 499) * 100),
            currency: 'usd',
            metadata: {
                registrationId: registrationId,
                confirmationNumber: registration.confirmationNumber,
                email: registration.email
            }
        });

        // Update registration with payment intent ID
        registration.stripePaymentIntentId = paymentIntent.id;
        registration.paymentStatus = 'processing';
        await registration.save();

        res.json({
            success: true,
            data: {
                clientSecret: paymentIntent.client_secret,
                paymentIntentId: paymentIntent.id
            }
        });
    } catch (error) {
        console.error('Payment intent error:', error);
        // On any error, fallback to demo mode
        res.json({
            success: true,
            data: {
                clientSecret: 'demo_client_secret_' + Date.now(),
                paymentIntentId: 'demo_pi_' + Date.now(),
                demo: true,
                fallback: true
            }
        });
    }
});

// Confirm payment (called after successful client-side payment)
router.post('/confirm', async (req, res) => {
    try {
        const { registrationId, paymentIntentId } = req.body;

        // Demo mode - if demo payment intent or demo registration
        if (!stripe || paymentIntentId?.startsWith('demo_') || registrationId?.startsWith('demo-')) {
            return res.json({
                success: true,
                data: {
                    confirmationNumber: 'DM-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
                    status: 'confirmed',
                    demo: true
                }
            });
        }

        // Try to find registration in MongoDB
        let registration = null;
        try {
            registration = await Registration.findById(registrationId);
        } catch (err) {
            // Invalid ObjectId - return demo confirmation
            return res.json({
                success: true,
                data: {
                    confirmationNumber: 'DM-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
                    status: 'confirmed',
                    demo: true
                }
            });
        }

        if (!registration) {
            return res.json({
                success: true,
                data: {
                    confirmationNumber: 'DM-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
                    status: 'confirmed',
                    demo: true
                }
            });
        }

        // Verify payment with Stripe
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        if (paymentIntent.status === 'succeeded') {
            registration.paymentStatus = 'completed';
            registration.status = 'confirmed';
            registration.paidAt = new Date();
            await registration.save();

            res.json({
                success: true,
                data: {
                    confirmationNumber: registration.confirmationNumber,
                    status: 'confirmed'
                }
            });
        } else {
            registration.paymentStatus = 'failed';
            await registration.save();

            res.status(400).json({
                success: false,
                error: 'Payment not successful',
                status: paymentIntent.status
            });
        }
    } catch (error) {
        console.error('Payment confirmation error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get Stripe publishable key (for client-side)
router.get('/config', (req, res) => {
    res.json({
        success: true,
        data: {
            publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || 'pk_test_demo',
            demo: !process.env.STRIPE_PUBLISHABLE_KEY?.startsWith('pk_')
        }
    });
});

// Stripe webhook handler
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    if (!stripe) {
        return res.status(200).json({ received: true, demo: true });
    }

    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            console.log('Payment succeeded:', paymentIntent.id);

            // Update registration
            const registration = await Registration.findOne({
                stripePaymentIntentId: paymentIntent.id
            });

            if (registration) {
                registration.paymentStatus = 'completed';
                registration.status = 'confirmed';
                registration.paidAt = new Date();
                await registration.save();
            }
            break;

        case 'payment_intent.payment_failed':
            const failedPayment = event.data.object;
            console.log('Payment failed:', failedPayment.id);

            const failedRegistration = await Registration.findOne({
                stripePaymentIntentId: failedPayment.id
            });

            if (failedRegistration) {
                failedRegistration.paymentStatus = 'failed';
                await failedRegistration.save();
            }
            break;

        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
});

export default router;
