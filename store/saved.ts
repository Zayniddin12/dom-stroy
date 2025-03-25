import type { TProducts, TProduct, TPayload } from '~/types/products'

export const useSavedStore = defineStore('savedStore', {
  state: () => ({
    saved: [] as TProduct[], // Array of saved products
    totalPages: 0, // Total pages for pagination
    currentPage: 1, // Current page for pagination
    loading: true, // Loading state for fetching products
    loadingMore: false, // Loading state for fetching more products
  }),

  actions: {
    // Fetch saved products from the API
    fetchSavedProducts(payload?: TPayload) {
      this.loading = true
      this.loadingMore = true
      return new Promise((resolve, reject) => {
        useFetcher<TProducts>('products/likes/', {
          method: 'GET',
          params: {
            size: 12,
            ...payload,
          },
        })
          .then((res) => {
            if (res && res.data) {
              this.totalPages = res.data.total_pages || 0
              this.currentPage = res.data?.current_page || 1

              // If page > 1, append to saved products; otherwise, overwrite
              if (payload?.page && payload.page > 1) {
                this.saved = [...this.saved, ...res.data.results]
              } else {
                this.saved = res.data.results
              }
            }
            resolve(res)
          })
          .catch((err) => {
            console.error('Error fetching saved products:', err)
            reject(err.data)
          })
          .finally(() => {
            this.loading = false
            this.loadingMore = false
          })
      })
    },

    // Removes a product from saved list and updates the total count
    removeSavedProduct(productId: number) {
      this.saved = this.saved.filter((product: TProduct) => product.id !== productId)
    },
  },

  getters: {
    // Reactive getter for total number of saved products
    savedTotal(state) {
      return state.saved.length
    },
  },
})