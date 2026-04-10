import { Router } from 'express';
import { favoriteController } from '../controllers/favoriteController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.get('/', authenticate, favoriteController.getAll);
router.post('/toggle', authenticate, favoriteController.toggle);
router.get('/:propertyId/check', authenticate, favoriteController.check);

export default router;
