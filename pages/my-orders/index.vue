<template>
  <common-block-preloader>
    <div  class="bg-white dark:bg-dark-100 transition-300 rounded-xl px-3 md:px-5 mt-6 md:mt-0">
      <template v-if="!orderStore.loading">
        <div v-if="orderStore.orders?.length && !orderStore.loading">
          <CardsOrderCard
            type="group"
            v-for="(item, index) in orderStore.orders"
            :key="index"
            :data="item"
            :loading="orderStore.loading"
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
        <CardsOrderCard
          type="group"
          v-for="(item, index) in 2"
          :key="index"
          :data="item"
          loading
        />
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <ButtonShowMore
        class="!mt-8"
        v-if="
          !orderStore.loading &&
          orderStore.orders?.length !== orderStore.ordersTotal
        "
        :loading="loadingMore"
        @click="loadMore"
      />
    </transition>
  </common-block-preloader>
</template>
<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})
import { useI18n } from 'vue-i18n'
import { useOrderStore } from '~/store/order'

const { t } = useI18n()
const orderStore = useOrderStore()

const page = ref(1)
const loadingMore = ref(false)
onMounted(() => {
  orderStore?.fetchOrders(page.value)
})
orderStore?.fetchOrders(page.value)

const routes = [
  {
    name: t('main'),
    route: '/',
  },
  {
    name: t('my_orders'),
  },
]
const loadMore = async () => {
  loadingMore.value = true
  try {
    if (page.value > 0) {
      page.value++
      await orderStore.fetchOrders(page.value)
    }
  } catch (err) {}
  loadingMore.value = false
}
</script>
