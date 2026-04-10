const API_BASE_URL = 'http://localhost:3000/api';

class TokenService {
    private refreshPromise: Promise<string> | null = null;

    getAccessToken(): string | null {
        return localStorage.getItem('accessToken');
    }

    getRefreshToken(): string | null {
        return localStorage.getItem('refreshToken');
    }

    setTokens(accessToken: string, refreshToken: string): void {
        console.log('[TokenService] Setting tokens');
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
    }

    clearTokens(): void {
        console.log('[TokenService] Clearing tokens');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    }

    async refreshAccessToken(): Promise<string> {
        console.log('[TokenService] refreshAccessToken called');

        if (this.refreshPromise) {
            console.log('[TokenService] Returning existing refresh promise');
            return this.refreshPromise;
        }

        const refreshToken = this.getRefreshToken();
        console.log(`[TokenService] Got refresh token: ${refreshToken ? 'yes' : 'no'}`);

        if (!refreshToken) {
            this.clearTokens();
            throw new Error('No refresh token available');
        }

        this.refreshPromise = this.doRefresh(refreshToken);

        try {
            const newAccessToken = await this.refreshPromise;
            return newAccessToken;
        } finally {
            this.refreshPromise = null;
        }
    }

    private async doRefresh(refreshToken: string): Promise<string> {
        console.log('[TokenService] Calling /auth/refresh-token endpoint');

        const response = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken }),
            credentials: 'include',
        });

        console.log(`[TokenService] Refresh response status: ${response.status}`);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
            console.error('[TokenService] Refresh failed:', errorData);
            this.clearTokens();
            window.location.href = '/login';
            throw new Error('Failed to refresh token');
        }

        const data = await response.json();
        console.log('[TokenService] Refresh success, new tokens received');
        this.setTokens(data.tokens.accessToken, data.tokens.refreshToken);
        return data.tokens.accessToken;
    }
}

export const tokenService = new TokenService();
