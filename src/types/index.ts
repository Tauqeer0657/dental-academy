// Dentist types
export interface Dentist {
    id: string;
    name: string;
    credentials: string;
    specialty: string;
    biography: string;
    profileImageUrl: string;
    achievements: string[];
    socialLinks: {
        linkedin?: string;
        twitter?: string;
        researchGate?: string;
    };
    videoIntroUrl?: string;
    topicsCovered: string[];
    institution: string;
    yearsExperience: number;
}

// Event types
export interface WebinarEvent {
    id: string;
    name: string;
    date: string;
    time: string;
    durationHours: number;
    platform: 'Zoom' | 'Teams' | 'Meet';
    maxCapacity: number;
    currentRegistrations: number;
    basePrice: number;
    status: 'upcoming' | 'ongoing' | 'completed';
    description?: string;
}

// Registration types
export type AccommodationType = 'single' | 'shared' | 'none';
export type FoodPreference = 'halal' | 'vegetarian' | 'vegan' | 'none';
export type Profession = 'dentist' | 'student' | 'hygienist' | 'other';

export interface RegistrationFormData {
    // Step 1: Personal Information
    fullName: string;
    email: string;
    phone: string;
    countryCode: string;
    country: string;
    profession: Profession;
    experienceYears: number;
    licenseNumber?: string;

    // Step 2: Event Preferences
    accommodationType: AccommodationType;
    foodPreference: FoodPreference;
    dietaryRestrictions?: string;

    // Step 3: Additional Options
    certificateType: 'hardcopy' | 'digital';
    materialsKit: boolean;
    networkingDinner: boolean;

    // Step 4: Payment
    promoCode?: string;
    agreedToTerms: boolean;
}

export interface PricingOption {
    id: string;
    type: 'accommodation' | 'food' | 'extras';
    name: string;
    price: number;
    description: string;
}

export interface Registration extends RegistrationFormData {
    id: string;
    basePrice: number;
    totalAmount: number;
    paymentStatus: 'pending' | 'completed' | 'failed';
    paymentId?: string;
    registrationDate: string;
    webinarAccessLink?: string;
}

// Review/Testimonial types
export interface Review {
    id: string;
    attendeeName: string;
    attendeeCredential: string;
    attendeePhotoUrl: string;
    rating: number;
    reviewText: string;
    eventDate: string;
    verified: boolean;
}

// Pricing calculation
export interface PricingBreakdown {
    basePrice: number;
    accommodation: number;
    food: number;
    certificate: number;
    materialsKit: number;
    networkingDinner: number;
    discount: number;
    total: number;
}
