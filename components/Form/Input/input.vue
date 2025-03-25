<template>
  <div
    :class="[
      'inline-flex items-center transition-300 relative bg-gray-500 dark:!bg-white/10 rounded-lg border overflow-hidden w-full h-11',
      error
        ? '!border-red-200'
        : 'border-transparent focus-within:border-dark-200',
    ]"
  >
    <span :class="[prefixClass]">
      <slot name="prefix" />
    </span>
    <input
      :value="modelValue"
      v-bind="{ type, minlength, maxlength, max, min, disabled, placeholder }"
      :readonly="!autocomplete"
      :id="id"
      :class="[
        inputClass,
        'font-medium text-base text-dark dark:text-white dark:!placeholder:text-gray-300 placeholder:text-gray-200 bg-transparent flex-grow py-2.5 pl-2 pr-3 outline-none',
        { 'placeholder:text-red-200': error },
      ]"
      class="w-full"
      ref="Input"
      @keyup.enter="handleEnter"
      @input="handleInput"
      @blur="$emit('blur')"
      @focusout="$emit('focusout')"
      @focus="handleFocus"
    />

    <span :class="[suffixClass]">
      <slot name="suffix" />
    </span>
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
  id?: string
  autoFocus?: boolean
}

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
  (e: 'blur'): void
  (e: 'focusout'): void
  (e: 'focus'): void
  (e: 'enter'): void
}>()

const handleInput = (e: { target: HTMLInputElement }) => {
  emit('update:modelValue', e.target.value)
}
const handleEnter = () => {
  emit('enter')
}
const Input = ref()
defineExpose({ Input })

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  maxlength: 99,
  minlength: undefined,
  max: undefined,
  min: undefined,
  inputClass: undefined,
  autocomplete: true,
})

const handleFocus = (e: Event) => {
  emit('focus')
  const target = e.target as HTMLInputElement
  target.removeAttribute('readonly')
}

watch(
  () => props.autoFocus,
  (newValue) =>
    setTimeout(() => {
      if (newValue) {
        Input.value?.focus()
      }
    }, 300),
  { immediate: true }
)
</script>

<style>
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
