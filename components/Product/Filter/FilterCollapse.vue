<template>
  <div
    v-for="(el, index) of filterData"
    :key="index"
    class="pb-5 pr-4 border-b border-solid border-gray-500 dark:border-gray-100 transition-300"
  >
    <button
      @click="collapseMenu(index)"
      class="w-full flex items-center justify-between bg-[#F2F3F5] rounded-lg lg:rounded-none lg:!bg-transparent px-2 py-3 lg:!p-0"
    >
      <span
        class="text-base text-dark dark:text-white font-normal lg:font-bold leading-125 transition-300"
      >
        {{ $t(el?.title) }}
      </span>
      <span
        class="icon-chevron-down text-2xl text lg:text-gray-100 font-bold duration-200"
        :class="{ '!text-red rotate-180': el.expanded }"
      />
    </button>
    <CollapseTransition :duration="300">
      <div class="pt-3" v-show="el.expanded">
        <CheckboxGroup
          v-bind="{ clearTrigger }"
          :items="el.items"
          :queryKey="el.title"
          @on-toggle-all="onToggleAll(index)"
        />
      </div>
    </CollapseTransition>
  </div>
</template>

<script setup lang="ts">
import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue'
import CheckboxGroup from '~/components/Form/Checkbox/Group/CheckboxGroup.vue'
import { onMounted, unref } from 'vue'
import type { IFilterData } from '~/types/products'
interface Props {
  data: IFilterData[]
  clearTrigger: number
}
const props = defineProps<Props>()
const route = useRoute()
const filterData = reactive<IFilterData[]>(unref(props.data))

const collapseMenu = (idx: number, newValue = !filterData[idx].expanded) => {
  filterData[idx].expanded = newValue
}

function onToggleAll(idx: number) {
  filterData[idx].checked = !filterData[idx].checked
}

// THIS LOGIC WILL BE REPLACED WITH .then() METHOD
onMounted(() => {
  filterData?.forEach((i: IFilterData) => {
    i.expanded = true
  })
})
</script>
