import mongoose from 'mongoose';

const dentistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    credentials: {
        type: String,
        required: true
    },
    specialty: {
        type: String,
        required: true
    },
    biography: {
        type: String,
        required: true
    },
    profileImageUrl: {
        type: String,
        required: true
    },
    achievements: [{
        type: String
    }],
    socialLinks: {
        linkedin: String,
        twitter: String,
        researchGate: String
    },
    videoIntroUrl: String,
    topicsCovered: [{
        type: String
    }],
    institution: {
        type: String,
        required: true
    },
    yearsExperience: {
        type: Number,
        required: true,
        min: 0
    },
    isActive: {
        type: Boolean,
        default: true
    },
    displayOrder: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const Dentist = mongoose.model('Dentist', dentistSchema);

export default Dentist;
