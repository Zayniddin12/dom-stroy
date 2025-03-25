<template>
  <button
    v-bind="{ disabled, type }"
    class="button rounded-lg !py-2 !px-4 md:py-2.5 md:px-3 flex-center cursor-pointer transition-300 relative"
    :style="{ '--spinnerColor': spinnerColor }"
    :class="[{ 'pointer-events-none': loading }, `button-${variant}`]"
  >
    <i
      :class="[
        'transition-300 absolute-center',
        loading ? 'opacity-100 visible' : 'opacity-0 invisible',
      ]"
    >
      <svg class="circular-loader" viewBox="25 25 50 50">
        <circle
          class="circular-loader__path"
          cx="50"
          cy="50"
          r="20"
          fill="none"
        />
      </svg>
    </i>
    <div :class="textStyle">
      <slot name="pre-icon"></slot>
      <slot>
        {{ text }}
      </slot>
      <slot name="post-icon"></slot>
    </div>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import type { TButtonVariants } from '~/components/Common/Button/types'

interface Props {
  text?: string
  textClass?: string
  spinnerColor?: string
  disabled?: boolean
  loading?: boolean
  type?: string
  variant?: TButtonVariants
}
const props = withDefaults(defineProps<Props>(), {
  text: 'Button',
  textClass: '',
  spinnerColor: 'white',
  disabled: false,
  loading: false,
  variant: 'primary',
})

// ******* EMITS *******

const textStyle = computed(() => {
  const labelClass = props.textClass
  return [
    labelClass,
    !props.loading ? 'opacity-100 visible' : 'opacity-0 invisible',
    'transition delay-100 font-medium letter-3 !leading-sm text-sm select-none flex-y-center gap-x-1',
  ]
})
</script>

<style>
.button:not(:disabled):active {
  transform: scale(0.9);
}

.button:disabled {
  background: #cdcdd0 !important;
  opacity: 0.5;
  box-shadow: none;
}

.button:not(:disabled):active {
  transform: scale(0.9);
}

.button:disabled {
  cursor: not-allowed;
}

.button:disabled:hover {
  cursor: not-allowed;
  box-shadow: none;
}

.button:disabled:hover {
  color: #ffffff;
}

.button .circular-loader {
  width: 24px;
  height: 24px;
  stroke: var(--spinnerColor);
}

.button .circular-loader__path {
  fill: none;
  stroke-width: 5px;
  stroke-linecap: round;
  animation: animate-stroke 1s ease-in-out infinite;
}

@keyframes animate-stroke {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124;
  }
}
/* Variants */

.button-primary {
  background: #ef7f1a;
  color: white;
}
.button-primary:hover {
  opacity: 0.7 !important;
}
.button-secondary {
  @apply bg-gray-400 text-[#383838] dark:bg-[rgba(255,255,255,.12)] dark:text-white;
}
.button-secondary:hover {
  opacity: 0.8;
}
.button-light {
  background: rgba(239, 127, 26, 0.1);
  color: #ef7f1a;
}
.button-light:hover {
  background: rgba(239, 127, 26, 0.3);
}
.button-light:disabled {
  background: #f2f3f5 !important;
  color: #cdcdd0 !important;
}
.button-light:disabled:is(.dark *) {
  background: rgba(255, 255, 255, 0.1) !important;
  color: #ffffff;
}
.button-light:disabled:is(.dark *) {
  background: #ffffff1f !important;
  color: #ffffff;
}
.button-secondary-light {
  background: #f2f3f5;
  color: #383838;
}
.button-secondary-light:hover {
  background: #eaebed;
}
.button-primary-light {
  background: #ef7f1a10;
  color: #ef7f1a;
  border: 1px solid #ef7f1a10;
}
.button-primary-light:hover {
  border: 1px solid #ef7f1a;
  transition-duration: 300ms;
}
.button-primary-light:hover:is(.dark *) {
  border: 1px solid #ef7f1a10;
  transition-duration: 300ms;
  background: rgba(174, 130, 88, 0.06);
}
.button-dark {
  background: #cdcdd0;
  color: #fff;
}

.button-dark:hover {
  background: #c1c1c2;
}
.button-light-dark {
  background: rgba(239, 127, 26, 0.1);
  color: #ef7f1a;
}
.button-light-dark:hover {
  background: rgba(239, 127, 26, 0.3);
}
.button-light-dark:is(.dark *) {
  background-color: #ffffff1f;
  color: #fff;
}
.button-light-dark:hover:is(.dark *) {
  background-color: rgba(228, 225, 225, 0.12);
}
.button-thirdly {
  background: rgba(239, 127, 26, 0.1);
  color: #ef7f1a;
}
.button-thirdly:hover {
  background: rgba(239, 127, 26, 0.3);
}
.button-thirdly:disabled {
  background: #cdcdd0 !important;
  color: #ffffff !important;
}

.button-thirdly:disabled:is(.dark *) {
  background: #ffffff1f !important;
  color: #ffffff;
}
.button-register {
  @apply bg-[#ef7f1a1a] text-red dark:text-white dark:bg-[#ffffff1f];
}
.button-register:hover {
  @apply dark:bg-[#ffffff33] bg-[#ef7f1a4d];
}
</style>
