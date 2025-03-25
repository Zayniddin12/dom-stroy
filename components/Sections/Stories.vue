<template>
  <div
    class="stories-wrapper relative bg-white dark:bg-dark-100 pt-8 md:pb-16 pb-8 mb-8 md:mb-16 after:content-[''] after:absolute after:top-0 after:h-full after:w-32 after:bg-gradient-to-r after:from-[#f7f8fa] after:via-[rgba(247,248,250,0.7)] after:to-[rgba(247,248,250,0)] after:z-2 before:content-[''] before:absolute before:top-0 before:h-full before:w-32 before:bg-gradient-to-l before:from-[#f7f8fa] before:via-[rgba(247,248,250,0.7)] before:to-[rgba(247,248,250,0)] before:z-2 before:right-0 md:before:hidden md:after:hidden"
  >
    <div class="container">
      <CommonBlockPreloader width="140px" height="40px">
        <CommonSectionsSectionHead :title="'stories'" />
      </CommonBlockPreloader>
    </div>
    <ClientOnly>
      <StorySlider :loading="loading" />
    </ClientOnly>
  </div>
</template>
<script setup lang="ts">
interface Props {
  loading?: boolean
}
const props = defineProps<Props>()
</script>

<style scoped>
@media screen and (max-width: 768px) {
  .stories-wrapper::before,
  .stories-wrapper::after {
    display: none !important;
  }
}
</style>
