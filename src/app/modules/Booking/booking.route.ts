import express from 'express';
import { USER_ROLE } from '../User/user.constant';
import auth from '../../middlewires/auth';
import validateRequest from '../../middlewires/validRequest';
import { bookingValidation } from './booking.validation';
import { BookingControllers } from './booking.controller';

const router = express.Router();

router.post(
  '/create-booking',
  auth(USER_ROLE.user),
  validateRequest(bookingValidation.createBookingValidationSchema),
  BookingControllers.createABooking
);

router.get('/', auth(USER_ROLE.admin), BookingControllers.getAllBookings);

router.get(
  '/my-bookings',
  auth(USER_ROLE.user),
  BookingControllers.getMyBookings
);

router.put(
  '/return',
  auth(USER_ROLE.admin),
  validateRequest(bookingValidation.returnCarValidationSchema),
  BookingControllers.returnACar
);

export const BookingRoutes = router;
