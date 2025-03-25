<template>
  <div
      class="focus-within:!border-1 focus-within:!border-gray-300"
    :class="[
      'inline-flex items-center relative bg-gray-500 rounded-lg border overflow-hidden w-full h-full transition-300 dark:bg-dark-500 ',
      error ? '!border-red' : '!border-transparent',
    ]"
  >
    <textarea
      :value="modelValue"
      v-bind="{ type, minlength, maxlength, max, min, disabled, placeholder }"
      :readonly="!autocomplete"
      :id="id"
      :class="[
        inputClass,
        'font-medium min-h-[130px] text-base text-dark placeholder:text-gray-200 dark:text-white dark:placeholder-[#EAEBED] bg-transparent flex-grow py-2.5 px-3 outline-none',
        { 'placeholder:text-red': error, 'resize-none': noResize },
      ]"
      class="w-full"
      ref="Input"
      @input="handleInput"
      @blur="$emit('blur')"
      @focus="$emit('focus')"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

export interface Props {
  type?: string
  placeholder?: string
  modelValue: number | string
  disabled?: boolean
  error?: boolean
  maxlength?: number
  minlength?: number
  max?: number
  min?: number
  inputClass?: string | string[]
  prefixClass?: string
  suffixClass?: string
  autocomplete?: boolean
  id: string
  noResize?: boolean
}

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
}>()

const handleInput = (e: { target: HTMLInputElement }) => {
  emit('update:modelValue', e.target.value)
}

const Input = ref()
defineExpose({ Input })

withDefaults(defineProps<Props>(), {
  type: 'text',
  maxlength: undefined,
  minlength: undefined,
  max: undefined,
  min: undefined,
  inputClass: undefined,
  autocomplete: true,
})
</script>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
