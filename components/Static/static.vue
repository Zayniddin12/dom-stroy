<template>
  <div class="html mt-8 dark:text-white" v-html="data" />
</template>

<script setup lang="ts">
interface Props {
  data: string
}
defineProps<Props>()
</script>
