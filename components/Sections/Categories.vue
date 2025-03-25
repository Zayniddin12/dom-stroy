<template>
  <ClientOnly>
    <div class="container pt-5 md:pt-16 pb-5 md:pb-16">
      <CommonSectionsSectionHead
        :title="title"
        :section-title="linkTitle"
        :section-link="link"
      />
      <transition name="fade" mode="out-in">
        <div
          :key="loading"
          class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-x-3 md:gap-x-6 gap-y-4"
        >
          <template v-if="loading">
            <CardsCategory v-for="i in loadingNumber" :key="'A' + i" loading />
          </template>
          <template v-else>
            <NuxtLink
              v-for="(item, index) in categories"
              :key="'J' + index"
              :to="localePath(`/products/categories/${item.id}`)"
            >
              <CardsCategory :card="item" />
            </NuxtLink>
          </template>
        </div>
      </transition>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import type { TCategory } from '~/types/categories'

interface Props {
  categories: TCategory[]
  title: string
  link?: string
  loading?: boolean
  linkTitle: string
  loadingNumber?: number
}

const props = withDefaults(defineProps<Props>(), {
  linkTitle: 'all_brands',
  loadingNumber: 4,
})
const localePath = useLocalePath()
</script>
