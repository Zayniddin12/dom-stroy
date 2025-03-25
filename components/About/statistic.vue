<template>
  <div class="flex gap-4 mt-4 items-center">
    <!--    <pre>{{card}}</pre>-->
    <CommonBlockPreloader
      :loading="loading"
      height="45px"
      width="45px"
      margin="6px 0"
      border-radius="50%"
    >
      <i :class="card?.icon" class="text-red text-[40px] sm:text-[52px]" />
    </CommonBlockPreloader>

    <div>
      <div>
        <CommonBlockPreloader
          :loading="loading"
          height="22px"
          width="240px"
          margin="6px 0"
        >
          <count-up
            ref="counter"
            class="text-lg sm:text-2xl md:text-[32px] leading-130 text-dark dark:text-white font-bold"
            :start-val="0"
            :end-val="card?.statistic"
            :duration="5"
            suffix="+"
            decimal-separator=""
            :decimal-places="0"
            :autoinit="true"
            delay="500"
          />
        </CommonBlockPreloader>
      </div>
      <CommonBlockPreloader :loading="loading" height="20px" width="240px">
        <p
          class="text-sm sm:text-base dark:text-gray-300 font-normal leading-130 text-[#9E9EA5]"
          v-if="card?.title"
        >
          {{ card?.title }}
        </p>
      </CommonBlockPreloader>
    </div>
  </div>
</template>

<script setup lang="ts">
import CountUp from 'vue-countup-v3'
interface Props {
  card: {
    index: number
    icon: string
    statistic: number
    title?: string
  }
  loading?: boolean
}

withDefaults(defineProps<Props>(), {})
</script>
