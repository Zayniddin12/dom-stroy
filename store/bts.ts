import type {IBtsBranches } from '~/types/bts'

interface IBtsStore {
  bts?: IBtsBranches
}

export const useBtsStore = defineStore('statisticStore', {
  state: (): IBtsStore => ({
    bts: [],
  }),
  actions: {
    fetchBts() {
      return new Promise((resolve, reject) => {
        useFetcher<IBtsBranches>('delivery_bts/branches/', {
          method: 'GET',
        })
          .then((res) => {
            this.bts = res.data
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
  },
})
