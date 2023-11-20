import type { LocaleCommon } from '@/locales/type/common';

import { messages } from './messages';

export const common: LocaleCommon = {
  app: {
    title: 'Analysis',
  },
  themes: {
    light: 'Light',
    dark: 'Dark',
    coffee: 'Coffee',
  },
  providers: { google: 'Google' },
  languages: { en: 'English', ja: 'Japanese' },
  matches: {
    all: 'Match All',
    any: 'Match Any',
  },
  permissions: {
    'view:home': 'View Home',
    'list:dashboard': 'List Dashboard',
    'list:user': 'List User',
    'read:user': 'Read User',
    'create:user': 'Create User',
    'update:user': 'Update User',
    'delete:user': 'Delete User',
    'update:permissions:user': 'Update Permissions User',
  },
  messages,
};
