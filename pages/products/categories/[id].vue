<template>
  <div class="container">
    <CommonBreadcrumb v-bind="{ routes }" />
  </div>
  <!--  <div class="pt-3" v-if="category?.banners?.length > 0">-->
  <!--    <ClientOnly>-->
  <!--      <CommonSliderMain :data="category.banners" />-->
  <!--    </ClientOnly>-->
  <!--  </div>-->
  <div class="container !pb-6 md:!pb-12">
    <CommonSectionsSectionHead
      v-if="category.categories.length"
      :title="category.title"
      :section-link="localePath('/products/categories')"
      :section-title="$t('all_products_section')"
      class="mt-5"
    />

    <div
      class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 md:gap-x-6 gap-x-4 gap-y-4"
    >
      <template v-if="category.categories.length">
        <NuxtLink
          v-for="(item, index) in category.categories"
          :key="index"
          :to="localePath({ path: '/products', query: { sections: item?.id } })"
        >
          <CardsCategory :card="item" />
        </NuxtLink>
      </template>
    </div>

    <div class="mt-16">
      <CommonSectionsSectionHead
        :title="t('latest_products')"
        :section-link="
          localePath({ path: `/products`, query: { sections: category.id } })
        "
        :section-title="$t('all_products')"
      />
      <CommonNoData
        v-if="!prodsLoading && !products.length"
        class="!py-4"
        :title="$t('products_not_found')"
        img="/images/no-data/products.svg"
        :subtitle="$t('products_not_found_sub')"
      />
      <div
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5"
        v-else
      >
        <CardsProduct
          v-for="i in prodsLoading ? 18 : products"
          :card="i"
          :loading="prodsLoading"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { definePageMeta } from '#imports'
import type { TFetcherData } from '~/types'
import type { TCategory } from '~/types/categories'
import { useProductsStore } from '~/store/products'
import { useCommonStore } from '~/store/common'

definePageMeta({
  validate: ({ params }) => {
    return /^[0-9]*$/g.test(String(params?.id))
  },
})

const localePath = useLocalePath()
const commonStore = useCommonStore()
const { t } = useI18n()
const router = useRouter()
const route = useRoute()

const params = ref({
  size: 24,
  page: 1,
  search: '',
})
const banner = computed(() => commonStore.banner)
const bannerLoading = computed(() => commonStore.bannerLoading)
const { data } = await useAsyncData<TFetcherData<TCategory, any>>(
  'category',
  () => {
    return new Promise((resolve) => {
      useFetcher(`products/categories/${route.params.id}/`)
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          resolve(err)
        })
    })
  }
)

if (data.value!.error) {
  showError({ statusCode: 404 })
}

const category = computed(() => data.value!.data)
useHead({
  title: category.value.title,
  meta: [
    {
      hid: 'og:image',
      property: 'og:image',
      content: category.value.icon_src.default,
    },
    {
      hid: 'image',
      property: 'image',
      content: category.value.icon_src.default,
    },
  ],
})

const products = ref([])
const prodsLoading = ref(false)
const prodsStore = useProductsStore()

onMounted(async () => {
  await commonStore.fetchBanner({ size: 8 })
  prodsLoading.value = true
  try {
    const res = await prodsStore.fetchAllProducts({
      params: {
        category_id__in: String(category.value.id),
        ordering: '-created_at',
        size: 18,
      },
      options: {
        force: true,
        returnOnly: true,
      },
    })
    products.value = res?.results
  } catch (err) {}
  prodsLoading.value = false
})

const routes = [
  {
    name: t('main'),
    route: '/',
  },
  {
    name: category.value.title,
  },
]
</script>
