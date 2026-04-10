import { tokenService } from './tokenService';

const API_BASE_URL = 'http://localhost:3000/api';

class ApiService {
    private getHeaders(): HeadersInit {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };
        const token = tokenService.getAccessToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        return headers;
    }

    private async handleResponse<T>(response: Response): Promise<T> {
        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: 'An error occurred' }));
            throw new Error(error.error || error.message || `${response.status}`);
        }
        return response.json();
    }

    private async request<T>(
        endpoint: string,
        method: string,
        data?: unknown,
        isRetry = false
    ): Promise<T> {
        console.log(`[ApiService] ${method} ${endpoint} (retry: ${isRetry})`);

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method,
            headers: this.getHeaders(),
            body: data ? JSON.stringify(data) : undefined,
            credentials: 'include',
        });

        console.log(`[ApiService] Response status: ${response.status}`);

        if (response.status === 401 && !isRetry) {
            const refreshToken = tokenService.getRefreshToken();
            console.log(`[ApiService] 401 received, has refresh token: ${!!refreshToken}`);

            if (refreshToken) {
                try {
                    const newToken = await tokenService.refreshAccessToken();
                    console.log(`[ApiService] Token refreshed, new token: ${newToken ? 'yes' : 'no'}`);
                    return this.request<T>(endpoint, method, data, true);
                } catch (err) {
                    console.error('[ApiService] Token refresh failed:', err);
                    tokenService.clearTokens();
                    window.location.href = '/login';
                    throw new Error('Session expired');
                }
            }
        }

        return this.handleResponse<T>(response);
    }

    async get<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, 'GET');
    }

    async post<T>(endpoint: string, data?: unknown): Promise<T> {
        return this.request<T>(endpoint, 'POST', data);
    }

    async delete(endpoint: string): Promise<void> {
        await this.request(endpoint, 'DELETE');
    }
}

export const api = new ApiService();
