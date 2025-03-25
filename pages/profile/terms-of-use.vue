<template>
  <CardsBlank class="p-5 min-h-[636px]">
    <p class="text-xl leading-130 font-bold text-dark dark:text-white">
      {{ data?.title }}
    </p>

    <div
      class="scroll-style-terms overflow-auto mt-3 max-h-[520px] pr-5 whitespace-pre-line content-terms-of-use dark:text-white"
      v-html="data?.body"
    />
  </CardsBlank>
</template>

<script setup lang="ts">
import { useFetcher } from '#imports'

const data = ref()

onMounted(() => {
  useFetcher('common/staticpages/terms-of-use/').then((res) => {
    data.value = res?.data
  })
})
</script>

<style scoped>
.scroll-style-terms::-webkit-scrollbar {
  width: 2px;
}

.scroll-style-terms::-webkit-scrollbar-track {
  background: #eaebed;
}

.scroll-style-terms::-webkit-scrollbar-thumb {
  background: #cdcdd0;
}
</style>

<style>
.content-terms-of-use p {
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;
  height: fit-content;
  display: inline-block;
}
</style>
