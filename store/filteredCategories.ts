import type {TCategory, TCategoryResponse } from '~/types/categories'

export const useFilteredCategoriesStore = defineStore(
  'filteredCategoriesStore',
  {
    state: () => ({
      settings: {},
      forLadies: [] as TCategory[],
      forBath: [] as TCategory[],
      loadingForBath: true,
      loadingForLadies: true,
    }),
    actions: {
      fetchSettings() {
        return new Promise((resolve, reject) => {
          useFetcher<TCategoryResponse>('settings/', {
            method: 'GET',
          })
            .then((res) => {
              if (res?.data) {
                this.settings = res.data
                this.fetchForBath()
                this.fetchForLadies()
                resolve(res)
              }
              if (res.error) {
                reject(res?.error)
              }
            })
            .catch((err) => {
              reject(err.data)
            })
        })
      },

      fetchForLadies() {
        return new Promise((resolve, reject) => {
          useFetcher<TCategoryResponse>(`products/`, {
            method: 'GET',
            params: {
              size: 6,
              category_id: this.settings?.main_page_category_for_ladies?.id,
            },
          })
            .then((res) => {
              this.forLadies = res.data.results
              resolve(res)
            })
            .catch((err) => {
              reject(err.data)
            })
            .finally(() => {
              this.loadingForLadies = false
            })
        })
      },
      fetchForBath() {
        return new Promise((resolve, reject) => {
          useFetcher<TCategoryResponse>(`products/`, {
            method: 'GET',
            params: {
              size: 6,
              category_id: this.settings?.main_page_category_for_body_bath?.id,
            },
          })
            .then((res) => {
              this.forBath = res.data.results
              resolve(res)
            })
            .catch((err) => {
              reject(err.data)
            })
            .finally(() => {
              this.loadingForBath = false
            })
        })
      },
    },
  }
)
