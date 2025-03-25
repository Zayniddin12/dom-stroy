<template>
  <CommonBlockPreloader height="28px" width="160px" :loading="loading">
    <div
        class="rounded-lg py-1 px-2 flex items-center w-fit"
        :class="[statusStyle?.bgStyle, custom]"
    >
      <i class="text-[20px]" :class="statusStyle?.icon"></i>
      <span class="ml-1 text-sm font-normal transition-300 dark:text-white">{{ $t(statusStyle?.text) }}</span>
    </div>
  </CommonBlockPreloader>
</template>
<script setup lang="ts">
import {ref} from "vue";

interface Props {
  loading: boolean
  status: number | string
  custom?: string
}
const props = withDefaults(defineProps<Props>(), {})
const process = ref({
  icon: 'icon-clock-circle text-yellow',
  bgStyle: 'bg-[#f8af021a]',
  text: 'progress',
})
const approved = ref({
  icon: 'icon-clock-circle text-yellow',
  bgStyle: 'bg-[#f8af021a]',
  text: 'approved',
})
const delivered = ref({
  icon: 'icon-check-circle-regular text-green',
  bgStyle: 'bg-[#26d1761a]',
  text: 'done',
})
const cancelled = ref({
  icon: 'icon-close-circle text-red',
  bgStyle: 'bg-[#EF7F1A1A]',
  text: 'cancel2',
})
const statusStyle = computed(() => {
   if(props.status === 6) {
    return delivered.value
  } else if(props.status === 0) {
    return cancelled.value
  }else if(props.status === 3) {
     return approved.value
   } else {
    return process.value
  }
})
</script>