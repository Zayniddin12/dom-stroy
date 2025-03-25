<template>
  <div class="relative">
    <FormInputSearch
      v-model="search"
      ref="searchInput"
      v-bind="{ loading }"
      @clear="clearSearch"
      @focus="openResult"
      @focusout="closeResult"
    />

    <Transition name="dropdown">
      <div
        v-if="showResult && (!loading || search.length > 0)"
        class="relative"
      >
        <ul
          class="search-result bg-white dark:bg-dark-300 dark:text-white duration-300 rounded-xl absolute top-[calc(100%+12px)] w-full max-h-[280px] overflow-y-auto z-10"
        >
          <li v-for="(result, idx) in searchResult" :key="idx">
            <NuxtLink
              class="transition-200 group relative flex items-center justify-between space-x-9 hover:bg-gray-600 dark:hover:bg-gray-100 px-3 py-2 first:rounded-t-xl last:rounded-b-xl w-full"
              :to="localePath(`/products/${result.slug}`)"
              @click="clearSearch"
            >
              <div class="flex items-center space-x-3">
                <div
                  class="w-9 h-9 rounded-lg border border-gray-400 dark:border-gray-100 p-[3px] dark:p-0 dark:overflow-hidden flex-shrink-0"
                >
                  <img
                    v-if="result?.images[0]?.extra_small"
                    :src="result?.images[0]?.extra_small"
                    :alt="result?.title"
                    class="h-full w-full object-contain"
                  />
                  <img
                    v-else
                    src="/images/defaults/image.webp"
                    alt="image"
                    class="w-full h-full object-contain bg-white"
                  />
                </div>
                <Highlighter
                  class="text-sm leading-130 text-dark dark:text-white"
                  highlight-class-name="bg-[#FFCD55] rounded"
                  :search-words="[search ?? '']"
                  :text-to-highlight="result?.title"
                />
              </div>
              <i
                class="icon-chevron-right transition-200 text-2xl text-gray-100 group-hover:text-red"
              />
              <span
                v-if="idx !== searchResult?.length - 1"
                class="absolute w-[calc(100%-52px)] left-4 right-0 h-px block bottom-0 bg-gray-600 dark:bg-gray-100"
              />
            </NuxtLink>
          </li>
          <li ref="target" class="block h-1 w-full" />
          <CommonNoData
            v-if="searchResult.length === 0 && search?.length > 0 && !loading"
            img="/images/no-data/search.svg"
            class="min-h-[240px]"
            :subtitle="t('search_not_found')"
          />
        </ul>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { watch } from '@vue/runtime-core'
import { useRouter } from '#imports'
import Highlighter from 'vue-highlight-words'
import { useProductsStore } from '~/store/products'
import { debounce } from '~/helpers'
import type { TProduct } from '~/types/products'
import { useIntersectionObserver } from '@vueuse/core'

const router = useRouter()
const { t } = useI18n()
const localePath = useLocalePath()
const productStore = useProductsStore()

const search = ref('')
const loading = ref(false)
const searchResult = ref<TProduct[]>([])

function closeResult() {
  showResult.value = false
}
watch(
  () => search.value,
  () => debounce('header-search', () => openResult())
)

const searchInput = ref()

function clearSearch() {
  search.value = ''
  searchInput.value?.clearSearch()
}

const showResult = ref(false)
function openResult() {
  resetPagination()
  showResult.value = search.value.length > 0

  if (showResult.value) {
    searchResult.value = []
    fetchProducts()
  }
}

const pagination = reactive({
  page: 1,
  size: 10,
  hasNextPage: true,
})

function resetPagination() {
  pagination.page = 1
  pagination.hasNextPage = true
}

const target = ref()
useIntersectionObserver(target, ([{ isIntersecting }]) => {
  if (isIntersecting && !loading.value && pagination.hasNextPage) {
    fetchProducts()
  }
})

async function fetchProducts() {
  loading.value = true
  const { data } = await productStore.fetchProducts({
    search: search.value,
    page: pagination.page,
    size: pagination.size,
  })
  pagination.page++
  pagination.hasNextPage = data?.links?.next
  searchResult.value = [...searchResult.value, ...data.results]
  setTimeout(() => (loading.value = false), 200)
}
function handleEnterKey() {
  if (searchInput.value) {
    // searchInput.value.$el.blur()
  }
  clearSearch()
}
onMounted(() => {
  // handleEnterKey()
})
</script>

<style scoped>
.search-result {
  box-shadow: 0 4px 13px rgba(56, 56, 56, 0.08);
}
</style>
