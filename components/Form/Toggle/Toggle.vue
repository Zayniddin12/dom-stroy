<template>
  <label
    class="transition select-none duration-200 ease-in-out inline-flex items-center w-11 h-6 relative overflow-hidden rounded-[48px] cursor-pointer p-0.5 shrink-0"
    :class="'bg-[#DFDFDF] dark:bg-[#585C5F]'"
    @click="onToggle"
  >
    <div
      class="bg-red w-full h-full absolute inset-0 opacity-0 transition-300"
      :class="{ '!opacity-100': value }"
    />
    <span
      class="absolute w-5 h-5 rounded-full transition bg-white duration-200 ease-in-out z-[1]"
      :class="value ? 'translate-x-5' : 'translate-x-0'"
    />
  </label>
</template>
<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  label?: string
  modelValue: boolean
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
})

interface Emits {
  (e: 'update:modelValue', v: boolean): void
}
const emit = defineEmits<Emits>()

const value = computed({
  get() {
    return props.modelValue
  },
  set(val: boolean) {
    emit('update:modelValue', val)
  },
})

const onToggle = () => {
  value.value = !value.value
}
</script>

<style>
.click-bg {
  background: linear-gradient(0deg, #0073ff -1.25%, #00c2ff 100%);
}
</style>
