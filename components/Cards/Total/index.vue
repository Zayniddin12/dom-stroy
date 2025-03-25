<template>
  <div class="bg-white dark:bg-dark-100 transition-300 rounded-xl px-5 py-6">
    <h2
      v-if="order"
      class="text-dark-200 dark:text-white text-2xl font-normal pb-5 border-b border-b-gray-600 dark:border-b-dark-300 transition-300"
    >
      {{ $t('all_goods') }}
    </h2>
    <CardsTotalList
      :data="total"
      v-bind="{ loading, basket }"
      :account="authStore.user?.cashback_balance"
    />
    <div v-if="goods?.length">
      <p
        class="text-dark-200 dark:text-white font-medium leading-140 flex-y-center my-3 cursor-pointer transition-300"
        @click="goodsActive = !goodsActive"
      >
        {{ $t('goods') }}
        <span class="text-gray-200 mx-1">({{ goods?.length }})</span
        ><span
          class="icon-chevron-down text-[28px] dark:text-white leading-[20px] transition-300"
          :class="goodsActive ? 'rotate-180' : 'rotate-0'"
        />
      </p>
      <transition name="goods">
        <ul
          id="collapser_total"
          class="transition-300 overflow-hidden h-0 mb-4"
        >
          <li
            v-for="(item, ind) of goods"
            :key="ind"
            :class="[goodsActive ? `opacity-100` : `opacity-0`]"
            class="grid grid-cols-12 gap-1 py-5 border-b border-[#F7F8FA] dark:border-b-dark-300 last:border-0 last:pb-0 transition-300"
          >
            <div class="col-span-7">
              <CommonBlockPreloader
                height="50px"
                width="170px"
                :loading="loading"
              >
                <p class="leading-140 font-normal dark:text-gray-300 transition-300 text-gray-100 line-clamp-2">
                  {{
                    item?.product?.title ? item?.product?.title : item?.title
                  }}
                </p>
              </CommonBlockPreloader>
              <CommonBlockPreloader
                height="20px"
                width="100px"
                :loading="loading"
                class="mt-2"
              >
                <p class="font-normal text-dark-200 dark:text-white leading-140 text-xs">
                  {{
                      item?.product_price
                  }}
                  uzs
                  <span>
                    x {{ item?.count ? item?.count : item?.amount }}
                  </span>
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
                class="font-normal text-dark-200 dark:text-white leading-140 text-base flex-shrink-0 text-right transition-300"
              >
                {{
                  item?.total_price
                }}
             uzs
              </p>
            </CommonBlockPreloader>
          </li>
        </ul>
      </transition>
    </div>
<!--    <i18n-t-->
<!--      v-if="!basket"-->
<!--      keypath="check_privacy"-->
<!--      tag="p"-->
<!--      scope="global"-->
<!--      class="text-dark text-xs leading-140 mb-3 sm:mb-0"-->
<!--    >-->
<!--      <template #privacy>-->
<!--        <nuxt-link to="/profile/terms-of-use" class="underline">{{-->
<!--          $t('privacy')-->
<!--        }}</nuxt-link>-->
<!--      </template>-->
<!--      <template #user_privacy>-->
<!--        <nuxt-link to="/profile/terms-of-use" class="underline">{{-->
<!--          $t('user_privacy')-->
<!--        }}</nuxt-link>-->
<!--      </template>-->
<!--    </i18n-t>-->
  </div>
</template>

<script setup lang="ts">
import { formatNumber, formatMoneyDecimal } from '@/helpers'
import type { IProduct } from '~/types/order'
import  type { ICheck } from '~/types/order'
import { useAuthStore } from '~/store/auth'
import { useOrderStore } from '~/store/order'

const { t } = useI18n()
const authStore = useAuthStore()
const orderStore = useOrderStore()
interface Props {
  total: ICheck
  totalPrice?: {
    result: number
    discount: number
    priceWithDiscount: number
    originalPrice: number
  }
  goods?: IProduct[]
  basket?: boolean
  loading?: boolean
  order?: boolean
  checkout?: boolean
}
const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'on-submit', value: string): void
}>()
const cashback = ref(false)
const goodsActive = ref(false)
const user = computed(() => authStore.user)
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
function price(discount: string, num: string, count: number) {
  const disc = parseInt(discount)
  const originalPrice = parseInt(num)
  const counted = (disc ? disc : originalPrice ? originalPrice : 0) * count
  return {
    price: formatNumber(disc ? disc : originalPrice ? originalPrice : 0),
    total: formatNumber(counted),
  }
}

watch(
  () => cashback.value,
  () => {
    orderStore.setCashback(cashback.value)
  }
)
onMounted(() => {
  cashback.value = orderStore.cashback
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
