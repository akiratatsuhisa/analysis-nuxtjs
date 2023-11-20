export enum Permission {
  // home permissions
  VIEW_HOME = 'view:home',
  // dashboard permissions
  LIST_DASHBOARD = 'list:dashboard',
  // user permissions
  LIST_USER = 'list:user',
  READ_USER = 'read:user',
  CREATE_USER = 'create:user',
  UPDATE_USER = 'update:user',
  DELETE_USER = 'delete:user',
  UPDATE_PERMISSIONS_USER = 'update:permissions:user',
}

export interface IAuthOptions {
  seconds?: number;
}

export interface IAuthResponse {
  accessToken: string;
}
