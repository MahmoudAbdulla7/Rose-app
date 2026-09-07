import type { IUser } from '@/features/auth/lib/types/auth';
import type { z } from 'zod';
import type { createProfileSchema } from '../schemas/profile.schema';

export type IProfileFields = z.infer<ReturnType<typeof createProfileSchema>>;

export type IProfileUser = IUser;

export type IProfileResponsePayload = {
  user: IProfileUser;
};

export type IUpdateProfilePayload = {
  firstName: string;
  lastName: string;
  phone: string;
  photo?: string | null;
};

export type IUpdateProfileInput = IProfileFields;

