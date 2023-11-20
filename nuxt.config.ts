// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

export default defineNuxtConfig({
  ssr: false,
  srcDir: 'src/',
  devtools: { enabled: false },
  sourcemap: {
    server: true,
    client: false,
  },
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@vite-pwa/nuxt',
    ['@vee-validate/nuxt', { autoImports: true }],
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(
          vuetify({
            autoImport: true,
            styles: { configFile: 'assets/scss/settings.scss' },
          }),
        );
      });
    },
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  pwa: {
    registerType: 'autoUpdate',
    devOptions: {
      enabled: true,
    },
    workbox: { disableDevLogs: true },
    includeAssets: ['favicon.ico'],
    manifest: {
      name: 'Analysis Application',
      short_name: 'Analysis',
      description: 'Analysis',
      theme_color: '#000000',
      background_color: '#FEFBFF',
      icons: [
        {
          src: 'pwa-192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'pwa-512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
  },

  i18n: { vueI18n: './i18n.config.ts' },
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET ?? '',
    jwtExpires: process.env.JWT_EXPIRES ?? '',
    mongoConnectionString: process.env.MONGO_CONNECTION_STRING ?? '',
    googleClientId: process.env.GOOGLE_CLIENT_ID ?? '',
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    googleRedirectUri: process.env.GOOGLE_REDIRECT_URI ?? '',
    public: {
      googleClientId: process.env.GOOGLE_CLIENT_ID ?? '',
      googleRedirectUri: process.env.GOOGLE_REDIRECT_URI ?? '',
    },
  },
});
