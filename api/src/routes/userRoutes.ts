import { Router } from 'express';
import { authController } from '../controllers/authController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.get('/me', authenticate, authController.getMe);

export default router;
