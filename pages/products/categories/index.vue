<template>
  <div>
    <div class="container pb-4">
      <CommonBreadcrumb v-bind="{ routes }" />
    </div>
    <CommonSliderMain
      v-if="banner && banner.length"
      :data="banner"
      :loading="bannerLoading"
    />
    <div class="container !py-6 md:!py-12">
      <CommonSectionsSectionHead title="all_categories">
        <div class="md:max-w-[278px] !ml-0 md:!ml-2 w-full">
          <FormInputSearch
            v-model="params.search"
            @clear="params.search = ''"
          />
        </div>
      </CommonSectionsSectionHead>
      <transition name="fade" mode="out-in">
        <div
          :key="loading"
          class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-x-3 md:gap-x-6 gap-y-4"
        >
          <template v-if="loading">
            <CardsCategory v-for="i in 24 * params.page" :key="i" loading />
          </template>
          <template v-else-if="categoriesList.length">
            <NuxtLink
              :to="
                localePath({ path: '/products', query: { sections: item.id } })
              "
              v-for="(item, index) in categoriesList"
              :key="index"
            >
              <CardsCategory :card="item" />
            </NuxtLink>
          </template>
          <CommonNoData
            v-else
            class="py-9 col-span-3 xl:col-span-4"
            img="/images/no-data/products.svg"
            :title="$t('no_cards')"
            :subtitle="$t('categories_not_found')"
          />
        </div>
      </transition>
      <ButtonShowMore
        v-if="totalCount !== categoriesList.length"
        :loading="loading"
        @click="showMore"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCategoriesStore } from '~/store/categories'
import { useRoute, useRouter } from 'vue-router'
import { watch } from '#imports'
import { debounce } from '~/helpers'
import { useCommonStore } from '~/store/common'
import { useApi } from '~/composables/useApi'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const commonStore = useCommonStore()
const { actionGet: $fetch } = useApi()
const localePath = useLocalePath()

const params = ref({
  size: 24,
  page: 1,
  search: '',
})
const loading = ref(true)
// const totalCount = computed(() => categoriesStore.listCategoriesCount)
const banner = computed(() => commonStore.banner)
const bannerLoading = computed(() => commonStore.bannerLoading)
const categoriesList = ref([])
const totalCount = ref(0)
function fetchCategories(merge: boolean) {
  loading.value = true
  $fetch(`GET`, `products/categories-list/footer/`, params.value)
    .then((res: any) => {
      totalCount.value = res?.total
      categoriesList.value = merge
        ? [...categoriesList.value, ...res?.results]
        : res?.results
    })
    .finally(() => {
      loading.value = false
    })
}
function showMore() {
  params.value.page++
  fetchCategories(true)
}
const categoriesStore = useCategoriesStore()
watch(
  () => params.value.search,
  (newValue) => {
    debounce('search', () => {
      params.value.page = 1
      router.replace({ query: { search: newValue } })
      params.value.search = newValue
      fetchCategories(false)
    })
  }
)
onMounted(() => {
  if (route.query.search) {
    params.value.search = route.query.search.toString() ?? ''
  }
  fetchCategories(false)
  commonStore.fetchBanner({ size: 8 })
})

useHead({
  title: t('all_categories'),
})
const routes = [
  {
    name: t('main'),
    route: '/',
  },
  {
    name: t('all_categories'),
  },
]
</script>
