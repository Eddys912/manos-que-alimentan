import { Router } from 'express';
import routerUser from './userRoutes';
import routerFood from './foodRoutes';
import routerAuth from './authRouters';

const router = Router();

router.use('/users', routerUser);
router.use('/auth', routerAuth);
router.use('/foods', routerFood);

export default router;
