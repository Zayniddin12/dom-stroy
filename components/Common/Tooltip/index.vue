<template>
  <div
    class="absolute top-0 left-1/2 -translate-x-1/2 transition duration-300"
    :class="[
      show && withTrigger
        ? '!-translate-y-1/2 !visible !opacity-100'
        : 'invisible opacity-0',
      {
        'group-hover:visible group-hover:opacity-100 group-hover:-translate-y-1/2':
          !withTrigger,
      },
    ]"
  >
    <div
      class="tooltip bg-dark/80 rounded-lg px-2 py-1 text-sm leading-130 text-white relative"
    >
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
interface Props {
  withTrigger?: boolean
  show?: boolean
}
defineProps<Props>()
</script>
