import { userRepository } from '../repositories/UserRepository';
import { hashPassword, comparePassword } from '../utils/password';
import { generateTokenPair, verifyRefreshToken } from '../utils/jwt';
import { RegisterInput, LoginInput } from '../validations/auth';

export class AuthError extends Error {
    constructor(message: string, public statusCode: number = 400) {
        super(message);
        this.name = 'AuthError';
    }
}

export class AuthService {
    async register(data: RegisterInput) {
        const emailExists = await userRepository.existsByEmail(data.email);
        if (emailExists) {
            throw new AuthError('Email already registered', 409);
        }

        const passwordHash = await hashPassword(data.password);

        const userId = await userRepository.create(
            data.name,
            data.email,
            passwordHash
        );

        const user = await userRepository.findById(userId);
        if (!user) {
            throw new AuthError('Failed to create user', 500);
        }

        const tokens = generateTokenPair({
            id: user.id,
            email: user.email,
        });

        return {
            user,
            tokens,
        };
    }

    async login(data: LoginInput) {
        const user = await userRepository.findByEmail(data.email);
        if (!user) {
            throw new AuthError('Invalid email or password', 401);
        }

        const isPasswordValid = await comparePassword(data.password, user.passwordHash);
        if (!isPasswordValid) {
            throw new AuthError('Invalid email or password', 401);
        }

        const tokens = generateTokenPair({
            id: user.id,
            email: user.email,
        });

        const { passwordHash, ...userPublic } = user;

        return {
            user: userPublic,
            tokens,
        };
    }

    async refreshToken(refreshToken: string) {
        try {
            const payload = verifyRefreshToken(refreshToken);

            const user = await userRepository.findById(payload.id);
            if (!user) {
                throw new AuthError('User not found', 401);
            }

            const tokens = generateTokenPair({
                id: user.id,
                email: user.email,
            });

            return {
                user,
                tokens,
            };
        } catch (error) {
            if (error instanceof AuthError) throw error;
            throw new AuthError('Invalid or expired refresh token', 401);
        }
    }

    async getMe(userId: number) {
        const user = await userRepository.findById(userId);
        if (!user) {
            throw new AuthError('User not found', 404);
        }
        return user;
    }
}
