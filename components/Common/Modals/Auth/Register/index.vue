<template>
  <transition name="fade" mode="out-in">
    <div :key="step" class="h-full">
      <CommonModalsAuthRegisterStepOne
        v-show="step === 1"
        @login="emit('login')"
        :form-data="form"
        @on-submit="onSubmitStepOne"
        v-bind="{ loading, phoneError: errors.phone }"
      />
      <CommonModalsAuthLoginStepTwo
        v-show="step === 2"
        :phone="form.values.stepOne.phone"
        @step-back="step = 1"
        @on-submit-otp="onSubmitStepTwo"
        @resend="resendForOtp"
        v-bind="{ loading, error: errors.otp }"
      />
      <CommonModalsAuthRegisterLastStep
        v-show="step === 3"
        @on-submit="submit"
        v-bind="{ loading, error: errors.password }"
      />
    </div>
  </transition>
</template>
<script setup lang="ts">
import type { TAuthRegisterEntryPayload } from '~/types/auth'
import { useForm } from '~/composables/useForm'
import { required } from '@vuelidate/validators'
import { isPhone } from '~/helpers'

const emit = defineEmits<{
  (e: 'forgot-password'): void
  (e: 'login'): void
  (e: 'close'): void
}>()

const { step, loading, entrypoint, errors, verify, completeRegister, resend } =
  useRegister()

const form = useForm(
  {
    stepOne: {
      phone: '',
      full_name: '',
      district: '',
      region: '',
      checked: false,
    },
  },
  {
    stepOne: {
      phone: { required, isPhone },
      full_name: { required },
      district: { required },
      region: { required },
      checked: {
        sameAs: (val: boolean) => {
          return val
        },
      },
    },
  }
)
function onSubmitStepOne(data: TAuthRegisterEntryPayload) {
  entrypoint(data)
}
function onSubmitStepTwo(otp: string) {
  verify(otp)
}
async function submit(data: { password: string; rePassword: string }) {
  await completeRegister(data.password)
  if (step.value === 4) {
    emit('close')
  }
}
const resendForOtp = () => {
  form.$v.value.$reset()
  resend()
}
</script>
