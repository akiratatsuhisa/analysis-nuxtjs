import type { LocalePages } from '@/locales/type/pages';

import { callback } from './callback';
import { common } from './common';
import { dashboard } from './dashboard';
import { home } from './home';
import { login } from './login';
import { logout } from './logout';
import { settings } from './settings';

export const pages: LocalePages = {
  home,
  dashboard,
  login,
  logout,
  settings,
  callback,
  common,
};
