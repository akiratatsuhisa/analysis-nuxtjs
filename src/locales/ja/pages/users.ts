import type { LocalePagesUsers } from '@/locales/type/pages/users';

export const users: LocalePagesUsers = {
  main: {
    title: '検索条件',
    form: {
      search: {
        label: '調べる',
      },
      username: {
        label: 'ユーザー名',
      },
      email: {
        label: 'Eメール',
      },
      createdAtFrom: {
        label: '作成日（開始）',
      },
      createdAtTo: {
        label: '作成日（終了）',
      },
      permissions: {
        label: '権限',
      },
      clear: 'クリア',
      submit: '検索',
    },
    explore: {
      title: '探索',
      lastName: '姓氏',
      firstName: '名前',
      email: 'Eメール',
      permissions: '権限',
    },
  },
  sub: {
    title: 'フォーム',
    subtitle: {
      unselected: '探索ボタンを押して、選択したユーザーの権限を編集します',
      updated: 'ユーザー権限が編集されました',
      forbidden:
        '権限「 @:common.permissions.update:permissions:user 」がありません',
    },
    form: {
      username: {
        label: 'ユーザー名',
      },
      permissions: {
        label: '権限',
      },
      submit: '保存',
    },
  },
  view: {},
};
