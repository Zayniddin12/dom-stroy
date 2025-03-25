import { useSavedStore } from '~/store/saved'

import * as pkg from 'vue-toastification'
const { useToast } = pkg

const toast = useToast()



export const useSavedController = () => {
  const { t: $t, locale } = useI18n()
  const savedStore = useSavedStore()
  let errors = ref(false)
  const addSavedProduct = async (id?: string) => {
    errors.value = false
    try {
      const { data, error } = await useFetcher(`products/likes/like/${id}/`, {
        method: 'POST',
        body: {},
      })
      if(data) {
        await savedStore.fetchSavedProducts()
      }
      if (error) {
        toast.error(error.data?.detail || $t('an_error_occurred'))
        errors.value = true
      }
    } catch (err) {}
  }
  const deleteSavedProduct = async (id: number, route?: string) => {
    errors.value = false
    console.log('test', id)
      const { data, error } = await useFetcher(`products/likes/unlike/${id}/`, {
        method: 'DELETE',
        body: {},
      })
      if (error) {
        toast.error(error.data?.detail || $t('an_error_occurred'))
        errors.value = true
      } else {
        await savedStore?.removeSavedProduct(id)
        if (route !== `/${locale.value}/saved` && route !== '/saved') {
          await savedStore.fetchSavedProducts()
        }
      }
  }
  return {
    addSavedProduct,
    deleteSavedProduct,
    errors,
  }
}
