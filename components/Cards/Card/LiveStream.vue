<template>
  <Swiper v-bind="settings" class="container my-8">
    <SwiperSlide
      v-for="(item, idx) in card"
      :key="idx"
      class="p-4 md:py-5 md:px-[60px] bg-dark-100 rounded-2xl relative live-stream-card"
    >
      <div class="flex items-center gap-1.5">
        <div class="dot" />
        <p class="text-xl font-semibold text-white">{{ $t('live_stream') }}</p>
      </div>
      <p
        class="text-2xl md:text-[32px] text-white leading-130 font-bold mt-4 mb-9 w-[376px] h-[83px]"
      >
        {{ item?.title }}
      </p>
      <div
        class="flex gap-1 items-center cursor-pointer group"
        @click="openModal(item)"
      >
        <p
          class="font-semibold text-white group-hover:text-orange duration-300"
        >
          {{ $t('full') }}
        </p>
        <span
          style="transform: rotate(270deg)"
          class="icon-chevron-down group-hover:text-orange duration-300 text-white text-2xl"
        ></span>
      </div>
    </SwiperSlide>
  </Swiper>
  <CommonModalsModal
    max-width
    contentClass="w-full h-[500px]"
    :show="showModal"
    @close="showModal = false"
  >
    <template #default>
      <iframe
        v-if="selectedItem?.link"
        :src="embedUrl(selectedItem.link)"
        frameborder="0"
        allowfullscreen
        class="h-full w-full"
      ></iframe>
    </template>
  </CommonModalsModal>
</template>
<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'

const settings = {
  slidesPerView: 'auto',
  spaceBetween: 6,
  autoplay: {
    delay: 3000, // Updated to 3 seconds
    disableOnInteraction: false,
  },
  modules: [Autoplay],
}

interface CardItem {
  title: string
  link: string
}

interface Props {
  card?: CardItem[]
}

defineProps<Props>()

const showModal = ref(false)
const selectedItem = ref<CardItem | null>(null)

// Open modal and set the selected item
const openModal = (item: CardItem) => {
  selectedItem.value = item
  showModal.value = true
}

// Helper function to construct the embed URL
const embedUrl = (videoUrl: string): string => {
  const videoId = videoUrl.split('v=')[1]?.split('&')[0]
  const videoShort = videoUrl.split('shorts/')[1]?.split('&')[0]
  if (videoId !== undefined) {
    return `https://www.youtube.com/embed/${videoId}`
  } else if (videoShort !== undefined) {
    return `https://www.youtube.com/embed/${videoShort}`
  } else {
    return ''
  }
}
</script>
<style>
.live-stream-card:after {
  content: url('/images/live-stream.svg');
  position: absolute;
  top: 6px;
  right: -16px;
}
.live-stream-card:before {
  content: url('/images/microphone.png');
  position: absolute;
  top: -17px;
  right: 16px;
}
@media screen and (max-width: 768px) {
  .live-stream-card:before {
    display: none;
  }
  .live-stream-card:after {
    display: none;
  }
}
.alert {
  display: flex;
  align-items: center;
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  font-family: Arial, sans-serif;
}

.dot {
  position: relative;
  height: 10px;
  width: 10px;
  background-color: #ff3939;
  border-radius: 50%;
  margin-right: 10px;
}

.dot::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200%;
  height: 200%;
  background-color: rgba(255, 0, 0, 0.9);
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0);
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 1;
  }
  70% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0;
  }
}
</style>
