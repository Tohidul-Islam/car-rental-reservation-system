import { Router } from 'express';
import { UserRoutes } from '../User/user.route';
import { BookingRoutes } from '../Booking/booking.route';
import { CarRoutes } from '../Car/car.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/cars',
    route: CarRoutes,
  },
  {
    path: '/bookings',
    route: BookingRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
