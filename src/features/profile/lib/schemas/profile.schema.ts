import * as z from 'zod';

type Translator = (key: string) => string;

export const createProfileSchema = (t: Translator) =>
  z.object({
    firstName: z.string().trim().min(1, t('firstNameRequired')),
    lastName: z.string().trim().min(1, t('lastNameRequired')),
    phone: z.string().trim().min(1, t('phoneRequired')),
  });

export const createPasswordSchema = (t: Translator) =>
  z
    .object({
      currentPassword: z.string().min(1, t('currentPasswordRequired')),
      newPassword: z
        .string()
        .min(8, t('passwordMin'))
        .regex(/[a-z]/, t('passwordLowercase'))
        .regex(/[A-Z]/, t('passwordUppercase'))
        .regex(/\d/, t('passwordDigit'))
        .regex(/[^A-Za-z0-9]/, t('passwordSpecial')),
      confirmPassword: z.string().min(1, t('confirmPasswordRequired')),
    })
    .refine((values) => values.newPassword === values.confirmPassword, {
      path: ['confirmPassword'],
      message: t('passwordsMismatch'),
    });

export type ProfileFormValues = z.infer<ReturnType<typeof createProfileSchema>>;
export type PasswordFormValues = z.infer<ReturnType<typeof createPasswordSchema>>;
