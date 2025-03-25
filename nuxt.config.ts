import ru from './i18n/ru.json'
import uz from './i18n/uz.json'
import sr from './i18n/sr.json'

export default defineNuxtConfig({
  ssr: true,
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'canonical',
          href: 'https://domstroy.uz/',
        },
      ],
      title: 'Dom Stroy',
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, user-scalable=1',
        },
        { name: 'format-detection', content: 'telephone=no' },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Сайт интернет магазин Dom-stroy',
        },
        {
          name: 'description',
          content: 'Сайт интернет магазин Dom-stroy',
        },
        {
          hid: 'og:image',
          name: 'image',
          property: 'og:image',
          content: '/ogImage.png',
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: 'https://domstroy.uz',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Dom-stroy',
        },
      ],
      htmlAttrs: {
        lang: 'en',
      },
      script: [
        {
          src: '//code.jivosite.com/widget/99scyD8vNP',
          async: true,
        },
      ],
    },
  },
  build: {
    transpile: ['vue-toastification', 'vue-demi'],
  },
  components: [
    { path: '~/components/', extensions: ['vue'] },
    {
      path: '~/components/Layout/Header',
      prefix: 'layout',
      extensions: ['vue'],
    },
  ],
  css: ['@/assets/styles/main.css', '@/assets/icomoon/style.css'],
  devServerHandlers: [],
  plugins: ['~/plugins/vue-image-zoomer.ts'],
  i18n: {
    locales: ['ru', 'uz', 'sr'],
    defaultLocale: 'ru',
    vueI18n: {
      fallbackLocale: 'ru',
      messages: {
        ru,
        uz,
        sr,
      },
    },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: true,
    },
  },
  colorMode: {
    preference: 'system',
    fallback: 'light',
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storageKey: 'nuxt-color-mode',
  },
  image: {
    format: 'webp',
    quality: 80,
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      '2xl': 1536,
    },
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/robots',
    '@nuxt/image-edge',
    [
      '@pinia/nuxt',
      {
        autoImports: [
          'defineStore',
          ['defineStore', 'definePiniaStore'],
        ],
      },
    ],
    'vue-yandex-maps/nuxt',
    '@nuxtjs/i18n',
  ],
  robots: {
    rules: {
      UserAgent: '*',
    },
  },

  runtimeConfig: {
    public: {
      baseURL: 'localhost',
    },
  },
  vite: {
    server: {
      hmr: {
        clientPort: 3000,
      },
    },
  },
  yandexMaps: {
    apikey: '9191d860-42c5-4e70-98aa-8c92721bbdc3',
  },
})
