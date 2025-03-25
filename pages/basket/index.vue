<template>
  <div class="container mx-auto">
    <CommonBreadcrumb v-bind="{ routes }" />
    <p
      class="text-dark dark:text-white leading-130 text-2xl md:text-[30px] font-bold my-6"
    >
      {{ $t('basket') }}
    </p>
    <div class="grid grid-cols-12 space-x-5 pb-10 basket__main">
      <div
        class="bg-white dark:bg-dark-100 w-full h-fit lg:col-span-8 col-span-12 rounded-xl px-5"
      >
        <template v-if="!orderStore?.loading">
          <div v-if="orderStore?.cartData?.length">
            <CardsOrderCardCart
              type="cart"
              v-for="(item, index) in orderStore?.cartData"
              :key="index"
              :data="item"
              :loading="orderStore?.loading"
              :route="route?.name"
              v-model="form[index].count"
              @delete="deleteProduct"
            />
          </div>
          <CommonNoData
            v-else
            class="py-9"
            img="/images/no-data/products.svg"
            :title="$t('no_cards')"
            :subtitle="$t('no_saved_products')"
          />
        </template>
        <div v-else>
          <CardsOrderCardCart
            type="cart"
            v-for="(item, index) in 3"
            :key="index"
            :data="item"
            loading
          />
        </div>
      </div>
      <div class="lg:col-span-4 col-span-12 main__basket-right">
        <CardsTotal
          :total="checkList"
          :goods="form"
          class="mb-4"
          :loading="calcLoading"
          basket
        />
        <CommonButton
          class="w-full"
          :disabled="!orderStore?.cartData?.length"
          @click="createOrder"
          :loading="false"
        >
          {{ $t('go_to_checkout') }}
        </CommonButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useOrderStore } from '~/store/order'
import { useAuthStore } from '~/store/auth'

const authStore = useAuthStore()
const { $event } = useNuxtApp()
const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const orderStore = useOrderStore()
const localePath = useLocalePath()
const { checkList, calcPrice, calcLoading } = useCheckCreator()
const { removeFromCart } = useBasketController()

orderStore.fetchCartProducts({}, true)
const form = ref([])
const calcParams = computed(() => {
  return {
    latitude: null,
    longitude: null,
    payment_type: 'cache',
  }
})
watch(
  () => orderStore.cartData,
  (value) => {
    form.value = value?.map((el: object) => {
      return {
        ...el,
        count: '',
      }
    })
  },
  {
    deep: true,
    immediate: true,
  }
)
watch(
  () => form.value,
  (value) => {
    const val = JSON.stringify(value)
    if (process.client) {
      localStorage.setItem('order', val)
      // orderStore.fetchCartProducts()
    }
    setTimeout(() => {
      calcPrice(calcParams.value)
    })
  },
  {
    deep: true,
  }
)
const user = computed(() => authStore.user)
const deleteProduct = (e: number) => {
  removeFromCart(e)
  orderStore.removeCardDataProduct(e)
}
const routes = [
  {
    name: t('main'),
    route: '/',
  },
  {
    name: t('basket'),
  },
]
function createOrder() {
  if (user.value) {
    router.push(localePath('/checkout'))
    if (process.client) {
      localStorage.removeItem('form')
      localStorage.removeItem('response')
    }
  } else {
    $event('open-required')
  }
}
</script>

<style scoped>
@media screen and (max-width: 991px) {
  .basket__main {
    flex-direction: column !important;
  }
  .main__basket-right {
    margin-left: 0 !important;
    margin-top: 24px !important;
    width: 100% !important;
  }
}
</style>
