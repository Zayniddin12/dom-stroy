<template>
  <div class="bg-[#FAFAFC] aspect-square relative" @mousemove="onMove">
    <Swiper
      v-if="innerLoading && images && images.length > 1"
      v-bind="settings"
      class="product-card h-full"
      @swiper="onInit"
      @mousemove="onMove"
    >
      <SwiperSlide v-for="i in images" :key="i">
        <img
          v-if="i && i?.compressed"
          class="w-full h-full object-cover bg-white border-gray-500 rounded-lg md:!borer-none md:!rounded-none"
          :src="i?.compressed"
          alt="image"
        />
      </SwiperSlide>
    </Swiper>
    <img
      v-else-if="images?.length === 1 && images[0]?.compressed"
      :src="images[0]?.compressed"
      alt="image"
      class="w-full h-full object-cover bg-white border-gray-500 rounded-lg md:!borer-none md:!rounded-none"
    />
    <img
      v-else
      src="/images/defaults/image.webp"
      alt="default image"
      class="w-full h-full object-cover bg-white dark:bg-transparent dark:border-none border-2 border-gray-500 rounded-lg md:!borer-none md:!rounded-none"
    />

    <!--    <div class="flex-y-center w-full h-full absolute z-10 top-0">-->
    <!--      <div class="w-full h-full" @mouseenter="toPrev" />-->
    <!--      <div class="w-full h-full" @mouseenter="toNext" />-->
    <!--    </div>-->
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { EffectFade, Pagination } from 'swiper/modules'
import type { SwiperEvents } from 'swiper/types'
import { debounce } from '~/helpers'

interface Props {
  images?: string[]
  loading?: boolean
}

defineProps<Props>()

const settings = {
  grabCursor: true,
  watchSlidesProgress: true,
  effect: 'fade',
  pagination: {
    clickable: true,
  },
  modules: [EffectFade, Pagination],
}
const imageSlider = ref()
const innerLoading = ref(false)

function onInit(swiper: SwiperEvents) {
  imageSlider.value = swiper
}

onMounted(() => {
  setTimeout(() => {
    innerLoading.value = true
  }, 1000)
})

// imageSlider.value.slidePrev()
const current = ref(0)
function onMove(event: MouseEvent) {
  debounce(
    'change',
    () => {
      if (event?.offsetX > current.value) {
        imageSlider.value.slideNext()
        current.value = event?.offsetX
      } else {
        imageSlider.value.slidePrev()
        current.value = event?.offsetX
      }
    },
    300
  )
}

// Image zoomer
// function imageZoom(imgID, resultID) {
//   var img, lens, result, cx, cy;
//   img = document.getElementById(imgID);
//   result = document.getElementById(resultID);
//   /*create lens:*/
//   lens = document.createElement("DIV");
//   lens.setAttribute("class", "img-zoom-lens");
//   /*insert lens:*/
//   img.parentElement.insertBefore(lens, img);
//   /*calculate the ratio between result DIV and lens:*/
//   cx = result.offsetWidth / lens.offsetWidth;
//   cy = result.offsetHeight / lens.offsetHeight;
//   /*set background properties for the result DIV:*/
//   result.style.backgroundImage = "url('" + img.src + "')";
//   result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
//   /*execute a function when someone moves the cursor over the image, or the lens:*/
//   lens.addEventListener("mousemove", moveLens);
//   img.addEventListener("mousemove", moveLens);
//   /*and also for touch screens:*/
//   lens.addEventListener("touchmove", moveLens);
//   img.addEventListener("touchmove", moveLens);
//   function moveLens(e) {
//     var pos, x, y;
//     /*prevent any other actions that may occur when moving over the image:*/
//     e.preventDefault();
//     /*get the cursor's x and y positions:*/
//     pos = getCursorPos(e);
//     /*calculate the position of the lens:*/
//     x = pos.x - (lens.offsetWidth / 2);
//     y = pos.y - (lens.offsetHeight / 2);
//     /*prevent the lens from being positioned outside the image:*/
//     if (x > img.width - lens.offsetWidth) {x = img.width - lens.offsetWidth;}
//     if (x < 0) {x = 0;}
//     if (y > img.height - lens.offsetHeight) {y = img.height - lens.offsetHeight;}
//     if (y < 0) {y = 0;}
//     /*set the position of the lens:*/
//     lens.style.left = x + "px";
//     lens.style.top = y + "px";
//     /*display what the lens "sees":*/
//     result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
//   }
//   function getCursorPos(e) {
//     var a, x = 0, y = 0;
//     e = e || window.event;
//     /*get the x and y positions of the image:*/
//     a = img.getBoundingClientRect();
//     /*calculate the cursor's x and y coordinates, relative to the image:*/
//     x = e.pageX - a.left;
//     y = e.pageY - a.top;
//     /*consider any page scrolling:*/
//     x = x - window.pageXOffset;
//     y = y - window.pageYOffset;
//     return {x : x, y : y};
//   }
// }
</script>

<style>
.product-card .swiper-pagination-fraction,
.swiper-pagination-custom,
.swiper-horizontal > .swiper-pagination-bullets,
.swiper-pagination-bullets.swiper-pagination-horizontal {
  bottom: 4px;
}

.product-card
  .swiper-horizontal
  > .swiper-pagination-bullets
  .swiper-pagination-bullet,
.swiper-pagination-horizontal.swiper-pagination-bullets
  .swiper-pagination-bullet {
  margin: 0 2px;
}

.product-card .swiper-pagination-bullet {
  width: 4px;
  height: 4px;
  background: #3838384d;
  opacity: 1 !important;
  transition: all 0.3s;
}

.product-card .swiper-pagination-bullet-active {
  background: #383838;
}
</style>
