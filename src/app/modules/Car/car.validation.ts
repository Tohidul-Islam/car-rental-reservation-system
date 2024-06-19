import { z } from 'zod';

const createCarSchemaValidation = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().min(1, 'Description is required'),
    color: z.string().min(1, 'Color is required'),
    isElectric: z.boolean(),
    features: z
      .array(z.string())
      .nonempty('Features must contain at least one item'),
    pricePerHour: z
      .number()
      .positive('Price per hour must be a positive number'),
  }),
});

const updateCarSchemaValidation = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required').optional(),
    description: z.string().min(1, 'Description is required').optional(),
    color: z.string().min(1, 'Color is required').optional(),
    isElectric: z.boolean().optional(),
    features: z
      .array(z.string())
      .nonempty('Features must contain at least one item')
      .optional(),
    pricePerHour: z
      .number()
      .positive('Price per hour must be a positive number')
      .optional(),
  }),
});

const returnCarSchemaValidation = z.object({
  body: z.object({
    bookingId: z.string(),
    endTime: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
  }),
});

export const CarValidation = {
  createCarSchemaValidation,
  returnCarSchemaValidation,
  updateCarSchemaValidation,
};
