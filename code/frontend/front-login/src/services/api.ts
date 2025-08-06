import { LoginData, RegisterData, User } from '@/types';
import { API_ENDPOINTS } from '@/config/api';

class ApiService {
    private async makeRequest<T>(
        url: string,
        options: RequestInit = {}
    ): Promise<T> {
        const token = localStorage.getItem('token');

        const defaultOptions: RequestInit = {
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` }),
            },
        };

        const response = await fetch(url, {
            ...defaultOptions,
            ...options,
            headers: {
                ...defaultOptions.headers,
                ...options.headers,
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Erreur réseau' }));
            throw new Error(errorData.message || `HTTP Error: ${response.status}`);
        }

        return response.json();
    }

    async login(credentials: LoginData): Promise<{ user: User; token: string }> {
        return this.makeRequest(API_ENDPOINTS.LOGIN, {
            method: 'POST',
            body: JSON.stringify(credentials),
        });
    }

    async register(userData: RegisterData): Promise<{ user: User; token: string }> {
        return this.makeRequest(API_ENDPOINTS.REGISTER, {
            method: 'POST',
            body: JSON.stringify(userData),
        });
    }

    async getCurrentUser(): Promise<User> {
        return this.makeRequest(API_ENDPOINTS.ME, {
            method: 'GET',
        });
    }

    async refreshToken(): Promise<{ token: string }> {
        return this.makeRequest(API_ENDPOINTS.REFRESH, {
            method: 'POST',
        });
    }
}

export const apiService = new ApiService();
