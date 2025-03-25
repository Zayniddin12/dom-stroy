<template>
  <div
    class="custom-tree-select bg-white rounded-2xl relative z-[100] mt-5 p-4"
  >
    <button
      @click="showFilter = !showFilter"
      class="w-full flex items-center justify-between"
    >
      <span class="text-base text-dark font-bold leading-125">
        Title {{ $t(options?.title ?? '') }}
      </span>
      <span
        class="icon-chevron-down text-2xl text-gray-100 font-bold duration-200"
        :class="{ '!text-red rotate-180': showFilter }"
      />
    </button>
    <CollapseTransition :duration="300">
      <Treeselect
        v-bind="{ normalizer }"
        class="pt-3"
        v-show="showFilter"
        :multiple="true"
        :options="options.items"
        :value-consists-of="valueConsistsOf"
        v-model="value"
        :disabelBranchNodes="false"
        :always-open="true"
        :searchable="false"
        :no-children-text="''"
      >
        <template #option-label="{ node }">
          <p class="font-semibold  text-sm leading-130 ">{{ node.raw.title }}</p>
        </template>
      </Treeselect>
    </CollapseTransition>
    <pre>{{ options }}</pre>
  </div>
</template>

<script lang="ts" setup>
// import the component
import Treeselect from 'vue3-treeselect'
// import the styles
import 'vue3-treeselect/dist/vue3-treeselect.css'
import type { IFilterData } from '~/types/products'

interface Props {
  title: string
  options: IFilterData[]
}
defineProps<Props>()

const showFilter = ref(true)
const value = ref(['team-i'])
const valueConsistsOf = ref('BRANCH_PRIORITY')

const normalizer = computed(
  () => (node: { id: number; title: string; categories: [] }) => ({
    id: node.id,
    label: node.title,
    children: node.categories,
  })
)

const customOptions = [
  {
    id: 'team-i',
    label: 'Team I 👥',
    children: [
      {
        id: 'person-a',
        label: 'Person A 👱',
        children: [
          {
            id: 'team-i',
            label: 'Team I 👥',
            children: [
              {
                id: 'person-a',
                label: 'Person A 👱',
              },
              {
                id: 'person-b',
                label: 'Person B 🧔',
              },
            ],
          },
        ],
      },
      {
        id: 'person-b',
        label: 'Person B 🧔',
      },
    ],
  },
  {
    id: 'team-ii',
    label: 'Team II 👥',
    children: [
      {
        id: 'person-c',
        label: 'Person C 👳',
      },
      {
        id: 'person-d',
        label: 'Person D 👧',
      },
    ],
  },
  {
    id: 'person-e',
    label: 'Person E 👩',
  },
]
</script>

<style>
.custom-tree-select .vue-treeselect__control {
  display: none;
}

.custom-tree-select .vue-treeselect--open-below .vue-treeselect__menu {
  border: none;
  box-shadow: none;
}

.custom-tree-select .vue-treeselect__option--highlight {
  background-color: transparent !important;
}

.custom-tree-select .vue-treeselect__menu-container {
  position: static;
}

.custom-tree-select .vue-treeselect__option-arrow-container {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
.custom-tree-select .vue-treeselect__option,
.custom-tree-select .vue-treeselect__menu {
  position: relative;
}

.custom-tree-select .vue-treeselect__tip.vue-treeselect__no-children-tip {
  display: none !important;
}
</style>
