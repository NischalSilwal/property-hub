import { Router } from 'express';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import propertyRoutes from './propertyRoutes';
import favoriteRoutes from './favoriteRoutes';
import likeRoutes from './likeRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/properties', propertyRoutes);
router.use('/favorites', favoriteRoutes);
router.use('/likes', likeRoutes);

router.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default router;
