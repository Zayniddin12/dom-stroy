<template>
  <ul class="flex items-center space-x-4">
    <li
      v-for="(social, idx) in data"
      :key="idx"
      class="flex items-center !z-10"
    >
      <a
        target="_blank"
        :href="social.link"
        class="flex items-center group relative"
        rel="noopener"
        aria-label="social-media"
      >
        <i
          :class="social.icon"
          class="social-icon transition-200 text-gray-200 dark:text-gray-300 hover:text-orange dark:hover:text-red text-xl"
        />
      </a>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import type { ISocialLinkResponse } from '~/types/index'

interface Props {
  data: ISocialLinkResponse[]
  isBottom?: boolean
}
defineProps<Props>()
</script>
