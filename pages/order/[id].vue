<template>
  <div class="container">
    <CommonBreadcrumb v-bind="{ routes }" />
    <div class="mt-4 flex items-center">
      <CommonButton
        class="icon-arrow-left-solid"
        variant="secondary"
        text=""
        @click="$router.go(-1)"
      />
      <h2
        class="ml-4 font-normal leading-tight text-dark-200 dark:text-white text-[32px] transition-300"
      >
        {{ orderId }}
      </h2>
    </div>
    <div class="grid md:grid-cols-12 gap-6 mt-6 pb-10">
      <div class="md:col-span-8">
        <CommonCheckoutStepper
          :step="stepperStatus"
          :list="orderStatus"
          class="mb-4 !w-full"
        />
        <transition name="fade" mode="out-in">
          <div :key="status">
            <OrderStatus
              v-if="status === 5 || status === 6"
              v-bind="{
                status,
                logs: single?.status_logs,
                loading,
                courier: single?.courier,
              }"
            />
            <div class="bg-white dark:bg-dark-100 rounded-xl px-5">
              <template v-if="!loading">
                <div v-if="single?.order_products?.length">
                  <CardsOrderCardSingle
                    v-for="(item, index) in single?.order_products"
                    :discount="single?.discount"
                    :key="index"
                    :data="item"
                    v-bind="{ loading }"
                  />
                </div>
                <CommonNoData
                  v-else
                  class="py-9"
                  img="/images/no-data/products.svg"
                  :title="$t('no_cards')"
                  :subtitle="$t('no_orders')"
                />
              </template>
              <div v-else>
                <CardsOrderCardSingle
                  type="group"
                  v-for="(item, index) in 2"
                  :key="index"
                  :data="item"
                  loading
                />
              </div>
            </div>
          </div>
        </transition>
      </div>
      <div class="md:col-span-4">
        <CardsOrderCardCheck
          :id="single?.id"
          :list="checkList"
          v-bind="{ loading }"
          :status="single?.status"
          class="mb-4"
        />
        <CardsTotal
          v-bind="{ loading }"
          :total="checkData"
          :goods="single?.order_products"
          class="mb-4"
          order
        />

        <div
          v-if="single?.delivery_type === 3"
          class="mt-4 p-3 bg-[#FFFFFF] dark:bg-[#ffffff1a] !relative rounded-xl"
        >
          <h2 class="text-dark-200 dark:text-white text-xl pb-2">
            {{ $t('choose_takeaway_location') }}
          </h2>
          <DeliveryMap
            :location-list="locationList"
            @update:model-value="updateCoordinates"
            class="h-36 !rounded-xl"
          />
          <div class="relative">
            <img class="absolute z-2" src="/images/location.svg" alt="image" />
            <a
              :href="`https://yandex.uz/maps/?ll=${
                selectedCoordinates[0] ?? 69.26861792476403
              },${
                selectedCoordinates[1] ?? 41.340635417786
              }&mode=routes&rtext=~${
                selectedCoordinates[1] ?? 41.340635417786
              },${selectedCoordinates[0] ?? 69.26861792476403}&ruri=~&z=12`"
              target="_blank"
              class="mx-auto w-full"
            >
              <CommonButton
                class="mx-auto !py-2.5 z-1 w-full"
                :text="$t('pick_up_address')"
                :disabled
              />
            </a>
          </div>
        </div>
        <a
          v-if="single?.delivery_type === 3"
          :href="`tel:${commonStore.contacts?.phone}`"
          class="px-3 py-2 flex justify-between items-center bg-[#292929] rounded-xl mt-4 border border-transparent hover:border-red cursor-pointer duration-300"
        >
          <p class="text-sm font-medium tracking-[0.15px] text-white">
            {{ $t('contact_with_us') }}
          </p>
          <span class="rounded-lg bg-[#ffffff52] px-3 py-0.5 w-max block">
            <img src="/images/phone.svg" alt="ico" />
          </span>
        </a>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { OrderSingle } from '~/types/order'
import { orderStatus } from '~/config/global-config'
import { useOrderStore } from '~/store/order'
import { phone } from '~/helpers'
import { ref } from 'vue'
import { useCommonStore } from '~/store/common'

const { t } = useI18n()
const route = useRoute()
const locationList = ref([])
const selectedCoordinates = ref([])
const disabled = ref(true)
const routes = ref([
  {
    name: t('main'),
    route: '/',
  },
  {
    name: t('my_orders'),
    route: '/my-orders',
  },
  {
    name: t('history_of_orders'),
    route: '/my-orders/history',
  },
  {
    name: route?.params?.id,
  },
])
const orderStore = useOrderStore()
const { calcLoading } = useCheckCreator()

const orderId = computed(() => {
  return `# ${route?.params?.id}`
})

const commonStore = useCommonStore()
const single = ref<OrderSingle>()
const loading = ref(true)
const api = useApi()

function updateCoordinates(coordinates) {
  disabled.value = false
  selectedCoordinates.value = coordinates
}

fetchSingleOrder(route?.params?.id)
function fetchSingleOrder(id: number) {
  loading.value = true
  return new Promise((resolve, reject) => {
    useFetcher<OrderSingle>(`orders/${id}/`, {
      method: 'GET',
    })
      .then((res) => {
        if (res?.data) {
          single.value = res?.data
          resolve(res?.data)
        }
        if (res?.error) {
          reject(res?.error)
          showError({ statusCode: 404, statusMessage: 'Page Not Found' })
        }
      })
      .finally(() => {
        setTimeout(() => {
          loading.value = false
        }, 400)
      })
  })
}

function getLocations() {
  api.actionGet('GET', 'settings/takeaway-locations/').then((response) => {
    locationList.value = response.results.map((branch: any) => {
      return {
        id: branch.id,
        coordinates: [branch.location.longitude, branch.location.latitude],
      }
    })
  })
}

const btsData = ref()

onMounted(() => {
  getLocations()
  const route = useRoute()
  const orderId = +route?.params?.id

  if (orderId) {
    fetchSingleOrder(orderId)
      .then((data) => {})
      .catch((error) => {
        console.error('Failed to fetch order data:', error)
      })
  } else {
    console.warn('Invalid order ID:', route?.params?.id)
  }

  api
    .actionGet('GET', `/delivery_bts/order/${route?.params?.id}/`)
    .then((res) => {
      btsData.value = res
      console.log(res)
      console.log(btsData.value?.status)
    })
})

const status = computed<number | undefined>(() => {
  return single.value?.status
})

const stepperStatus = computed<number>(() => {
  if (single.value?.status === 5) {
    return 2
  } else if (single.value?.status === 6) {
    return 3
  } else {
    return 1
  }
})
// Check list
const checkList = computed(() => {
  const list = [
    {
      title: 'receiver',
      value: single.value?.receiver_fish,
    },
    {
      title: 'phone',
      value: phone('+998' + single.value?.receiver_phone),
    },
    {
      title: 'address',
      value: single.value?.address,
    },
    {
      title: 'products_count',
      value: single.value?.product_count,
    },
  ]
  if (btsData.value) {
    list.unshift({
      title: 'bts_status',
      value: btsData.value?.status,
    })
  }
  return list
})
const checkData = computed(() => {
  return {
    cacheback_earning: single.value?.order_cashback,
    cashback_price: single.value?.cashback_price,
    delivery_price: single.value?.delivery_price,
    delivery_type: getDeliveryType(single.value?.delivery_type),
    nds: single.value?.nds?.percent,
    nds_price: single.value?.nds?.price,
    total_order_discount_price: single.value?.discount,
    total_order_price: single.value?.order_price,
    total_price: single.value?.order_price,
    total_real_order_price: single.value?.total_price,
  }
})
const getDeliveryType = (id: number) => {
  if (id === 1) {
    return 'BTS delivery to office'
  } else if (id === 3) {
    return 'Take away'
  } else {
    return 'Own delivery'
  }
}
</script>
