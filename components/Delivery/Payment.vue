<template>
  <div class="flex flex-col">
    <div class="flex space-y-4 flex-col">
      <div>
        <DeliveryToggle
          :data="tabs"
          :model-value="form.values.payment.activeTab"
          v-model="form.values.payment.activeTab"
        />
      </div>
      <transition name="fade" mode="out-in">
        <div :key="form.values.payment.activeTab">
          <div
            v-if="form.values.payment.activeTab === 'bank_card'"
            class="w-full"
          >
            <transition name="fade" mode="out-in">
              <div :key="addCardActive" class="w-full">
                <div v-if="!addCardActive">
                  <div class="flex gap-3 items-center flex-wrap">
                    <CardsPlastic
                      v-for="item of paymentStore?.cards"
                      :key="item.id"
                      :data="item"
                      :active="form.values.payment.card === item.id"
                      class="w-full sm:w-[48%] md:w-[32%] mb-4"
                      @click="activateCard(item.id, true)"
                      :loading="loading"
                      :class="loading && 'pointer-events-none'"
                    />
                  </div>
                  <CommonButton variant="light" @click="addCardFunc">
                    <span
                      class="icon-check-circle-regular text-[20px] leading-[20px]"
                    />
                    {{ $t('add_card') }}
                  </CommonButton>
                </div>
                <div v-else class="">
                  <DeliveryAddCard
                    :paymentForm="paymentForm"
                    :error="form.values.payment.cardError"
                  />
                </div>
              </div>
            </transition>
          </div>
          <div
            v-else-if="form.values.payment.activeTab === 'payment_service'"
            class="grid grid-cols-2 gap-x-4 gap-y-2 md:!grid-cols-3 md:!gap-x-6 md:!gap-y-4"
          >
            <template v-for="(item, index) of paymentServices" :key="index">
              <CardsPlastic
                v-if="item?.show"
                :data="item"
                :active="form.values.payment.paymentType === item.id"
                class="w-full"
                @click="activateCard(item.id, false)"
                :loading="loading"
                :class="[loading && 'pointer-events-none']"
                app
              />
            </template>
          </div>
        </div>
      </transition>
    </div>
    <div
      class="flex flex-col-reverse md:flex-row md:items-center md:justify-between border-t border-gray-600 pt-4 mt-4"
    >
      <CommonButton
        variant="secondary-light"
        class="md:w-1/4"
        @click="backFunc"
      >
        <span class="icon-arrow-left text-[24px] leading-[24px]" />
        {{ $t('back') }}
      </CommonButton>
      <CommonButton
        :disabled="!nextActive"
        class="md:w-1/4 mb-2 md:mb-0"
        @click="nextFunc"
        :loading="orderLoading || cardAddLoader"
        :text="$t('continue')"
      >
        <template #post-icon>
          <span class="icon-arrow-right text-[24px] leading-[24px]" />
        </template>
      </CommonButton>
    </div>
    <DeliveryCardChecker
      :show="checkActiveModal"
      @close="checkActiveModal = false"
      @submit="onVerifyCard"
      :formOtp="formOtp"
      :data="verificationData"
      @re-send="resendCardData"
    />
  </div>
</template>
<script setup lang="ts">
import { cardNumberValidator, checkExpireDate } from '~/helpers'
import { useForm } from '~/composables/useForm'
import { minLength, required } from '@vuelidate/validators'
import { GlobalConfig } from '~/config/global-config'
import { usePaymentStore } from '~/store/payment'
import type { TForm } from '~/composables/useForm'
import * as pkg from 'vue-toastification'
import { useOrderStore } from '~/store/order'

const { useToast } = pkg
const toast = useToast()
const { $listen } = useNuxtApp()
const { calcLoading, calcPrice } = useCheckCreator()
const { addCard, verifyCard, cardError, verification, cardAddLoader } =
  useCardController()
// #types
interface Props {
  step?: number
  total?: object
  data?: object
  form: TForm<any>
  orderLoading: boolean
  typeOfPayment: { is_takeaway_available: boolean; is_cache_available: boolean }
}
const props = withDefaults(defineProps<Props>(), {})
const { t } = useI18n()
const paymentStore = usePaymentStore()
const orderStore = useOrderStore()
paymentStore.fetchPaymentServices()
const router = useRouter()
const emit = defineEmits(['submit', 'back'])
const { form } = unref(props)
const { values, $v } = form
// #RegisterData

const loading = ref(true)
const activeCard = ref<number | null>(null)
const addCardActive = ref<boolean>(false)
const checkActiveModal = ref<boolean>(false)
const checkedCard = ref<boolean>(false)
const isCash = ref<boolean>(false)
const verificationData = ref({})
const successfulOrderedModal = ref<boolean>(true)
const paymentServices = computed(() => {
  return [
    {
      id: 1,
      label: 'with_cash',
      icon: '/images/logo/cash-logo.png',
      cash: true,
      show: paymentStore?.payments?.is_cash_valid,
    },
    // {
    //   id: 2,
    //   label: "with_card",
    //   icon: "/images/logo/karmonpay-dark.svg",
    //   show: paymentStore.payments?.is_cash_valid
    // },
    {
      id: 3,
      label: 'with_uzum',
      icon: '/images/logo/uzum.svg',
      show: paymentStore?.payments?.is_uzumbank_valid,
    },
    {
      id: 4,
      label: 'with_payme',
      icon: '/images/logo/payme.svg',
      show: paymentStore?.payments?.is_payme_valid,
    },
    {
      id: 5,
      label: 'with_click',
      icon: '/images/logo/click.svg',
      show: paymentStore?.payments?.is_click_valid,
    },
    {
      id: 7,
      label: 'with_paynet',
      icon: '/images/logo/paynet.svg',
      show: paymentStore?.payments?.is_paynet_valid,
    },
  ]
})

const cashForm = ref({
  id: 0,
  label: 'cash',
  icon: '/images/logo/cash.svg',
})

// #useForm

const paymentForm = useForm(
  {
    number: '',
    expire: '',
  },
  {
    number: { required, cardNumberValidator, minLength: minLength(19) },
    expire: { required, checkExpireDate },
  }
)

const formOtp = useForm(
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

const tabs = ref([
  {
    id: 'bank_card',
    title: t('bank_card'),
  },
  {
    id: 'payment_service',
    title: t('payment_service'),
  },
])

// #StepFunction
const backFunc = () => {
  if (addCardActive.value && !paymentStore.cards?.length) {
    paymentForm.values.expire = ''
    paymentForm.values.number = ''
    paymentForm.$v.value.$reset()
    emit('back')
  } else if (addCardActive.value && paymentStore.cards?.length) {
    addCardActive.value = false
    paymentForm.values.expire = ''
    paymentForm.values.number = ''
    paymentForm.$v.value.$reset()
  } else {
    emit('back')
  }
}

const nextFunc = () => {
  if (form.values.payment.activeTab === 'bank_card') {
    if (addCardActive.value || !paymentStore?.cards?.length) {
      addCards()
    } else {
      emit('submit', activeCard.value)
    }
  } else {
    emit('submit', activeCard.value)
  }
}
const resendCardData = () => {
  addCards()
  toast.success(t('resend_success'))
}
function addCards() {
  paymentForm.$v.value.$touch()
  if (!paymentForm.$v.value.$invalid) {
    const obj = ref({})
    obj.value.number = paymentForm.values.number.split(' ').join('')
    obj.value.expire = paymentForm.values.expire
    addCard(obj.value)
    paymentForm.$v.value.$reset()
  }
}

const paymentType = computed(() => {
  const paymentTyp = ref('cache')
  if (form.values.payment.paymentType === 1) {
    paymentTyp.value = 'cache'
  } else {
    paymentTyp.value = 'online'
  }
  return paymentTyp.value
})
const calcParams = computed(() => {
  return {
    latitude: form.values.location.latitude,
    longitude: form.values.location.longitude,
    district: form.values.location.district?.id,
    payment_type: paymentType.value,
    use_cashback: form.values.cashback,
    promo_code: orderStore.promocode || undefined,
  }
})
// #anotherFunction
const activateCard = (id: number, card: boolean) => {
  if (card) {
    form.values.payment.paymentType = 2
    form.values.payment.card = id
  } else {
    form.values.payment.paymentType = id
    form.values.payment.card = 0
  }
  if (!form.values.payment.activeTab) {
    isCash.value = false
  }
  calcPrice(calcParams.value)
}

const addCardFunc = () => {
  form.values.payment.paymentType = null
  addCardActive.value = true
}

const onVerifyCard = () => {
  let paymentSystem: string = String(paymentForm.values.number)
    .split('')
    .slice(0, 4)
    .join('')
  let pan = String(paymentForm.values.number).slice(
    paymentForm.values.number.length - 4,
    paymentForm.values.number.length
  )
  let systems = GlobalConfig.paymentSystems
  const logo = systems[paymentSystem as keyof typeof systems]
  verifyCard(formOtp.values.otp, verificationData.value?.id)
}
$listen('verify-modal', (data) => {
  checkActiveModal.value = true
  verificationData.value = { ...data }
})
$listen('verify-modal-close', (data) => {
  if (data?.verify) {
    checkActiveModal.value = false
    checkedCard.value = true
    addCardActive.value = false
    paymentForm.values.expire = ''
    paymentForm.values.number = ''
    paymentForm.$v.value.$reset()
  }
})
watch(
  () => form.values.payment.activeTab,
  (value) => {
    if (value === 'bank_card' && !paymentStore.cards?.length) {
      addCardActive.value = true
      form.values.payment.paymentType = ''
    } else {
      addCardActive.value = false
    }
    form.values.payment.paymentType = ''
    form.values.payment.card = ''
    paymentForm.values.number = ''
    paymentForm.values.expire = ''
    paymentForm.$v.value.$reset()
  }
)
watch(
  () => cardError?.error,
  (value) => {
    form.values.payment.cardError = value
  }
)
watch(
  () => paymentForm.values,
  () => {
    if (form.values.payment.cardError) {
      form.values.payment.cardError = false
    }
  },
  {
    deep: true,
  }
)
const nextActive = computed(() => {
  if (
    addCardActive.value &&
    paymentForm.values.expire &&
    paymentForm.values.number
  ) {
    return true
  } else if (!addCardActive.value && form.values.payment.paymentType) {
    return true
  } else {
    return false
  }
})
onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 300)
  if (!paymentStore.cards?.length) {
    addCardActive.value = true
  }
  if (form.values.payment.activeTab === 'payment_service') {
    addCardActive.value = false
  }
})
</script>
