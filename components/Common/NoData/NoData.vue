<template>
  <div class="flex-center flex-col p-3">
    <img
      v-if="img"
      :src="img"
      alt="no-data"
      :class="imgStyles"
      class="mb-7"
    />
    <h3
      v-if="title"
      class="font-normal text-2xl text-center leading-130 text-dark dark:text-white mb-1"
    >
      {{ title }}
    </h3>
    <p class="font-normal text-base text-center leading-130 text-gray-100 dark:text-white">
      {{ subtitle }}
    </p>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  title: string
  subtitle: string
  img: string
  imgStyles?: string
}
defineProps<Props>()
</script>

<style scoped></style>
