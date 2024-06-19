import httpStatus from 'http-status';
import AppError from '../../errors/appErrors';
import { Booking } from '../Booking/booking.model';
import { TCar } from './car.interface';
import { Car } from './car.model';

const createCarIntoDB = async (carData: TCar) => {
  const result = await Car.create(carData);

  return result;
};

const getAllCarFromDB = async () => {
  const result = await Car.find({ isDeleted: false });

  return result;
};

const getSingleCarFromDB = async (id: string) => {
  const result = await Car.findById(id);

  return result;
};

const updateACarFromDB = async (id: string, updatedData: Partial<TCar>) => {
  const options = { new: true };
  const result = await Car.findByIdAndUpdate(id, updatedData, options);

  return result;
};

const deleteCarFromDB = async (id: string) => {
  const result = await Car.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    }
  );

  return result;
};

const returnTheCarFromUser = async (
  bookingId: string,
  endTime: string
): Promise<object> => {
  try {
    const booking = await Booking.findById(bookingId)
      .populate('car')
      .populate('user');

    if (!booking) {
      throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');
    }

    const car = booking.car as unknown as TCar;

    if (!car || !car._id || !car.pricePerHour) {
      throw new Error('Car details not found');
    }

    booking.endTime = endTime;

    if (
      new Date(`1970-01-01T${endTime}:00Z`) >=
      new Date(`1970-01-01T${booking.startTime}:00Z`)
    ) {
      throw new Error('The end time must be less than the start time');
    }

    const startDate = new Date(`1970-01-01T${booking.startTime}:00Z`);
    const endDate = new Date(`1970-01-01T${endTime}:00Z`);
    const durationInHours =
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
    booking.totalCost = durationInHours * car.pricePerHour;

    await booking.save();

    const carToUpdate = await Car.findById(car._id);

    if (!carToUpdate) {
      throw new Error('Car not found for status update');
    }

    // Set car status to 'available' and save
    carToUpdate.status = 'available';
    await carToUpdate.save();

    return booking.toObject();
  } catch (error) {
    throw new Error(`Error returning car: ${error}`);
  }
};

export const CarServices = {
  createCarIntoDB,
  getAllCarFromDB,
  getSingleCarFromDB,
  updateACarFromDB,
  deleteCarFromDB,
  returnTheCarFromUser,
};
