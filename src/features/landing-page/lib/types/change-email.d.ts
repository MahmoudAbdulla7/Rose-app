import type { IUser } from '@/features/auth/lib/types/auth';
import type { z } from 'zod';

import type {
  createChangeEmailSchema,
  createConfirmEmailChangeSchema,
} from '../schemas/change-email.schema';

export type IChangeEmailFields = z.infer<ReturnType<typeof createChangeEmailSchema>>;

export type IConfirmEmailChangeFields = z.infer<ReturnType<typeof createConfirmEmailChangeSchema>>;

export type IConfirmEmailChangePayload = {
  code: string;
};

export type IConfirmEmailChangeResponsePayload = {
  user: IUser;
};
