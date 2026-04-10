import { Request, Response, NextFunction } from 'express';
import { AuthService, AuthError } from '../services/authService';
import { registerSchema, loginSchema, refreshTokenSchema } from '../validations/auth';
import { validate } from '../middleware/validate';

const authService = new AuthService();

export class AuthController {
    register = [
        validate({ body: registerSchema }),
        async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            try {
                const result = await authService.register(req.body);
                res.status(201).json(result);
            } catch (error) {
                next(error);
            }
        },
    ];

    login = [
        validate({ body: loginSchema }),
        async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            try {
                const result = await authService.login(req.body);
                res.status(200).json(result);
            } catch (error) {
                next(error);
            }
        },
    ];

    refreshToken = [
        validate({ body: refreshTokenSchema }),
        async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            try {
                const result = await authService.refreshToken(req.body.refreshToken);
                res.status(200).json(result);
            } catch (error) {
                next(error);
            }
        },
    ];

    getMe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user = await authService.getMe(req.user!.id);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    };
}

export const authController = new AuthController();
