<template>
  <div>
    <CommonModalsModal :show="show" @close="$emit('close')" inside class="max-w-[520px]">
      <div class="p-5">
        <transition name="fade" mode="out-in">
          <div :key="step">
            <p class="text-xl leading-6 font-bold text-dark dark:text-white">
              {{ step === 1 ? $t('add_card') : $t('submit') }}
            </p>
          </div>
        </transition>
      </div>

      <transition name="fade" mode="out-in">
        <div :key="step">
          <MyCardsStepsFirst
            v-if="step === 1"
            :form="form"
            @submit="onCardAdd"
            v-bind="{ loading }"
          />
          <MyCardsStepsSecond
            v-if="step === 2"
            :form="otpForm"
            :data="verificationData"
            :otp_error="errorState"
            @submit="onVerifyCard"
            @resend="onCardAdd"
            v-bind="{ loading }"
          />
        </div>
      </transition>
    </CommonModalsModal>
  </div>
</template>
<script setup lang="ts">
import { useForm } from '~/composables/useForm'
import { minLength, required } from '@vuelidate/validators'
import { cardNumberValidator, checkExpireDate } from '~/helpers'

const { addCard, verifyCard, cardError, loading, resend } = useCardController()
interface Props {
  show: boolean
}
const  { $listen } = useNuxtApp()
const props = withDefaults(defineProps<Props>(), {})
const emit  = defineEmits<{
  (e: 'close'): void
}>()
const step = ref(1)
const verificationData = ref()
const errorState = ref(false)
const form = useForm(
  {
    number: '',
    expire: '',
  },
  {
    number: { required, cardNumberValidator, minLength: minLength(19) },
    expire: { required, checkExpireDate },
  }
)

const otpForm = useForm(
  {
    otp: '',
  },
  {
    otp: {
      required,
      minLength: minLength(6),
    },
  }
)

watch(
  () => props.show,
  () => {
    if (!props.show) {
      step.value = 1
      form.values.number = ''
      form.values.expire = ''
      otpForm.values.otp = ''
      form.$v.value.$reset()
      otpForm.$v.value.$reset()
    }
  }
)
watch(() => cardError.error, (value) => {
  errorState.value = value
})
watch(() => otpForm.values.otp, () => {
  if(errorState.value) {
    errorState.value = false
  }
})
const onCardAdd = () => {
  const obj = {
    number: form.values.number.split(" ").join(''),
    expire: form.values.expire
  }
  addCard(obj)
}
const onVerifyCard = () => {
  verifyCard(otpForm.values.otp, verificationData.value?.id)
  otpForm.$v.value.$reset()
}
$listen('verify-modal', (data) => {
  verificationData.value = { ...data }
  step.value = 2
})
$listen('verify-modal-close', (data) => {
  emit('close')
  otpForm.$v.value.$reset()
})

</script>
<style>
.modal-right-side {
  background: linear-gradient(192.83deg, #eb2859 -6.24%, #792036 92.34%);
}
</style>
