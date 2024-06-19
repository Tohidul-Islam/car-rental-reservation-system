import express from 'express';
import { RegisterAndLoginUserValidation } from './user.validation';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewires/validRequest';

const router = express.Router();

router.post(
  '/sign-up',
  validateRequest(RegisterAndLoginUserValidation.registerUserValidationSchema),
  UserControllers.registerUser
);

router.post(
  '/sign-in',
  validateRequest(RegisterAndLoginUserValidation.loginUserValidationSchema),
  UserControllers.loginUser
);

export const UserRoutes = router;
