<template>
  <div>
    <div class="bg-white dark:bg-dark-100 p-5 rounded-xl">
      <h2 class="text-2xl font-bold leading-130 text-dark dark:text-white">
        {{ title }}
      </h2>
      <transition name="fade" mode="out-in">
        <div
          :key="commonForm.values.step"
          class="border-t border-gray-600 dark:border-dark-300 pt-4 mt-4"
        >
          <DeliveryAddres
            v-if="commonForm.values.step === 1"
            @submit="getUserAddress"
            @selectDistrict="selectTypePayment"
            :form="commonForm"
            :order-loading="calcLoading"
            :typeOfPayment="typOfPayment"
            :next-button-active="calcError"
          />
          <DeliveryContactDetail
            :form="commonForm"
            :verified="commonForm.values.contact.verified"
            v-if="commonForm.values.step === 2"
            @submit="getUserInfo"
            @back="$emit('back')"
            :order-loading="calcLoading"
          />
          <DeliveryPayment
            v-if="commonForm.values.step === 3"
            @back="$emit('back')"
            @submit="createOrder"
            :typeOfPayment="typOfPayment"
            :total="total"
            :form="commonForm"
            :order-loading="orderLoading"
          />
        </div>
      </transition>
    </div>
    <client-only>
      <DeliverySuccessfulOrdered
        :show="successModal"
        @close="successModal = false"
        @go-main="goToMain"
        :data="createdOrderData"
        :payment-type="commonForm.values.payment.paymentType"
        :form="commonForm"
      />
    </client-only>
    <DeliveryPhoneCheck
      :show="phoneModal"
      @close="phoneModal = false"
      @submit="onVerifyPhone"
      @re-send="resendCode"
      :formOtp="formOtp"
      :phone="commonForm.values.contact.receiverPhone2"
    />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth'
import { useOrderStore } from '~/store/order'
import type { IAddress } from '~/types/order'
import { useForm } from '~/composables/useForm'
import { required, minLength } from '@vuelidate/validators'
import { isPhone, deMask, debounce } from '~/helpers'
import * as pkg from 'vue-toastification'
const { calcPrice, calcError, calcLoading } = useCheckCreator()

const { useToast } = pkg

const toast = useToast()
const { t } = useI18n()
interface Props {
  step: number
  total?: object
  cards?: object
}

const router = useRouter()
const route = useRoute()
const emit = defineEmits<{
  (e: 'back'): void
  (e: 'next'): void
}>()

const props = withDefaults(defineProps<Props>(), {})
const authStore = useAuthStore()
const orderStore = useOrderStore()
const localePath = useLocalePath()

const orderLoading = ref(false)
const user = computed(() => authStore.user)
const successModal = ref(false)
const createdOrderData = ref({})
const phoneModal = ref(false)
const commonForm = useForm(
  {
    location: {
      address: '',
      region: {},
      district: {},
      longitude: '',
      latitude: '',
    },
    express: 1,
    contact: {
      receiverName: user.value?.full_name || '',
      receiverPhone: user.value?.phone || '',
      receiverPhone2: null,
      uuid: null,
      extraPhone: false,
      extraPhoneError: false,
      verified: false,
    },
    payment: {
      paymentType: '',
      activeTab: 'bank_card',
      card: 0,
      cardError: false,
    },
    step: 1,
    cashback: orderStore.cashback,
  },
  {
    location: {
      address: { required, minLength: minLength(4) },
      region: { required, minLength: minLength(1) },
      district: { required, minLength: minLength(1) },
      longitude: { required, minLength: minLength(2) },
      latitude: { required, minLength: minLength(2) },
    },
    contact: {
      receiverName: { required, minLength: minLength(4) },
      receiverPhone: { required, isPhone, minLength: minLength(9) },
    },
    payment: {
      paymentType: { required, minLength: minLength(1) },
    },
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
watch(
  () => props.step,
  () => {
    commonForm.values.step = props.step
  }
)
watch(
  () => user.value,
  () => {
    commonForm.values.contact.receiverName = user.value?.full_name || ''
    commonForm.values.contact.receiverPhone = user.value?.phone || ''
  },
  {
    deep: true,
    immediate: true,
  }
)
watch(
  () => route.query,
  () => {
    if (route.query?.payment_status && route.query.payment_id) {
      setTimeout(() => {
        getCreatedOrderData()
        successModal.value = true
      }, 200)
      setTimeout(() => {
        removeSavedForms()
      }, 3000)
    }
  },
  {
    deep: true,
    immediate: true,
  }
)
watch(
  () => commonForm.values.contact.receiverPhone2,
  () => {
    const phone = ref(commonForm.values.contact.receiverPhone2)
    if (isPhone(phone.value) && phone.value && phone.value?.length === 14) {
      checkPhoneNumber()
      commonForm.values.contact.extraPhoneError = false
    } else {
      if (phone.value?.length > 13) {
        commonForm.values.contact.extraPhoneError = true
      } else {
        commonForm.values.contact.extraPhoneError = false
      }
    }
    if (
      commonForm.values.contact.verified &&
      !isPhone(phone.value) &&
      phone.value?.length !== 14
    ) {
      commonForm.values.contact.verified = false
    }
  }
)
watch(
  () => commonForm.values.location.latitude,
  () => {
    if (
      commonForm.values.location.latitude &&
      commonForm.values.location.longitude
    ) {
      debounce('calculate-price', () => {
        calcPrice(calcParams.value)
      })
    }
  },
  {
    deep: true,
  }
)
watch(
  () => commonForm.values.express,
  (newValue) => {
    if (newValue !== undefined) {
      debounce('calculate-price', () => {
        calcPrice(calcParams.value)
      })
    }
  },
  { immediate: true }
)
watch(
  () => commonForm.values.step,
  () => {
    if (
      orderStore.checkPrice?.total_price === 0 &&
      commonForm.values.step === 3
    ) {
      createOrder()
    }
  },
  {
    deep: true,
  }
)
function goToMain() {
  successModal.value = false
  router.push(localePath({ path: '/' }))
}
function removeSavedForms() {
  if (process.client) {
    localStorage.removeItem('response')
    localStorage.removeItem('order')
    localStorage.removeItem('form')
  }
}
const typOfPayment = ref<{
  is_takeaway_available: boolean
  is_cache_available: boolean
}>()
function selectTypePayment(item) {
  typOfPayment.value = item
}
const title = computed(() => {
  if (props.step === 1) {
    return t('delivery_address')
  } else if (props.step === 2) {
    return t('contact_detail')
  } else {
    return t('payment')
  }
})

const paymentType = computed(() => {
  const paymentTyp = ref('cache')
  if (commonForm.values.payment.paymentType !== '1') {
    paymentTyp.value = 'online'
  }
  return paymentTyp.value
})
const calcParams = computed(() => {
  return {
    latitude: commonForm.values.location.latitude || undefined,
    longitude: commonForm.values.location.longitude || undefined,
    district: commonForm.values.location.district?.id || undefined,
    delivery_type: commonForm.values.express || 1,
    payment_type: paymentType.value || undefined,
    use_cashback: commonForm.values.cashback || undefined,
    promo_code: orderStore.promocode || undefined,
  }
})
watch(
  () => successModal.value,
  () => {
    if (!successModal.value) {
      router.push(localePath({ path: '/' }))
    }
  }
)
const getUserAddress = (e: IAddress) => {
  emit('next')
}
const getUserInfo = (e: object) => {
  emit('next')
}
function getCreatedOrderData() {
  if (process.client) {
    const res = JSON.parse(localStorage.getItem('response') ?? '{}')
    createdOrderData.value.id = res?.id
    createdOrderData.value.price = res?.order_price
    createdOrderData.value.cashback = res?.cashback_price
  }
}
const onVerifyPhone = () => {
  checkPhoneNumberCode()
}
onMounted(() => {
  if (process.client) {
    const res = localStorage.getItem('form')
    const form = JSON.parse(res ?? '{}')
    if (Object.keys(form)?.length) {
      commonForm.values.location.longitude = form.location?.longitude
      commonForm.values.location.latitude = form.location?.latitude
      commonForm.values.location.region = { ...form.location?.region }
      setTimeout(() => {
        commonForm.values.location.district = { ...form.location?.district }
        commonForm.values.location.address = form.location?.address
          ? form.location?.address
          : authStore.user?.address
          ? authStore.user?.address
          : ''
      }, 200)
      commonForm.values.contact.receiverName =
        form.contact?.receiverName || user.value?.full_name
      commonForm.values.contact.receiverPhone =
        form.contact?.receiverPhone || user.value?.phone
      commonForm.values.contact.extraPhone = form.contact?.extraPhone
      commonForm.values.contact.extraPhoneError = form.contact?.extraPhoneError
      commonForm.values.contact.receiverPhone2 =
        form.contact?.receiverPhone2 || null
      commonForm.values.payment.paymentType = form.payment?.paymentType
      commonForm.values.payment.activeTab =
        form.payment?.activeTab || 'bank_card'
      commonForm.values.payment.card = form.payment?.card
      commonForm.values.contact.verified = form.contact?.verified
      commonForm.values.contact.uuid = form.contact?.uuid
      if (form.cashback) {
        commonForm.values.cashback = form.cashback
        orderStore.setCashback(form.cashback)
      }
    }
  }
})
const createOrder = async () => {
  orderLoading.value = true
  const obj = ref({})
  if (
    orderStore.checkPrice?.total_price === 0 &&
    commonForm.values.step === 3
  ) {
    commonForm.values.payment.paymentType = '3'
  }
  const type = commonForm.values.payment.paymentType
  obj.value.address = commonForm.values.location.address
  obj.value.payment_type = commonForm.values.payment.paymentType
  obj.value.delivery_type = commonForm.values.express
  obj.value.receiver_fish = commonForm.values.contact.receiverName
  obj.value.receiver_phone = deMask(commonForm.values.contact.receiverPhone)
  obj.value.receiver_phone2_uuid = commonForm.values.contact.uuid || null
  obj.value.latitude = commonForm.values.location.latitude
  obj.value.longitude = commonForm.values.location.longitude
  obj.value.district = commonForm.values.location.district?.id
  obj.value.use_cashback_balance = commonForm.values.cashback
  obj.value.redirect_url =
    import.meta.env.VITE_PAYMENT_RETURN_URL ||
    'https://domstroymarket.uz/my-orders'
  if (commonForm.values.contact.receiverPhone2) {
    obj.value.receiver_phone2 = deMask(commonForm.values.contact.receiverPhone2)
  }
  if (+commonForm.values.payment.paymentType === 2) {
    obj.value.card = commonForm.values.payment.card
  }
  return new Promise((resolve, reject) => {
    useFetcher('orders/order/', {
      method: 'POST',
      body: {
        ...obj.value,
      },
    })
      .then((res) => {
        if (res?.data) {
          if (process.client) {
            localStorage.setItem('form', JSON.stringify(commonForm.values))
            localStorage.setItem('response', JSON.stringify(res?.data))
            if (
              type != '1' &&
              type != '2' &&
              orderStore.checkPrice?.total_price !== 0
            ) {
              window.location = res?.data?.payment_url
            } else {
              successModal.value = true
              createdOrderData.value.id = res?.data?.id
              createdOrderData.value.price = res?.data?.order_price
              createdOrderData.value.cashback = res?.data?.order_cashback
              createdOrderData.value.latitude = res?.data?.latitude
              createdOrderData.value.longitude = res?.data?.longitude
              orderStore.fetchCartProducts()
              authStore.getUser()
            }
          }
          setTimeout(() => {
            orderLoading.value = false
          }, 100)
        } else if (res?.error) {
          const text = res?.error?.data?.detail
          toast.error(text)
          setTimeout(() => {
            orderLoading.value = false
          }, 100)
        } else {
          setTimeout(() => {
            orderLoading.value = false
          }, 100)
        }
      })
      .catch((err) => {
        toast.error(t('error_server_text'))
        setTimeout(() => {
          orderLoading.value = false
        }, 100)
      })
  })
}
const resendCode = () => {
  checkPhoneNumber()
  toast.success(t('resend_success'))
}
async function checkPhoneNumber() {
  const newPhone = commonForm.values.contact.receiverPhone2?.replace(
    /[\s\-\(\)]/g,
    ''
  )
  if (!commonForm.values.contact.verified) {
    return await new Promise((resolve, reject) => {
      useFetcher('account/verification/SendCodeSMS/', {
        method: 'POST',
        body: {
          phone_number: newPhone,
        },
      }).then((res) => {
        if (res?.data) {
          commonForm.values.contact.uuid = res?.data?.uuid
          phoneModal.value = true
        }
        if (res?.error) {
          const text = res?.error?.data?.detail
          toast.error(text)
        }
      })
    })
  }
}
async function checkPhoneNumberCode() {
  return await new Promise((resolve, reject) => {
    useFetcher('account/verification/CheckCodeSMS/', {
      method: 'POST',
      body: {
        uuid: commonForm.values.contact.uuid,
        code: formOtp.values.otp,
      },
    }).then((res) => {
      if (res?.data) {
        commonForm.values.contact.verified = res?.data?.verified
        phoneModal.value = false
      }
      if (res?.error) {
        const text = res?.error?.data?.detail
        toast.error(text)
      }
    })
  })
}

watch(
  () => orderStore.promocode,
  () => {
    if (orderStore.promocode) {
      calcPrice(calcParams.value)
    }
  }
)
</script>
