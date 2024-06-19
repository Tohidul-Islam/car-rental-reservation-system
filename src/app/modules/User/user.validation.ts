import { z } from 'zod';

const registerUserValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    role: z.union([z.literal('user'), z.literal('admin')]),
    password: z.string(),
    phone: z.string(),
    address: z.string(),
    createdAt: z.optional(z.date()),
    updatedAt: z.optional(z.date()),
  }),
});

const loginUserValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

export const RegisterAndLoginUserValidation = {
  registerUserValidationSchema,
  loginUserValidationSchema,
};
