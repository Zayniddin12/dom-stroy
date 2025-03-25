import type {ICardAdd, IPaymentServices } from '~/types/payment'

export const usePaymentStore = defineStore('paymentStore', {
  state: () => ({
    cards: [],
    loading: true,
    payments: {} as IPaymentServices
  }),
  actions: {
    fetchCards() {
      this.loading = true
      return new Promise((resolve, reject) => {
        useFetcher('payments/cards/', {
          method: 'GET',
        })
          .then((res) => {
            this.cards = res.data.results
            resolve(res)
          })
          .catch((err) => {
            reject(err?.data)
          })
          .finally(() => (this.loading = false))
      })
    },
    fetchPaymentServices() {
      this.loading = true
      return new Promise((resolve, reject) => {
        useFetcher<IPaymentServices>('orders/payment-settings/', {
          method: 'GET',
        })
            .then((res) => {
              this.payments = res.data
              resolve(res)
            })
            .catch((err) => {
              reject(err?.data)
            })
            .finally(() => (this.loading = false))
      })
    },
  },
})
