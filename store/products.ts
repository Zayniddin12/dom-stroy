import type {
  TFetchProductsParams,
  TProduct,
  TProducts,
} from '~/types/products'
import type { TFilterOptions } from '~/types/params'

export const useProductsStore = defineStore('productsStore', {
  state: () => ({
    products: [] as TProduct[],
    recommendedProducts: [] as TProduct[],
    loadingRecommendedProducts: false,
    newProducts: [] as TProduct[],
    newProductsLoading: true,
    allProducts: [] as TProduct[],
    isAllProductsEmpty: false,
    allProductsPage: 1,
    allProductsTotal: 0,
    loadingAllProducts: false,
    mostSold: [] as TProduct[],
  }),
  actions: {
    fetchProducts(params?: { search: string; page?: number; size?: number }) {
      return new Promise((resolve, reject) => {
        useFetcher<TProducts>('products/', {
          method: 'GET',
          params,
        })
          .then((res) => {
            this.products = res.data?.results
            resolve(res)
          })
          .catch((err) => {
            reject(err.data)
          })
      })
    },
    fetchRecommendedProducts(options?: TFilterOptions) {
      return new Promise((resolve, reject) => {
        if (this?.recommendedProducts?.length && !options?.force) {
          return resolve(this.recommendedProducts)
        }
        this.loadingAllProducts = true
        useFetcher<TProducts>('products/', {
          method: 'GET',
          params: {
            size: 6,
            is_recommendation: true,
          },
        })
          .then((res) => {
            this.recommendedProducts = res.data?.results
            resolve(res)
          })
          .catch((err) => {
            reject(err.data)
          })
          .finally(() => (this.loadingRecommendedProducts = false))
      })
    },
    fetchNewProducts() {
      return new Promise((resolve, reject) => {
        useFetcher<TProducts>('products/', {
          method: 'GET',
          params: {
            ordering: 'created_at',
            in_sale: true,
            size: 6,
          },
        })
          .then((res) => {
            this.newProducts = res.data?.results
            resolve(res)
          })
          .catch((err) => {
            reject(err.data)
          })
          .finally(() => (this.newProductsLoading = false))
      })
    },
    fetchAllProducts(payload?: {
      params?: TFetchProductsParams
      options?: TFilterOptions
    }) {
      return new Promise((resolve, reject) => {
        if (
          !this.isAllProductsEmpty &&
          this.allProducts.length &&
          !payload?.options?.force
        ) {
          return resolve(this.allProducts)
        }
        this.loadingAllProducts = true
        useFetcher<TProducts>('products/', {
          params: <TFetchProductsParams>{
            size: 12,
            page: this.allProductsPage,
            ...payload?.params,
          },
        })
          .then((res) => {
            if (res.error) {
              reject(res.error)
            } else {
              if (payload?.options?.returnOnly) {
                return resolve(res.data)
              }
              this.isAllProductsEmpty = !res.data?.results.length
              this.allProductsTotal = res.data.total
              this.allProductsPage = res.data.current_page + 1
              if (!payload?.options?.merge) {
                this.allProducts = res.data.results
              } else {
                this.allProducts = [...this.allProducts, ...res.data.results]
              }
              resolve(res.data)
            }
          })
          .catch((err) => reject(err))
          .finally(() => (this.loadingAllProducts = false))
      })
    },
    fetchMostSold() {
      return new Promise((resolve, reject) => {
        useFetcher<TProducts>('products/most-sold/')
          .then((res) => {
            console.log(res.data.results)
            this.mostSold = res.data.results
            resolve(res)
          })
          .catch((err) => {
            reject(err.data)
          })
      })
    },
  },
})
