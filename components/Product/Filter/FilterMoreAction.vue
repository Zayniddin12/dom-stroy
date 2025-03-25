<template>
  <button
    class="flex items-center text-sm text-orange font-normal group"
    @click="handleShow"
  >
    <span
      class="icon-chevron-down transition-200 text-2xl text-orange group-hover:opacity-80 transition-300 font-bold duration-150 mr-2 leading-130"
      :class="{ 'rotate-180': expanded }"
    />
    <span class="group-hover:opacity-80 transition-300">{{ checkTrigger }}</span>
    <span v-if="!expanded" class="leading-130 ml-1 group-hover:opacity-80 transition-300">
      +{{ hiddenItemsCount }}
    </span>
  </button>
</template>

<script setup lang="ts">
interface Props {
  data?: object
  show?: number
  expanded?: boolean
  hiddenItemsCount?: number
}
const props = defineProps<Props>()

const { t } = useI18n()
const emit = defineEmits(['expand'])
const handleShow = () => {
  if (props.expanded) {
    emit('expand', false)
  } else {
    emit('expand', true)
  }
}

const checkTrigger = computed(() =>
  props.expanded ? t('filter_short') : t('filter_more')
)
</script>

<style lang="scss" scoped></style>
