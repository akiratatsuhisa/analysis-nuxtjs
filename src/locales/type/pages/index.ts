import type { LocalePagesCallback } from './callback';
import type { LocalePagesCommon } from './common';
import type { LocalePagesDashboard } from './dashboard';
import type { LocalePagesHome } from './home';
import type { LocalePagesLogin } from './login';
import type { LocalePagesLogout } from './logout';
import type { LocalePagesSettings } from './settings';

export type LocalePages = {
  dashboard: LocalePagesDashboard;
  home: LocalePagesHome;
  settings: LocalePagesSettings;
  login: LocalePagesLogin;
  logout: LocalePagesLogout;
  callback: LocalePagesCallback;
  common: LocalePagesCommon;
};
