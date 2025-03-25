<template>
  <div class="!relative min-w-fit inline-block" @focusout="onClickAway">
    <button
      class="custom-hover lg:px-3 lg:py-2 text-sm text-white flex items-center group rounded-lg transition-all duration-150 hover:text-gray-200 !text-dark"
      :class="buttonClass"
      @click="onClick"
    >
      <slot name="head" />
    </button>
    <transition name="dropdown">
      <ul
        v-if="dropDownActive"
        class="bg-white dark:bg-dark-500 rounded-xl shadow-[0_4px_36px_rgba(56,56,56,0.16)] border border-gray-500 dark:border-dark-500 absolute top-[44px] right-px w-fit h-auto overflow-hidden !z-[999999] flex flex-col cursor-pointer"
        :class="listStyle"
        @click="onClickAway"
      >
        <slot />
      </ul>
    </transition>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

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
