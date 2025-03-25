import { usePaymentStore } from "~/store/payment";
import type {ICardAdd} from "~/types/payment";

import * as pkg from 'vue-toastification'
const { useToast } = pkg

const toast = useToast()

export const useCardController = () => {
    const { t: $t } = useI18n()
    const paymentStore = usePaymentStore()
    const { $event } = useNuxtApp()
    const cardError = reactive({
        error: false
    })
    const loading = ref(false)
    const cardAddLoader = ref(false)
    let verification = ref()
    const addCard = async (params?: ICardAdd) => {
        loading.value = true
        cardAddLoader.value = true
        cardError.error = false
        try {
            const { data, error } = await useFetcher(`payments/cards/create/`, {
                method: 'POST',
                body: { ...params },
            })
            if(data) {
                $event('verify-modal', data)
                loading.value = false
                cardError.error = false
                setTimeout(() => {
                    cardAddLoader.value = false
                }, 200)
            }
            if (error) {
                const text = error.data?.detail
                console.log(text)
                toast.error(error.data?.detail)
                cardError.error = true
                loading.value = false
                setTimeout(() => {
                    cardAddLoader.value = false
                }, 200)
            } else {
                setTimeout(() => {
                    cardAddLoader.value = false
                }, 200)
            }
        } catch (err) {
            console.log(err)
        }
    }
    const verifyCard = async (otp: string, id: number) => {
        cardError.error = false
        loading.value = true
        try {
            const { data, error } = await useFetcher(`payments/cards/verify/${id}/`, {
                method: 'POST',
                body: {
                    code: otp
                },
            })
            if(data) {
                $event('verify-modal-close', data)
                await paymentStore.fetchCards()
                setTimeout(() => {
                    loading.value = false
                }, 200)
            }
            if (error) {
                const text = error.data?.errors[0]?.message
                toast.error(error.data?.errors[0]?.message || $t('an_error_occurred'))
                cardError.error = true
                setTimeout(() => {
                    loading.value = false
                }, 200)
            }
        } catch (err) {}
    }
    const deleteCard = async (id: number) => {
        try {
            const { data, error } = await useFetcher(`payments/cards/remove/${id}/`, {
                method: 'DELETE',
                body: {},
            })
            await paymentStore.fetchCards()
        } catch (err) {}
    }


    return {
        addCard,
        verifyCard,
        deleteCard,
        cardError,
        verification,
        loading,
        cardAddLoader
    }
}