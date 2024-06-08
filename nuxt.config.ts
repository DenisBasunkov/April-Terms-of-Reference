// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    'nuxt-icon',
    '@pinia/nuxt',
    // 'axios'
  ],
  // css: ['~/assets/varibles.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/varibles.scss" as *;'
        }
      }
    }
  }
})
