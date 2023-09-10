// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['nuxt-icon'],
  env: {
    isDev: process.env.NUXT_IS_DEV ?? true,
    apiUrl: process.env.NUXT_API_URL ?? 'http://api.stoketech.com'
  },
  css: [
    '@/assets/css/main.css',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
