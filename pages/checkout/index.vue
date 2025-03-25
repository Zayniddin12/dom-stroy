<template>
  <div class="container mx-auto pb-10">
    <CommonBreadcrumb v-bind="{ routes }" />
    <h2
      class="text-dark dark:text-white leading-130 text-2xl md:text-[30px] font-bold mb-6 mt-8"
    >
      {{ $t('checkout') }}
    </h2>
    <div class="flex items-start space-x-5">
      <div class="lg:w-2/3 w-full">
        <CommonCheckoutStepper
          v-bind="{ step }"
          :list="orderFormStatus"
          class="mb-4"
        />
        <DeliveryWrapper
          :step="step"
          @next="step++"
          @back="--step"
          :total="total"
          :cards="paymentStore?.cards"
        />
      </div>
      <div class="w-1/3 lg:block hidden">
        <CardsTotal
          :key="step"
          :total="checkData"
          :goods="orderedData"
          class="mb-4"
          checkout
        />
        <OrderPromocode :price="checkData?.total_real_order_price" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useOrderStore } from '~/store/order'
import { usePaymentStore } from '~/store/payment'
import { orderFormStatus } from '~/config/global-config'
import { useBtsStore } from '~/store/bts'
const { t } = useI18n()
const orderStore = useOrderStore()
const paymentStore = usePaymentStore()
const btsStore = useBtsStore()

definePageMeta({
  middleware: ['auth'],
})
const step = ref<number>(1)
const routes = [
  {
    name: t('main'),
    route: '/',
  },
  {
    name: t('basket'),
    route: '/basket',
  },
  {
    name: t('checkout'),
  },
]
const orderedData = computed(() => {
  return orderStore.getOrderData()
})
const checkData = computed(() => {
  if (Object.keys(orderStore.checkPrice).length !== 0) {
    return orderStore.checkPrice
  } else {
    const rest = ref()
    if (process.client) {
      rest.value = JSON.parse(localStorage.getItem('check'))
    }
    return rest.value
  }
})
watch(
  () => step.value,
  () => {
    if (process.client) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
)
onMounted(() => {
  btsStore.fetchBts()
  paymentStore.fetchCards()
  paymentStore.fetchPaymentServices()
  if (process.client) {
    const res = localStorage.getItem('form')
    const form = JSON.parse(res)
    if (form) {
      step.value = form?.step
    } else {
      step.value = 1
    }
  }
})

onBeforeRouteLeave(() => {
  orderStore.promocode = null
})
// if (process.client) {
//   window.onbeforeunload = function (event) {
//     return confirm('Confirm refresh')
//   }
// }
</script>
