import type { UsersFormState } from '@/interfaces';

export type LocalePagesUsers = {
  main: {
    title: string;
    form: {
      search: { label: string };
      username: { label: string };
      email: { label: string };
      createdAtFrom: { label: string };
      createdAtTo: { label: string };
      permissions: { label: string };
      clear: string;
      submit: string;
    };
    explore: {
      title: string;
      lastName: string;
      firstName: string;
      email: string;
      permissions: string;
    };
  };
  sub: {
    title: string;
    subtitle: Record<UsersFormState, string>;
    form: {
      username: { label: string };
      permissions: { label: string };
      submit: string;
    };
  };
  view: {};
};
