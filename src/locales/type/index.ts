import type { LocaleCommon } from './common';
import type { LocaleLayout } from './layout';
import type { LocalePages } from './pages';
import type { LocaleValidators } from './validators';

export type LocaleMessages = {
  layout: LocaleLayout;
  pages: LocalePages;
  common: LocaleCommon;
  validators: LocaleValidators;
};
