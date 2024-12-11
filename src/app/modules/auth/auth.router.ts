import { Router } from 'express';
import { authController } from './auth.controller';
import { validationHandler } from '../../middleware/validationHandler';
import { registerSchema } from './auth.validation';

export const authRouter = Router();

authRouter.post(
  '/',
  validationHandler(registerSchema),
  authController.registerUser,
);
authRouter.post('/login', authController.loginUser);
authRouter.post('/logout', authController.logoutUser);
