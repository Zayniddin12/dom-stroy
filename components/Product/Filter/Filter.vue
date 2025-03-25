<template>
  <div
    class="dark:bg-dark-300 transition-300 bg-white md:max-w-[278px] md:pl-4 rounded-xl overflow-y-scroll py-4"
  >
    <div class="flex items-center justify-between mb-5 pr-4">
      <h5
        class="text-xl text-dark dark:text-white transition-300 font-bold leading-125"
      >
        {{ $t('filter_title') }}
      </h5>
      <button
        class="text-base text-gray-200 dark:text-gray-300 transition-300 font-normal leading-125 duration-200 hover:text-dark hidden xl:block"
        @click="clearFilter"
      >
        {{ $t('clear_filter') }}
      </button>
      <button @click="$emit('close')" class="xl:hidden">
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            opacity="0.4"
            cx="13.9997"
            cy="13.9997"
            r="11.6667"
            stroke="#6F6F6F"
            stroke-width="1.75"
          />
          <path
            d="M17.5 10.5L10.5 17.5M10.5 10.5L17.4999 17.5"
            stroke="#6F6F6F"
            stroke-width="1.75"
            stroke-linecap="round"
          />
        </svg>
      </button>
    </div>
    <div class="space-y-5">
      <ProductFilterCollapse v-bind="{ data: filterData, clearTrigger }" />
    </div>
    <div
      class="py-5 pr-4 flex-center-between border-b border-solid border-gray-500 dark:border-gray-100 transition-300"
    >
      <p
        class="text-base text-dark dark:text-white transition-300 font-normal leading-12"
      >
        {{ $t('goods_on_sale') }}
      </p>
      <FormToggle
        name="discount"
        :model-value="discount"
        @update:modelValue="handleChange"
      />
    </div>
    <div class="pt-5 pr-4">
      <ClientOnly>
        <FormRange
          v-model="price"
          :label="$t('amount_range')"
          :curreny="$t('uzs')"
          label-class="text-base text-dark font-normal leading-125 dark:text-white transition-300"
        />
      </ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, unref } from 'vue'
import { useRouter } from 'vue-router'
import useUpdateRouteQuery from '~/composables/updateRouteQuery'
import { debounce, removeSpaces } from '~/helpers'

import type { IFilterData, IFilterItems } from '~/types/products'
import { useScroll } from '~/composables/useScroll'
const discount = ref(false)

interface Props {
  types?: Object
  filterData: IFilterData[]
}
const props = defineProps<Props>()

const router = useRouter()
const { t: $t } = useI18n()

const filterItems = reactive<IFilterData[]>(unref(props.filterData))

const price = ref<string[]>(['', ''])
const handleChange = (target: boolean) => {
  discount.value = target
  console.log(discount.value)
  useUpdateRouteQuery('discount', target ? '1' : '')
}

function updatePrice(newValue: string[]) {
  useUpdateRouteQuery('price_gte', removeSpaces(newValue[0]))
  setTimeout(() => {
    useUpdateRouteQuery('price_lte', removeSpaces(newValue[1]))
  }, 100)
}

watch(
  () => price.value,
  (newValue: string[]) => debounce('price', () => updatePrice(newValue)),
  {
    deep: true,
  }
)

function addNewField(list: IFilterData[] | IFilterItems[], parent = false) {
  for (let i = 0; i < list?.length; i++) {
    list[i].checked = false

    if (parent) {
      list[i].expanded = false
    }
    if (list[i]?.items) {
      addNewField(list[i].items, true)
    } else if (list[i].categories) {
      addNewField(list[i].categories)
    }
  }
}

watch(
  () => props.filterData,
  () => addNewField(filterItems),
  {
    immediate: true,
  }
)

const { hideOverflow, showOverflow } = useScroll()
const showMenu = ref(false)

function clearFilter() {
  price.value = ['', '']
  discount.value = false

  router.replace({ query: {} })
}

onMounted(() => {
  const routeQuery = router.currentRoute.value.query

  discount.value = routeQuery?.discount === '1'

  if (routeQuery.price_gte || routeQuery.price_lte) {
    price.value = [
      (routeQuery?.price_gte as string) || '',
      (routeQuery?.price_lte as string) || '',
    ]
  }
})
</script>
<style scoped></style>
