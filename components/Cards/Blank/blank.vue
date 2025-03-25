<template>
  <div class="bg-white dark:bg-dark-100 rounded-xl p-6 transition-300" >
    <CommonBlockPreloader
      :width="preloaderWidth"
      :preloader-class="preloaderClass"
      height="32px"
      :loading="loading"
    >
      <h4 :class="titleClass" class="blank-title transition-300" v-if="title">{{ title }}</h4>
    </CommonBlockPreloader>

    <div :class="contentClass">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  title?: string
  titleClass?: string
  contentClass?: string
  loading?: boolean
  preloaderWidth?: string
  preloaderClass?: string
}
withDefaults(defineProps<Props>(), { preloaderWidth: '200px' })
</script>

<style>
.blank-title {
  @apply font-normal text-[32px] md:text-[2rem] text-dark-200 dark:text-white mb-4;
}
</style>
