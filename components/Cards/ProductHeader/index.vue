<template>
  <CardsBlank>
    <div class="grid grid-cols-max-2 md:grid-cols-max-1">
      <div class="w-[300px] sm:aspect-square mr-5 flex flex-col">
        <div v-if="loading" class="h-full flex flex-col">
          <CommonBlockPreloader
            width="100%"
            height="100%"
            border-radius="12px"
            class="flex-grow-[1]"
            :loading="true"
          />
          <div class="flex justify-center gap-4 mt-2">
            <CommonBlockPreloader
              v-for="i in 5"
              :key="i"
              width="2rem"
              height="32px"
              :loading="true"
            />
          </div>
        </div>
        <CommonSliderGallery
          v-else
          :images="data?.images"
          :discount="data?.sale_price"
        />
      </div>
      <!-- Main body-->
      <div class="h-full grid grid-rows-[1fr_max-content]">
        <!-- Top header-->
        <div class="h-full">
          <div
            class="grid grid-cols-2-max gap-2.5 !mt-4 md:!mt-0 md:gap-0 md:grid-cols-1-max mb-4"
          >
            <div class="flex gap-2">
              <CommonBlockPreloader
                :loading="loading"
                width="90px"
                height="24px"
              >
                <div
                  v-if="data?.category?.title"
                  class="px-2 py-1 text-[13px] font-normal rounded bg-gray-400 dark:bg-dark-300 text-gray-100 dark:text-gray-300 transition-300"
                >
                  {{ data?.category?.title }}
                </div>
              </CommonBlockPreloader>
            </div>
            <div class="flex items-center gap-1">
              <CommonBlockPreloader
                :loading="loading"
                width="23px"
                height="20px"
              >
                <span
                  class="text-base transition-300 dark:text-gray-300 text-gray-100 font-normal inline-block leading-5"
                >{{ data?.rate }}</span
                >
              </CommonBlockPreloader>
              <CommonBlockPreloader
                :loading="loading"
                width="100px"
                height="20px"
              >
                <CommonRating :rate="data?.rate" />
              </CommonBlockPreloader>
            </div>
          </div>
          <!-- Title -->
          <div v-if="loading">
            <CommonBlockPreloader
              :loading="loading"
              width="100%"
              height="26px"
              margin="0 0 16px"
            />
          </div>
          <h1
            v-else
            class="text-dark-200 dark:text-white transition-300 md:text-xl font-semibold pb-4 border-b border-b-gray-400 dark:border-b-dark-300 transition-300"
          >
            {{ data?.title }}
          </h1>
        </div>
        <div
          class="flex justify-between items-center pt-4 pb-3 border-b border-b-gray-400 dark:border-b-dark-300 transition-300"
        >
          <p
            class="text-base text-semibold text-dark-200 dark:text-white transition-300"
          >
            {{ $t('in_stock') }}
          </p>
          <div class="flex justify-between items-center p-3 bg-red rounded-lg">
            <p
              v-if="data?.realtime_count == 0"
              class="text-base text-semibold text-white"
            >
              {{ $t('no_product') }}
            </p>
            <p
              v-else-if="data?.realtime_count > 0 && data?.realtime_count <= 10"
              class="text-base text-semibold text-white"
            >
              {{ data?.realtime_count + ' ' + $t('pcs') }}
            </p>
            <p v-else class="text-base text-semibold text-white">
              {{ $t('exist') }}
            </p>
          </div>
        </div>
        <ProductSingleTypes
          v-bind="{ group, loading, single: data }"
          @change-attribute="$emit('change-attribute', $event)"
        />
        <div
          class="border-t border-t-gray-400 dark:border-t-dark-300 pt-3 transition-300"
        >
          <CommonBlockPreloader
            :loading="loading"
            width="116px"
            height="24px"
            preloader-class="mt-1"
          >
            <p
              v-if="data?.price_without_discount"
              class="text-red line-through"
            >
              {{ formatNumber(data?.price_without_discount) }}
              {{ $t('uzsum') }}
            </p>
          </CommonBlockPreloader>
          <CommonBlockPreloader :loading="loading" width="230px" height="32px">
            <h3
              class="text-2xl text-dark dark:text-white font-bold transition-300"
            >
              {{ formatNumber(data?.price) }} {{ $t('uzsum') }}
            </h3>
          </CommonBlockPreloader>

          <div class="flex mt-4 gap-3 items-stretch card__basket">
            <CommonBlockPreloader
              content-wrapper-class="h-full"
              :loading="loading"
              width="180px"
              height="50px"
              border-radius="10px"
            >
              <ButtonAddToCart
                :title="$t('add_to_cart')"
                :id="data?.id"
                :max-counter="data?.realtime_count"
                :disabled="!data?.realtime_count"
                counter-class="!bg-gray-600 !w-full md:w-[200px]"
                class="!w-full sm:w-[200px] card_basket"
              />
            </CommonBlockPreloader>
            <CommonBlockPreloader
              :loading="loading"
              width="126px"
              height="50px"
              border-radius="10px"
            >
              <ButtonShare
                button-class="!h-full !min-h-[3.125rem] dark:!bg-white/10 dark:!text-white transition-300"
                class="!h-full"
                :url="url"
                :title="data?.title"
              />
            </CommonBlockPreloader>
            <CommonBlockPreloader
              :loading="loading"
              width="3.125rem"
              height="50px"
              border-radius="10px"
            >
              <ButtonSave
                @button-clicked="$emit('buttonClicked')"
                class="w-[3.125rem] h-[3.125rem] dark:!text-red"
                icon-width="28"
                icon-height="28"
                :id="data?.id"
                button-class="!w-full !h-full !m-0 !bg-gray-400 dark:!bg-white/10 dark:!text-white transition-300 dark:border-white/10 dark:hover:border-orange"
                v-model="isLiked"
              />
            </CommonBlockPreloader>
          </div>
        </div>
      </div>
    </div>
  </CardsBlank>
</template>

<script setup lang="ts">
import { formatNumber } from '~/helpers'
import type { TProductSingle } from '~/types/ProductSingle'
import type { TProduct } from '~/types/products'

interface Props {
  data: TProductSingle
  group: TProduct
  isLikedData: boolean
}
const props = defineProps<Props>()

interface Emits {
  (
    e: 'change-attribute',
    data: {
      attribute: number
      value: string
    }
  ): void
}
defineEmits<Emits>()
const isLiked = ref(props.isLikedData || false)
const url = ref(location.href)
const price = computed(() => {
  const discount = parseInt(props.data?.price_without_discount)
  const originalPrice = parseInt(props.data?.price)
  return {
    discount: discount ? originalPrice : 0,
    original: discount ? discount : originalPrice,
  }
})
// onMounted(() => {
//   url.value = location.href
// })
</script>
<style scoped>
@media screen and (max-width: 400px) {
  .card__basket .inline:nth-child(1) {
    width: 100% !important;
  }
  .card__basket {
    max-width: 300px !important;
  }
}
</style>
