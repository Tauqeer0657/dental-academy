// Admin API service

const ADMIN_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

interface AdminStats {
    totalRegistrations: number;
    paidRegistrations: number;
    pendingRegistrations: number;
    totalRevenue: number;
    recentRegistrations: Array<{
        fullName: string;
        email: string;
        pricingTotal?: number;
        paymentStatus: string;
        createdAt: string;
    }>;
    conversionRate: number;
}

interface Registration {
    _id: string;
    confirmationNumber: string;
    fullName: string;
    email: string;
    phone: string;
    country: string;
    profession: string;
    accommodationType: string;
    paymentStatus: string;
    pricingBreakdown: {
        basePrice: number;
        total: number;
    };
    createdAt: string;
}

interface PaginatedResponse<T> {
    success: boolean;
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}

async function fetchAdmin<T>(endpoint: string, options: RequestInit = {}): Promise<{ success: boolean; data?: T; error?: string }> {
    const response = await fetch(`${ADMIN_API_URL}/admin${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });
    return response.json();
}

export const adminApi = {
    getStats: () => fetchAdmin<AdminStats>('/stats'),

    getRegistrations: (params?: { page?: number; limit?: number; status?: string; search?: string }) => {
        const query = new URLSearchParams();
        if (params?.page) query.append('page', String(params.page));
        if (params?.limit) query.append('limit', String(params.limit));
        if (params?.status) query.append('status', params.status);
        if (params?.search) query.append('search', params.search);
        return fetchAdmin<Registration[]>(`/registrations?${query.toString()}`) as Promise<PaginatedResponse<Registration>>;
    },

    getRegistration: (id: string) => fetchAdmin<Registration>(`/registrations/${id}`),

    updateRegistration: (id: string, data: Partial<Registration>) =>
        fetchAdmin<Registration>(`/registrations/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
        }),

    exportCsv: () => `${ADMIN_API_URL}/admin/export`,
};
