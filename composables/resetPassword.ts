import type {
  TResetPasswordNewPayload,
  TResetPasswordResponse,
} from '~/types/resetPassword'
import { formatPhoneNumber } from '~/helpers'
import type { TAuthTokens } from '~/types/auth'

import * as pkg from 'vue-toastification'
const { useToast } = pkg

const $toast = useToast()

export const useResetPassword = () => {
  const { t: $t } = useI18n()
  const signature = ref('')
  const loading = ref(false)
  const step = ref(1)
  const errors = reactive({
    phone: false,
    otp: false,
    passwords: false,
  })
  const tokens = reactive({
    access: '',
    refresh: '',
  })
  const passwordReset = async (phone: string) => {
    console.log('fewrf')
    step.value = 2
    loading.value = true
    errors.phone = false
    errors.otp = false
    try {
      const { data, error } = await useFetcher<
        TResetPasswordResponse,
        { detail: string }
      >('account/password-reset/', {
        method: 'POST',
        body: {
          phone,
        },
      })
      if (error) {
        $toast.error(error.data?.detail || $t('an_error_occurred'))
        errors.phone = true
      } else {
        signature.value = data.signature
        $toast.success(
          $t('reset_password_code_sent_to', {
            phone: '\n+' + formatPhoneNumber('+998' + phone),
          })
        )
        step.value = 2
        errors.phone = false
      }
    } catch (err) {
      console.log(err)
    }
    loading.value = false
  }

  const passwordVerify = async (code: string) => {
    loading.value = true
    errors.otp = false
    try {
      const { data, error } = await useFetcher<TAuthTokens, { detail: string }>(
        'account/password-reset/verify/',
        {
          method: 'POST',
          body: {
            code,
            signature: signature.value,
          },
        }
      )
      if (error) {
        const text = error?.data?.errors[0]?.message
        $toast.error(text || $t('an_error_occurred'))
        errors.otp = true
      } else {
        tokens.access = data.access
        tokens.refresh = data.refresh
        // $toast.success($t('checked'))
        step.value = 3
        errors.otp = false
      }
    } catch (err) {
      errors.otp = true
    }
    loading.value = false
  }

  const setNewPassword = async (payload: TResetPasswordNewPayload) => {
    loading.value = true
    errors.passwords = false
    try {
      const { data, error } = await useFetcher<any, { detail: string }>(
        'account/password-change-after-reset/',
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${tokens.access}`,
          },
          body: payload,
        }
      )
      if (error) {
        const text = error?.data?.response?._data?.errors[0]?.message
        $toast.error(text || $t('an_error_occurred'))
        errors.passwords = true
      } else {
        $toast.success(data?.message)
        step.value = 4
        errors.passwords = false
      }
    } catch (err) {
      errors.passwords = true
    }
    loading.value = false
  }

  return {
    passwordReset,
    loading,
    setNewPassword,
    passwordVerify,
    step,
    errors,
  }
}
