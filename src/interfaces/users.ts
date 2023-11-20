import type { Permission } from './auth';

export interface IUserResponse {
  username: string;
  displayName: string;
  email: string;
  firstName?: string;
  lastName?: string;
  permissions: Permission[];
  photoUrl?: string;
  coverUrl?: string;
}
