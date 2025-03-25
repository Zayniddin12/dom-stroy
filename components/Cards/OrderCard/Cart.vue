<template>
  <div
    class="md:grid grid-cols-12 py-5 item h-full group transition-200 ease-in-out relative"
  >
    <div class="flex col-span-8">
      <CommonBlockPreloader
        height="120px"
        width="120px"
        v-bind="{ loading }"
        class="w-[92px] h-[92px] md:w-[120px] md:h-[120px] md:mr-6 mr-4 flex-shrink-0"
      >
        <CardsProductImageSlider :images="images" class="w-[92px] h-[92px]" />
      </CommonBlockPreloader>
      <!--  Card info  section    -->
      <div class="flex flex-col justify-between">
        <CardsOrderCardOrderInfoSingle
          :rate="data?.product?.rate"
          :title="data?.product?.title"
          :id="data?.product?.slug"
          :comment-count="data?.product?.comment_count"
          v-bind="{ loading }"
          class="pr-2"
        />
        <div
          :class="!loading ? 'opacity-0 hidden ' : 'opacity-1 my-4 block'"
        ></div>
        <CommonBlockPreloader
          :loading="loading"
          height="17px"
          width="25px"
          class="hello"
        >
          <LazyButtonSave
            v-if="false"
            class="!bg-white !text-gray-200 flex !justify-start !items-end"
            :modelValue="data?.product?.is_liked"
            :id="data?.product?.id"
            :with-word="true"
          />
        </CommonBlockPreloader>
        <div
          class="col-span-4 md:border-l border-solid border-gray-500 md:!hidden flex-col grow-[3] h-full flex"
        >
          <CommonBlockPreloader
            v-bind="{ loading }"
            height="40px"
            width="200px"
            content-wrapper-class="h-full flex flex-col justify-between"
            class="w-full h-full"
          >
            <CardsOrderCardOrderPrice
              :price="totalSum?.total"
              :sale-price="totalSum?.totalDiscount"
            >
              <!--     v-if="type == cart"       -->
              <template #counter>
                <CommonCounter
                  class="md:max-w-[170px] max-w-[200px] h-[36px] md:!h-auto"
                  v-model="counter"
                  :defaultCount="data?.amount"
                  counter-class="py-2.5 px-2 !bg-gray-500 dark:bg-dark-300"
                  min="1"
                  :max="maxCount"
                />
              </template>
              <!--     v-if="type == cart"       -->
              <template #delete>
                <div
                  @click="emit('delete', data?.product?.id)"
                  class="md:bg-gray-500 dark:bg-dark-300 dark:border-transparent bg-white border-2 border-gray-500 w-8 h-8 rounded-full md:rounded-lg cursor-pointer flex justify-center items-center absolute -left-[14px] top-[5px] md:relative md:left-0 md:right-0"
                >
                  <i
                    class="icon-trash text-[25px] text-black md:text-[#9E9EA5] transition duration-300 hover:text-red"
                  />
                </div>
              </template>
            </CardsOrderCardOrderPrice>
          </CommonBlockPreloader>
        </div>
      </div>
    </div>
    <!-- Card price section     -->
    <div
      class="col-span-4 pl-4 md:border-l border-solid border-gray-500 dark:border-dark-300 md:!flex flex-col grow-[3] h-full hidden"
    >
      <CommonBlockPreloader
        v-bind="{ loading }"
        height="40px"
        width="200px"
        content-wrapper-class="h-full flex flex-col justify-between"
        class="w-full h-full"
      >
        <CardsOrderCardOrderPrice
          :price="totalSum?.total"
          :sale-price="totalSum?.totalDiscount"
        >
          <p class="text-[#9E9EA5] leading-140 text-xs font-normal">
            {{ formatNumber(totalSum?.countPrice) }} UZS x {{ counter }}
          </p>
          <!--     v-if="type == cart"       -->
          <template #counter>
            <CommonCounter
              class="max-w-[170px] !h-auto"
              v-model="counter"
              :defaultCount="data?.amount"
              counter-class="py-2.5 px-2 !bg-gray-500"
              min="1"
              :max="maxCount"
            />
          </template>
          <!--     v-if="type == cart"       -->
          <template #delete>
            <div
              @click="emit('delete', data?.product?.id)"
              class="md:bg-gray-500 dark:bg-dark-300 dark:border-transparent bg-white border-2 border-gray-500 w-8 h-8 rounded-full md:rounded-lg cursor-pointer flex justify-center items-center absolute -left-[14px] top-[5px] md:relative md:left-0 md:right-0"
            >
              <i
                class="icon-trash text-[25px] text-black md:text-[#9E9EA5] transition duration-300 hover:text-red"
              ></i>
            </div>
          </template>
        </CardsOrderCardOrderPrice>
      </CommonBlockPreloader>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatNumber } from '~/helpers'
import { useBasketController } from '~/composables/basketController'
import type { IProduct } from '~/types/order'
import { useOrderStore } from '~/store/order'

interface Props {
  type: string
  data?: IProduct
  loading?: boolean
  route?: string
}
const orderStore = useOrderStore()
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
const maxCount = computed(() => {
  if (!props.data?.product_realtime_count) {
    return counter.value
  } else {
    return counter.value + props.data?.product_realtime_count
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
    orderStore.fetchCartProducts()
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

<style scoped>
.item:not(:last-child) {
  @apply border-b border-[#f7f8fa] dark:border-dark-300;
}
</style>
