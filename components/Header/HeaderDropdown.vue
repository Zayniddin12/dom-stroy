<template>
  <div
    class="!relative min-w-fit inline-block border-b border-gray-500 dark:border-dark-300"
    @focusout="onClickAway"
  >
    <button
      class="custom-hover text-sm flex items-center group transition-all duration-150 hover:text-gray-200 !text-dark w-full"
      :class="buttonClass"
      @click="onClick"
    >
      <slot name="head" />
    </button>
    <CollapseTransition>
      <ul
        v-if="dropDownActive"
        class="w-full h-auto !overflow-hidden !z-50 flex flex-col cursor-pointer"
        :class="listStyle"
        @click="onClickAway"
      >
        <slot />
      </ul>
    </CollapseTransition>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue'

interface Props {
  title?: string
  listStyle?: string
  buttonClass?: string | [string]
}
withDefaults(defineProps<Props>(), {})

const emit = defineEmits(['on-click'])
const dropDownActive = ref(false)

const onClick = () => {
  dropDownActive.value = !dropDownActive.value
  emit('on-click', dropDownActive.value)
}

function onClickAway() {
  dropDownActive.value = false
}
</script>

<style>
.dropdown-enter-active {
  transition: all 0.2s ease;
}

.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
