import express from 'express';
import { CarControllers } from './car.controller';
import { USER_ROLE } from '../User/user.constant';
import auth from '../../middlewires/auth';
import validateRequest from '../../middlewires/validRequest';
import { CarValidation } from './car.validation';

const router = express.Router();

router.post(
  '/create-car',
  auth(USER_ROLE.admin),
  validateRequest(CarValidation.createCarSchemaValidation),
  CarControllers.createCar
);

router.get('/', CarControllers.getAllCars);

router.get('/:id', CarControllers.getSingleCar);

router.put(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(CarValidation.updateCarSchemaValidation),
  CarControllers.updateACar
);

router.delete('/:id', auth(USER_ROLE.admin), CarControllers.deleteACar);

export const CarRoutes = router;
