<template>
  <div
    class="bg-gray-600/40 dark:bg-dark-300 transition-300 border border-gray-600 p-4 rounded-lg grid grid-cols-max-1 items-center"
  >
    <div class="pr-5 border-r border-gray-400 h-max max-h-full">
      <CommonBlockPreloader :loading="loading" height="55px" width="80px">
        <h1 class="text-[2.5rem] text-dark-200 dark:text-white font-normal">{{ rate }}</h1>
      </CommonBlockPreloader>
      <CommonBlockPreloader
        :loading="loading"
        height="17px"
        width="122px"
        preloader-class="mt-2"
      >
        <CommonRating :rate="rate" class="gap-2" star-class="!text-lg" />
      </CommonBlockPreloader>
      <CommonBlockPreloader
        :loading="loading"
        height="15px"
        width="80px"
        preloader-class="mt-2"
      >
        <p id="my-div" class="text-xs text-gray-200 mt-1" v-if="total">
          ({{ showTotal }})
        </p>
      </CommonBlockPreloader>
    </div>
    <div class="h-full pl-5 flex flex-col">
      <div
        class="grid grid-cols-[50px_1fr] items-center"
        v-for="(i, index) in rates"
        :key="index"
      >
        <CommonBlockPreloader :loading="loading" width="100%" height="16px">
          <div class="flex items-center">
            <span class="text-dark dark:text-white transition-300 font-normal text-sm">{{ i?.rate }}</span>
            <span class="text-gray-200 text-xs mx-1">{{ i?.percent }}%</span>
          </div>
        </CommonBlockPreloader>
        <div class="grid gap-1 items-center grid-cols-max-1">
          <div>
            <span class="icon-star text-yellow text-sm"></span>
          </div>
          <CommonBlockPreloader
            :loading="loading"
            width="100%"
            height="16px"
            border-radius="100px"
          >
            <div class="w-full rounded-full bg-gray-400 dark:bg-gray-100 h-3 relative">
              <div
                :style="{ width: i?.percent + '%' }"
                class="h-full rounded-full bg-yellow transition-all duration-150 cursor-pointer hover:bg-[#F8CD66]"
                @mousemove="showTooltip"
                @mouseleave="removeClass"
              >
                <div
                  class="absolute py-1 px-2 h-7 -top-[30px] -translate-x-1/2 min-w-[32px] rounded-lg z-10 bg-gray-800 text-white flex-center tooltip"
                  :style="`left: ${styleList?.left};`"
                >
                  {{ i?.count }}
                </div>
              </div>
            </div>
          </CommonBlockPreloader>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IRates } from '~/types/comments'
import { useI18n } from "vue-i18n";

const { t } = useI18n()
interface Props {
  rates: IRates[]
  total: number
  rate: number
  loading?: boolean
}
const props = defineProps<Props>()
let styleList = ref({
  left: '',
})
const getRate = (rate: number) => {
  return props.rates.find((r) => r.rate === rate)
}

interface IMouseEvent extends MouseEvent {
  target: HTMLDivElement
  layerX: number
  layerY: number
}

function showTooltip(e: IMouseEvent) {
  const target = e?.target
  target.classList.add('tool')
  styleList.value.left = e?.layerX + 'px'
  // styleList.value.top = e?.layerY + 8 + "px"
}
function removeClass(e: IMouseEvent) {
  const target = e?.target
  target.classList.remove('tool')
}
const showTotal = computed(() => {
  if(props.total > 1) {
    return `${ props.total } ${ t('reviews') }`
  } else {
    return `${ props.total } ${ t('review') }`
  }
})
</script>
<style scoped>
.tooltip {
  visibility: hidden;
}
.tool .tooltip {
  visibility: visible;
}
</style>
