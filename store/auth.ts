import type {TAuthTokens, TLoginPayload, TUser } from '~/types/auth'
export const useAuthStore = defineStore('authStore', {
  state: () => ({
    user: undefined as TUser | undefined,
    accessToken: null as string | null,
    refreshToken: null as string | null,
  }),
  actions: {
    getUser() {
      return new Promise((resolve, reject) => {
        useFetcher<TUser>('account/').then((res) => {
          if (res.error) {
            reject(res.error)
          } else {
            this.user = res.data
            resolve(res.data)
          }
        })
      })
    },
    async authInit() {
      this.getTokens()
      if (!this.accessToken || !this.refreshToken) {
        return
      }

      try {
        await this.refreshTokens()
        await this.getUser()
        return
      } catch (e) {}
    },
    logOut() {
      const localePath = useLocalePath()
      const $route = useRoute()
      const $router = useRouter()
      if ($route.path.includes('/profile')) {
        $router.push(localePath('/'))
      }
      this.user = undefined
      this.accessToken = null
      this.refreshToken = null
      const access = useCookie('access_token')
      access.value = null
      const refresh = useCookie('refresh_token')
      refresh.value = null
    },
    refreshTokens() {
      return new Promise((resolve, reject) => {
        useFetcher<{ access: string }>('auth/token/refresh/', {
          method: 'POST',
          body: {
            refresh: this.refreshToken,
          },
        })
          .then((res) => {
            if (res.error) {
              this.logOut()
              reject(res.error)
            } else {
              this.setTokens(res.data)
              resolve(res.data)
            }
          })
          .catch((err) => {
            reject(err)
            this.logOut()
          })
      })
    },
    setTokens(payload: TAuthTokens) {
      if (payload?.access) {
        const access = useCookie('access_token')
        access.value = payload.access
        this.accessToken = payload.access
      }
      if (payload?.refresh) {
        const refresh = useCookie('refresh_token')
        refresh.value = payload.refresh
        this.refreshToken = payload.refresh
      }
    },
    getTokens() {
      const access = useCookie('access_token')
      const refresh = useCookie('refresh_token')
      this.accessToken = access.value
      this.refreshToken = refresh.value
      return { access: access.value, refresh: refresh.value }
    },
    login(payload: TLoginPayload) {
      return new Promise((resolve, reject) => {
        useFetcher<TAuthTokens, { detail: string }>('auth/login/', {
          method: 'POST',
          body: payload,
        })
          .then(async (res) => {
            if (res.error) {
              reject(res.error.data)
            } else {
              this.setTokens(res.data)
              await this.getUser()
              resolve(res.data)
            }
          })
          .catch((err) => {
            reject(err?.data?.detail)
          })
      })
    },
  },
})
