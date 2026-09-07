import * as z from 'zod';

import { createRegisterSchema } from '@/features/auth/lib/schemas/register.schema';

/** Translator scoped to the `auth.register.validation` namespace. */
type IValidationTranslator = (key: string) => string;

export const createChangePasswordSchema = (t: IValidationTranslator) => {
  const registerSchema = createRegisterSchema(t);

  return z
    .object({
      currentPassword: registerSchema.shape.password,
      newPassword: registerSchema.shape.password,
      confirmPassword: registerSchema.shape.confirmPassword,
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: t('passwordsMismatch'),
      path: ['confirmPassword'],
    });
};
