<template>
  <NuxtLink
    :to="localePath(`/order/${data?.id}`)"
    class="grid grid-cols-4 md:!grid-cols-12 py-5 item h-full group transition-200 ease-in-out group border-b border-b-gray-600 dark:border-b-dark-300 last:border-none"
  >
    <div class="flex col-span-8">
      <CommonBlockPreloader
        height="120px"
        width="120px"
        v-bind="{ loading }"
        class="w-[120px] max-h-[120px] mr-2 md:mr-6 flex-shrink-0"
        content-wrapper-class="h-full w-full"
      >
        <CardsOrderCardOrderImages :countImg="images?.length" :images="images" />
      </CommonBlockPreloader>
      <!--  Card info  section    -->
      <div class="w-full">
        <!--     v-if="type == group"       -->
        <CardsOrderCardInfoOrderGroup
          :status="data?.status"
          :id="data.id"
          :subtitle="data?.product_count"
          :address="data?.address"
          v-bind="{ loading }"
        />
      </div>
    </div>
    <!-- Card price section     -->
    <div
      class="col-span-4 md:pl-4 md:border-l border-gray-500 dark:border-dark-300 transition-300 flex flex-col grow-[3] h-full"
    >
      <CommonBlockPreloader
        v-bind="{ loading }"
        height="40px"
        width="200px"
        content-wrapper-class="h-full flex flex-col justify-between"
        class="w-full h-full"
      >
        <p class="text-xl font-normal text-dark dark:text-white mt-4 md:mt-0 transition-300">
          {{ formatNumber(parseInt(data?.order_price)) }} UZS
        </p>
      </CommonBlockPreloader>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { formatNumber } from '~/helpers'
import { useBasketController } from '~/composables/basketController'
import type  { IOrderItems } from '~/types/order'

interface Props {
  type: string
  data?: IOrderItems
  loading?: boolean
  route?: string
}
const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
  (e: 'delete', value: number): void
}>()
const counter = ref()
const images = computed(() => {
  if (props.type === 'group') {
    return props.data?.product_images
  } else {
    const res = []
    res.push(props.data?.product?.image_src)
    return res
  }
})
watch(
  () => props.data,
  () => {
    counter.value = props.data?.amount
  },
  {
    immediate: true,
    deep: true,
  }
)
watch(
  () => counter.value,
  () => {
    emit('update:modelValue', counter.value)
  },
  {
    immediate: true,
    deep: true,
  }
)
watch(
  () => counter.value,
  () => {
    addToCard(props.data?.product?.id, counter.value, props.route)
  }
)
const totalSum = computed(() => {
  const discount = parseInt(props.data?.sale_price)
  const price = parseInt(props.data?.price)
  const total = (price ? price : 0) * Number(counter.value)
  const totalDiscount = (discount ? discount : 0) * Number(counter.value)
  const countPrice = discount ? discount : price
  return { total, countPrice, totalDiscount }
})
const { addToCard } = useBasketController()
</script>


