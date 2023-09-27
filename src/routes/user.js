import { Router } from 'express';
import { signUp, signIn } from '../controllers/user';

const userRouter = Router();

userRouter.post('/signup', signUp);
userRouter.post('/signin', signIn);

export default userRouter;
