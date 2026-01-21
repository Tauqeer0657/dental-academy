import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    attendeeName: {
        type: String,
        required: true,
        trim: true
    },
    attendeeCredential: {
        type: String,
        required: true
    },
    attendeePhotoUrl: String,
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    reviewText: {
        type: String,
        required: true,
        maxlength: 1000
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    },
    verified: {
        type: Boolean,
        default: false
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    isFeatured: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Index for fetching approved reviews
reviewSchema.index({ isApproved: 1, isFeatured: -1 });

const Review = mongoose.model('Review', reviewSchema);

export default Review;
