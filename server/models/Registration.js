import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
    // Reference to event (optional for demo mode)
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    },

    // Personal Information
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        required: true
    },
    countryCode: {
        type: String,
        default: '+1'
    },
    country: {
        type: String,
        required: true
    },
    profession: {
        type: String,
        enum: ['dentist', 'student', 'hygienist', 'other'],
        required: true
    },
    experienceYears: {
        type: Number,
        default: 0,
        min: 0
    },
    licenseNumber: String,

    // Event Preferences
    accommodationType: {
        type: String,
        enum: ['single', 'shared', 'none'],
        default: 'none'
    },
    foodPreference: {
        type: String,
        enum: ['halal', 'vegetarian', 'vegan', 'none'],
        default: 'halal'
    },
    dietaryRestrictions: String,

    // Additional Options
    certificateType: {
        type: String,
        enum: ['hardcopy', 'digital'],
        default: 'digital'
    },
    materialsKit: {
        type: Boolean,
        default: false
    },
    networkingDinner: {
        type: Boolean,
        default: false
    },

    // Pricing
    promoCode: String,
    pricing: {
        basePrice: { type: Number, default: 499 },
        accommodation: { type: Number, default: 0 },
        food: { type: Number, default: 0 },
        certificate: { type: Number, default: 0 },
        materialsKit: { type: Number, default: 0 },
        networkingDinner: { type: Number, default: 0 },
        discount: { type: Number, default: 0 },
        total: { type: Number, default: 499 }
    },

    // Payment
    paymentStatus: {
        type: String,
        enum: ['pending', 'processing', 'completed', 'failed', 'refunded'],
        default: 'pending'
    },
    stripePaymentIntentId: String,
    stripeCustomerId: String,
    paidAt: Date,

    // Registration Status
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'attended'],
        default: 'pending'
    },
    confirmationNumber: {
        type: String,
        unique: true
    },

    // Consent
    agreedToTerms: {
        type: Boolean,
        required: true
    },
    marketingOptIn: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Generate confirmation number before saving
registrationSchema.pre('save', function (next) {
    if (!this.confirmationNumber) {
        this.confirmationNumber = 'DM-' + Date.now().toString(36).toUpperCase() +
            Math.random().toString(36).substring(2, 6).toUpperCase();
    }
    next();
});

// Index for common queries
registrationSchema.index({ email: 1, event: 1 });
registrationSchema.index({ confirmationNumber: 1 });
registrationSchema.index({ status: 1 });
registrationSchema.index({ paymentStatus: 1 });

const Registration = mongoose.model('Registration', registrationSchema);

export default Registration;
