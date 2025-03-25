<template>
  <div>
    <div
      v-if="banner && banner.length"
      class="bg-gray-600 dark:bg-dark-200 duration-300 pt-7 overflow-hidden"
    >
      <CommonSliderMain
        v-if="banner && banner.length"
        :data="banner"
        :loading="bannerLoading"
      />
    </div>
    <div class="bg-gray-600 dark:bg-dark-200 duration-300 pt-7 overflow-hidden">
      <!--    test-->
      <!--    Баланс кэшбэка-->
      <CardsCardCashback v-if="user?.is_master" :sum="user?.cashback_balance" />
      <!--  Баланс кэшбэка:  -->

      <!--      Популярные разделы-->
      <SectionsCategories
        v-if="popularCategories && popularCategories.length"
        title="popular_sections"
        link-title="all_sections"
        :link="localePath('/products/categories')"
        :categories="popularCategories"
        class="mt-[100px] mb-16"
        :loading="popularCategoriesLoading"
        :loading-number="12"
      />
      <!--  Истории  -->
      <SectionsStories />
      <!--  Популярные бренды-->
      <SectionsTopBrands
        v-if="manufactures && manufactures.length"
        :data="manufactures"
        :loading="manufacturesLoading"
        title="parfume_from_top_brands"
        link-title="all_brands"
        :link="localePath('/brands')"
      />
      <!--    live stream-->
      <CardsCardLiveStream :card="liveStream" />
      <!--    live stream-->
      <!--  Парфюм от топ брендов-->
      <SectionsRecommendedGoods
        v-if="
          productStore.recommendedProducts &&
          productStore.recommendedProducts.length
        "
        :data="productStore.recommendedProducts"
        title="recommended_goods"
        link-title="all_goods"
        :link="
          localePath({ path: '/products', query: { recommendation: true } })
        "
        class="mt-16"
      />

      <!--  Популярные бренды-->
      <SectionsBrandsMarque
        v-if="brands && brands.length"
        :data="brands"
        title="popular_brands"
        link-title="all_brands"
        link="/brands"
        class="md:mb-16 mb-8 mt-[46px]"
        v-bind="{ loading }"
      />
      <!--  Свежие скидки  -->
      <SectionsRecommendedGoods
        v-if="newProducts && newProducts.length && !newProductsLoading"
        :data="newProducts"
        :loading="newProductsLoading"
        title="fresh_discount"
        link-title="all_goods_in_discount"
        :link="
          localePath({
            path: '/products',
            query: { order_by: 'created_at', discount: '1' },
          })
        "
        class="mb-4"
      />
      <!--  Лучшие категории для мужчин  -->
      <SectionsCategories
        v-if="maleCategories && maleCategories.length"
        title="best_for_master"
        link-title="all_categories"
        :link="localePath('/products/categories')"
        :categories="maleCategories"
        :loading="maleCategoriesLoading"
      />

      <!--    <div-->
      <!--      class="bg-white dark:bg-dark-300 duration-300 pt-8 pb-16"-->
      <!--      v-if="forBath && forBath?.length"-->
      <!--    >-->
      <!--      <SectionsRecommendedGoods-->
      <!--        :data="forBath"-->
      <!--        class="dark:bg-dark-300"-->
      <!--        title="products_for_body"-->
      <!--        link-title="all_products"-->
      <!--        :link="localePath({ path: '/products', query: { sections: '4' } })"-->
      <!--      />-->
      <!--    </div>-->
      <!--  Отзывы-->
      <SectionsComments
        v-if="comments?.length"
        :data="comments"
        title="comments"
        link-title="all_categories"
        section-title="all_categories"
        :loading="commentsLoading"
      />

      <div class="container py-8" v-if="mostSoldProducts.length">
        <CommonSectionsSectionHead title="most_sold" />
        <client-only>
          <Swiper v-bind="settings" class="!items-stretch !overflow-visible">
            <SwiperSlide
              v-for="(item, idx) in mostSoldProducts"
              :key="idx"
              class="!max-w-[190px] !w-full !h-auto"
            >
              <CardsProduct :card="item" />
            </SwiperSlide>
          </Swiper>
        </client-only>
      </div>

      <!--  Отзывы-->
      <!--    <SectionsRecommendedGoods-->
      <!--      v-if="forLadies && forLadies.length"-->
      <!--      :data="forLadies"-->
      <!--      title="parfume_for_woman"-->
      <!--      link-title="all_goods_in_discount"-->
      <!--      :link="-->
      <!--        localePath({-->
      <!--          path: '/products',-->
      <!--          query: { discount: '1', sections: '12' },-->
      <!--        })-->
      <!--      "-->
      <!--      :loading="loadingForLadies"-->
      <!--      class="pt-8 pb-11"-->
      <!--    />-->
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductsStore } from '~/store/products'
import { useCategoriesStore } from '~/store/categories'
import { useManufactureStore } from '~/store/manufacture'
import { useBrandsStore } from '~/store/brands'
import { useCommentsStore } from '~/store/comments'
import { useCommonStore } from '~/store/common'
import { useFilteredCategoriesStore } from '~/store/filteredCategories'
import { useAuthStore } from '~/store/auth'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'

const brandsStore = useBrandsStore()
const productStore = useProductsStore()
const categoriesStore = useCategoriesStore()
const manufacturesStore = useManufactureStore()
const commentsStore = useCommentsStore()
const commonStore = useCommonStore()
const localePath = useLocalePath()
const filteredCategoriesStore = useFilteredCategoriesStore()
const authStore = useAuthStore()

const loading = ref(true)
const storyLoading = computed(() => commonStore.storiesLoading)
const user = computed(() => authStore.user)
const liveStream = computed(() => commonStore.liveStream)
const brands = computed(() => brandsStore.brands)
const maleCategories = computed(() => categoriesStore.listCategories)
const mostSoldProducts = computed(() => productStore.mostSold)
const maleCategoriesLoading = computed(
  () => categoriesStore.listCategoriesLoading
)
const popularCategories = computed(() => categoriesStore.popularCategories)
const popularCategoriesLoading = computed(
  () => categoriesStore.popularCategoriesLoading
)
const manufactures = computed(() => manufacturesStore.manufactures)
const manufacturesLoading = computed(
  () => manufacturesStore.manufacturesLoading
)

const comments = computed(() => commentsStore.comments)
const commentsLoading = computed(() => commentsStore.commentsLoading)
const loadingForLadies = computed(
  () => filteredCategoriesStore.loadingForLadies
)
const banner = computed(() => commonStore.banner)
const bannerLoading = computed(() => commonStore.bannerLoading)
const newProducts = computed(() => productStore.newProducts)
const newProductsLoading = computed(() => productStore.newProductsLoading)
const forLadies = computed(() => filteredCategoriesStore.forLadies)
const forBath = computed(() => filteredCategoriesStore.forBath)

async function fetchData() {
  return await Promise.all([
    productStore.fetchProducts(),
    productStore.fetchRecommendedProducts(),
    productStore.fetchMostSold(),
    commonStore.fetchBanner({ size: 8 }),
    commonStore.fetchStory(),
    commonStore.fetchLiveStream(),
    commentsStore.fetchComments(),
    categoriesStore.fetchPopularCategories(),
    brandsStore.fetchAllBrands({ size: 12 }, false),
    categoriesStore.fetchAllCategories({ gender: 'male', size: 4 }, false),
    manufacturesStore.fetchManufactures({ size: 4 }),
    productStore.fetchNewProducts(),
    filteredCategoriesStore.fetchSettings(),
  ])
}

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

fetchData()

useHead({
  title: 'Dom Stroy',
})
</script>
