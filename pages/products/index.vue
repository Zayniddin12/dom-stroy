<template>
  <div class="dark:bg-dark-200 transition-300">
    <div class="pb-8 container">
      <CommonBreadcrumb :routes="routes" />
      <div class="xl:!flex xl:!space-x-6 relative mt-5">
        <div
          class="h-full md:w-[282px] md:flex-shrink-0 md:sticky top-[210px] hidden xl:flex"
        >
          <Filter :filter-data="filtersData" />
        </div>
        <div class="w-full !ml-0 xl:!ml-0 xl:!w-[73.7%]">
          <CommonSectionsSectionHead
            :titleStyle="'!text-dark-200 dark:!text-white transition-300'"
            :title="$t('all_products')"
            class="z-10 relative !mb-3 md:!mb-6"
          >
            <FormSelect
              :list="categories"
              :model-value="selectedCategory?.title"
              class="transition-200 hidden xl:block"
              input-class="text-dark-200 dark:!text-white !py-2 transition-300 dark:!bg-[#464646]"
              custom-class="text-dark dark:text-white"
              @update:modelValue="handleCategoryModel"
            />
          </CommonSectionsSectionHead>
          <div class="flex items-center justify-between xl:hidden mb-5">
            <ProductFilterSelect
              :list="categories"
              :model-value="selectedCategory?.title"
              @update:modelValue="handleCategoryModel"
            />
            <div class="xl:hidden block">
              <button
                @click="toggleFilter"
                class="flex gap-1 items-center text-sm text-dark leading-130 font-normal"
              >
                {{ $t('sort') }}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.60802 13.8274H3.35742"
                    stroke="#383838"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M10.9502 5.75023H16.2008"
                    stroke="#383838"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.27158 5.70521C7.27158 4.6255 6.38978 3.75 5.30229 3.75C4.21481 3.75 3.33301 4.6255 3.33301 5.70521C3.33301 6.78492 4.21481 7.66042 5.30229 7.66042C6.38978 7.66042 7.27158 6.78492 7.27158 5.70521Z"
                    stroke="#383838"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M16.6661 13.7946C16.6661 12.7149 15.785 11.8394 14.6975 11.8394C13.6093 11.8394 12.7275 12.7149 12.7275 13.7946C12.7275 14.8743 13.6093 15.7498 14.6975 15.7498C15.785 15.7498 16.6661 14.8743 16.6661 13.7946Z"
                    stroke="#383838"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <CommonModalsModal :show="isFilterVisible">
                <Filter
                  @close="isFilterVisible = false"
                  :filter-data="filtersData"
                  class="!w-screen !h-[100dvh] top-0 z-[999999] fixed container flex flex-col"
                />
              </CommonModalsModal>
              <Teleport v-if="mounted" to="body">
                <transition name="fade" mode="out-in">
                  <div v-if="isFilterVisible"></div>
                </transition>
              </Teleport>
            </div>
          </div>
          <CardsBlank
            class="mb-5 relative overflow-hidden"
            :title="$t('popular_products_app')"
            title-class="mb-4 !text-2xl dark:!text-white w-full transition-300"
          >
            <Swiper v-bind="settings" class="!items-stretch !overflow-visible">
              <SwiperSlide
                v-for="(item, idx) in loadingRecommended
                  ? 4
                  : productsStore.recommendedProducts"
                :key="idx"
                class="!max-w-[190px] !w-full !h-auto"
              >
                <CardsProduct :card="item" :loading="loadingRecommended" />
              </SwiperSlide>
            </Swiper>
            <!-- Controllers -->
            <button
              class="sw-prev-btn absolute top-1/2 -translate-y-1/2 left-4 transition-300"
            >
              <span
                class="icon-arrow-left !text-2xl text-dark-200 transition-300"
              />
            </button>
            <button
              class="sw-next-btn absolute top-1/2 -translate-y-1/2 right-4 transition-300"
            >
              <span
                class="icon-arrow-right !text-2xl text-dark transition-300"
              />
            </button>
          </CardsBlank>

          <!-- Products loading -->
          <transition name="fade" mode="out-in">
            <div
              v-if="loading && !loadingMore"
              class="grid grid-rows-1 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 pb-2.5"
            >
              <CardsProduct v-bind="{ loading }" v-for="i in 8" :key="i" />
            </div>

            <!-- Products -->
            <div v-else-if="products.length">
              <div
                class="grid grid-rows-1 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5 pb-2.5"
              >
                <CardsProduct
                  :card="item"
                  v-for="(item, idx) in products?.slice(0, 12)"
                  :key="idx"
                />
              </div>
              <div
                v-if="products.length > 12 && advertisement"
                class="col-span-4 w-full rounded-xl overflow-hidden aspect-[884/117] my-2.5"
              >
                <a :href="advertisement?.redirect_url" target="_blank">
                  <img
                    :src="advertisement?.cover_src?.compressed"
                    alt="banner"
                    class="w-full h-full object-cover"
                  />
                </a>
              </div>
              <div
                class="grid grid-rows-1 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 pt-2.5"
              >
                <CardsProduct
                  :card="item"
                  v-for="(item, idx) in products?.slice(12, products.length)"
                  :key="idx"
                />
              </div>
            </div>
            <!-- Products no data -->
            <CommonNoData
              class="!py-4"
              v-else
              :title="$t('products_not_found')"
              img="/images/no-data/products.svg"
              :subtitle="$t('products_not_found_sub')"
            />
          </transition>

          <transition name="fade" mode="out-in">
            <ButtonShowMore
              class="!mt-8"
              v-if="products.length !== total"
              :loading="loadingMore"
              @click="loadMore"
            />
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Filter from '@/components/Product/Filter/Filter.vue'
import { useI18n } from 'vue-i18n'
import { useProductsStore } from '~/store/products'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'
import type { IFilterData, TFetchProductsParams } from '~/types/products'
import type { TFilterOptions } from '~/types/params'
import { useManufactureStore } from '~/store/manufacture'
import { useCategoriesStore } from '~/store/categories'
import { useSettingsStore } from '~/store/settings'
import { useMounted } from '@vueuse/core'

const mounted = useMounted()
const { t: $t } = useI18n()
const $route = useRoute()
const $router = useRouter()

const settings = {
  // slidesPerView: 'auto',
  spaceBetween: 20,
  watchOverflow: true,
  slidesPerView: 3,
  modules: [Pagination, Autoplay, Navigation],
  breakpoints: {
    1440: {
      slidesPerView: 4,
    },
  },
  navigation: {
    nextEl: '.sw-next-btn',
    prevEl: '.sw-prev-btn',
  },
}

const isFilterVisible = ref(false)

const toggleFilter = () => {
  isFilterVisible.value = !isFilterVisible.value
}

const settingsStore = useSettingsStore()
const productsStore = useProductsStore()

const manufactureStore = useManufactureStore()
const categoriesStore = useCategoriesStore()
await categoriesStore.fetchAllCategories({ size: 50 })
await manufactureStore.fetchFilterManufactures()
settingsStore.fetchAds()

const filtersData = computed<IFilterData[]>(() => [
  {
    title: 'sections',
    items: categoriesStore.listCategories,
  },
  {
    title: 'manufacturers',
    items: manufactureStore.filterManufactures,
  },
])

const advertisement = computed(() =>
  settingsStore.ads?.find((ad) => ad.type === 'in_product_list')
)

interface ICategory {
  id: string
  title: string
}
const categories = reactive<ICategory[]>([
  { id: 'is_recommendation', title: $t('by_popularity') },
  { id: 'sale_price', title: $t('by_price') },
  { id: '-rate', title: $t('by_rating') },
])

const selectedCategory = ref<{ id: string; title: string } | undefined>()
if ($route.query?.order_by) {
  selectedCategory.value = categories.find(
    (item) => item.id === $route.query.order_by
  )
} else {
  selectedCategory.value = categories[0]
}

const handleCategoryModel = (val: ICategory) => {
  selectedCategory.value = val
  $router.replace({ query: { ...$route.query, order_by: val.id } })
}

watch(
  () => isFilterVisible.value,
  (newValue) => {
    if (newValue) {
      document.body.style.overflowY = 'hidden'
    } else {
      document.body.style.overflowY = 'auto'
    }
  }
)

// Filter
const page = ref(0)
const totalFiltered = ref(0)
const getQuery = () => {
  let filteredParams: TFetchProductsParams = {
    category_id__in: $route.query?.sections as string | undefined,
    manufacturer_id__in: $route.query?.manufacturers as string | undefined,
    ordering: $route.query?.order_by as string | undefined,
    price__gte: Number($route.query?.price_gte),
    price__lte: Number($route.query?.price_lte),
    // sale_price__gt: $route.query?.discount ? 0 : undefined,
    is_recommendation: $route.query?.recommendation ? true : undefined,
    category_id: $route.query?.forBath
      ? 1
      : $route.query?.forLadies
      ? 2
      : undefined,
    in_sale: $route.query?.discount ? true : undefined,
    // category_id: $route.query?.forLadies ? 2 : undefined
  }

  for (let key in filteredParams) {
    const item = filteredParams[key as keyof TFetchProductsParams]
    if (!item && item !== 0) {
      delete filteredParams[key as keyof TFetchProductsParams]
    }
  }

  return filteredParams
}

const fetchFilteredData = async (payload?: {
  params?: TFetchProductsParams
  options?: TFilterOptions
}) => {
  const filteredParams = getQuery()

  if (!Object.keys(filteredParams).length) {
    return (page.value = 0)
  }

  try {
    page.value = payload?.params?.page || 1
    const response = await productsStore.fetchAllProducts({
      options: { force: true, returnOnly: true, ...payload?.options },
      params: {
        ...filteredParams,
        page: page.value,
        ...payload?.params,
      },
    })
    totalFiltered.value = response.total
    filteredProducts.value =
      page.value > 1
        ? [...filteredProducts.value, ...response.results]
        : response.results
  } catch (err) {}
}

const queries = getQuery()
if (!Object.keys(queries).length) {
  productsStore.fetchAllProducts({
    params: { ordering: selectedCategory.value!.id },
  })
} else {
  fetchFilteredData()
}
productsStore.fetchRecommendedProducts()

const loadingRecommended = computed(
  () => productsStore.loadingRecommendedProducts
)

const loadingData = ref(false)
const loading = computed(
  () => loadingData.value || productsStore.loadingAllProducts
)

const filteredProducts = ref([])
const products = computed(() =>
  page.value > 0 ? filteredProducts.value : productsStore.allProducts
)
const total = computed(() =>
  page.value > 0 ? totalFiltered.value : productsStore.allProductsTotal
)

const loadingMore = ref(false)
const loadMore = async () => {
  loadingMore.value = true
  try {
    if (page.value > 0) {
      page.value++
      await fetchFilteredData({ params: { page: page.value } })
    } else {
      await productsStore.fetchAllProducts({
        options: { force: true, merge: true },
      })
    }
  } catch (err) {}
  loadingMore.value = false
}

watch(
  () => $route.query,
  async () => {
    const queries = getQuery()
    if (!Object.keys(queries).length) {
      page.value = 0
      await productsStore.fetchAllProducts({
        params: { ordering: selectedCategory.value!.id },
      })
    } else {
      await fetchFilteredData()
    }
  },
  {
    deep: true,
    immediate: true,
  }
)

useHead({
  title: $t('products'),
})
const routes = [
  {
    name: $t('main'),
    route: '/',
  },
  {
    name: $t('products'),
  },
]
</script>

<style scoped>
.sw-prev-btn.swiper-button-disabled,
.sw-next-btn.swiper-button-disabled {
  @apply scale-0;
}

.sw-prev-btn,
.sw-next-btn {
  @apply hover:bg-[#E8E8E8] z-30 rounded-full w-10 h-10 flex items-center justify-center border border-gray-500 bg-white shadow-[0_0_40px_0_#38383852];
}
</style>
