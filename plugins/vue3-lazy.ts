import VueLazyLoad from 'vue3-lazyload'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueLazyLoad, {
    error: '/images/defaults/image.png',
    loading: '/images/defaults/image.png',
  })
})
