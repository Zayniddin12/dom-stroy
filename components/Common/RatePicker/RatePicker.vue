<template>
  <div class="flex justify-center gap-5 star-container">
    <span
      :class="rate >= i ? 'text-yellow' : 'text-gray-300'"
      class="icon-star text-[2.75rem] cursor-pointer transition-colors duration-100"
      :data-star-index="i"
      v-for="i in 5"
      :key="i"
      @click="pick(i)"
    >
    </span>
  </div>
</template>
<script setup lang="ts">
interface Props {
  modelValue: number
}
const props = defineProps<Props>()

const rate = ref(0)
rate.value = props.modelValue

interface Emits {
  (e: 'update:modelValue', val: number): void
}
const $emit = defineEmits<Emits>()

const pick = (val: number) => {
  if (val === 1 && rate.value === 1) {
    val = 0
  }
  rate.value = val
  $emit('update:modelValue', val)
}
</script>
