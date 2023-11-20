import { KEYS } from '@/constants';

export default defineNuxtPlugin((app) => {
  const loadings = ref<Array<[string, number | boolean]>>([]);

  app.vueApp.provide(KEYS.LOADINGS, loadings);
});
