import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt';

export const authenticate = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ error: 'Access token required' });
            return;
        }

        const token = authHeader.split(' ')[1];
        const payload = verifyAccessToken(token);

        req.user = {
            id: payload.id,
            email: payload.email,
        };

        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid or expired access token' });
    }
};

export const optionalAuthenticate = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {
        const authHeader = req.headers.authorization;

        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];
            const payload = verifyAccessToken(token);

            req.user = {
                id: payload.id,
                email: payload.email,
            };
        }

        next();
    } catch (error) {
        next();
    }
};
