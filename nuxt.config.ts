// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },

  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxtjs/i18n',
    '@nuxtjs/sitemap',
    '@primevue/nuxt-module',
  ],

  site: {
    url: 'https://auswandern-südafrika.de',
    name: 'auswandern-südafrika.de',
  },

  runtimeConfig: {
    public: {
      // Overridable at runtime via NUXT_PUBLIC_SITE_URL
      siteUrl: 'https://auswandern-südafrika.de',
    },
  },

  sitemap: {
    // Excluded: auth stubs and the buy-intent page (noindex via page-level meta)
    exclude: ['/login', '/registrieren', '/mein-bereich', '/produkte/kaufen', '/en/login', '/en/registrieren', '/en/mein-bereich', '/en/produkte/kaufen'],
  },

  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
    },
  },

  devServer: {
    port: 4300,
  },

  primevue: {
    options: {
      ripple: true,
      theme: 'none', // we're using Tailwind 4 + custom palette, not PrimeVue themes
    },
  },

  i18n: {
    locales: [
      { code: 'de', language: 'de-DE', file: 'de.json', name: 'Deutsch' },
      { code: 'en', language: 'en-US', file: 'en.json', name: 'English' },
    ],
    defaultLocale: 'de',
    strategy: 'prefix_except_default',
    lazy: true,
  },

  typescript: {
    strict: true,
  },

  app: {
    head: {
      titleTemplate: '%s — auswandern-südafrika.de',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Deutschsprachige Plattform für Südafrika-Auswanderer. Ehrlich, persönlich, vollständig.' },
        // Default OG tags — pages with their own useHead can override
        { property: 'og:site_name', content: 'auswandern-südafrika.de' },
        { property: 'og:image', content: 'https://auswandern-südafrika.de/images/hero/cape-town-golden-hour.webp' },
        { property: 'og:image:width', content: '2752' },
        { property: 'og:image:height', content: '1536' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:image', content: 'https://auswandern-südafrika.de/images/hero/cape-town-golden-hour.webp' },
      ],
      link: [
        { rel: 'alternate', type: 'application/rss+xml', title: 'Blog-Feed', href: '/rss.xml' },
      ],
    },
  },
})
