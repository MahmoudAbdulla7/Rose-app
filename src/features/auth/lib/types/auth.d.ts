import type { GENDER } from '../constants/gender.constant';
import type { ROLES } from '../constants/roles.constant';

export type Gender = (typeof GENDER)[keyof typeof GENDER];
export type Role = (typeof ROLES)[keyof typeof ROLES];

export interface IUser {
  id: string;
  username: string;
  email: string;
  phone: string | null;
  firstName: string;
  lastName: string;
  image?: string | null;
  photo?: string | null;
  gender: Gender;
  emailVerified: boolean;
  phoneVerified: boolean;
  role: Role;
}

export interface ILoginResponse {
  user: IUser;
  token: string;
}
