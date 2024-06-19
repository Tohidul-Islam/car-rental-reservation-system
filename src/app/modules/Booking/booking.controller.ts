import { Request, Response } from 'express';
import { BookingServices } from './booking.service';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FilterQuery } from 'mongoose';
import { TBooking } from './booking.interface';
import { NotDataFoundResponse } from '../../utils/dataNotFoundAndTheResponse';

// Create a booking by user
const createABooking = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    return res.status(400).json({ message: 'User not found in request' });
  }

  const { carId, date, startTime, endTime, totalCost } = req.body;

  const bookingData = {
    date,
    startTime,
    endTime,
    userId: user._id,
    carId,
    totalCost,
  };

  const result = await BookingServices.createBookingIntoDB(bookingData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Car booked successfully!',
    data: result,
  });
});

// Get all bookings by the admin
const getAllBookings = catchAsync(async (req, res) => {
  const searchTerm: FilterQuery<TBooking> = {};

  if (req.query.carId) {
    searchTerm.car = req.query.carId as string;
  }

  if (req.query.date) {
    searchTerm.date = req.query.date as string;
  }

  const result = await BookingServices.getAllBookingFromDB(searchTerm);

  if (!result || result.length === 0) {
    return NotDataFoundResponse(res);
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All Bookings retrieved successfully!',
    data: result,
  });
});

// Get my bookings for just user
const getMyBookings = catchAsync(async (req, res) => {
  const user = req.user;

  const result = await BookingServices.getMyBookingFromDB({
    email: user.email,
  });

  if (!result || result.length === 0) {
    return NotDataFoundResponse(res);
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'My Bookings retrieved successfully!',
    data: result,
  });
});

// Return a car by admin
const returnACar = catchAsync(async (req: Request, res: Response) => {
  const { bookingId, endTime } = req.body;

  const result = await BookingServices.returnCarToDB(bookingId, endTime);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Car returned successfully!',
    data: result,
  });
});

export const BookingControllers = {
  createABooking,
  getAllBookings,
  getMyBookings,
  returnACar,
};
