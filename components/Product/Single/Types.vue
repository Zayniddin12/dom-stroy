<template>
  <div>
    <div v-if="loading" class="pt-4 pb-5">
      <CommonBlockPreloader
        :loading="loading"
        width="40%"
        height="26px"
        margin="0 0 12px"
      />
      <div class="flex items-center gap-3">
        <CommonBlockPreloader
          v-for="item in 6"
          :key="item"
          :loading="loading"
          width="44px"
          height="44px"
        />
      </div>
      <CommonBlockPreloader
        :loading="loading"
        width="30%"
        height="26px"
        margin="16px 0 12px"
      />
      <div class="flex items-center gap-3">
        <CommonBlockPreloader
          v-for="item in 6"
          :key="item"
          :loading="loading"
          width="65px"
          height="36px"
        />
      </div>
    </div>
    <div v-else class="pt-4 pb-5">
      <h2 class="text-dark-200 dark:text-white font-normal transition-300">
        {{ $t('type') }}:
        <span class="text-gray-200 font-normal">
          {{ single?.product_group_title }}
        </span>
      </h2>
      <div class="mt-3">
        <client-only>
          <swiper
            v-if="group?.length > 1"
            :spaceBetween="8"
            :slides-per-view="'auto'"
          >
            <swiper-slide
              v-for="(item, index) in group"
              :key="index"
              class="rounded-md cursor-pointer text-dark-200 !w-11 !h-11 transition-200 hover:border-red"
              :class="
                item?.slug === $route.params?.slug
                  ? 'border-red border-[2px]'
                  : 'border-gray-400 border'
              "
              @click="openWindow(`/products/${item?.slug}`)"
            >
              <img
                v-if="item?.images[0]?.small"
                alt="product_image"
                class="w-full h-full object-cover rounded"
                :src="item?.images[0]?.small"
              />
              <img
                v-else
                src="/images/defaults/image.webp"
                alt="image"
                class="w-full h-full object-contain bg-white rounded"
              />
            </swiper-slide>
          </swiper>
        </client-only>
      </div>
      <div v-for="(item, idx) in single?.general_attributes" :key="idx">
        <h2
          v-if="item?.title"
          class="transition-300 text-dark-200 dark:text-white font-normal mt-4 transition-300"
        >
          {{ item?.title }}:
          <span class="text-gray-200 font-normal">
            {{ getAttribute(item?.id)?.value }}
          </span>
        </h2>
        <div class="mt-3 flex gap-3">
          <!--            :disabled="!getActiveProduct(atr, item) || getAttribute(item?.id).value === atr.value"-->
          <button
            v-for="(atr, attrIdx) in item?.attributes"
            :key="attrIdx"
            :class="[
              'rounded-md p-1 cursor-pointer text-dark-200 dark:text-white flex-center !w-fit !px-3 !h-9  border-[2px] transition-300 dark:bg-dark-300',
              getAttribute(item?.id)?.value === atr.value
                ? 'border-red'
                : !getActiveProduct(atr, item)
                ? 'border-gray-400 text-gray-300 dark:border-white/20 dark:text-white/20'
                : 'border-gray-300',
            ]"
            @click="changeProduct(atr, item)"
          >
            {{ atr.value }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { TProduct } from '~/types/products'
import type { TProductSingle } from '~/types/ProductSingle'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Thumbs } from 'swiper/modules'

interface Props {
  group: TProduct[]
  loading: boolean
  single: TProductSingle
}

const props = defineProps<Props>()

interface Emits {
  (e: 'change', data: TProductSingle): void

  (
    e: 'change-attribute',
    data: {
      attribute: number
      value: string
    }
  ): void
}

const emit = defineEmits<Emits>()

const router = useRouter()
const localePath = useLocalePath()

const openWindow = (url: string) => {
  window.open(url, '_self')
}

function getAttribute(attr: number) {
  return props.single?.attributes.find((item) => item.attribute === attr)
}

function getActiveProduct(
  data: { attribute: number; value: string },
  parent: { id: number; title: string }
) {
  const hasAttributeProducts = props.single?.products.filter((el) =>
    el.attributes.find((el) => el.value === data.value)
  )

  const anotherAttributes = props.single?.attributes.filter(
    (el) => el.attribute !== parent.id
  )

  return hasAttributeProducts.find((item) => {
    return anotherAttributes.every((value) => {
      return item.attributes.some((attr) => attr.value === value.value)
    })
  })
}

function changeProduct(
  data: { attribute: number; value: string },
  parent: { id: number; title: string }
) {
  const product = getActiveProduct(data, parent)

  if (product) {
    router.push(`/products/${product?.slug}`)
  } else {
    emit('change-attribute', {
      attribute: parent.id,
      value: data.value,
    })
  }
  // router.push(`/products/${product?.slug}`)
}
</script>
