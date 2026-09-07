import { parsePhoneNumber } from 'react-phone-number-input';
import * as z from 'zod';

const isEgyptianPhone = (value: string) => {
  const parsed = parsePhoneNumber(value);
  return parsed?.country === 'EG' && parsed.isValid();
};

type IValidationTranslator = (key: string) => string;

export const createProfileSchema = (t: IValidationTranslator) =>
  z.object({
    firstName: z.string().trim().min(1, t('firstNameRequired')),
    lastName: z.string().trim().min(1, t('lastNameRequired')),
    phone: z
      .string()
      .trim()
      .min(1, t('phoneRequired'))
      .refine(isEgyptianPhone, t('phoneInvalid')),
    photo: z.string().optional(),
  });
