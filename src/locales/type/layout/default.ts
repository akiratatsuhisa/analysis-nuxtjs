export type LocaleLayoutDefault = {
  topAppBar: {
    profile: {
      items: {
        /**
         * @param {string} name
         */
        theme: string;
        settings: string;
        logout: string;
      };
    };
  };
  navigations: {
    menus: {
      home: {
        title: string;
      };
      users: {
        title: string;
      };
      dashboard: {
        title: string;
      };
      settings: {
        title: string;
      };
      logout: {
        title: string;
      };
    };
  };
};
