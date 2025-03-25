<template>
  <div class="mt-5 pr-5 pl-5 pb-5 text-center">
    <p class="text-sm leading-[17px] text-normal text-gray-100 dark:text-white">
      {{ $t('send_code') }}
    </p>
    <FormInputOtp
      v-model="values.otp"
      :error="form.$v.value.otp.$error || otp_error"
      class="justify-center mt-6 mb-4"
    />
    <div v-if="!sent" class="flex-center gap-1.5">
      <p class="leading-[15px] dark:!text-white font-semibold">
        {{ $t('left_time') }}:
      </p>
      <CommonTimer
        :seconds="data?.verification_code?.wait || 60"
        @timeout="sent = true"
        class="text-red text-xs inline-block ml-2"
      />
    </div>
    <div v-else>
      <span
        @click="resend"
        class="text-red text-xs ml-1.5 cursor-pointer transition-300 ease-in-out hover:opacity-70"
      >
        {{ $t('resend_code') }}
      </span>
    </div>

    <div class="flex gap-2 bg-gray-600 p-3 rounded-lg mt-8 dark:bg-dark-500">
      <i class="icon-info text-dark-300 text-[30px] pt-0.5 dark:text-white" />
      <p class="text-xs dark:text-white">{{ $t('confirm_phone') }}</p>
    </div>

    <a :href="`tel:${address}`">
      <CommonButton
        :text="$t('callCenter')"
        class="w-full mt-3 leading-6"
        variant="primary-light"
      >
        <template #post-icon>
          <i class="icon-phone-calling text-[25px] pt-0.5" />
        </template>
      </CommonButton>
    </a>

    <CommonButton
      class="w-full mt-3 !py-3"
      :text="$t('save')"
      @click="submit"
      v-bind="{ loading }"
    />
  </div>
</template>

<script setup lang="ts">
import type { TForm } from '~/composables/useForm'
type TData = {
  expire: string
  id: number
  number: string
  verification_code: {
    phone: string
    sent: boolean
    wait: number
  }
  verify: boolean
}
const props = defineProps<{
  form: TForm<any>
  phone: string
  data: TData
  error: boolean
  otp_error?: boolean
  loading?: boolean
  address?: string
}>()
const { form } = unref(props)
const { values, $v } = form
const sent = ref(false)
const emit = defineEmits(['submit', 'resend'])

const submit = () => {
  $v.value.$touch()
  if (!form.$v.value.$invalid) {
    emit('submit', values.otp)
  }
}

const resend = () => {
  sent.value = false
  form.$v.value.$reset()
  emit('resend')
}

const previous = ref('')
watch(
  () => values.otp,
  () => {
    if (values.otp.length === 6 && values.otp !== previous.value) {
      previous.value = values.otp
    }
  }
)
</script>

<style scoped></style>
