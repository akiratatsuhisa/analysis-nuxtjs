import type { LocalePagesCallback } from './callback';
import type { LocalePagesCommon } from './common';
import type { LocalePagesDashboard } from './dashboard';
import type { LocalePagesHome } from './home';
import type { LocalePagesLogin } from './login';
import type { LocalePagesLogout } from './logout';
import type { LocalePagesSettings } from './settings';
import type { LocalePagesUsers } from './users';

export type LocalePages = {
  common: LocalePagesCommon;
  login: LocalePagesLogin;
  logout: LocalePagesLogout;
  callback: LocalePagesCallback;
  settings: LocalePagesSettings;
  home: LocalePagesHome;
  users: LocalePagesUsers;
  dashboard: LocalePagesDashboard;
};
