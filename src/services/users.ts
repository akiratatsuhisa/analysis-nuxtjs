import type { AxiosRequestConfig } from 'axios';

import type {
  ISearchUsersRequest,
  IUpdateUserPermissionsRequest,
  IUserResponse,
} from '@/interfaces';

import { Service } from './common';

export class UsersService extends Service {
  getAll(config: AxiosRequestConfig, params: ISearchUsersRequest) {
    return this.fetch<Array<IUserResponse>>({
      ...config,
      params,
      url: `users`,
      method: 'GET',
    });
  }

  getByUsername(config: AxiosRequestConfig, username: string) {
    return this.fetch<IUserResponse>({
      ...config,
      url: `users/${username}`,
      method: 'GET',
    });
  }

  updatePermissions(
    config: AxiosRequestConfig,
    username: string,
    data: IUpdateUserPermissionsRequest,
  ) {
    return this.fetch<IUserResponse>({
      ...config,
      url: `users/${username}/permissions`,
      method: 'PATCH',
      data,
    });
  }
}
