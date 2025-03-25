<template>
  <div class="flex-y-center gap-1">
    <label
      class="group inline-flex items-center relative select-none"
      :class="disabled ? 'cursor-not-allowed' : 'cursor-pointer'"
      @click="handleChange"
    >
      <span
        class="shrink-0 duration-200 ease-in-out h-6 w-6 flex items-center justify-center rounded bg-gray border border-gray-400 after:border-white peer-disabled:border-gray-100 peer-disabled:after:border-grey-100"
        :class="[
          {
            'after:transition-all after:duration-200 after:absolute after:left-2 after:mb-1  after:w-2 after:h-3 after:border-r-[2.2px] after:border-b-[2.2px] after:rotate-[45deg] after:opacity-0 transition-300':
              !partial,
          },
          {
            'after:transition-all after:duration-200 after:absolute after:left-[8px] after:top-2 after:w-2 after:h-3 after:border-l-[2.2px] after:opacity-0 !border-[#189FFF] !bg-[#189FFF] after:rotate-90':
              partial,
          },
          {
            'border-red-200': error,
            'group-hover:border-red': !disabled,
          },
          partial ? '' : checked ? ' after:opacity-100 after:rotate-180' : '',
          checked ? '!border-red !bg-red' : '',
          checkboxStyles,
        ]"
      />
      <span class="ml-2 flex-y-center gap-1">
        <slot name="label">
          <span
            class="font-medium letter-3 !leading-130 text-dark text-base"
            :class="[labelStyles]"
          >
            {{ label }}
          </span>
        </slot>
      </span>
    </label>
    <NuxtLink
      v-if="infoIcon"
      v-tooltip="infoText"
      :to="infoLink"
      class="flex-center"
      target="_blank"
    >
      <i
        class="icon-info-stroke text-gray-100 text-xl hover:text-primary transition-300"
      />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string | number | boolean
  label?: string
  name?: string
  value?: string | number | boolean
  disabled?: boolean
  error?: boolean
  labelStyles?: string
  checked?: boolean
  partial?: boolean | number
  checkboxStyles?: string
  infoIcon?: boolean
  infoText?: string
  infoLink?: string
}
const props = withDefaults(defineProps<Props>(), {})

// watch(
//   () => props.modelValue,
//   (value) => {
//     vm.value = value
//   }
// )

const vm = ref([])

const emit = defineEmits<{
  (e: 'update:modelValue', value: Props['modelValue']): void
}>()
const handleChange = () => {
  // const target = e.target as HTMLInputElement
  emit('update:modelValue', !props.checked)
}
</script>
