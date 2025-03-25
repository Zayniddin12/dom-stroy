<template>
  <ClientOnly>
    <CommonModalsModal
      :show="show"
      body-wrapper-class="!bg-transparent !w-full !max-w-[375px] !shadow-none"
      body-class="!top-0"
      @close="$emit('close')"
    >
      <div
        class="overflow-hidden rounded-lg mb-2 border border-gray-400 relative !w-full bg-white"
      >
        <swiper
          :style="{
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff',
          }"
          v-bind="settings"
          :thumbs="{ swiper: thumbsSwiper }"
          class="mySwiper2 w-full aspect-square"
        >
          <swiper-slide v-for="(i, idx) in images" :key="idx">
            <InnerImageZoom v-if="i?.large || i?.default" :src="i.large" :zoomSrc="i.default" />
          </swiper-slide>
        </swiper>
      </div>
      <div class="w-full flex items-center justify-center">
        <swiper
          @swiper="setThumbsSwiper"
          :spaceBetween="16"
          slidesPerView="auto"
          :freeMode="true"
          :watchSlidesProgress="true"
          :modules="modules"
          class="mySwiper"
        >
          <swiper-slide
            v-for="(i, idx) in images"
            :key="idx"
            class="border !w-[48px] !h-[48px] box-border rounded-lg border-gray-400/[16%] overflow-hidden cursor-pointer !p-1 group"
          >
            <div
              class="bg-white rounded-md overflow-hidden w-full h-full opacity-50 transition-300 img group-hover:opacity-70"
            >
              <img
                alt="image"
                class="w-full h-full object-cover"
                :src="i?.compressed"
              />
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </CommonModalsModal>
  </ClientOnly>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Keyboard, Thumbs, FreeMode } from 'swiper/modules'
import type { SwiperEvents } from 'swiper/types'
import InnerImageZoom from 'vue-inner-image-zoom';
type TImages = {
  default: string
  extra_small: string
  large: string
  medium: string
  small: string
  compressed: string
}
interface Props {
  images?: TImages[]
  loading?: boolean
  show?: boolean
}
defineProps<Props>()

const thumbsSwiper = ref<SwiperEvents>()
const setThumbsSwiper = (swiper: SwiperEvents) => {
  thumbsSwiper.value = swiper
}

const modules = [FreeMode, Thumbs, Keyboard]

const settings = {
  keyboard: {
    enabled: true,
  },
  spaceBetween: 10,
  modules,
}
</script>

<style>
.swiper-slide {
  @apply !transition-colors !duration-200;
}
.swiper-slide-thumb-active {
  @apply !border-red !opacity-100 !border-white;
}

.swiper-slide-thumb-active .img {
  @apply !opacity-100;
}
</style>
