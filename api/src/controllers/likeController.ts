import { Request, Response, NextFunction } from 'express';
import { likeRepository, propertyRepository } from '../repositories';
import { AuthError } from '../services/authService';

export class LikeController {
    toggle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.user!.id;
            const { propertyId } = req.body;

            const property = await propertyRepository.findById(propertyId);
            if (!property) {
                throw new AuthError('Property not found', 404);
            }

            const exists = await likeRepository.exists(userId, propertyId);
            if (exists) {
                await likeRepository.delete(userId, propertyId);
                const count = await likeRepository.countByProperty(propertyId);
                res.json({ isLiked: false, likeCount: count });
            } else {
                await likeRepository.create(userId, propertyId);
                const count = await likeRepository.countByProperty(propertyId);
                res.json({ isLiked: true, likeCount: count });
            }
        } catch (error) {
            next(error);
        }
    };

    getByProperty = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { propertyId } = req.params;
            const likes = await likeRepository.findByProperty(Number(propertyId));
            res.json(likes);
        } catch (error) {
            next(error);
        }
    };

    getByUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.user!.id;
            const likes = await likeRepository.findByUser(userId);
            res.json(likes);
        } catch (error) {
            next(error);
        }
    };

    check = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.user!.id;
            const { propertyId } = req.params;

            const exists = await likeRepository.exists(userId, Number(propertyId));
            const count = await likeRepository.countByProperty(Number(propertyId));
            res.json({ isLiked: exists, likeCount: count });
        } catch (error) {
            next(error);
        }
    };
}

export const likeController = new LikeController();
