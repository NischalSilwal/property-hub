import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export class AppError extends Error {
    constructor(
        message: string,
        public statusCode: number = 500
    ) {
        super(message);
        this.name = 'AppError';
    }
}

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    // Handle Zod validation errors
    if (err instanceof ZodError) {
        const message = err.issues.map(e => e.message).join(', ');
        res.status(400).json({ error: message });
        return;
    }

    // Handle custom AppError
    if (err instanceof AppError) {
        res.status(err.statusCode).json({ error: err.message });
        return;
    }

    // Handle errors with statusCode property (from services)
    if ('statusCode' in err && typeof err.statusCode === 'number') {
        res.status(err.statusCode).json({ error: err.message });
        return;
    }

    // Handle MySQL duplicate entry error
    if (err.message.includes('ER_DUP_ENTRY')) {
        res.status(409).json({ error: 'Duplicate entry' });
        return;
    }

    // Handle unexpected errors
    console.error('Unexpected error:', err);
    res.status(500).json({ error: 'Internal server error' });
};