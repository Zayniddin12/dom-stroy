<template>
  <label
    class="text-sm font-normal text-gray-100 dark:text-gray-300 transition-300"
    :class="labelClass"
    :for="forText"
  >
    {{ label }}
  </label>
</template>
<script setup lang="ts">
interface Props {
  label: string
  labelClass?: string
  forText?: string
}
const props = withDefaults(defineProps<Props>(), {})
</script>
