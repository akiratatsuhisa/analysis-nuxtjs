import type { LocaleLayoutDefault } from '@/locales/type/layout/default';

export const defaultLayout: LocaleLayoutDefault = {
  topAppBar: {
    profile: {
      items: {
        theme: '{name}モード',
        settings: '設定',
        logout: 'ログアウト',
      },
    },
  },
  navigations: {
    menus: {
      home: {
        title: 'ホーム',
      },
      users: {
        title: 'ユーザ一覧',
      },
      dashboard: {
        title: 'ダッシュボード',
      },
      settings: {
        title: '設定',
      },
      logout: {
        title: 'ログアウト',
      },
    },
  },
};
