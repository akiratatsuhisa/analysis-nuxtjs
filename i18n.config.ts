import { en } from './src/locales/en';
import { ja } from './src/locales/ja';

export default defineI18nConfig(() => {
  const locale = process.client
    ? localStorage.getItem('locale:language') ?? 'en'
    : 'en';

  return {
    legacy: true,
    locale,
    messages: {
      en,
      ja,
    },
  };
});
