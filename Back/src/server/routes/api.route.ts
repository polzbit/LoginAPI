import { Router } from 'express';
import userRouter from './user.route';

let apiRouter = Router();

apiRouter.use('/users', userRouter);

export default apiRouter;
