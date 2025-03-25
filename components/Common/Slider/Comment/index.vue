<template>
  <div class="container px-0">
    <ClientOnly>
      <Swiper v-bind="settings" class="!overflow-visible pb-8 h-full">
        <SwiperSlide
          v-for="(item, index) in comments"
          :key="'I' + index"
          class="!h-auto"
        >
          <CardsComment :card="item" :loading="loading" class="h-full" />
        </SwiperSlide>
      </Swiper>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import type { TComment } from '~/types/comments'
interface Props {
  comments: TComment[]
  loading?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  loading: false,
})

const settings = {
  effect: 'cube',
  slidesPerView: 3,
  centeredSlides: false,
  cubeEffect: {
    shadow: false,
  },
  loop: true,
  spaceBetween: 24,
  autoplay: {
    delay: 10000,
    disableOnInteraction: false,
  },
  breakpoints: {
    1440: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
    1000: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    500: {
      slidesPerView: 1,
      spaceBetween: 24,
    },
    375: {
      slidesPerView: 1,
      spaceBetween: 24,
    },
    200: {
      slidesPerView: 1,
      spaceBetween: 24,
    },
  },

  modules: [Autoplay],
}
</script>

<style>
.main-slider .swiper-pagination-bullet {
  height: 4px !important;
  width: 30px;
  background-color: #d4d5d7;
  border-radius: 5px;
  transition: all 0.2s ease-in-out;
}

.main-slider .swiper-pagination-bullet-active {
  background-color: #383838;
}
</style>
