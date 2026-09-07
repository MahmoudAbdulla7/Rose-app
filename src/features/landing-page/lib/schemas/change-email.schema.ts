import * as z from 'zod';

import { OTP_LENGTH } from '@/features/auth/lib/constants/otp.constant';
import { createRegisterSchema } from '@/features/auth/lib/schemas/register.schema';

/** Translator scoped to the `auth.register.validation` namespace. */
type IValidationTranslator = (key: string) => string;

/** Translator scoped to the `accountSettings.changeEmail` namespace. */
type IChangeEmailTranslator = (key: string) => string;

export const createChangeEmailSchema = (t: IValidationTranslator) => {
  const registerSchema = createRegisterSchema(t);

  return z.object({
    newEmail: registerSchema.shape.email,
  });
};

export const createConfirmEmailChangeSchema = (t: IChangeEmailTranslator) =>
  z.object({
    code: z
      .string()
      .trim()
      .length(OTP_LENGTH, t('otp.invalid'))
      .regex(/^\d+$/, t('otp.invalid')),
  });
