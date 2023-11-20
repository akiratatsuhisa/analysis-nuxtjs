import { KEYS } from '@/constants';

export default defineNuxtPlugin((app) => {
  const snackbars = reactive<Array<SnackbarProps>>([]);

  app.vueApp.provide(KEYS.SNACKBARS, snackbars);

  app.vueApp.config.globalProperties.$snackbar = (
    messageOrComponent: string | Component,
    options: SnackbarOptions,
  ) => snackbarShow(snackbars, messageOrComponent, options);
});
