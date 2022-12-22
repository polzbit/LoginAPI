import { Router } from 'express';
import { validate } from 'express-validation';
import { UserController } from '../controllers';
import { userValidation, options } from '../validations';

let userRouter = Router({ mergeParams: true });

userRouter.get('/validate', UserController.validate);
userRouter.get('/validate-reset/:token', UserController.validateResetToken);
userRouter.patch('/validate-email/:token', UserController.validateEmailToken);

userRouter.post(
  '/login',
  validate(userValidation.login, options),
  UserController.login,
);

userRouter.post(
  '/register',
  validate(userValidation.register, options),
  UserController.register,
);

userRouter.post(
  '/forgot-password',
  validate(userValidation.forgotPassword, options),
  UserController.forgotPassword,
);

userRouter.patch(
  '/reset-password',
  validate(userValidation.resetPassword, options),
  UserController.resetPassword,
);

export default userRouter;
