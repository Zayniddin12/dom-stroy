<template>
  <CommonModalsModal
    :show="show"
    @close="$emit('close')"
    inside
    class="max-w-[520px]"
  >
    <div class="p-5">
      <transition name="fade" mode="out-in">
        <div :key="step">
          <p class="text-xl leading-6 font-bold text-dark dark:text-white">
            {{ $t('isMaster') }}
          </p>
        </div>
      </transition>
    </div>
    <transition name="fade" mode="out-in">
      <div :key="step">
        <MyCardsStepsMaster
          v-if="step === 1"
          :form="form"
          @submit="onCardAdd"
          :address="commonStore?.contacts?.phone"
          :loading="buttonLoading"
        />
        <MyCardsStepsMasterSecond
          v-if="step === 2"
          :form="otpForm"
          :data="verificationData"
          :otp_error="errorState"
          @submit="onVerifyCard"
          @resend="onCardAdd"
          v-bind="{ loading }"
          :address="commonStore?.contacts?.phone"
        />

        <!--          <MyCardsStepsMasterThird-->
        <!--              v-if="step === 3"-->
        <!--              :form="promoForm"-->
        <!--              @submit="onProAdd"-->
        <!--              v-bind="{ loading }"-->
        <!--              :address="commonStore?.contacts?.phone"-->

        <!--          />-->
      </div>
    </transition>
  </CommonModalsModal>
</template>
<script setup lang="ts">
import { useForm } from '~/composables/useForm'
import { minLength, required } from '@vuelidate/validators'
import { isValidPhone } from '~/composables/register'
import { useCommonStore } from '~/store/common'
import { useToast } from 'vue-toastification'

const { cardError, loading, resend } = useCardController()
const { t: $t } = useI18n()

const buttonLoading = ref(false)

interface Props {
  show: boolean
}
const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits<{
  (e: 'close'): void
}>()
const step = ref(1)
const $toast = useToast()
const verificationData = ref()
const errorState = ref(false)
const form = useForm(
  {
    number: null,
  },
  {
    number: { required, isValidPhone },
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
const promoForm = useForm(
  {
    number: '',
  },
  {
    required,
    number: { minLength: minLength(3) },
  }
)
watch(
  () => props.show,
  () => {
    if (!props.show) {
      step.value = 1
      form.values.number = ''
      otpForm.values.otp = ''
      form.$v.value.$reset()
      otpForm.$v.value.$reset()
    }
  }
)
watch(
  () => cardError.error,
  (value) => {
    errorState.value = value
  }
)
watch(
  () => otpForm.values.otp,
  () => {
    if (errorState.value) {
      errorState.value = false
    }
  }
)
const onCardAdd = () => {
  buttonLoading.value = true
  useFetcher('account/request-for-master/', {
    method: 'POST',
    body: {
      phone: form.values.number?.replace(/\D/g, ''),
    },
  })
    .then((res: any) => {
      if (res?.data?.is_master) {
        step.value = 2
      } else {
        $toast.error($t('you_are_not_master'))
      }
    })
    .finally(() => {
      buttonLoading.value = false
    })
}

const onProAdd = () => {
  emit('submit')
}

const onVerifyCard = async () => {
  try {
    const { data: resData, error } = await useFetcher(
      `account/verify-request-for-master/`,
      {
        method: 'POST',
        body: {
          phone: form.values.number.replace(/\D/g, ''),
          otp: otpForm.values.otp,
        },
      }
    ).then((res) => {
      if (res.error) {
        $toast.error(res.error.data?.message)
      }
      if (res.data.is_master) {
        $toast.success(res.data.message)
      } else {
      }
    })
  } catch (error) {}
}
const commonStore = useCommonStore()
commonStore.fetchContacts()
</script>
<style>
.modal-right-side {
  background: linear-gradient(192.83deg, #eb2859 -6.24%, #792036 92.34%);
}
</style>
