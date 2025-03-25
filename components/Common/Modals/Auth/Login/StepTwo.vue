<template>
  <div class="h-full flex flex-col justify-between">
    <i
      v-if="!arrowFalse"
      class="text-dark dark:text-white inline-block text-3xl font-bold mb-12 icon-arrow-left transition-300 ease-in-out hover:text-gray-200 cursor-pointer"
      @click="emit('step-back')"
    ></i>
    <div :class="headingStyle">
      <h3 class="text-dark dark:text-white text-xl font-bold mb-3">
        {{ $t(bodyTitle) }}
      </h3>
      <div class="text-gray-100 dark:text-gray-300 text-sm mb-5">
        <p>{{ $t(bodyText) }}</p>
        <div class="flex-center mt-1">
          <span class="font-bold text-dark dark:text-white">
            +998 {{ phone }}
          </span>
          <span
            class="icon-edit-square text-xl cursor-pointer ml-1.5"
            @click="emit('step-back')"
          ></span>
        </div>
      </div>
      <FormInputOtp
        v-model="form.values.otp"
        :error="form.$v.value.otp.$error || error"
        class="ml-5"
      />
      <div class="mt-4">
        <span class="text-gray-200 text-xs">{{ $t('not_received_code') }}</span>
        <CommonTimer
          v-if="!timeout"
          :seconds="60"
          @timeout="timerFinishHandler"
          class="text-red text-xs inline-block ml-2"
        />
        <span
          v-else
          @click="resend"
          class="text-red text-xs ml-1.5 cursor-pointer transition-300 ease-in-out hover:opacity-70"
        >
          {{ $t('resend_code') }}
        </span>
      </div>
    </div>
    <CommonButton
      :loading="loading"
      :text="$t('approve')"
      class="w-full"
      @click="onSubmit"
    />
  </div>
</template>
<script setup lang="ts">
import { useForm } from '~/composables/useForm'
import { required, minLength } from '@vuelidate/validators'

interface Props {
  phone: string
  loading?: boolean
  error?: boolean
  arrowFalse?: boolean
  headingStyle?: string
  bodyTitle?: string
  bodyText?: string
}
const props = withDefaults(defineProps<Props>(), {
  headingStyle: 'text-center -mt-8',
  bodyTitle: 'enter_code',
  bodyText: 'code_sent_phone_reset',
})
const emit = defineEmits<{
  (e: 'step-back'): void
  (e: 'on-submit-otp', value: string): void
  (e: 'resend'): void
}>()

const form = useForm(
  {
    otp: '',
  },
  {
    otp: { required, minLength: minLength(6) },
  }
)

const previous = ref('')
watch(
  () => form.values.otp,
  () => {
    if (form.values.otp.length === 6 && form.values.otp !== previous.value) {
      previous.value = form.values.otp
    }
  }
)
const onSubmit = () => {
  if (!form.$v.value.$invalid) {
    emit('on-submit-otp', form.values.otp)
  }
}
const timeout = ref(false)
const timerFinishHandler = () => {
  timeout.value = true
}
const resend = () => {
  form.$v.value.$reset()
  timeout.value = false
  emit('resend')
}
</script>
