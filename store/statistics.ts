import type {IStatistics } from '~/types/statistics'

interface IProductState {
  statistics?: IStatistics
}

export const useStatisticStore = defineStore('statisticStore', {
  state: (): IProductState => ({
    statistics: undefined,
  }),
  actions: {
    fetchData() {
      return new Promise((resolve, reject) => {
        useFetcher<IStatistics>('common/statistics/', {
          method: 'GET',
          params: {},
        })
          .then((res) => {
            this.statistics = res.data
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
  },
})
