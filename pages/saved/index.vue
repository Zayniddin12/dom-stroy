<template>
  <div class="container h-full">
    <CommonBreadcrumb :routes="routes" />
    <h1 class="section-title mt-5 mb-4 dark:text-white">
      {{ $t('favourites') }}
    </h1>
    <div class="grid grid-cols-6 gap-5" v-if="savedStore.loading">
      <CardsProduct
        v-for="(item, index) in 12"
        :key="index"
        :card="item"
        :loading="true"
      />
    </div>
    <div v-else class="pb-10">
      <div
        class="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-5"
        v-if="!savedStore.loading && savedStore.saved?.length"
      >
        <CardsProduct
          v-for="(item, index) in savedStore.saved"
          :key="index"
          :card="item"
          :loading="savedStore.loading"
        />
      </div>
      <CommonNoData
        v-else
        class="py-9"
        img="/images/no-data/products.svg"
        :title="$t('no_cards')"
        :subtitle="$t('no_saved_products')"
      />
      <CommonButton
        v-if="
          savedStore.loading || (savedStore.totalPages > 1 && savedStore.currentPage < savedStore.totalPages)
        "
        variant="light"
        class="!px-5 mt-5 mx-auto"
        @click="loadMore"
        :loading="savedStore.loadingMore"
      >
        <span class="inline-flex space-x-1">
          <i class="icon-arrow-down-solid text-xl text-red" />
          <span>{{ $t('load_more') }}</span>
        </span>
      </CommonButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSavedStore } from '~/store/saved'

const { t: $t } = useI18n()
const savedStore = useSavedStore()
const filters = ref({
  page: 1,
})
const loadMoreLoading = ref(false)

useHead({
  title: $t('favourites'),
})
onMounted(() => {
  savedStore.fetchSavedProducts(filters.value)
})
const routes = [
  {
    name: $t('main'),
    route: '/',
  },
  {
    name: $t('favourites'),
  },
]

const loadMore = () => {
  if (savedStore.totalPages > filters.value.page) {
    filters.value.page++
  } else {
    filters.value.page = 1
  }
  savedStore.fetchSavedProducts(filters.value)
}
</script>
