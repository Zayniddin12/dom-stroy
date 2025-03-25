<template>

    <transition name="fade">
      <div
        v-if="show"
        class="ModalBg fixed top-0 left-0 w-full h-screen flex items-center justify-center z-[1000]"
      />
    </transition>

    <transition name="bounceIn">
      <div
        v-if="show"
        id="ModalBg"
        :class="[
          bodyClass,
          animationIn ? 'animated' : '',
          'fixed top-0 right-[0] w-full h-screen flex items-center justify-center z-[1001]  p-[15vh_auto_50px] overflow-auto',
        ]"
      >
        <div
          id="Modal"
          class="Modal bg-white w-full rounded-2xl relative dark:bg-dark-300"
          :class="[
            maxWidth ? 'max-w-[782px]' : 'max-w-[400px]',
            bodyWrapperClass,
          ]"
        >
          <slot name="header">
            <div
              class="flex items-center justify-between w-full relative"
              :class="[headerClass, { 'pr-5 pb-4': title }]"
            >
              <h5 class="text-xl font-bold text-dark dark:text-white">
                {{ title }}
              </h5>
              <i
                v-if="inside"
                class="absolute top-5 right-5 cursor-pointer modal-close"
                @click.stop="close()"
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 44 44"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    opacity="0.5"
                    cx="21.9993"
                    cy="22.0001"
                    r="18.3333"
                    stroke="#9E9EA5"
                    stroke-width="2.4"
                  />
                  <path
                    d="M27.5 16.5L16.5 27.5M16.5 16.5L27.4999 27.5"
                    stroke="#9E9EA5"
                    stroke-width="2.4"
                    stroke-linecap="round"
                  />
                </svg>
              </i>
            </div>
          </slot>
          <i
            v-if="!inside"
            class="absolute hidden md:block lg:top-0 lg:-right-16 cursor-pointer modal-close"
            @click.stop="close()"
          >
            <svg
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                opacity="0.5"
                cx="21.9993"
                cy="22.0001"
                r="18.3333"
                stroke="white"
                stroke-width="2.4"
              />
              <path
                d="M27.5 16.5L16.5 27.5M16.5 16.5L27.4999 27.5"
                stroke="white"
                stroke-width="2.4"
                stroke-linecap="round"
              />
            </svg>
          </i>
          <i
            v-if="!inside"
            class="absolute right-5 top-6 block lg:hidden cursor-pointer modal-close"
            @click.stop="close()"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.66666 14C4.66666 9.60025 4.66666 7.40036 6.03349 6.03352C7.40033 4.66669 9.60021 4.66669 14 4.66669C18.3998 4.66669 20.5997 4.66669 21.9665 6.03352C23.3333 7.40036 23.3333 9.60025 23.3333 14C23.3333 18.3998 23.3333 20.5997 21.9665 21.9665C20.5997 23.3334 18.3998 23.3334 14 23.3334C9.60021 23.3334 7.40033 23.3334 6.03349 21.9665C4.66666 20.5997 4.66666 18.3998 4.66666 14Z"
                stroke="#383838"
                stroke-width="2"
              />
              <path
                d="M16.3333 11.6667L11.6667 16.3334M11.6666 11.6667L16.3333 16.3333"
                stroke="#383838"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          </i>
          <div :class="contentClass">
            <slot />
          </div>
        </div>
      </div>
    </transition>
</template>

<script setup lang="ts">
import { watch, ref, onMounted, onBeforeUnmount } from '@vue/runtime-core'
import Circle from '~/components/Common/Counter/Circle.vue'
import { useMounted } from '@vueuse/core'

const mounted = useMounted()

interface Props {
  show: boolean
  title?: string
  contentClass?: string
  bodyClass?: string
  maxWidth?: boolean
  bodyWrapperClass?: string
  closeOnBackdrop?: boolean
  headerClass?: string
  inside?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  contentClass: '',
  bodyClass: 'px-4',
  closeOnBackdrop: true,
})

watch(
  () => props.show,
  (first) => {
    const body = document.body

    if (body) {
      if (first) {
        body.style.overflow = 'hidden'
      } else {
        body.style.overflow = 'auto'
      }
    }
  }
)
const emit = defineEmits(['close'])
function close() {
  emit('close')
}
let animationIn = ref(false)

const onMousedown = (event: Event) => {
  const target = event.target as HTMLTextAreaElement

  if (
    target.id !== 'Modal' &&
    target.id === 'ModalBg' &&
    props.closeOnBackdrop
  ) {
    animationIn.value = true
    setTimeout(() => {
      animationIn.value = false
    }, 500)
  }
}

onMounted(() => {
  document?.addEventListener('mousedown', onMousedown)
  document?.addEventListener('keydown', (e) => {
    e.code == 'Escape' ? close() : ''
  })
})
onBeforeUnmount(() => {
  document?.removeEventListener('mousedown', onMousedown)
})
</script>
<style>
#Modal {
  box-shadow: 0 5px 30px 0 rgba(0, 0, 0, 10%);
}
.ModalBg {
  background: rgba(56, 56, 56, 0.7);
}
.animated {
  animation: animatedIn 0.4s ease-in-out;
}

.clearfix:before,
.clearfix:after {
  content: '.';
  display: block;
  height: 0;
  overflow: hidden;
}
.clearfix:after {
  clear: both;
}
.clearfix {
  zoom: 1;
} /* IE < 8 */

@keyframes animatedIn {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.03);
  }
  70% {
    transform: scale(0.95);
  }
}
.modal-close svg circle,
path {
  transition: 0.3s ease-in-out;
}
.modal-close:hover svg circle {
  stroke: #fa0738;
  opacity: 1;
}
.modal-close:hover svg path {
  stroke: #fa0738;
}
</style>
