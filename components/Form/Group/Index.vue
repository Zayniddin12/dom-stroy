<template>
  <div class="flex flex-col gap-2 w-full">
    <div class="flex-center-between w-full">
      <FormLabel :label="$t(label)" />
      <p
        v-if="isRightLabel"
        @click="emit('rightLabelEvent')"
        class="text-green duration-300 hover:text-green-200 text-sm leading-[17px] font-normal cursor-pointer text"
      >
        {{ rightLabel }}
      </p>
      <slot name="labelOpposite" />
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'rightLabelEvent'): void
}>()

interface Props {
  label: string
  isRightLabel?: boolean
  rightLabel?: boolean
  tooltip?: boolean
  tooltipText?: string
}

withDefaults(defineProps<Props>(), {
  label: '',
  rightLabel: false,
})
</script>
