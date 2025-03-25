import { UseFetchOptions } from '#app/composables/fetch'
import type {TFetcherData } from '~/types'
import { useAuthStore } from '~/store/auth'
import { generateUniqueId } from '~/helpers'

let visitorId = ''
if (process.client) {
  const cookie = useCookie('visitorId')
  const localVisitorId = cookie.value
  const newVisitorId = generateUniqueId()

  if (!localVisitorId) {
    cookie.value = newVisitorId
    visitorId = newVisitorId
  } else {
    visitorId = localVisitorId
  }
}
export function useFetcher<T = any, E = any>(
    url: string,
    options?: UseFetchOptions<any>
): Promise<TFetcherData<T, E>> {
  const authStore = useAuthStore()
  let locale = computed(() => {
    const res = useCookie('i18n_redirected')
    return res.value || 'uz'
  })
  if (!authStore.accessToken) {
    authStore.getTokens()
  }
  if (authStore.accessToken) {
    options = {
      ...options,
      headers: {
        ...options?.headers,
        Authorization: `Bearer ${authStore.accessToken}`,
        'Accept-Language': locale.value,
        Fingerprint: visitorId,
      },
    }
  } else {
    options = {
      ...options,
      headers: {
        ...options?.headers,
        Fingerprint: visitorId,
        'Accept-Language': locale.value,
      },
    }
  }
  return new Promise((resolve, reject) => {
    useFetch(import.meta.env.VITE_API_BASE_URL + url, options)
        .then((res) => {
          if (res.error.value?.status === 401) {
            authStore.refreshTokens()
          }

          // if (
          //   [400, 404, 500, 502, 503].includes(res?.error?.value?.statusCode ?? 0)
          // ) {
          //   throw createError({
          //     statusCode: res?.error?.value?.statusCode,
          //   })
          // }

          resolve({
            data: res.data.value,
            error: res.error.value,
          })
        })
        .catch((err) => {
          reject(err.value)
        })
  })
}
