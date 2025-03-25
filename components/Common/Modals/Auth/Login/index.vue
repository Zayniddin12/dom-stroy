<template>
  <transition name="fade" mode="out-in">
    <div :key="step" class="h-full">
      <CommonModalsAuthLoginStepOne
        v-show="step === 1"
        :loading="loginLoading"
        :errors="errors"
        @on-submit="onSubmitStepOne"
        @forgot-password="emit('forgot-password')"
        @register="emit('register')"
      />
      <CommonModalsAuthLoginStepTwo
        v-if="false"
        :phone="form?.phone"
        @step-back="step = 1"
      />
    </div>
  </transition>
</template>
<script setup lang="ts">
import type { TLoginPayload } from '~/types/auth'
import { useAuthStore } from '~/store/auth'
import { useOrderStore } from "~/store/order";
import { deMask } from '~/helpers'
import * as pkg from 'vue-toastification'

const { useToast } = pkg
const toast = useToast()

const { t: $t } = useI18n()

const emit = defineEmits<{
  (e: 'forgot-password'): void
  (e: 'register'): void
  (e: 'close'): void
}>()
const step = ref(1)
const form = ref({})
const errors = reactive({
  phone: false,
  password: false,
})
const toggleErrors = (val: boolean) => {
  errors.phone = val
  errors.password = val
}

const authStore = useAuthStore()
const orderStore = useOrderStore()
async function onSubmitStepOne(data: TLoginPayload) {
  loginLoading.value = true
  toggleErrors(false)
  const id = useCookie('visitorId')
  const obj = ref({
    'Fingerprint': id.value
  })
  try {
    const res = await authStore.login({ ...data, phone: deMask(data.phone) })
    await orderStore.fetchCartProducts(obj.value)
    toast.success($t('login_successfully'))
    toggleErrors(false)
    emit('close')
  } catch (err: any) {
    toast.error(err?.detail)
    toggleErrors(true)
  }
  loginLoading.value = false
}

const loginLoading = ref(false)
</script>
