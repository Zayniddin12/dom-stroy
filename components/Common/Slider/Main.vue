<template>
  <ClientOnly>
    <Transition name="fade" mode="out-in">
      <div class="w-screen overflow-hidden md:pb-[12px]" :key="loading">
        <Swiper
          v-if="!loading"
          v-bind="settings"
          class="main-slider md:!h-[500px] !h-full"
        >
          <SwiperSlide
            v-for="(item, idx) in data"
            :key="'A' + idx"
            class="cursor-grab active:cursor-grabbing relative sm:!w-[343px] !w-full !h-[200px] md:!w-[910px] md:!h-max"
          >
            <div class="inner_slider_main h-full image-preloader">
              <img
                v-if="item && item?.image_src"
                v-lazy="{ src: item?.image_src?.banner, delay: 500 }"
                alt="banner"
                class="sm:object-cover object-fill transition-200 w-full rounded-lg h-full"
              />
              <div
                class="absolute flex flex-col gap-y-3.5 bottom-0 p-4 md:p-9 text-white z-10"
              >
                <!--                <h2-->
                <!--                  class="sm:block hidden font-bold lg:text-[32px] md:text-2xl sm:text-lg text-base"-->
                <!--                >-->
                <!--                  {{ item?.title }}-->
                <!--                </h2>-->
                <!--                <p-->
                <!--                  class="sm:block hidden text-xs md:text-base sm:text-sm md:line-clamp-1"-->
                <!--                >-->
                <!--                  {{ item?.sub_title }}-->
                <!--                </p>-->
                <a v-if="item?.url" target="_blank" :href="item.url">
                  <CommonButton
                    variant="custom"
                    class="transition-200 bg-white/[0.12] hover:bg-white group md:px-[22px] sm:px-4 px-3 md:!py-3 sm:!py-2 !py-1"
                    text-class="transition-300 !font-bold !text-white group-hover:!text-dark"
                    :text="$t('about_product_more')"
                  />
                </a>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        <div v-else class="flex justify-center space-x-6 w-[100%]">
          <CommonBlockPreloader
            v-for="i in 3"
            :key="i"
            v-bind="{ loading }"
            width="50vw"
            height="487px"
          />
        </div>
      </div>
    </Transition>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Autoplay } from 'swiper/modules'
import type { TBanner } from '~/types'

interface Props {
  data?: TBanner[]
  loading?: boolean
}

defineProps<Props>()

const settings = {
  pagination: {
    clickable: true,
  },
  slidesPerView: 'auto',
  centeredSlides: true,
  centeredSlidesBounds: true,
  centerInsufficientSlides: true,
  observer: true,
  observeParents: true,
  pauseOnMouseEnter: true,
  allowSlideNext: true,
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  modules: [Pagination, Autoplay],

  breakpoints: {
    575: {
      slidesOffsetBefore: 0,
      spaceBetween: 0,
    },
    576: {
      slidesOffsetBefore: 80,
      spaceBetween: 20,
    },
  },
}

const activeSlide = ref(0)
const swiperInstance = ref<any>(null)
function onChangeSlide(newValue: { activeIndex: number }) {
  activeSlide.value = newValue.activeIndex + 1
}

onMounted(() => {
  setTimeout(() => {
    // please do not  touch this console.log
    console.log(Swiper)
    Swiper.update()
  }, 2000) // Adjust timeout as needed
})
</script>

<style>
.main-slider .swiper-pagination-bullet {
  height: 4px !important;
  width: 30px;
  background-color: #d4d5d7;
  border-radius: 5px;
  transition: all 0.2s ease-in-out;
  opacity: 1 !important;
}

.main-slider
  .swiper-pagination-bullet:not(.swiper-pagination-bullet-active):hover {
  opacity: 100;
}

.main-slider .swiper-slide {
  opacity: 40%;
  transition: all 0.3s ease-in-out;
}

.main-slider .swiper-slide-active::before {
  background-image: linear-gradient(
    180deg,
    rgba(2, 5, 20, 0) 0%,
    rgba(2, 5, 20, 0.7) 51.34%,
    #020514 100%
  );
  transition: all 0.3s ease-in-out;
  bottom: 0;
  height: 60%;
  border-radius: 0 0 8px 8px;
}

.main-slider .swiper-slide-active {
  opacity: 100%;
  transition: all 0.3s ease-in-out;
}

.main-slider .swiper-slide:not(.swiper-slide-active) .inner_slider_main {
  @apply pointer-events-none;
}

.main-slider .swiper-pagination-bullets {
  position: absolute;
  z-index: 100;
  display: flex !important;
  gap: 2px;
  bottom: 0px;
  left: 50%;
  transform: translate(-50%, -50%);
}

.main-slider .swiper-pagination-bullet {
  position: relative;
  bottom: 0;
  left: 0;
  background-color: #d4d5d7 !important;
  border-radius: 5px;
  overflow: hidden;
  opacity: 1 !important;
  width: 30%;
  height: 2px;
  z-index: 100;
}

.main-slider .swiper-pagination-bullet-active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  background: #383838; /* Progress bar color */
  height: 4px;
  width: 0; /* Start with 0 width */
  border-radius: 5px;
  animation: progressBar 3s linear forwards; /* Adjust duration to autoplay delay */
}

/* Keyframes for the progress animation */
@keyframes progressBar {
  0% {
    width: 0;
  }
  100% {
    width: 30px;
  }
}
</style>
