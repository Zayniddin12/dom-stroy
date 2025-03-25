import { defineNuxtPlugin } from '#app';
import VueImageZoomer from 'vue-image-zoomer';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueImageZoomer);
});