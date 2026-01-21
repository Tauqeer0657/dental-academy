// API configuration and base fetch wrapper

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    count?: number;
    source?: string;
}

class ApiError extends Error {
    statusCode: number;
    constructor(statusCode: number, message: string) {
        super(message);
        this.name = 'ApiError';
        this.statusCode = statusCode;
    }
}

async function fetchApi<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;

    const defaultHeaders: HeadersInit = {
        'Content-Type': 'application/json',
    };

    const config: RequestInit = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    };

    try {
        const response = await fetch(url, config);
        const data = await response.json();

        if (!response.ok) {
            throw new ApiError(response.status, data.error || 'An error occurred');
        }

        return data;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        // Network or parsing error
        console.error('API Error:', error);
        throw new ApiError(500, 'Failed to connect to the server');
    }
}

// === DENTISTS API ===
export const dentistsApi = {
    getAll: () => fetchApi<typeof import('../data/mockData').dentists>('/dentists'),

    getById: (id: string) =>
        fetchApi<(typeof import('../data/mockData').dentists)[0]>(`/dentists/${id}`),
};

// === EVENTS API ===
export const eventsApi = {
    getAll: () => fetchApi<any[]>('/events'),

    getUpcoming: () =>
        fetchApi<typeof import('../data/mockData').upcomingEvent>('/events/upcoming'),

    getById: (id: string) => fetchApi<any>(`/events/${id}`),

    getAvailability: (id: string) =>
        fetchApi<{
            maxCapacity: number;
            currentRegistrations: number;
            availableSpots: number;
            isFull: boolean;
        }>(`/events/${id}/availability`),
};

// === REGISTRATIONS API ===
export interface RegistrationPayload {
    eventId?: string;
    fullName: string;
    email: string;
    phone: string;
    countryCode: string;
    country: string;
    profession: 'dentist' | 'student' | 'hygienist' | 'other';
    experienceYears: number;
    licenseNumber?: string;
    accommodationType: 'single' | 'shared' | 'none';
    foodPreference: 'halal' | 'vegetarian' | 'vegan' | 'none';
    dietaryRestrictions?: string;
    certificateType: 'hardcopy' | 'digital';
    materialsKit: boolean;
    networkingDinner: boolean;
    promoCode?: string;
    agreedToTerms: true;
}

export interface PricingResult {
    basePrice: number;
    accommodation: number;
    food: number;
    certificate: number;
    materialsKit: number;
    networkingDinner: number;
    discount: number;
    total: number;
}

export const registrationsApi = {
    create: (data: RegistrationPayload) =>
        fetchApi<{
            registrationId: string;
            confirmationNumber: string;
            pricing: PricingResult;
        }>('/registrations', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    calculatePricing: (data: Partial<RegistrationPayload>) =>
        fetchApi<{
            pricing: PricingResult;
            promoApplied: { code: string; discountType: string; discountValue: number } | null;
        }>('/registrations/calculate-pricing', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    validatePromo: (code: string) =>
        fetchApi<{
            valid: boolean;
            discountType?: string;
            discountValue?: number;
        }>('/registrations/validate-promo', {
            method: 'POST',
            body: JSON.stringify({ code }),
        }),

    getByConfirmation: (confirmationNumber: string) =>
        fetchApi<any>(`/registrations/${confirmationNumber}`),
};

// === PAYMENTS API ===
export const paymentsApi = {
    createIntent: (registrationId: string, amount: number) =>
        fetchApi<{
            clientSecret: string;
            paymentIntentId: string;
            demo?: boolean;
        }>('/payments/create-intent', {
            method: 'POST',
            body: JSON.stringify({ registrationId, amount }),
        }),

    confirm: (registrationId: string, paymentIntentId: string) =>
        fetchApi<{
            confirmationNumber: string;
            status: string;
            demo?: boolean;
        }>('/payments/confirm', {
            method: 'POST',
            body: JSON.stringify({ registrationId, paymentIntentId }),
        }),

    getConfig: () =>
        fetchApi<{
            publishableKey: string;
            demo: boolean;
        }>('/payments/config'),
};

// === REVIEWS API ===
export const reviewsApi = {
    getAll: () => fetchApi<any[]>('/reviews'),

    getFeatured: () => fetchApi<any[]>('/reviews/featured'),

    submit: (data: {
        attendeeName: string;
        attendeeCredential: string;
        rating: number;
        reviewText: string;
        eventId?: string;
    }) =>
        fetchApi<{ id: string }>('/reviews', {
            method: 'POST',
            body: JSON.stringify(data),
        }),
};

// Export all APIs
export const api = {
    dentists: dentistsApi,
    events: eventsApi,
    registrations: registrationsApi,
    payments: paymentsApi,
    reviews: reviewsApi,
};

export default api;
