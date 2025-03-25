<template>
  <div
    class="pt-3 md:pt-5 bg-white dark:bg-dark-300 rounded-2xl flex items-start justify-between gap-2 h-32 overflow-hidden category-card transition-300 cursor-pointer group"
    :class="{ 'pointer-events-none': loading }"
  >
    <div
      class="pl-3 md:pl-5 flex flex-col justify-between h-full pb-3 md:pb-4 w-fu;;"
    >
      <CommonBlockPreloader :loading="loading" width="100%" height="26px">
        <Highlighter
          class="font-semibold text-sm md:text-xl text-dark dark:text-white duration-300 leading-130 w-[80px] md:w-full flex"
          highlight-class-name="bg-[#FFCD55] rounded"
          :search-words="[$route.query.search ?? '']"
          :text-to-highlight="card?.title"
        />
      </CommonBlockPreloader>
      <div
        class="flex items-center gap-1 transition-300 opacity-0 group-hover:opacity-100"
      >
        <p class="text-red text-sm leading-130">{{ $t('more') }}</p>
        <i class="icon-arrow-right text-red text-base leading-4" />
      </div>
    </div>
    <ClientOnly>
      <div class="h-full self-end shrink-0">
        <CommonBlockPreloader :loading="loading" height="100%" width="108px">
          <img
            v-if="card && card?.icon_src?.medium"
            class="w-full max-w-[60px] md:max-w-[106px] h-full"
            :src="card?.icon_src?.medium"
            :alt="card?.title"
          />
          <img
            v-else
            src="/images/defaults/image.webp"
            alt="image"
            class="w-full max-w-[60px] md:max-w-[106px] h-full"
          />
        </CommonBlockPreloader>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import Highlighter from 'vue-highlight-words'
import type { TCategory } from '~/types/categories'

export interface Props {
  card?: TCategory
  loading?: boolean
}
defineProps<Props>()
</script>

<style scoped>
.category-card:hover {
  box-shadow: 0 8px 40px rgba(40, 40, 40, 0.12);
}
</style>
