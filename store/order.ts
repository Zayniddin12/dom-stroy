import type {
  TOrder,
  TCartData,
  IProduct,
  IOrderList,
  IOrderItems,
    ICheck
} from '~/types/order'

export const useOrderStore = defineStore('orderStore', {
  state: () => ({
    orderData: <TOrder>{},
    cartData: [] as IProduct[],
    loading: true as boolean,
    userOrderData: [] as IProduct[],
    orders: [] as IOrderItems[],
    orderLoading: true as boolean,
    ordersTotal: 0,
    cashback: false,
    checkPrice: {} as ICheck,
    calcPriceLoader: true,
    locationError: false,
    promocode: null,
  }),
  actions: {
    getCartData() {
      return this.cartData
    },
    getCartTotal() {
      return this.cartData?.length
    },
    getOrderData() {
      if (process.client) {
        const order = localStorage.getItem('order')
        const res = JSON.parse(order || '')

        if (res?.length) {
          this.userOrderData = [...res]
        }
      }
      return this.userOrderData
    },
    fetchCartProducts(payload?: object, load?: boolean) {
      if(load) {
        this.loading = true
      }
      return new Promise((resolve, reject) => {
        useFetcher<TCartData>('orders/cart/products/', {
          method: 'GET',
          params: {
            ...payload
          },
        })
          .then((res) => {
            this.cartData = res.data?.products
            resolve(res)
          })
          .catch((err) => {
            reject(err.data)
          })
          .finally(() => {
            setTimeout(() => {
              this.loading = false
            }, 500)
          })
      })
    },
    fetchOrders(page: number) {
      this.loading = true
      return new Promise((resolve, reject) => {
        useFetcher<IOrderList>(`orders/`, {
          method: 'GET',
          params: {
            page: page,
            status__in: "3,4,5"
          },
        })
          .then((res) => {
            if (res?.data) {
              this.ordersTotal = res?.data?.total
              if (page > 1 && this.orders.length) {
                this.orders = [...this.orders, ...res?.data?.results]
              } else {
                this.orders = res?.data?.results
              }
              resolve(res?.data)
            }
            if (res?.error) {
              reject(res?.error)
              // showError({ statusCode: 404, statusMessage: 'Page Not Found' })
            }
          })
          .finally(() => {
            setTimeout(() => {
              this.loading = false
            }, 400)
          })
      })
    },
    setCashback(cashback: boolean) {
      this.cashback = cashback
    },
    setCheckPrice(obj: ICheck) {
      this.checkPrice = { ...obj }
      if (process.client) {
        localStorage.setItem('check', JSON.stringify(obj))
      }
    },
    setCalcLoader(load: boolean) {
      this.calcPriceLoader = load
    },
    setLocationError(error: boolean) {
      this.locationError = error
    },
    removeCardDataProduct(e: number) {
      if(this.cartData?.length) {
        this.cartData = this.cartData?.filter((el: IProduct) => el.product?.id !== e)
      }
    }
  },
})
