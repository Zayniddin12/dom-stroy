import * as pkg from 'vue-toastification'
const { useToast } = pkg
import { useOrderStore } from '~/store/order'

const $toast = useToast()

export const useBasketController = () => {
  const { t: $t, locale } = useI18n()
  const orderStore = useOrderStore()
  const errors = reactive({
    phone: false,
    otp: false,
  })
  const addToCard = async (product: string, amount: number, route?: string) => {
    try {
      const { error } = await useFetcher('orders/cart/', {
        method: 'POST',
        body: {
          product,
          amount,
        },
      })
      if (error) {
        $toast.error(error?.data?.detail || $t('an_error_occurred'))
      } else {
        if (route !== `basket___${locale.value}`) {
          await orderStore.fetchCartProducts()
        }
      }
    } catch (err) {}
  }
  const removeFromCart = async (id: number) => {
    try {
      const { data, error } = await useFetcher('orders/cart/', {
        method: 'POST',
        body: {
          product: id,
          amount: 0,
        },
      })
      if (error) {
        $toast.error(error?.data?.detail || $t('an_error_occurred'))
        errors.phone = true
      } else {
        await orderStore.fetchCartProducts()
      }
    } catch (err) {}
  }
  return {
    addToCard,
    removeFromCart,
  }
}
