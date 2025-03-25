<template>
  <div class="container mx-auto pb-12">
    <CommonBreadcrumb v-bind="{ routes }" />
    <SectionHead :title="'all_brands'">
      <div class="md:max-w-[278px] !ml-0 md:!ml-2 w-full">
        <FormInputSearch v-model="params.search" @clear="params.search = ''" />
      </div>
    </SectionHead>
    <div
      v-if="loading"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-x-6 gap-y-6 md:space-y-0"
    >
      <CardsBrand v-for="index in 24" :key="index" loading />
    </div>
    <div
      v-else-if="brands.length"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-x-6 gap-y-6 md:space-y-0"
    >
      <CardsBrand v-for="(item, index) in brands" :key="index" :brand="item" />
    </div>
    <CommonNoData
      v-else
      class="py-9 col-span-3 xl:col-span-4"
      img="/images/no-data/products.svg"
      :title="$t('no_cards')"
      :subtitle="$t('brands_not_found')"
    />
    <ButtonShowMore
      v-if="totalCount !== brands.length"
      :loading="loading"
      @click="showMore"
    />
  </div>
</template>

<script lang="ts" setup>
import SectionHead from '~/components/Common/Sections/SectionHead.vue'
import { debounce } from '~/helpers'
import { useBrandsStore } from '~/store/brands'
import load from 'unplugin/dist/webpack/loaders/load'
import { useApi } from '~/composables/useApi'

const loading = ref(false)
const brandsStore = useBrandsStore()
const router = useRouter()
const { t } = useI18n()
const route = useRoute()
const { actionGet: $fetch } = useApi()

const params = ref({
  size: 24,
  page: 1,
  search: '',
})

// const brands = computed(() => brandsStore.brands)
// const totalCount = computed(() => brandsStore.brandsCount)
const brands = ref([])
const totalCount = ref(0)
function fetchBrands(merge: boolean) {
  loading.value = true
  $fetch(`GET`, `products/manufacture/`, params.value)
    .then((res: any) => {
      totalCount.value = res?.total
      brands.value = merge ? [...brands.value, ...res?.results] : res?.results
    })
    .finally(() => {
      loading.value = false
    })
}

function showMore() {
  params.value.page++
  fetchBrands(true)
}

watch(
  () => params.value.search,
  (newValue) => {
    loading.value = true
    debounce('search', () => changeRoute(newValue))
  }
)

watch(
  () => loading.value,
  (newValue) => {
    if (newValue === true) {
      setTimeout(() => {
        loading.value = false
      }, 2000)
    }
  }
)

function changeRoute(newValue: string) {
  params.value.page = 1
  router.replace({ query: { searchBrand: newValue } })
  params.value.search = newValue
  fetchBrands(false)
}

onMounted(() => {
  if (route.query.searchBrand) {
    params.value.search = route.query.searchBrand.toString() ?? ''
  }
  setTimeout(() => {
    loading.value = false
  }, 500)
  fetchBrands(false)
})

const routes = [
  {
    name: t('main'),
    route: '/',
  },
  {
    name: t('all_brands'),
  },
]

useHead({
  title: t('all_brands'),
})
</script>

<style scoped></style>
