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
  matches: {
    all: 'すべて一致',
    any: 'いずれか一致',
  },
  permissions: {
    'view:home': 'ホーム表示',
    'list:dashboard': 'ダッシュボード一覧',
    'list:user': 'ユーザー一覧',
    'read:user': 'ユーザー情報',
    'create:user': 'ユーザー登録',
    'update:user': 'ユーザー編集',
    'delete:user': 'ユーザー削除',
    'update:permissions:user': 'ユーザーの権限編集',
  },
  messages,
};
