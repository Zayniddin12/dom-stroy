<template>
  <div class="container mt-4">
    <CommonSectionsSectionHead
      :title="title"
      :section-link="link"
      :section-title="linkTitle"
    />
    <div
      v-if="!loading"
      class="grid grid-cols-1 md:!gird-cols-2 lg:grid-cols-4 md:gap-x-6 gap-y-3 md:space-y-0"
    >
      <CardsTopBrands v-for="(item, index) in data" :key="index" :card="item" />
    </div>
    <div
      v-else
      class="grid grid-cols-1 md:!gird-cols-2 lg:grid-cols-4 md:gap-x-6 gap-y-3 md:space-y-0"
    >
      <CardsTopBrands v-for="index in 4" :key="'B' + index" loading />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { TProductsManufacture } from '~/types/manufacture'

interface Props {
  title: string
  linkTitle: string
  loading?: boolean
  data: TProductsManufacture[]
  link: string
}
defineProps<Props>()
</script>
