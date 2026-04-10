import { Router } from 'express';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';

const router = Router();

//auth routes
router.use('/auth', authRoutes);

//user routes
router.use('/user', userRoutes);

// Health check
router.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default router;