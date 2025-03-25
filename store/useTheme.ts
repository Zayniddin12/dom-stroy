import { defineStore } from 'pinia'

export const useTheme = defineStore('ThemeStore', {
  state: () => ({
    theme: '',
  }),
  actions: {
    changeTheme() {
      const themeCookie = useCookie('theme')
      themeCookie.value = this.theme === 'light' ? 'dark' : 'light'
      this.theme = themeCookie.value
      const html = document.querySelector('html') as HTMLElement
      html.classList.toggle('dark', this.theme === 'dark')
    },

    initTheme() {
      const themeCookie = useCookie('theme')
      if (!themeCookie.value) {
        themeCookie.value = 'light'
      }
      if (themeCookie.value === 'dark') {
        useHead({
          htmlAttrs: {
            class: themeCookie.value,
          },
        })
      }
      this.theme = themeCookie.value
    },
  },
})
