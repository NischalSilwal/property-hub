import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

interface ValidationSchemas {
    body?: ZodSchema;
    params?: ZodSchema;
    query?: ZodSchema;
}

export const validate = (schemas: ValidationSchemas) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        try {
            if (schemas.body) {
                req.body = schemas.body.parse(req.body);
            }
            if (schemas.params) {
                req.params = schemas.params.parse(req.params) as any;
            }
            if (schemas.query) {
                req.query = schemas.query.parse(req.query) as any;
            }
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const message = error.issues.map(e => e.message).join(', ');
                res.status(400).json({ error: message });
                return;
            }
            next(error);
        }
    };
};
