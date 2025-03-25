import type {TParams } from '~/types/params'
import type {TBrand, TBrandResponse } from '~/types/brand'

export const useBrandsStore = defineStore('brandsStore', {
  state: () => ({
    brands: [] as TBrand[],
    brandsLoading: true,
    brandsCount: 0,
  }),
  actions: {
    fetchAllBrands(params: TParams, merge: boolean) {
      this.brandsLoading = true
      return new Promise((resolve, reject) => {
        useFetcher<TBrandResponse>('products/manufacture/', {
          method: 'GET',
          params: params,
        })
          .then((res) => {
            if (merge) {
              this.brands.push(...res.data.results)
            } else {
              this.brands = res.data.results
            }
            this.brandsCount = res.data.total
            resolve(res)
          })
          .catch((err) => {
            reject(err.data)
          })
          .finally(() => setTimeout(() => (this.brandsLoading = false), 500))
      })
    },
  },
})
