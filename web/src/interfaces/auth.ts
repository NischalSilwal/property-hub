export interface User {
    id: number;
    name: string;
    email: string;
    created_at: Date;
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

export interface AuthResponse {
    user: User;
    tokens: AuthTokens;
}

export interface LoginInput {
    email: string;
    password: string;
}

export interface RegisterInput {
    name: string;
    email: string;
    password: string;
}

export interface RegisterResponse {
    message: string;
}

export interface Property {
    id: number;
    title: string;
    location: string;
    price: number;
    bedrooms?: number;
    bathrooms?: number;
    sqft?: number;
    description?: string;
    like_count: number;
    is_liked: boolean;
    is_favourited: boolean;
    created_at: Date;
    updated_at: Date;
}

export interface LikeResponse {
    isLiked: boolean;
    likeCount: number;
}

export interface FavoriteResponse {
    isFavourited: boolean;
}

export interface SignupFormData {
    name: string;
    email: string;
    password: string;
}

export interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    fetchUser: () => Promise<void>;
}