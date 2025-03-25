<template>
  <label
    class="transition items-center relative select-none min-h-[20px] bg-[#F2F3F5] dark:bg-[#ffffff1a] w-full flex justify-between p-3 rounded-lg"
    :class="[
      disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer group',
      { 'py-3 pl-5': border },
    ]"
    :style="{ minHeight: computedSize, '--btn-size': computedBtnSize }"
  >
    <slot name="label">
      <span
        class="text-sm font-normal leading-130 transition-300"
        :class="[
          labelStyles,
          modelValue === value
            ? labelActiveClass
            : 'text-[#242424] dark:!text-white',
          { '!text-red': error && !modelValue },
        ]"
      >
        {{ label }}
      </span>
    </slot>

    <input
      type="radio"
      class="absolute opacity-0 invisible h-0 w-0 peer"
      :checked="modelValue === value"
      v-bind="{ name, value, disabled }"
      @change="handleChange"
    />
    <span
      class="before:w-2.5 before:h-2.5 shrink-0 duration-200 ease-in-out bg-white peer-checked:bg-red peer-checked:before:opacity-100 mr-2 before:opacity-0 relative border-2 rounded-full box-border before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:transition-all before:duration-200 border-[#DBDBE4] peer-checked:border-red peer-disabled:before:bg-red"
      :class="[
        btnStyle || computedBtnStyles,
        { '!border-red': error && !modelValue },
      ]"
      :style="{ width: computedSize, height: computedSize }"
    />

    <div
      v-if="border"
      class="absolute bottom-0 w-[calc(100%-28px)] right-0 h-px bg-gray-300"
    />
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue: string | number | object
  value?: string | number | object
  label: string | number | object
  name?: string | number
  disabled?: boolean
  size?: string | number
  btnStyles?: string
  btnStyle?: string
  labelStyles?: string
  border?: boolean
  labelActiveClass?: string
  error?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  size: 20,
  btnStyles:
    'before:bg-blue group-hover:border-[#C7DCFD] peer-checked:border-blue peer-checked:before:!bg-white',
  labelActiveClass: 'text-black dark:!text-white',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | object | boolean): void
}>()

const handleChange = (e: Event) => {
  if (!props.disabled) {
    const target = e.target as HTMLInputElement
    emit('update:modelValue', props.value ? target.value : target.checked)
  }
}

const computedSize = computed(() => props.size + 'px')

const computedBtnSize = computed(() => +props.size * 0.5 + 'px')

const computedBtnStyles = computed(() =>
  !props.disabled ? props.btnStyles : 'peer-checked:before:!bg-gray-100'
)
</script>
