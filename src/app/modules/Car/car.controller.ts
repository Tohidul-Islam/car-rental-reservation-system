import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CarServices } from './car.service';
import { NotDataFoundResponse } from '../../utils/dataNotFoundAndTheResponse';

const createCar = catchAsync(async (req, res) => {
  const result = await CarServices.createCarIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Car created successfully!',
    data: result,
  });
});

const getAllCars = catchAsync(async (req, res) => {
  const result = await CarServices.getAllCarFromDB();

  if (!result || result.length === 0) {
    return NotDataFoundResponse(res);
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All Cars retrieved successfully!',
    data: result,
  });
});

const getSingleCar = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CarServices.getSingleCarFromDB(id);

  if (!result) {
    return NotDataFoundResponse(res);
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: ' Car retrieved successfully!',
    data: result,
  });
});

const updateACar = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const result = await CarServices.updateACarFromDB(id, updatedData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Car updated successfully!',
    data: result,
  });
});

const deleteACar = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CarServices.deleteCarFromDB(id);

  if (!result || result === null) {
    return res.status(404).json({
      success: false,
      message: 'Car not exist with this id',
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Car deleted successfully!',
    data: result,
  });
});

const returnACar = catchAsync(async (req, res) => {
  const { bookingId, endTime } = req.body;

  const result = await CarServices.returnTheCarFromUser(bookingId, endTime);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Car returned successfully',
    data: result,
  });
});

export const CarControllers = {
  createCar,
  getAllCars,
  getSingleCar,
  updateACar,
  deleteACar,
  returnACar,
};
