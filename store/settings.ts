import  type {IAdvertisement, IAdvertisementResponse, TSabout} from '~/types/settings'

export const useSettingsStore = defineStore('aboutSettingStore', {
  state: () => ({
    data: undefined,
    ads: [] as IAdvertisement[],
    settings: {}
  }),
  actions: {
    getAboutSetting() {
      return new Promise((resolve, reject) => {
        useFetcher<TSabout, { detail: string }>('settings/about/', {
          method: 'GET',
        })
          .then((res) => {
            this.data = res.data
            resolve(res)
          })
          .catch((err) => {
            reject(err.data)
          })
      })
    },
    getSetting() {
      return new Promise((resolve, reject) => {
        useFetcher('settings/', {
          method: 'GET',
        })
            .then((res) => {
              this.settings = { ...res.data }
              resolve(res)
            })
            .catch((err) => {
              reject(err.data)
            })
      })
    },
    fetchAds() {
        return new Promise((resolve, reject) => {
          if (this.ads.length) {
            return resolve(this.ads)
          }
            useFetcher<IAdvertisementResponse, { detail: string }>('settings/advertisements/', {
            method: 'GET',
            })
            .then((res) => {
              if (res.error) {
                return reject(res.error)
              }
              this.ads = res.data.results
              resolve(res)
            })
            .catch((err) => {
                reject(err.data)
            })
        })
    }
  },
})
