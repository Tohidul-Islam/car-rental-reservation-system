/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import httpStatus from 'http-status';

interface TResponseOptions {
  success: boolean;
  statusCode: number;
  message: string;
  data: any;
}

export const noDataFoundResponse = (
  res: Response,
  options: TResponseOptions
) => {
  const { success, statusCode, message, data } = options;
  res.status(statusCode).json({
    success,
    statusCode,
    message,
    data,
  });
};

export const NotDataFoundResponse = (res: Response) => {
  noDataFoundResponse(res, {
    success: false,
    statusCode: httpStatus.NOT_FOUND,
    message: 'No Data Found',
    data: [],
  });
};
