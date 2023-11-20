import type { LocaleCommonMessages } from './messages';

export type LocaleCommon = {
  app: {
    title: string;
  };
  themes: { light: string; dark: string; coffee: string };
  providers: { google: string };
  languages: { en: string; ja: string };
  messages: LocaleCommonMessages;
};
