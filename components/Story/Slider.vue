<template>
  <div v-if="!loading" class="relative">
    <!--  MAIN SLIDER  -->
    <Swiper v-bind="settings" class="md:!pl-[128px] md:!pr-[128px]">
      <template v-if="loading">
        <SwiperSlide
          v-for="(story, idx) in 20"
          :key="idx"
          class="cursor-grab hello relative !w-[134px]"
          @click="setActiveStory(story, idx)"
        >
          <StoryCard loading />
        </SwiperSlide>
      </template>
      <template v-else>
        <SwiperSlide
          v-for="(story, realIdx) in stories"
          :key="'A' + realIdx"
          class="cursor-grab relative !mr-3 mt-3 !w-[106px] md:!w-[134px] md:!mr-4"
          @click="setActiveStory(story, realIdx)"
        >
          <StoryCard :data="story" />
          <!--          <CommonBlockPreloader width="140px" height="190px" loading>-->
          <!--          </CommonBlockPreloader>-->
        </SwiperSlide>
      </template>
    </Swiper>

    <!--  LIGHTBOX  -->
    <StoryLightbox
      v-bind="{ stories }"
      :initial-active-story="activeStory"
      :show="showLightbox"
      @close="closeLightbox"
    />
  </div>
</template>

<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { FreeMode } from 'swiper/modules'
import { useCommonStore } from '~/store/common'
import type { IStory } from '~/types'

interface Props {
  data?: {}[]
  loading?: boolean
}

defineProps<Props>()

const commonStore = useCommonStore()

const loading = computed(() => commonStore.storiesLoading)
const stories = computed(() => commonStore.stories)

const settings = {
  slidesPerView: 'auto',
  spaceBetween: 16,
  initialSlide: 2,
  freeMode: true,
  modules: [FreeMode],
}

const activeStory = ref()
const showLightbox = ref(false)
const activeParentStoryIdx = ref(0)

function setActiveStory(story: IStory, idx: number) {
  if (story) {
    activeParentStoryIdx.value = idx
    commonStore.readStory(story.items[0].id)
    activeStory.value = story
    showLightbox.value = true
  }
}

function closeLightbox() {
  showLightbox.value = false
  commonStore.fetchStory()
}
</script>
