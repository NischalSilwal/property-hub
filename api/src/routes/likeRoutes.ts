import { Router } from 'express';
import { likeController } from '../controllers/likeController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.post('/', authenticate, likeController.toggle);
router.get('/user', authenticate, likeController.getByUser);
router.get('/property/:propertyId', likeController.getByProperty);
router.get('/:propertyId/check', authenticate, likeController.check);

export default router;
