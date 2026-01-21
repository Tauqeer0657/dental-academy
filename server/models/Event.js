import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    timezone: {
        type: String,
        default: 'America/New_York'
    },
    platform: {
        type: String,
        enum: ['Zoom', 'Teams', 'Google Meet', 'Webex', 'In-Person'],
        default: 'Zoom'
    },
    platformUrl: String,
    basePrice: {
        type: Number,
        required: true,
        min: 0
    },
    earlyBirdPrice: {
        type: Number,
        min: 0
    },
    earlyBirdDeadline: Date,
    maxCapacity: {
        type: Number,
        required: true,
        min: 1
    },
    currentRegistrations: {
        type: Number,
        default: 0
    },
    ceCredits: {
        type: Number,
        default: 0
    },
    features: [{
        type: String
    }],
    status: {
        type: String,
        enum: ['upcoming', 'live', 'completed', 'cancelled'],
        default: 'upcoming'
    },
    dentists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dentist'
    }],
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Virtual for checking if registration is full
eventSchema.virtual('isFull').get(function () {
    return this.currentRegistrations >= this.maxCapacity;
});

// Virtual for available spots
eventSchema.virtual('availableSpots').get(function () {
    return Math.max(0, this.maxCapacity - this.currentRegistrations);
});

// Virtual for early bird pricing availability
eventSchema.virtual('isEarlyBird').get(function () {
    if (!this.earlyBirdDeadline) return false;
    return new Date() < new Date(this.earlyBirdDeadline);
});

eventSchema.set('toJSON', { virtuals: true });
eventSchema.set('toObject', { virtuals: true });

const Event = mongoose.model('Event', eventSchema);

export default Event;
