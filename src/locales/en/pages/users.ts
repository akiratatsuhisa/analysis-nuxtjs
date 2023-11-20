import type { LocalePagesUsers } from '@/locales/type/pages/users';

export const users: LocalePagesUsers = {
  main: {
    title: 'Search Conditions',
    form: {
      search: {
        label: 'Search',
      },
      username: {
        label: 'Username',
      },
      email: {
        label: 'Email',
      },
      createdAtFrom: {
        label: 'Created At (From)',
      },
      createdAtTo: {
        label: 'Created At (To)',
      },
      permissions: {
        label: 'Permissions',
      },
      clear: 'Clear',
      submit: 'Search',
    },
    explore: {
      title: 'Explore',
      lastName: 'Last Name',
      firstName: 'First Name',
      email: 'Email',
      permissions: 'Permissions',
    },
  },
  sub: {
    title: 'Form',
    subtitle: {
      unselected:
        'Press the explore button to update permissions for the selected user',
      updated: 'User permissions updated',
      forbidden:
        "You don't have permission ` @:common.permissions.update:permissions:user `",
    },
    form: {
      username: {
        label: 'Username',
      },
      permissions: {
        label: 'Permissions',
      },
      submit: 'Save',
    },
  },
  view: {},
};
