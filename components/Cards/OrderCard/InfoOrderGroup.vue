<template>
  <div class="w-full">
    <CommonBlockPreloader height="28px" width="140px" :loading="loading">
      <p
        class="text-dark-200 dark:text-white transition-300 font-bold leading-130 text-xl group-hover:text-red"
      >
        #{{ id }}
      </p>
    </CommonBlockPreloader>

    <p
      class="mt-2 text-gray-200 dark:text-gray-300 transition-300 font-normal leading-130 text-sm"
      :class="loading ? 'opacity-0' : 'opacity-1'"
    >
      {{ $t('bought_amount') }}: <span class="text-dark-200 dark:text-white transition-300">{{ subtitle }}</span>
    </p>

    <CommonBlockPreloader height="38px" width="260px" :loading="loading">
      <p
        class="mt-2 text-gray-200 font-normal leading-130 text-xs md:text-sm"
      >
        {{ $t('address') }}:
        <span class="text-dark !w-full dark:text-white transition-300"> {{ address }}</span>
      </p>
    </CommonBlockPreloader>
    <div :class="loading ? 'my-[10px]' : ''"></div>
    <OrderStatusBadge v-bind="{ loading, status }" custom="mt-2" />
  </div>
</template>

<script setup lang="ts">
interface Props {
  status: number | string
  id: number
  subtitle: string
  address?: string
  loading?: boolean
}

const props = defineProps<Props>()
const localePath = useLocalePath()
</script>
