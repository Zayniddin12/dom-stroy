<template>
  <ClientOnly>
    <div class="container py-8">
      <CommonSectionsSectionHead :title="title" />
      <CommonSliderComment :comments="data" :loading="loading" />
    </div>
  </ClientOnly>
</template>
<script setup lang="ts">
import type { TComment } from '~/types/comments'

interface Props {
  title: string
  linkTitle: string
  loading?: boolean
  data: TComment[]
}
const props = withDefaults(defineProps<Props>(), {})

</script>
