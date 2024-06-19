/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export interface TBooking {
  date: string;
  user: Types.ObjectId;
  car: Types.ObjectId;
  startTime: string;
  endTime?: string | null;
  totalCost: number;
}

export interface CreateBookingData {
  carId: string;
  date: string;
  startTime: string;
  endTime?: string | null;
  userId: string;
  totalCost: number;
}

export interface BookingModel extends Model<TBooking> {
  isUserExists(email: string): Promise<TBooking | null>;
}
