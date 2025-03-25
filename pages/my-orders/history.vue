<template>
  <div>
    <div class="bg-white dark:bg-dark-100 transition-300 rounded-xl px-5 mt-6 md:mt-0">
      <template v-if="!loading">
        <div v-if="orders?.length">
          <CardsOrderCard
            type="group"
            v-for="(item, index) in orders"
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
        v-if="!loading && orders?.length && orders?.length !== ordersTotal"
        :loading="loadingMore"
        @click="loadMore"
      />
    </transition>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const orders = ref()
const ordersTotal = ref(0)
const ordersTotalPage = ref(1)
const loading = ref(true)
const loadingMore = ref(false)
const page = ref(1)
import type { IOrderList } from '~/types/order'

onMounted(() => {
  fetchSingleProduct(1)
})
function fetchSingleProduct(page: number) {
  loadingMore.value = true
  return new Promise((resolve, reject) => {
    useFetcher<IOrderList>(`orders/`, {
      method: 'GET',
      params: {
        page: page,
        status__in: '0,6',
      },
    })
      .then((res) => {
        if (res?.data) {
          ordersTotal.value = res?.data?.total
          ordersTotalPage.value = res?.data?.total_pages
          if (page > 1) {
            orders.value = [...orders.value, ...res?.data?.results]
          } else {
            orders.value = res?.data?.results
          }
          setTimeout(() => {
            loadingMore.value = false
            loading.value = false
          }, 300)
          resolve(res?.data)
        }
        if (res?.error) {
          setTimeout(() => {
            loadingMore.value = false
            loading.value = false
          }, 300)
          reject(res?.error)
          // showError({ statusCode: 404, statusMessage: 'Page Not Found' })
        }
      })
      .finally(() => {
        setTimeout(() => {
          loading.value = false
          loadingMore.value = false
        }, 300)
      })
  })
}

function loadMore() {
  if (ordersTotalPage.value > page.value) {
    page.value++
  }
  fetchSingleProduct(page.value)
}
const routes = [
  {
    name: t('main'),
    route: '/',
  },
  {
    name: t('my_orders'),
  },
]
</script>
