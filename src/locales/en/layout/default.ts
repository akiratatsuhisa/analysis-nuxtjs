import type { LocaleLayoutDefault } from '@/locales/type/layout/default';

export const defaultLayout: LocaleLayoutDefault = {
  topAppBar: {
    profile: {
      items: {
        theme: 'Theme {name}',
        settings: 'Settings',
        logout: 'Logout',
      },
    },
  },
  navigations: {
    menus: {
      home: {
        title: 'Home',
      },
      users: {
        title: 'Users',
      },
      dashboard: {
        title: 'Dashboard',
      },
      settings: {
        title: 'Settings',
      },
      logout: {
        title: 'Logout',
      },
    },
  },
};
