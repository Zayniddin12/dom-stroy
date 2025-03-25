<template>
  <div
    class="border p-2 rounded-xl dark:border-dark-300 relative flex-y-center w-full duration-300 cursor-pointer h-[66px] dark:bg-gray-400"
    :class="[
      active
        ? '!border-red bg-red border-2 bg-opacity-[0.04] active-card'
        : 'border-gray-400',
      data?.label === 'with_cash' && 'p-0',
    ]"
  >
    <span
      class="absolute left-0 h-[36px] w-[3px] top-[calc(50%-18px)] rounded-r-2xl duration-300"
      :class="active ? 'bg-red' : 'bg-gray-500'"
    />
    <div v-if="!app" class="flex-y-center">
      <CommonBlockPreloader
        height="50px"
        width="50px"
        :loading="loading"
        class="flex-shrink-0"
      >
        <div class="bg-[#334055] rounded-lg w-[50px] h-[50px] flex-center">
          <img
            v-if="svgGenerator"
            :src="`/images/cards/${svgGenerator}.svg`"
            class="object-contain"
            :alt="data?.label"
          />
        </div>
      </CommonBlockPreloader>
      <div class="flex flex-col items-start ml-2">
        <CommonBlockPreloader height="14px" width="100px" :loading="loading">
          <p class="text-dark font-bold text-base leading-130">
            {{ data?.cash ? $t('cash_text') : data?.number }}
          </p>
        </CommonBlockPreloader>
      </div>
    </div>

    <div
      v-if="app"
      class="flex-y-center"
      :class="{ 'pl-3': data?.label !== 'with_cash' }"
    >
      <CommonBlockPreloader height="40px" width="180px" :loading="loading">
        <img
          v-if="data?.label === 'with_cash'"
          :src="data?.icon"
          alt="cash logo"
          class="w-[66px] h-[66px]"
        />
        <img
          v-else
          :src="data?.icon"
          :alt="data?.label"
          class="object-contain max-h-7"
        />
      </CommonBlockPreloader>
      <div
        v-if="data?.label === 'with_cash'"
        class="flex flex-col items-start ml-2"
      >
        <CommonBlockPreloader height="20px" width="150px" :loading="loading">
          <p class="font-semibold text-dark leading-130">
            {{ data?.cash ? $t('cash') : data?.label }}
          </p>
        </CommonBlockPreloader>
        <!--        <CommonBlockPreloader height="14px" width="100px" :loading="loading">-->
        <!--          <p class="text-gray-200 text-xs leading-130">-->
        <!--            {{ data?.cash ? $t('cash_text') : data?.text }}-->
        <!--          </p>-->
        <!--        </CommonBlockPreloader>-->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  data: {
    id: number,
    label: string
    icon: string,
    cash: boolean,
    show: boolean
  }
  active?: boolean
  loading?: boolean
  cash?: boolean
  app?: boolean
}
const props = withDefaults(defineProps<Props>(), {})

const svgGenerator = computed(() => {
  return props?.data?.vendor?.toLowerCase()
})
</script>

<style scoped>
.active-card {
  box-shadow: 0px 8px 24px rgba(246, 37, 89, 0.1);
}
</style>
