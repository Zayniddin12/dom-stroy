import type {
  TProductsManufactures,
  TProductsManufacture,
  TManufacture,
  TManufactures,
} from '~/types/manufacture'
import type {TParams } from '~/types/params'
export const useManufactureStore = defineStore('manufactureStore', {
  state: () => ({
    manufactures: [] as TProductsManufacture[],
    manufacturesLoading: true,
    filterManufactures: [] as TManufacture[],
  }),
  actions: {
    fetchManufactures(params: TParams) {
      return new Promise((resolve, reject) => {
        useFetcher<TProductsManufactures>(
          'products/manufacture-with-products/',
          {
            method: 'GET',
            params,
          }
        )
          .then((res) => {
            this.manufactures = res.data.results
            resolve(res)
          })
          .catch((err) => {
            reject(err.data)
          })
          .finally(() => (this.manufacturesLoading = false))
      })
    },
    fetchFilterManufactures() {
      return new Promise((resolve, reject) => {
        if (this.filterManufactures?.length) {
          return resolve(this.filterManufactures)
        }
        useFetcher<TManufactures>('products/manufacture/', {
          method: 'GET',
        })
          .then((res) => {
            this.filterManufactures = res.data.results
            resolve(res)
          })
          .catch((err) => {
            reject(err.data)
          })
      })
    },
  },
})
