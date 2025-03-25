<template>
  <CommonButton
    spinner-color="#0B0A67"
    variant="light"
    class="!px-5 mt-10 mx-auto flex"
    v-bind="{ loading }"
  >
    <span class="icon-arrow-down-solid text-[20px]"></span>
    <span class="inline-block">{{ $t('load_more') }}</span>
  </CommonButton>
</template>

<script setup lang="ts">
interface Props {
  loading?: boolean
}
defineProps<Props>()
</script>
