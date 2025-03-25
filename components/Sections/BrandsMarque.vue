<template>
  <div
    class="bg-white dark:bg-dark-100 duration-300 flex flex-col space-y-4 py-8"
  >
    <div class="container">
      <CommonSectionsSectionHead
        :title="title"
        :section-link="link"
        :section-title="linkTitle"
      />
    </div>
    <CommonSliderBrandsMarque
      :partners-list="data"
      class="pb-5 flex flex-col space-y-4"
    />
  </div>
</template>
<script setup lang="ts">
import type { TBrand } from '~/types/brand'

interface Props {
  title: string
  linkTitle: string
  loading?: boolean
  link: string
  data?: TBrand[]
}
defineProps<Props>()
</script>
