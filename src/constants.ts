export enum LoadingState {
  None = 'none',
  Loading = 'loading',
  Percent = 'percent',
}

export namespace KEYS {
  export const LOADINGS: InjectionKey<Ref<Array<[string, number | boolean]>>> =
    Symbol('loadings');

  export const SNACKBARS: InjectionKey<Array<SnackbarProps>> =
    Symbol('snackbars');
}
