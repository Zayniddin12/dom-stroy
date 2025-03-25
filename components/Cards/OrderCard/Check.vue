<template>
  <div class="bg-white dark:bg-dark-100 transition-300 p-5 rounded-xl">
    <div class="flex items-center mb-5">
      <p class="text-dark dark:text-white text-2xl font-normal mr-4">
        #{{ id }}
      </p>
      <OrderStatusBadge v-bind="{ loading, status }" />
    </div>
    <div
      v-for="(item, index) in list"
      :key="index"
      class="grid grid-cols-12 border-t border-t-gray-600 dark:border-t-dark-300 py-3"
    >
      <p
        class="col-span-6 text-gray-100 font-normal dark:text-gray-300 transition-300"
      >
        {{ $t(item?.title) }}:
      </p>
      <CommonBlockPreloader
        height="30px"
        width="169px"
        :loading="loading"
        class="col-span-6"
      >
        <p
          class="text-dark-200 dark:text-white transition-300 font-normal text-right break-words"
        >
          {{ item?.value }}
        </p>
      </CommonBlockPreloader>
    </div>
  </div>
</template>
<script setup lang="ts">
type TList = {
  title: string
  value: string
}
interface Props {
  id?: number
  list?: TList[]
  loading?: boolean
  status: number | string
}
const props = withDefaults(defineProps<Props>(), {})
</script>
