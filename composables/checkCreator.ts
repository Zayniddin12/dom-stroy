import type { ICheck } from '~/types/order'
import { useOrderStore } from '~/store/order'
import * as pkg from 'vue-toastification'
const { useToast } = pkg

const toast = useToast()
export const useCheckCreator = () => {
  const checkList = ref<ICheck>()
  const calcError = ref(false)
  const calcLoading = ref(true)
  const errorMessage = ref<string | null>(null)  // New reactive reference for error messages
  const orderStore = useOrderStore()
  const { t: $t, locale } = useI18n()

  const calcPrice = async (params: object) => {
    calcLoading.value = true
    calcError.value = false
    errorMessage.value = null  // Reset error message
    orderStore.setCalcLoader(calcLoading.value)
    orderStore.setLocationError(calcError.value)

    try {
      const { data, error } = await useFetcher<ICheck>(
        `orders/order-price-calculator/`,
        {
          method: 'POST',
          body: {
            ...params,
          },
        }
      )

      if (data) {
        checkList.value = { ...data }
        orderStore.setCheckPrice(data)
        calcLoading.value = false
      }

      if (error) {
        errorMessage.value = error.data?.detail || $t('an_error_occurred')  // Set error message
        toast.error(errorMessage.value)
        calcError.value = true
      }
    } catch (err) {
      errorMessage.value = $t('an_error_occurred')  // Set a generic error message
      toast.error(errorMessage.value)
      calcError.value = true
    } finally {
      // Ensure loading state is updated regardless of success or failure
      calcLoading.value = false
      orderStore.setCalcLoader(calcLoading.value)
      orderStore.setLocationError(calcError.value)
    }
  }

  return {
    calcPrice,
    calcError,
    errorMessage,  // Expose the error message
    checkList,
    calcLoading,
  }
}