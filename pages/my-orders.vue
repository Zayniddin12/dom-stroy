<template>
  <div class="container">
    <CommonBreadcrumb v-bind="{ routes }" />
    <h1 class="mt-8 text-3xl leading-130 font-bold text-dark-200 dark:text-white">
      {{ $t('my_orders') }}
    </h1>
    <div class="md:grid grid-cols-2 md:!grid-cols-12 gap-6 mt-6 pb-10">
      <div class="w-full col-span-4">
        <CardsBlank class="!p-4">
          <div class="flex md:flex-col gap-2">
            <TabsTabItem
              v-for="(tab, index) in OrderTabList"
              :key="index"
              v-bind="{ tab }"
            />
          </div>
        </CardsBlank>
      </div>
      <div class="w-full col-span-8">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})
import { OrderTabList } from '~/config/global-config'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const orders = ref()
const loading = ref(false)
const routes = ref([
  {
    name: t('main'),
    route: '/',
  },
  {
    name: t('my_orders'),
  },
])
</script>
