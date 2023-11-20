import axios, { type CreateAxiosDefaults } from 'axios';

export { Service } from '@/services/common';
import { UsersService } from '@/services/users';

export const config: CreateAxiosDefaults = {
  baseURL: '/api/',
};

export const axiosInstacne = axios.create(config);

export const services = {
  users: new UsersService(),
};
