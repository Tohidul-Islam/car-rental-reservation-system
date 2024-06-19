import { FilterQuery, Types } from 'mongoose';
import { CreateBookingData, TBooking } from './booking.interface';
import { Booking } from './booking.model';
import { Car } from '../Car/car.model';
import { User } from '../User/user.model';

// Creating booking Into DB (user only)
const createBookingIntoDB = async (bookingData: CreateBookingData) => {
  const { carId, userId, date, startTime, endTime, totalCost } = bookingData;

  const car = await Car.findOne({ _id: carId, status: 'available' });
  if (!car) {
    throw new Error('Car not found or not available');
  }

  const newBookingData: Partial<TBooking> = {
    date,
    startTime,
    endTime,
    car: new Types.ObjectId(carId),
    user: new Types.ObjectId(userId),
    totalCost,
  };

  const booking = await Booking.create(newBookingData);

  await Car.findByIdAndUpdate(carId, { status: 'unavailable' });

  const populatedBooking = await Booking.findById(booking._id)
    .populate('user')
    .populate('car')
    .exec();

  if (!populatedBooking) {
    throw new Error('Failed to get booking data');
  }

  return populatedBooking;
};

// Get all bookings from DB by admin
const getAllBookingFromDB = async (searchTerm: FilterQuery<TBooking>) => {
  const result = await Booking.find(searchTerm)
    .populate('user')
    .populate('car');

  return result;
};

// Get bookings for a specific user
const getMyBookingFromDB = async (payLoad: { email: string }) => {
  const user = await User.findOne({ email: payLoad.email });

  if (!user) {
    throw new Error('User not found');
  }

  const result = await Booking.find({ user: user._id })
    .populate('user')
    .populate('car');

  return result;
};

// Return a car and update the booking and car status
const returnCarToDB = async (bookingId: string, endTime: string) => {
  if (!Types.ObjectId.isValid(bookingId)) {
    throw new Error('Invalid Booking ID');
  }

  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new Error('Booking not found');
  }

  if (booking.endTime) {
    throw new Error('Car is already returned');
  }

  if (!Types.ObjectId.isValid(booking.car.toString())) {
    throw new Error('Invalid Car ID');
  }

  const car = await Car.findById(booking.car);

  if (!car) {
    throw new Error('Car not found');
  }

  const startTime = booking.startTime;

  booking.endTime = endTime;

  const start = new Date(`1970-01-01T${startTime}:00Z`).getTime();
  const end = new Date(`1970-01-01T${endTime}:00Z`).getTime();
  const durationInHours = (end - start) / (1000 * 60 * 60);
  booking.totalCost = durationInHours * car.pricePerHour;

  console.log(
    'start time',
    { start },
    startTime,
    endTime,
    'end Time',
    { end },
    'durationInHours',
    { durationInHours },
    'booking total cost',
    booking.totalCost,
    'car price per hour',
    car.pricePerHour
  );

  await booking.save();

  const updatedCar = await Car.findByIdAndUpdate(
    booking.car,
    { status: 'available' },
    { new: true }
  );

  if (!updatedCar) {
    throw new Error('you can not update car');
  }

  const populatedBooking = await Booking.findById(booking._id)
    .populate('user')
    .populate('car')
    .exec();

  if (!populatedBooking) {
    throw new Error('Failed to get booking data');
  }

  return populatedBooking;
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingFromDB,
  getMyBookingFromDB,
  returnCarToDB,
};
