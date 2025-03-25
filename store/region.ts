import type {TParams } from '~/types/params'
import type {TRegion, TRegionResponse } from '~/types/region'

export const useRegionStore = defineStore('regionStore', {
  state: () => ({
    region: [] as TRegion[],
    district: [] as TRegion[],
      loading: false,
      distLoading: false
  }),
  actions: {
    fetchRegion() {
        this.loading = true
      return new Promise((resolve, reject) => {
        useFetcher('common/region/', {
          method: 'GET',
          params: {
              size: 15
          },
        })
          .then((res) => {
              this.region = res.data?.results
            setTimeout(() => {
                this.loading = false
            }, 300)
            resolve(res)
          })
          .catch((err) => {
            reject(err.data)
          })
      })
    },
    fetchDistrict(params?: TParams, merge?: boolean, region?: string) {
        this.distLoading = true
      return new Promise((resolve, reject) => {
        useFetcher(`common/district/?region=${region}`, {
          method: 'GET',
          params: {
              ...params,
              size: 50
          },
        })
          .then((res) => {
              this.district = res.data?.results
              setTimeout(() => {
                  this.distLoading = false
              }, 300)
            resolve(res)
          })
          .catch((err) => {
            reject(err.data)
          })
      })
    },
  },
})
