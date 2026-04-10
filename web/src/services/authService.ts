import type { AuthResponse, LoginInput, RegisterInput, RegisterResponse, User } from '../interfaces';
import { api } from './api';
import { tokenService } from './tokenService';


class AuthService {
    async login(data: LoginInput): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>('/auth/login', data);
        tokenService.setTokens(response.tokens.accessToken, response.tokens.refreshToken);
        return response;
    }

    async register(data: RegisterInput): Promise<RegisterResponse> {
        return api.post<RegisterResponse>('/auth/register', data);
    }

    async getMe(): Promise<User> {
        return api.get<User>('/user/me');
    }

    logout(): void {
        tokenService.clearTokens();
    }

    isAuthenticated(): boolean {
        return !!tokenService.getAccessToken();
    }
}

export const authService = new AuthService();
