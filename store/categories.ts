import type {TParams } from '~/types/params'
import type {TCategory, TCategoryResponse } from '~/types/categories'

export const useCategoriesStore = defineStore('categoriesStore', {
  state: () => ({
    listCategories: [] as TCategory[],
    listCategoriesLoading: true,
    listCategoriesCount: 0,
    popularCategories: [] as TCategory[],
    popularCategoriesLoading: true,
    headerCategories: [] as TCategory[],
    headerList: [] as TCategory[],
    headerListLoading: false,
    allCategories: [] as TCategory[],
    footerList: [] as Array<any>,
    footerListLoading: false,
  }),
  actions: {
    fetchPopularCategories() {
      return new Promise((resolve, reject) => {
        if (this.popularCategories.length > 0) {
          resolve(this.popularCategories)
        } else {
          useFetcher<TCategoryResponse>('products/popular-categories/', {
            method: 'GET',
            params: { size: 12 },
          })
            .then((res) => {
              this.popularCategories = res.data.results
              resolve(res)
            })
            .catch((err) => {
              reject(err.data)
            })
            .finally(() => (this.popularCategoriesLoading = false))
        }
      })
    },
    fetchAllCategories(params?: TParams, merge?: boolean) {
      this.listCategoriesLoading = true
      return new Promise((resolve, reject) => {
        useFetcher<TCategoryResponse>('products/categories-list/footer/', {
          method: 'GET',
          params: params,
        })
          .then((res) => {
            if (merge) {
              this.listCategories.push(...res.data.results)
            } else {
              this.listCategories = res.data.results
            }
            this.listCategoriesCount = res.data.total
            resolve(res)
          })
          .catch((err) => {
            reject(err.data)
          })
          .finally(() =>
            setTimeout(() => (this.listCategoriesLoading = false), 500)
          )
      })
    },
    fetchHeaderCategories() {
      return new Promise((resolve, reject) => {
        // if (this.headerCategories.length > 0) {
        //   resolve(this.headerCategories)
        // } else {
        useFetcher<TCategoryResponse>('products/categories-list/footer/', {
          method: 'GET',
        })
          .then((res) => {
            this.headerCategories = res.data.results
            resolve(res)
          })
          .catch((err) => {
            reject(err.data)
          })
        // }
      })
    },
    fetchHeaderList() {
      return new Promise((resolve, reject) => {
        // if (this.headerList.length > 0) {
        //   resolve(this.headerList)
        // } else {
        this.headerListLoading = true
        useFetcher<TCategoryResponse>('common/header-menu', {
          method: 'GET',
        })
          .then((res) => {
            this.headerList = res.data.results
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
          .finally(() => (this.headerListLoading = false))
        // }
      })
    },
    fetchFooterList() {
      return new Promise((resolve, reject) => {
        this.footerListLoading = true
        useFetcher<TCategoryResponse>('common/footer/', {
          method: 'GET',
        })
            .then((res) => {
              this.footerList = res.data.results
              resolve(res)
            })
            .catch((err) => {
              reject(err)
            })
            .finally(() => (this.footerListLoading = false))
        // }
      })
    },
    fetchAllProdsCategories() {
      return new Promise((resolve, reject) => {
        if (this.allCategories.length) {
          return resolve(this.allCategories)
        }
        useFetcher<TCategory[]>('products/categories/', {
          method: 'GET',
        })
          .then((res) => {
            this.allCategories = res.data
            resolve(res.data)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
  },
})
