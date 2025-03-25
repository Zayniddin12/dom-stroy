import {useAuthStore} from "~/store/auth";

export function useApi() {
  const visitorId = useCookie('visitorId')
  let locale = computed(() => {
    const res = useCookie('i18n_redirected')
    return res.value || 'uz'
  })
  const authStore = useAuthStore()
  if (!authStore.accessToken) {
    authStore.getTokens()
  }
  const action = async (method: any, url: any, opts: any) => {
    return new Promise((resolve, reject) => {
      $fetch(url, {
        method,
        body: opts,
        baseURL: import.meta.env.VITE_API_BASE_URL,
        headers: {
          Fingerprint: visitorId.value,
          'Accept-Language': locale.value,
          Authorization: `Bearer ${authStore.accessToken}`,
        },
      })
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  const actionGet = async (method: any, url: any, opts: any) => {
    let headers = ref({})
    if(authStore.accessToken) {
      headers.value.Fingerprint = visitorId.value
        headers.value['Accept-Language'] = locale.value
        headers.value.Authorization = `Bearer ${authStore.accessToken}`
    } else {
        headers.value.Fingerprint = visitorId.value
        headers.value['Accept-Language'] = locale.value
    }
    return new Promise((resolve, reject) => {
      $fetch(url, {
        method,
        params: opts,
        baseURL: import.meta.env.VITE_API_BASE_URL,
        headers: headers.value,
      })
          .then((res) => {
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
    })
  }
  return {
    action,
    actionGet,
  }
}
