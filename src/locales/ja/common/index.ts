import type { LocaleCommon } from '@/locales/type/common';

import { messages } from './messages';

export const common: LocaleCommon = {
  app: {
    title: '分析',
  },
  themes: {
    light: 'ライト',
    dark: 'ダーク',
    coffee: 'コーヒー',
  },
  providers: { google: 'グーグル' },
  languages: { en: '英語', ja: '日本語' },
  messages,
};
