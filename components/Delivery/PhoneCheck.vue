<template>
  <CommonModalsModal :show="show" inside @close="emit('close')">
    <div class="p-5">
      <p class="text-xl leading-6 font-bold text-dark dark:text-white">
        {{ $t('submit') }}
      </p>
    </div>

    <div class="mt-5 pr-5 pl-5 pb-5 text-center">
      <p
        class="text-base leading-[19px] text-dark font-semibold mb-2 dark:text-white"
      >
        {{ $t('enter_confirm_code') }}
      </p>
      <div class="text-gray-100 text-sm mb-5">
        <p>{{ $t('code_sent_phone') }}</p>
        <div class="flex-center">
          <span class="font-bold text-dark"> +998 {{ phone }} </span>
          <i
            class="icon-edit-square text-2xl ml-2 cursor-pointer"
            @click="emit('close')"
          />
        </div>
      </div>
      <FormInputOtp
        v-model="formOtp.values.otp"
        :error="formOtp.$v.value.otp.$error"
        class="justify-center mt-6 mb-4"
      />
      <div v-if="!sent" class="flex-center gap-1.5">
        <p class="text-gray-200 text-xs leading-[15px] font-normal">
          {{ $t('left_time') }}:
        </p>
        <CommonTimer
          :seconds="60"
          @timeout="sent = true"
          class="text-red text-xs inline-block ml-2"
        />
      </div>
      <div v-else>
        <span class="text-gray-200 text-xs">{{ $t('not_received_code') }}</span>
        <span
          @click="resend"
          class="text-red text-xs ml-1.5 cursor-pointer transition-300 ease-in-out hover:opacity-70"
        >
          {{ $t('resend_code') }}
        </span>
      </div>
      <CommonButton class="w-full mt-16" :text="$t('submit')" @click="submit" />
    </div>
  </CommonModalsModal>
</template>
<script setup lang="ts">
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
interface Props {
  show: boolean
  formOtp: object
  phone: string
  data: TData
}

const props = defineProps<Props>()

const { formOtp } = unref(props)

const emit = defineEmits(['submit', 'close', 're-send'])

const sent = ref(false)
const previous = ref('')

watch(
  () => props.show,
  () => {
    if (!props.show) {
      formOtp.values.otp = ''
      formOtp.$v.value.$reset()
    }
  }
)
watch(
  () => formOtp.values.otp,
  () => {
    if (
      formOtp.values.otp.length === 6 &&
      formOtp.values.otp !== previous.value
    ) {
      previous.value = formOtp.values.otp
      submit()
    }
  }
)
const submit = () => {
  formOtp.$v.value.$touch()
  if (!formOtp.$v.value.$invalid) {
    emit('submit')
  }
}
const resend = () => {
  sent.value = false
  formOtp.$v.value.$reset()
  emit('re-send')
}
</script>
<style>
.modal-right-side {
  background: linear-gradient(192.83deg, #eb2859 -6.24%, #792036 92.34%);
}
</style>
