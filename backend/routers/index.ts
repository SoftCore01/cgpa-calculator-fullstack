import Router from 'express';
import authRouter from './authRoutes.js'
import semesterRouter from './semesterRoutes.js'


const router = Router();

router.use('/api',authRouter, semesterRouter);

export default router;