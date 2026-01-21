// Auth API service

const AUTH_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

interface LoginResponse {
    success: boolean;
    data?: {
        token: string;
        user: { username: string; role: string };
        expiresIn: string;
    };
    error?: string;
}

interface VerifyResponse {
    success: boolean;
    data?: {
        user: { username: string; role: string };
        valid: boolean;
    };
    error?: string;
}

export const authApi = {
    login: async (username: string, password: string): Promise<LoginResponse> => {
        const response = await fetch(`${AUTH_API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        return response.json();
    },

    verify: async (token: string): Promise<VerifyResponse> => {
        const response = await fetch(`${AUTH_API_URL}/auth/verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.json();
    },

    getToken: (): string | null => {
        return localStorage.getItem('admin_token');
    },

    setToken: (token: string): void => {
        localStorage.setItem('admin_token', token);
    },

    removeToken: (): void => {
        localStorage.removeItem('admin_token');
    },

    isAuthenticated: (): boolean => {
        return !!localStorage.getItem('admin_token');
    },

    logout: (): void => {
        localStorage.removeItem('admin_token');
        window.location.href = '/admin/login';
    },
};
