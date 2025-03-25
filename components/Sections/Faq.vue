<template>
  <div class="container mx-auto max-w-[782px] w-full">
    <h3 class="p-3 text-dark text-2xl font-proxima font-semibold">F.A.Q</h3>
    <div
      class="group transition-300 bg-white rounded-xl mt-4"
      v-for="faq in faqs.results"
      :key="faq.id"
      :class="{
        'border-red faq-item-active': selectedItem === faq.id,
        'border-grey-200/50 faq-item': selectedItem !== faq.id,
      }"
    >
      <div
        class="flex-y-center justify-between faq-list gap-3 transition-300 bg-gray-600 p-3 pb-2.5 border-transparent hover:border-red group rounded-t-lg cursor-pointer"
        @click="openItem(faq.id)"
      >
        <h4
          class="font-semibold text-base md:text-xl leading-140 text-dark transition-300 group-hover:text-red"
        >
          {{ faq.question }}
        </h4>
        <div class="ml-4 bg-white-300 p-1 border border-transparent rounded-lg">
          <svg
            class="transition-300"
            :class="{ 'rotate-180': selectedItem === faq.id }"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="9"
            viewBox="0 0 16 9"
            fill="none"
          >
            <path
              d="M8 7.5L1.25 0H14.75L8 7.5Z"
              :class="{ 'fill-red': selectedItem === faq.id }"
              fill="#C7C7C7"
            />
          </svg>
        </div>
      </div>

      <CollapseTransition>
        <div
          class="max-md:pb-3 !pt-0 bg-gray-600 rounded-b-lg faq-answer"
          v-if="selectedItem === faq.id"
        >
          <p
            class="font-normal leading-148 text-sm md:text-base text-gray-100 p-4"
            v-html="faq.answer"
          ></p>
        </div>
      </CollapseTransition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useProfileStore } from '~/store/profile'
import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue'
import { useApi } from '~/composables/useApi'

const selectedItem = ref(0)
const { actionGet: $fetch } = useApi()

const openItem = (id: number) => {
  selectedItem.value = selectedItem.value === id ? 0 : id
}

const faqs = ref<any>([])

function getFaqs() {
  $fetch('GET', 'common/faq/', '')
    .then((res) => {
      faqs.value = res
    })
    .catch((err) => {
      return new Error(err)
    })
}

getFaqs()
</script>

<style>
.faq-list {
  margin-top: 20px !important;
}

.faq-list:nth-child(1) {
  margin-top: 0 !important;
}
.faq-list .faq-answer {
  max-height: 300px;
  overflow-y: auto;
}
.faq-answer p {
  word-break: break-word;
  white-space: normal;
}
</style>
