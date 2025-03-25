<template>
  <div
    v-if="card"
    class="relative cursor-pointer transition-300 border-2 dark:border-[#383838b3] dark:bg-dark-300 border-gray-500 hover:border-gray-300 bg-gray-500 rounded-xl overflow-hidden product-card group flex flex-col justify-between h-full"
    :class="{ 'pointer-events-none': loading }"
  >
    <CommonBlockPreloader :loading="loading" width="100%" height="178px">
      <CardsProductImageSlider class="relative z-1" :images="card?.images" />
    </CommonBlockPreloader>
    <CommonBlockPreloader
      :loading="loading"
      width="20%"
      height="24px"
      class="absolute top-3 left-2 z-2"
    >
      <CommonBadgeDiscount
        v-if="card?.sale_price && card?.sale_price !== '0.00'"
      />
    </CommonBlockPreloader>
    <CommonBlockPreloader :loading="loading" class="absolute top-3 right-2 z-2">
      <ButtonSave v-model="isLiked" :id="card?.id" />
    </CommonBlockPreloader>
    <div
      class="flex flex-col justify-between h-full transition-300 dark:bg-dark-300 rounded-[9px] -mt-2 relative z-10"
    >
      <NuxtLink
        :to="localePath(`/products/${card?.slug}`)"
        class="flex-col pt-5 px-3 h-full hidden md:flex"
      >
        <CommonBlockPreloader
          :loading="loading"
          width="100%"
          height="24px"
          class="mb-1 !block"
        >
          <p
            class="text-xs font-normal leading-130 text-orange mb-1 transition-300 line-clamp-1"
          >
            {{ card?.manufacturer?.title }}
          </p>
        </CommonBlockPreloader>
        <CommonBlockPreloader
          :loading="loading"
          width="100%"
          height="24px"
          class="mb-1 !block"
        >
          <p
            class="text-xs leading-130 text-dark-200 dark:text-white h-8 group-hover:text-orange transition-300 line-clamp-2 font-normal"
          >
            {{ card?.title }}
          </p>
        </CommonBlockPreloader>
        <CommonBlockPreloader
          v-if="card?.price_without_discount"
          :loading="loading"
          width="100%"
          height="14px"
          class="mb-0.5 !block"
        >
          <p
            v-if="card.price_without_discount"
            class="text-orange dark:text-white transition-300 leading-120 text-sm font-semibold line-through"
          >
            {{ formatNumber(card.price_without_discount ?? '') }} UZS
          </p>
        </CommonBlockPreloader>
        <CommonBlockPreloader
          :loading="loading"
          width="100%"
          height="16px"
          class="mb-1 !block"
        >
          <p
            class="text-dark-200 dark:text-white transition-300 leading-[124%] font-bold text-base"
          >
            {{ price(card?.sale_price, card?.price)?.price }} UZS
          </p>
        </CommonBlockPreloader>
        <CommonBlockPreloader
          :loading="loading"
          width="100%"
          height="16px"
          class="!block"
        >
          <div class="mb-2 flex items-center gap-2">
            <CommonRating
              class="gap-1"
              :rate="card?.rate"
              star-class="text-xs leading-3"
            />
            <span
              v-if="card?.comment_count"
              class="text-gray-200 dark:text-gray-300 text-sm leading-130"
            >
              {{ card?.comment_count }}
            </span>
          </div>
        </CommonBlockPreloader>
      </NuxtLink>
      <!--      mobile responsive-->
      <NuxtLink
        :to="localePath(`/products/${card?.slug}`)"
        class="flex-col pt-3 px-3 h-full flex md:hidden"
      >
        <CommonBlockPreloader
          :loading="loading"
          width="100%"
          height="16px"
          class="mb-1 !block"
        >
          <p
            class="text-dark dark:text-white transition-300 leading-[124%] font-bold text-base"
          >
            {{ price(card?.sale_price, card?.price)?.price }} UZS
          </p>
        </CommonBlockPreloader>
        <CommonBlockPreloader
          :loading="loading"
          width="100%"
          height="16px"
          class="!block"
        >
          <div class="mb-2 flex items-center gap-2">
            <CommonRating
              class="gap-1"
              :rate="card?.rate"
              star-class="text-xs leading-3"
            />
            <!--        Todo: rating count should be fixed by backend     -->
            <span
              v-if="card?.comment_count"
              class="text-gray-200 text-sm leading-130"
            >
              {{ card?.comment_count }}
            </span>
          </div>
        </CommonBlockPreloader>
        <!--        <CommonBlockPreloader-->
        <!--          :loading="loading"-->
        <!--          width="100%"-->
        <!--          height="24px"-->
        <!--          class="mb-1 !block"-->
        <!--        >-->
        <!--          <p-->
        <!--            class="text-sm leading-130 text-red mb-1 group-hover:text-red transition-300 line-clamp-1"-->
        <!--          >-->
        <!--            {{ card?.manufacturer?.title }}-->
        <!--          </p>-->
        <!--        </CommonBlockPreloader>-->
        <CommonBlockPreloader
          :loading="loading"
          width="100%"
          height="24px"
          class="mb-1 !block"
        >
          <h4
            class="text-xs leading-130 text-dark dark:text-white dark:hover:text-red transition-300 h-8 group-hover:text-red transition-300 line-clamp-2"
          >
            {{ card?.title }}
          </h4>
        </CommonBlockPreloader>
        <div class="flex-grow"></div>
        <CommonBlockPreloader
          v-if="card?.sale_price && card?.sale_price !== '0.00'"
          :loading="loading"
          width="100%"
          height="14px"
          class="mb-0.5 !block"
        >
          <p class="text-red leading-120 text-sm font-semibold line-through">
            {{ price(card?.sale_price, card?.price)?.originalPrice }} UZS
          </p>
        </CommonBlockPreloader>
      </NuxtLink>
      <!--      mobilke responsive-->
      <CommonBlockPreloader
        width="100%"
        height="44px"
        :loading="loading"
        class="mt-auto pb-3 px-3"
      >
        <ButtonAddToCart
          class="!h-11"
          :id="card?.id"
          :max-counter="card?.realtime_count"
          :disabled="!card?.realtime_count"
          @submitCount="submitCount"
        />
      </CommonBlockPreloader>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatNumber } from '~/helpers'
import type { TProduct } from '~/types/products'

interface Props {
  card?: TProduct
  loading?: boolean
}

const props = defineProps<Props>()
const localePath = useLocalePath()
const isLiked = ref(false)
const submitCount = (num: number) => {}
watch(
  () => props.card,
  () => {
    isLiked.value = props.card?.is_liked ?? false
  },
  {
    deep: true,
    immediate: true,
  }
)

function price(discount: string, num: string) {
  const disc = parseInt(discount)
  const originalPrice = parseInt(num)
  return {
    price: formatNumber(disc ? disc : originalPrice ? originalPrice : 0),
    originalPrice: formatNumber(originalPrice ? originalPrice : 0),
  }
}
</script>

<style scoped>
.product-card:hover {
  box-shadow: 0 8px 40px rgba(40, 40, 40, 0.12);
}
</style>
