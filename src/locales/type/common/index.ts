import type { LocaleCommonMessages } from './messages';

export type LocaleCommon = {
  app: {
    title: string;
  };
  themes: { light: string; dark: string; coffee: string };
  providers: { google: string };
  languages: { en: string; ja: string };
  matches: {
    all: string;
    any: string;
  };
  permissions: {
    'view:home': string;
    'list:dashboard': string;
    'list:user': string;
    'read:user': string;
    'create:user': string;
    'update:user': string;
    'delete:user': string;
    'update:permissions:user': string;
  };
  messages: LocaleCommonMessages;
};
