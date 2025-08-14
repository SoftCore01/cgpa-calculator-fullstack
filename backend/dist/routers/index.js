import Router from 'express';
import authRouter from './authRoutes.js';
import dataRouter from './dataRoutes.js';
const router = Router();
router.use('/api', authRouter, dataRouter);
export default router;
