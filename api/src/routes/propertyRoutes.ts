import { Router } from 'express';
import { propertyController } from '../controllers/propertyController';
import { optionalAuthenticate, authenticate } from '../middleware/authMiddleware';

const router = Router();

router.post('/', authenticate, propertyController.create);
router.get('/', optionalAuthenticate, propertyController.getAll);
router.get('/:id', propertyController.getById);
router.delete('/:id', propertyController.delete);

export default router;
