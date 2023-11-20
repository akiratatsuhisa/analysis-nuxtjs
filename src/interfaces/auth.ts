export enum Permission {
  // user permissions
  LIST_USER = 'list:user',
  READ_USER = 'read:user',
  CREATE_USER = 'create:user',
  UPDATE_USER = 'update:user',
  DELETE_USER = 'delete:user',
}

export interface IAuthOptions {
  seconds?: number;
}

export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
}
