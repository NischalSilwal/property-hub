import { Request, Response, NextFunction } from 'express';
import { favoriteRepository, propertyRepository } from '../repositories';

export class FavoriteController {
    getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.user!.id;
            const favorites = await favoriteRepository.findByUser(userId);
            
            if (favorites.length === 0) {
                res.json([]);
                return;
            }

            const propertyIds = favorites.map(f => f.propertyId);
            const allProperties = await propertyRepository.findAll();
            const favoritedProperties = allProperties.filter(p => 
                propertyIds.includes(p.id)
            );

            const result = favoritedProperties.map(p => ({
                ...p,
                isFavorited: true
            }));

            res.json(result);
        } catch (error) {
            next(error);
        }
    };

    toggle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.user!.id;
            const { propertyId } = req.body;

            const property = await propertyRepository.findById(propertyId);
            if (!property) {
                res.status(404).json({ error: 'Property not found' });
                return;
            }

            const existing = await favoriteRepository.findByUserAndProperty(userId, propertyId);
            
            if (existing) {
                await favoriteRepository.setActive(userId, propertyId, !existing.isActive);
                res.json({ isFavorited: !existing.isActive });
            } else {
                await favoriteRepository.create(userId, propertyId);
                res.json({ isFavorited: true });
            }
        } catch (error) {
            next(error);
        }
    };

    check = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req.user!.id;
            const { propertyId } = req.params;

            const exists = await favoriteRepository.exists(userId, Number(propertyId));
            res.json({ isFavorited: exists });
        } catch (error) {
            next(error);
        }
    };
}

export const favoriteController = new FavoriteController();
