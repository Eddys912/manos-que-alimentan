import { Router } from 'express';
import routerUser from './userRoutes';
import routerFood from './foodRoutes';

const router = Router();

router.use('/users', routerUser);
router.use('/foods', routerFood);

export default router;
