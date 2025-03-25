<template>
  <div
    class="md:grid grid-cols-12 mt-3 py-5 h-full group transition-200 ease-in-out border-b border-solid border-gray-500 last:border-none dark:border-b-dark-300"
  >
    <div class="flex col-span-8">
      <CommonBlockPreloader
        v-bind="{ loading }"
        class="w-[120px] max-h-[120px] mr-2 md:mr-6 flex-shrink-0"
      >
        <CardsProductImageSlider :images="data?.product?.images" />
      </CommonBlockPreloader>
      <!--  Card info  section    -->
      <div class="pl-2">
        <CommonBlockPreloader
          :loading="loading"
          height="23px"
          max-width="300px"
        >
          <NuxtLink
            :to="localePath(`/products/${data?.product?.slug}`)"
            class="text-dark-200 dark:text-white font-normal leading-130 text-xl line-clamp-2 transition-200 ease-in-out group-hover:text-red"
          >
            {{ data?.title }}
          </NuxtLink>
        </CommonBlockPreloader>
        <div class="flex items-center gap-[8px]">
          <CommonBlockPreloader
            :loading="loading"
            height="23px"
            max-width="300px"
            margin="8px 4px 0 0"
            class="!block"
          >
            <CommonRating
              :rate="data?.product?.rate"
              class="gap-2"
              star-class="!text-lg"
            />
          </CommonBlockPreloader>
          <CommonBlockPreloader :loading="loading" height="23px" width="10%">
            <p class="text-[#9E9EA5] dark:text-gray-300 transition-300 text-sm leading-[18.2px] font-normal">
              {{ data?.product?.comment_count }}
            </p>
          </CommonBlockPreloader>
        </div>
      </div>
    </div>
    <!-- Card price section     -->
    <div
      class="col-span-4 md:pl-4 md:border-l border-solid border-gray-500 dark:border-l-dark-300 transition-300 flex flex-col grow-[3] h-full"
    >
      <CommonBlockPreloader
        v-bind="{ loading }"
        height="40px"
        width="200px"
        content-wrapper-class="flex flex-col justify-between"
        class="w-full h-full"
      >
        <div class="mt-4 md:mt-0">
          <p v-if="price?.discount" class="text-red leading-120 text-sm font-semibold line-through">
            {{ formatNumber(price?.discount) }} UZS
          </p>
          <h2 class="text-xl font-normal dark:text-white transition-300 text-dark-200">
            {{ formatNumber(price?.sale_price) }} UZS
          </h2>
          <p class="text-xs text-gray-200 dark:text-gray-300 transition-300">
            {{ formatNumber(price?.sale_price) }} UZS X {{ data?.amount }}
          </p>
        </div>

      </CommonBlockPreloader>
      <CommonButton
        :disabled="!data?.product?.has_comment || !data?.product?.can_comment"
        :text="$t('add_review')"
        variant="light"
        class="w-2/3"
        @click="showModal = true"
      />
    </div>
  </div>
  <CommonModalsAddReview
    :show="showModal"
    :success="showSuccessModal"
    @close="showModal = false"
    @send="sendReview"
  />
</template>

<script setup lang="ts">
import { formatNumber, formatMoneyDecimal } from '~/helpers'
import  type { IOtherProducts } from '~/types/order'
import type { TReviewPayloadData } from '~/types/feedback'
import * as pkg from 'vue-toastification'

interface Props {
  type: string
  data: IOtherProducts
  loading?: boolean
  route?: string
  discount?: number
}
const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
  (e: 'delete', value: number): void
  (e: 'submit'): void
}>()

const { useToast } = pkg

const toast = useToast()
const { t } = useI18n()
const localePath = useLocalePath()

const price = computed(() => {
  const sale = parseInt(props.data?.product_price)
  const cost = parseInt(props.data?.product?.price)
  const discount = sale ? cost : 0
  const sale_price = sale ? sale : cost
  return {
    discount,
    sale_price,
  }
})
const images = computed(() => {
  return []
})
const showModal = ref(false)
const showSuccessModal = ref(false)

const sendReview = async (data: TReviewPayloadData) => {
  data.product = props.data?.product?.id
  try {
    const { data: resData, error } = await useFetcher(`products/comment/`, {
      method: 'POST',
      body: { ...data },
    })
    if (error) {
      if (error.data?.message) {
        toast.error(error.data?.message)
      } else {
        toast.error(error.data?.errors[0]?.message)
      }
    } else {
      showModal.value = false
      showSuccessModal.value = true
    }
  } catch (err) {}
}
</script>
<style scoped>
.item:not(:last-child) {
  border-bottom: 1px solid #f7f8fa;
}
</style>



