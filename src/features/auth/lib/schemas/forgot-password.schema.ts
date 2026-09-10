import * as z from 'zod';

import { createRegisterSchema } from './register.schema';

type IValidationTranslator = (key: string) => string;

export const createForgotPasswordSchema = (t: IValidationTranslator) => {
  const registerSchema = createRegisterSchema(t);

  return z.object({
    email: registerSchema.shape.email,
  });
};

export const createResetPasswordSchema = (t: IValidationTranslator) => {
  const registerSchema = createRegisterSchema(t);

  return z
    .object({
      password: registerSchema.shape.password,
      confirmPassword: registerSchema.shape.confirmPassword,
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('passwordsMismatch'),
      path: ['confirmPassword'],
    });
};
