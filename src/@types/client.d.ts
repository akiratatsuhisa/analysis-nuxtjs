declare module '#app' {
  interface PageMeta {
    unauth?: boolean;
    permissions?: Array<string>;
    subDrawer?: {
      breakPoint:
        | 'xs'
        | 'sm'
        | 'md'
        | 'lg'
        | 'xl'
        | 'xxl'
        | 'smAndUp'
        | 'mdAndUp'
        | 'lgAndUp'
        | 'xlAndUp'
        | 'smAndDown'
        | 'mdAndDown'
        | 'lgAndDown'
        | 'xlAndDown';
      width?: number | string;
    };
  }
}

export {};
