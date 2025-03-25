<template>
  <CommonBlockPreloader
    width="100%"
    height="136px"
    border-radius="16px"
    :loading="loading"
  >
    <nuxt-link
      :to="
        localePath({ path: '/products', query: { manufacturers: brand?.id } })
      "
      class="cursor-pointer transition-200 bg-white p-4 rounded-2xl w-full h-[136px] flex justify-center items-center group inline-block"
      :class="{
        '!bg-gray-600 !h-[106px] !w-[220px] md:!h-[112px] md:!w-[234px]':
          isGray,
      }"
    >
      <img
        v-if="brand && brand?.icon"
        :src="brand?.icon ?? '/images/defaults/image.png'"
        :alt="brand?.title"
        width="200px"
        height="62px"
        class="w-full h-full grayscale transition-200 group-hover:scale-105 group-hover:grayscale-0 max-h-[62px] max-w-[200px] mx-auto object-contain"
      />
      <img
        v-else
        src="/images/defaults/image.webp"
        alt="image"
        width="200px"
        height="62px"
        class="w-full h-full grayscale transition-200 group-hover:scale-105 group-hover:grayscale-0 max-h-[62px] max-w-[200px] mx-auto object-contain"
      />
    </nuxt-link>
  </CommonBlockPreloader>
</template>

<script lang="ts" setup>
import type { TBrand } from '~/types/brand'

interface Props {
  brand?: TBrand
  loading?: boolean
  isGray?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  isGray: false,
})
const localePath = useLocalePath()
</script>

<style lang="scss" scoped></style>
