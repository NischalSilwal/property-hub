import { Request, Response, NextFunction } from 'express';
import { propertyRepository } from '../repositories';
import { AuthError } from '../services/authService';

export class PropertyController {
    getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.user?.id;
            const properties = await propertyRepository.findAllWithCounts(userId);
            res.json(properties);
        } catch (error) {
            next(error);
        }
    };

    getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const property = await propertyRepository.findByIdWithCounts(Number(id), req.user?.id);
            if (!property) {
                throw new AuthError('Property not found', 404);
            }
            res.json(property);
        } catch (error) {
            next(error);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const deleted = await propertyRepository.delete(Number(id));
            if (!deleted) {
                throw new AuthError('Property not found', 404);
            }
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    };
}

export const propertyController = new PropertyController();
