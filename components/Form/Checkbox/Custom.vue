<template>
  <div
    class="group w-full flex items-center relative select-none min-h-[20px] pb-2 mb-2"
    :class="disabled ? 'cursor-not-allowed' : 'cursor-pointer'"
    @click="emit('click')"
  >
    <span
      v-if="!parent && isChecked"
      :class="[
        'icon-unread text-2xl font-black text-white transition-200 absolute left-[-2px] top-[-0.5px] rotate-[138deg] z-10 opacity-0',
        { '!opacity-100 !rotate-[0]': isChecked },
        { '!text-gray-300': disabled },
      ]"
    />
    <span
      v-else
      :class="[
        'rounded-3xl w-[14px] h-0.5  transition-200 absolute left-[3px] top-[11px] rotate-[138deg] z-10 opacity-0',
        { '!opacity-100 !rotate-[0] bg-orange': isChecked },
      ]"
    />
    <span
      :class="[
        'duration-200 ease-in-out absolute top-0.5 left-0 inline-block h-5 w-5 rounded border-2 ',
        'border-gray-300 group-hover:border-dark_red',
        {
          '!border-danger': error,
          'group-hover:border-gray-300': !disabled,
        },
        { '!-rotate-90 !border-orange !bg-orange': isChecked },
        { 'border-gray-300': disabled },
      ]"
    />
    <span class="w-full pl-8">
      <slot name="label">
        <span
          :class="[
            'font-normal letter-3 leading-130 text-[#2B3646] dark:text-white text-sm transition-200 group-hover:text-dark_red',
            labelStyles,
          ]"
        >
          {{ label }}
        </span>
      </slot>
      <slot />
    </span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: any
  label?: string
  name?: string
  value?: any
  disabled?: boolean
  error?: boolean
  labelStyles?: string
  parent?: boolean
}
const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
  (e: 'click'): void
}>()
const handleChange = (e: any) => {
  e.preventDefault()
  emit('update:modelValue', !props.modelValue)
}

const isChecked = computed(() => [true, 'true'].includes(props.modelValue))
</script>
