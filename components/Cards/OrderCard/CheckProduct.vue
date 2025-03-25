<template>
  <div class="bg-white rounded-xl px-5 py-6">
    <h2 class="text-dark text-2xl font-bold pb-5 border-b border-b-gray-600">
      {{ $t('all_goods') }}
    </h2>
    <div class="flex-center-between border-b border-[#F7F8FA] py-5">
      <p class="text-gray-200 font-semibold text-xl leading-130">
        {{ $t('total') }}:
      </p>
      <CommonBlockPreloader height="30px" width="170px" :loading="loading">
        <p class="text-2xl text-dark leading-130 font-bold">
          {{ formatNumber(parseInt(total)) }}
          <span class="font-semibold text-gray-200 text-xl leading-130">
            UZS
          </span>
        </p>
      </CommonBlockPreloader>
    </div>
    <ul>
      <li
        v-for="(item, ind) of totalList"
        :key="ind"
        class="flex-center-between py-3 border-b border-[#F7F8FA] duration-300"
        :class="!basket && 'last:border-0 last:pb-0'"
      >
        <p class="leading-140 font-semibold text-gray-100">
          {{ item?.title }}:
        </p>
        <CommonBlockPreloader height="25px" width="170px" :loading="loading">
          <p class="leading-140 font-semibold text-dark flex-shrink-0">
            {{ item.data }}
          </p>
        </CommonBlockPreloader>
      </li>
    </ul>

    <div v-if="goods?.length">
      <p
        class="text-dark font-medium leading-140 flex-y-center my-3 cursor-pointer"
        @click="goodsActive = !goodsActive"
      >
        {{ $t('goods') }}
        <span class="text-gray-200 mx-1">({{ goods?.length }})</span
        ><span
          class="icon-chevron-down text-[20px] leading-[20px] transition-300"
          :class="goodsActive ? 'rotate-180' : 'rotate-0'"
        />
      </p>
      <transition name="goods">
        <ul id="collapser_total" class="transition-300 overflow-hidden h-0">
          <li
            v-for="(item, ind) of goods"
            :key="ind"
            :class="[goodsActive ? `opacity-100` : `opacity-0`]"
            class="grid grid-cols-12 gap-1 py-3 border-b border-[#F7F8FA] last:border-0 last:pb-0 transition-300"
          >
            <div class="col-span-7">
              <CommonBlockPreloader
                height="50px"
                width="170px"
                :loading="loading"
              >
                <p class="leading-140 font-semibold text-gray-100 line-clamp-2">
                  {{ item?.title }}
                </p>
              </CommonBlockPreloader>
              <CommonBlockPreloader
                height="20px"
                width="100px"
                :loading="loading"
                class="mt-2"
              >
                <p class="font-semibold text-dark leading-140 text-xs">
                  {{ formatNumber(parseInt(item?.product?.price)) }}
                  <span> UZS </span>
                  <span> x {{ item?.amount }} </span>
                </p>
              </CommonBlockPreloader>
            </div>
            <CommonBlockPreloader
              height="30px"
              width="100px"
              :loading="loading"
              class="col-span-5"
              content-wrapper-class="flex-shrink-0"
            >
              <p
                class="font-semibold text-right text-dark leading-140 text-base flex-shrink-0"
              >
                {{ formatNumber(parseInt(item?.total_price)) }}
                <span> UZS </span>
              </p>
            </CommonBlockPreloader>
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatNumber } from '@/helpers'
import type { IOtherProducts } from '~/types/order'

const { t } = useI18n()
interface Props {
  total: number
  discount: number
  orderPrice: number
  goods?: IOtherProducts[]
  basket?: boolean
}
const props = defineProps<Props>()
const goodsActive = ref(false)
const loading = ref(true)

watch(
  () => goodsActive.value,
  () => {
    const collapser = document.getElementById(
      'collapser_total'
    ) as HTMLUListElement
    if (goodsActive.value) {
      collapser.style.height = `${collapser.scrollHeight}px`
    } else {
      collapser.style.height = '0'
    }
  }
)

setTimeout(() => {
  loading.value = false
}, 300)

const totalList = computed(() => {
  return [
    {
      title: t('all'),
      data: `${formatNumber(props.orderPrice)} UZS`,
    },
    {
      title: t('sale'),
      data: `-${formatNumber(props.discount)} UZS`,
    },
  ]
})
</script>

<style scoped>
.goods-enter-active,
.goods-leave-active {
  transition: all 0.4s ease-out;
}

.goods-enter-from,
.goods-leave-to {
  transform: translateY(-30px);
  opacity: 0;
}
</style>
