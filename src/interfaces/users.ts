import type { Permission } from './auth';

export type UsersFormState = 'unselected' | 'updated' | 'forbidden';

export interface ISearchUsersRequest {
  search?: string | null;
  email?: string | null;
  username?: string | null;
  createdAtFrom?: string | null;
  createdAtTo?: string | null;
  permissions?: Array<string> | null;
  permissionMode?: boolean | null;
}

export interface IUserResponse {
  id: string;
  username: string;
  displayName: string;
  email: string;
  firstName?: string;
  lastName?: string;
  permissions: Permission[];
  photoUrl?: string;
  coverUrl?: string;
}

export interface IUpdateUserPermissionsRequest {
  permissions: Permission[];
}
