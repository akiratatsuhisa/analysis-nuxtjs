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
  messages,
};
