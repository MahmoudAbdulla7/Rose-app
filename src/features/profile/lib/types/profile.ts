import type { IUser } from '@/features/auth/lib/types/auth';

export type ProfilePayload = {
  user: IUser;
};

export type UpdateProfileInput = Pick<IUser, 'firstName' | 'lastName'> & {
  phone: string;
  photo?: string;
};

export type ChangePasswordInput = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};
