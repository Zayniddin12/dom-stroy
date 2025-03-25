import type { TParams } from '~/types/params'
import type {
  TBanner,
  IBanners,
  IStoryResult,
  IStory,
  ILiveStream,
} from '~/types'
import type { ISettingsContact } from '~/types/settings'
export const useCommonStore = defineStore('common', {
  state: () => ({
    banner: [] as TBanner[],
    bannerLoading: true,
    stories: [] as IStory[],
    storiesLoading: true,
    contacts: {} as ISettingsContact,
    footer: [],
    liveStream: {} as ILiveStream[],
  }),
  actions: {
    fetchBanner(params?: TParams) {
      return new Promise((resolve, reject) => {
        useFetcher<IBanners>('products/banner/', {
          method: 'GET',
          params,
        })
          .then((res) => {
            if (res.data.results.length < 3) {
              this.banner = [
                ...res.data.results,
                ...res.data.results,
                ...res.data.results,
              ]
            } else this.banner = res.data.results
            resolve(res)
          })
          .catch((err) => {
            reject(err.data)
          })
          .finally(() => (this.bannerLoading = false))
      })
    },
    fetchStory(params?: TParams) {
      return new Promise((resolve, reject) => {
        useFetcher<IStoryResult>('common/story/', {
          method: 'GET',
          params,
        })
          .then((res) => {
            this.stories = res.data.results
            resolve(res)
          })
          .catch((err) => {
            reject(err.data)
          })
          .finally(() => (this.storiesLoading = false))
      })
    },
    readStory(id: number) {
      return new Promise((resolve, reject) => {
        useFetcher(`common/story-item/${id}/read/`, {
          method: 'GET',
        })
          .then((res) => {
            if (res?.data) {
              resolve(res?.data)
            }
            if (res?.error) {
              reject(res?.error)
            }
          })
          .catch((err) => {
            reject(err.data)
          })
      })
    },
    fetchContacts() {
      return new Promise((resolve, reject) => {
        if (Object.keys(this.contacts).length > 0) {
          return resolve(this.contacts)
        }
        useFetcher<ISettingsContact>('settings/contacts/', {
          method: 'GET',
        })
          .then((res) => {
            if (res.error) {
              return reject(res.error)
            }
            this.contacts = res.data
            resolve(res)
          })
          .catch((err) => {
            reject(err.data)
          })
      })
    },
    fetchFooter() {
      return new Promise((resolve, reject) => {
        useFetcher('common/footer/', {
          method: 'GET',
        })
          .then((res) => {
            this.footer = res.data.results
            resolve(res)
          })
          .catch((err) => {
            reject(err.data)
          })
      })
    },
    fetchLiveStream() {
      return new Promise((resolve, reject) => {
        useFetcher('common/live-stream/', {
          method: 'GET',
        })
          .then((res) => {
            this.liveStream = res.data
            resolve(res)
          })
          .catch((err) => {
            reject(err.data)
          })
      })
    },
    fetchVideoLessons() {
      return new Promise((resolve, reject) => {
        useFetcher('common/video-lessons/', {
          method: 'GET',
        })
          .then((res) => {
            this.videoLessons = res.data.results
            resolve(res)
          })
          .catch((err) => {
            reject(err.data)
          })
      })
    },
  },
})
