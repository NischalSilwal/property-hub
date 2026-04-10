import { z } from 'zod';

export const registerSchema = z.object({
    name: z
        .string()
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name must be at most 100 characters'),
    email: z
        .email('Invalid email format'),
    password: z
        .string()
        .min(6, 'Password must be at least 6 characters')
        .max(100, 'Password must be at most 100 characters')
        .regex(/[A-Z]/, 'Password must contain at least one capital letter')
        .regex(/[0-9]/, 'Password must contain at least one number')
        .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
});

export const loginSchema = z.object({
    email: z
        .email('Invalid email format'),
    password: z
        .string()
        .min(1, 'Password is required'),
});

export const refreshTokenSchema = z.object({
    refreshToken: z
        .string()
        .min(1, 'Refresh token is required'),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;
