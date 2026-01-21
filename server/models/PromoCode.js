import mongoose from 'mongoose';

const promoCodeSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true
    },
    discountType: {
        type: String,
        enum: ['percentage', 'fixed'],
        required: true
    },
    discountValue: {
        type: Number,
        required: true,
        min: 0
    },
    maxUses: {
        type: Number,
        default: null // null = unlimited
    },
    currentUses: {
        type: Number,
        default: 0
    },
    validFrom: {
        type: Date,
        default: Date.now
    },
    validUntil: Date,
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Virtual to check if code is valid
promoCodeSchema.virtual('isValid').get(function () {
    if (!this.isActive) return false;

    const now = new Date();
    if (this.validFrom && now < this.validFrom) return false;
    if (this.validUntil && now > this.validUntil) return false;
    if (this.maxUses && this.currentUses >= this.maxUses) return false;

    return true;
});

promoCodeSchema.set('toJSON', { virtuals: true });
promoCodeSchema.set('toObject', { virtuals: true });

// Index for code lookup
promoCodeSchema.index({ code: 1 });

const PromoCode = mongoose.model('PromoCode', promoCodeSchema);

export default PromoCode;
