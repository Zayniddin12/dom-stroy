<template>
  <!--  LIGHTBOX OVERLAY  -->
  <Transition name="fade" mode="out-in">
    <div
      v-if="show"
      class="story-overlay overflow-hidden w-screen h-screen fixed top-0 left-0 z-40 before:bg-[#434343]/[0.8] before:w-full before:h-full before:absolute before:top-0 before:left-0"
    >
      <img
        :src="story?.image_src.medium"
        alt="story-bg"
        class="w-full h-full object-fit-cover"
      />
    </div>
  </Transition>

  <!--  LIGHTBOX CONTENT  -->
  <Transition name="bounceIn">
    <div
      v-if="show"
      class="w-screen h-screen fixed top-0 left-0 z-40 flex-center flex-col"
    >
      <div class="relative inline-block">
        <!--  SLIDER  -->
        <Swiper
          v-bind="lightboxSliderSettings"
          :navigation="{
            prevEl: '.lightbox-next',
            nextEl: '.lightbox-prev',
          }"
          class="lightbox-slider w-[220px] h-[350px] md:w-[292px] md:h-[500px] !pt-[18px]"
          @activeIndexChange="onChange"
          @swiper="onSwiperInit"
        >
          <SwiperSlide
            v-for="(item, lightboxIdx) in combinedStories"
            :key="lightboxIdx"
            class="rounded-lg relative overflow-hidden w-[292px] h-full"
            @mouseenter="animationState.state = 'paused'"
            @mouseleave="animationState.state = 'running'"
          >
            <StoryVideoSlide
              v-if="item.video"
              :active="lightboxIdx === activeChildIdx && item.video"
              :url="item.video"
              @update-duration="updateDuration"
            />
            <div v-if="item?.image_src.large" class="h-full flex-center">
              <img
                v-show="imgLoaded"
                :src="item?.image_src.large"
                alt="story"
                class="w-full object-contain rounded-lg"
                @load="onImgLoad"
                @loadstart="imgLoaded = false"
              />
              <img
                v-show="!imgLoaded"
                src="/images/defaults/image.webp"
                alt="image"
                class="w-full h-full object-contain bg-white"
              />
            </div>
            <div v-else class="w-full h-full">
              <img
                src="/images/defaults/image.webp"
                alt="image"
                class="w-full h-full object-contain bg-white"
              />
            </div>
            <div
              class="bg-[#555] w-full h-full rounded z-30"
              :class="imgLoaded ? 'opacity-100 visible' : 'opacity-0 invisible'"
            ></div>
            <div
              class="lightbox-slider-detail w-full flex flex-col justify-start before:w-full before:h-[120%] z-12 before:absolute before:bottom-0 before:left-0 before:rounded-b-lg absolute bottom-0 p-3"
            >
              <CommonBlockPreloader
                :loading="!imgLoaded"
                height="14px"
                width="70px"
                class="mb-1"
              >
                <p class="font-medium text-sm text-gray-300 relative z-30">
                  {{ item?.title }}
                </p>
              </CommonBlockPreloader>
              <CommonBlockPreloader
                :loading="!imgLoaded"
                height="28px"
                width="100%"
              >
                <h4
                  class="font-medium text-lg leading-[156%] text-white relative z-30"
                >
                  {{ item?.description }}
                </h4>
              </CommonBlockPreloader>
            </div>
          </SwiperSlide>
        </Swiper>
        <!--  DETAIL BUTTON  -->
        <a :href="storyUrl" target="_blank">
          <CommonButton :text="t('more_detail')" class="w-full mt-3" />
        </a>
        <!--  NAVIGATION BUTTONS  -->
        <div
          :key="activeChildIdx"
          class="lightbox-navigation absolute top-1/2 -translate-y-1/2 w-[calc(100%+120px)] translate-x-[-60px] flex justify-between"
        >
          <button
            class="transition-200 w-11 h-11 flex-center rounded-md bg-gray-200 hover:bg-white/[0.24]"
            :class="{
              'pointer-events-none': changeLoading,
              '!opacity-0 !invisible': activeChildIdx === 0,
            }"
            @click="goPrevSlide"
          >
            <i class="icon-arrow-left text-[32px] text-white"></i>
          </button>
          <button
            class="transition-200 w-11 h-11 flex-center rounded-md bg-gray-200 hover:bg-white/[0.24]"
            :class="{
              'pointer-events-none': changeLoading,
              '!opacity-0 !invisible':
                activeChildIdx === combinedStories.length - 1,
            }"
            @click="goNextSlide"
          >
            <i class="icon-arrow-right text-[32px] text-white"></i>
          </button>
        </div>
        <!--  PAGINATION  -->
        <div
          class="absolute top-0 w-full flex-y-center space-x-3"
          :key="activeChildIdx"
        >
          <div
            v-for="pagination in activeParentStory?.items ?? 1"
            :key="pagination.id"
            :class="{
              active:
                pagination?.id?.toString() === activeChildStory?.id?.toString(),
            }"
            class="lightbox-slider-pagination relative min-h-[6px] w-full bg-gray-200 rounded-[5px] overflow-hidden text-dark"
          />
        </div>
        <!--  CLOSE BUTTON  -->
        <button
          class="transition-200 group absolute top-[18px] right-[-60px] hover:rotate-90 origin-center inline-block flex-center"
          @click="close"
        >
          <i
            class="icon-close-circle transition-200 text-[44px] text-white group-hover:text-red"
          ></i>
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { computed, reactive, ref } from 'vue'
import { Autoplay, EffectFade, Navigation } from 'swiper/modules'
import type { ICombinedStoryItem, IStory, IStoryItem } from '~/types'
import { useCommonStore } from '~/store/common'
import { useScroll } from '~/composables/useScroll'
// import { SwiperSlideProps } from 'swiper/solid'

interface Props {
  show?: boolean
  stories: ICombinedStoryItem[]
  initialActiveStory: IStory
  loading?: boolean
}
const props = defineProps<Props>()

interface Emits {
  (e: 'close'): void
}
const emit = defineEmits<Emits>()

const { t } = useI18n()
const router = useRouter()
const commonStore = useCommonStore()
const { showOverflow, hideOverflow } = useScroll()

const storyUrl = ref('')
const storyDuration = reactive({
  value: 5000,
  style: '5s',
})

function updateDuration(newValue: number) {
  storyDuration.value = Math.floor(newValue) * 1000
  storyDuration.style = `${Math.floor(newValue)}s`
}

function goToProduct() {
  close()
  router.push('/')
}

const activeChildIdx = ref(0)
const activeChildStory = ref(props.initialActiveStory)
const activeParentStory = ref()

watch(
  () => props.initialActiveStory,
  (newValue) => {
    if (newValue) {
      activeParentStory.value = newValue
      activeChildStory.value = newValue.items[0]
    }
  }
)
watch(
  () => activeChildIdx.value,
  (value) => {
    combinedStories.value.forEach((el, index) => {
      if (value === index) {
        storyUrl.value = el?.url
      }
    })
  }
)
const changeLoading = ref(false)
function onChange(swiper: { activeIndex: number }) {
  changeLoading.value = true

  updateDuration(5)
  activeChildIdx.value = swiper.activeIndex
  activeChildStory.value = combinedStories.value[swiper.activeIndex]
  const parentId = activeChildStory.value.parent
  activeParentStory.value = props.stories.find((p) => p.id === parentId)
  if (!activeChildStory.value.has_seen) {
    commonStore.readStory(activeChildStory.value.id)
  }

  setTimeout(() => {
    changeLoading.value = false
  }, 300)
  onAutoPLay(5)
}

const swiper = ref<SwiperSlideProps>()
const loading = ref(true)
function onSwiperInit(event: SwiperSlideProps) {
  swiper.value = event
  const idx = combinedStories.value.findIndex(
    (ch) => ch.parent === activeParentStory.value?.id
  )
  if (idx >= 0) {
    swiper.value.slideTo(idx)
    setTimeout(() => (loading.value = false), 300)
  }
}
function goPrevSlide() {
  autoPLayTimer.value.clearTime()
  // clearTimeout(timeoutId.value)
  swiper.value?.slidePrev()
  updateDuration(5)
}
function goNextSlide() {
  autoPLayTimer.value.clearTime()
  // clearTimeout(timeoutId.value)
  swiper.value?.slideNext()
  updateDuration(5)
}

const lightboxSliderSettings = computed(() => ({
  effect: 'fade',
  slidesPerView: 1,
  initialSlide: 0,
  centeredSlides: true,
  centeredSlidesBounds: true,
  pagination: {
    clickable: true,
  },
  autoplay: {
    delay: storyDuration.value,
    disableOnInteraction: false,
    stopOnLastSlide: true,
  },
  // autoplay: true,
  modules: [EffectFade, Navigation, Autoplay],
}))

const combinedStories = computed(() => {
  let list: ICombinedStoryItem[] = []
  props.stories.forEach((s: IStory) => {
    const children = s.items.map((child: IStoryItem) => ({
      ...child,
      parent: s.id,
    }))
    list = [...list, ...children]
  })
  return list
})

function close() {
  emit('close')
  showOverflow()
}

const animationState = reactive({
  state: 'running',
})

function controlKeyUp(e: KeyboardEvent) {
  if (e.code === 'Escape') {
    close()
  }
  if (e.code === 'Space') {
    e.preventDefault()
    swiper.value?.autoplay?.running
      ? (animationState.state = 'paused')
      : (animationState.state = 'running')
  }

  if (e.code === 'ArrowLeft') {
    goPrevSlide()
  } else if (e.code === 'ArrowRight') {
    goNextSlide()
  }
}

watch(
  () => props.show,
  (newValue) => {
    if (process.client) {
      if (newValue) {
        window.addEventListener('keydown', controlKeyUp)
        hideOverflow()
      } else {
        window.removeEventListener('keydown', controlKeyUp)
        autoPLayTimer.value.clearTime()
        showOverflow()
      }
    }
  }
)

watch(
  () => animationState.state,
  (newValue) => {
    if (newValue === 'running') {
      swiper.value?.autoplay?.stop()
      autoPLayTimer.value.resumeTime(onAutoPLay)
    } else {
      swiper.value?.autoplay?.stop()
      autoPLayTimer.value.pauseTime()
    }
  }
)
function onAutoPLay(sec: number) {
  if (sec === 0) {
    activeChildIdx.value++
    swiper.value?.slideNext()
  } else {
    autoPLayTimer.value.timeout(sec, onAutoPLay.bind(sec - 1))
  }
}
// Do not touch this custom autoplay timer function, otherwise, I will kill you, I don't mind who you are!
const autoPLayTimer = ref({
  timeoutId: '',
  remainer: 0,
  pause: 0,
  timeout: function (sec: number, cb: Function) {
    this.timeoutId = setTimeout(() => {
      cb(sec - 1)
    }, 1000)
    this.pause = sec
  },
  clearTime: function () {
    clearTimeout(this.timeoutId)
  },
  pauseTime: function () {
    this.remainer = this.pause
    this.clearTime()
  },
  resumeTime: function (cb: Function) {
    this.timeout(this.remainer, cb)
  },
})

const imgLoaded = ref(false)
function onImgLoad() {
  imgLoaded.value = true
}

watch(
  () => imgLoaded.value,
  (newValue) => {
    if (newValue) {
      animationState.state = 'running'
    } else {
      animationState.state = 'paused'
    }
  }
)
</script>

<style>
.lightbox-slider-pagination {
  transition: all 0.2s ease-in-out;
}

.lightbox-slider-pagination.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  background: #fff;
  border-radius: 5px;
  animation-name: countingBar;
  animation-duration: v-bind('storyDuration.style');
  animation-play-state: v-bind('animationState.state');
  animation-timing-function: ease-in;
  animation-iteration-count: 1;
  animation-direction: alternate;
  animation-fill-mode: forwards;
}

.lightbox-slider-detail::before {
  background-image: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.01) 0%,
    #090808 100%
  );
}

@keyframes countingBar {
  0% {
    width: 0;
    height: 0;
  }
  10% {
    height: 100%;
  }
  100% {
    width: 100%;
    height: 100%;
  }
}

.story-overlay::before {
  backdrop-filter: blur(25px);
}
</style>
