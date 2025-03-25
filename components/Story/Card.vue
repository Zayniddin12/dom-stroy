<template>
  <div
    class="group rounded-xl border-[1.6px] border-gray-300 p-2 inline-block cursor-pointer aspect-[118/166] !mr-3 !w-[106px] md:!w-[134px] md:!mr-4"
    :class="{ 'story-layer relative !border-red': !data?.has_seen }"
    @click="$emit('click')"
  >
    <img
      v-if="data && data?.image_src"
      :src="data.image_src.large"
      alt="story"
      class="transition-200 rounded-lg w-full h-full object-cover group-hover:scale-95"
      :class="{ 'story-shadow': !data?.has_seen }"
      sizes="sm:100vw md:50vw lg:400px"
    />
  </div>
</template>

<script setup lang="ts">
import type { IStory } from '~/types'

export interface Props {
  data?: IStory
  loading?: boolean
}

defineProps<Props>()
</script>

<style scoped>
.story-shadow {
  filter: drop-shadow(0px 4px 16px rgba(0, 0, 0, 0.04));
}

.story-layer::before {
  content: '';
  background-image: url('/images/story/story-layer.svg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 120%;
  height: 110%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
