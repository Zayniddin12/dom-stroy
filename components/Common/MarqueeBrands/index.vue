<template>
  <div class="relative bg-white overflow-hidden">
    <VueMarqueeSlider
      id="marquee-slider-loop"
      :speed="Math.trunc(partnersList.length / 3) * 10000"
      width="234px"
      reverse
      space="16"
    >
      <a
        v-for="(partner, index) in partnersList"
        :key="index"
        :href="partner.url"
        class="cursor-pointer bg-gray-600 p-4 rounded-2xl min-w-[234px] w-full h-[112px] flex justify-center items-center"
        target="_blank"
        aria-label="link"
      >
        <img
            v-if="partner.img.middle"
          :src="partner.img.middle"
          :alt="partner.name"
          class="grayscale transition duration-300 md:hover:grayscale-0 max-h-[72px] max-w-[200px] mx-auto object-cover object-center"
        />
      </a>
    </VueMarqueeSlider>
    <VueMarqueeSlider
      id="marquee-slider-loop"
      :speed="Math.trunc(partnersList.length / 3) * 10000"
      width="234px"
      space="16"
      class="mt-4"
    >
      <a
        v-for="(partner, index) in partnersList"
        :key="index"
        :href="partner.url"
        class="cursor-pointer bg-gray-600 p-4 rounded-2xl min-w-[234px] w-full h-[112px] flex justify-center items-center"
        target="_blank"
        aria-label="link"
      >
        <img
            v-if="partner.img.middle"
          :src="partner.img.middle"
          :alt="partner.name"
          class="grayscale transition duration-300 md:hover:grayscale-0 max-h-[72px] max-w-[200px] mx-auto object-cover object-center"
        />
      </a>
    </VueMarqueeSlider>
    <!--    <VueMarqueeSlider-->
    <!--        id="marquee-slider-loop"-->
    <!--        :speed="Math.trunc(partnersList.length / 3) * 10000"-->
    <!--        width="234px"-->
    <!--        :reverse="reverse"-->
    <!--        space="16"-->
    <!--    >-->
    <!--      <a-->
    <!--          v-for="(partner, index) in partnersList"-->
    <!--          :key="index"-->
    <!--          :href="partner.url"-->
    <!--          class="cursor-pointer bg-gray-600 p-4 rounded-2xl min-w-[234px] w-full h-[112px] flex justify-center items-center"-->
    <!--          target="_blank"-->
    <!--          aria-label="link"-->
    <!--      >-->
    <!--        <nuxt-img-->
    <!--            :src="partner.img.middle"-->
    <!--            :alt="partner.name"-->
    <!--            class="grayscale transition duration-300 md:hover:grayscale-0 max-h-[72px] max-w-[200px] mx-auto object-cover object-center"-->
    <!--        />-->
    <!--      </a>-->
    <!--    </VueMarqueeSlider>-->
  </div>
</template>
<script setup lang="ts">
import 'swiper/css/pagination'

import VueMarqueeSlider from 'vue-marquee-slider/src/components/vue-marquee-slider.vue'

interface Props {
  partnersList: object
  reverse?: boolean
}
defineProps<Props>()

const space = ref(16)
</script>

<style scoped>
#marquee-slider-loop a {
  max-width: 234px;
  margin-right: 16px;
}
</style>
