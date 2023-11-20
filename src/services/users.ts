import type { AxiosRequestConfig } from 'axios';

import type { IUserResponse } from '@/interfaces/users';

import { Service } from './common';

export class UsersService extends Service {
  getByUsername(config: AxiosRequestConfig, username: string) {
    return this.fetch<IUserResponse>({
      ...config,
      url: `users/${username}`,
      method: 'GET',
    });
  }
}
