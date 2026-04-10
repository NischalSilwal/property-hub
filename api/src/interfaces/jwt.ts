export interface JwtPayload {
    id: number;
    email: string;
}

export interface TokenPair {
    accessToken: string;
    refreshToken: string;
}