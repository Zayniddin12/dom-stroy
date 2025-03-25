<template>
  <Transition name="fade">
    <div v-if="loading" class="absolute-center flex-center w-full h-full">
      <div class="lds-ripple inline-block relative w-20 h-20">
        <div
          class="absolute border-4 border-red opacity-100 rounded-full"
        ></div>
        <div
          class="absolute border-4 border-red opacity-100 rounded-full"
        ></div>
      </div>
    </div>
  </Transition>

  <video
    v-if="active"
    ref="video"
    :src="url"
    autoplay
    class="w-full object-contain rounded-lg"
  />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

interface Props {
  url: string
  active: boolean
  pause?: boolean
}
const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update-duration', value: number): void
}>()

const loading = ref(true)
const video = ref()

onMounted(() => {
  setTimeout(() => (loading.value = false), 200)
})

watch(
  () => props.active,
  (newValue) =>
    setTimeout(() => {
      if (newValue && video.value) {
        video.value.addEventListener(
          'loadeddata',
          (el: { target: { duration: number } }) => {
            emit('update-duration', el?.target?.duration)
          }
        )
      }
    }, 100)
)

watch(
  () => props.pause,
  (newValue) => (newValue ? video.value?.pause() : video.value?.play())
)
</script>

<style scoped>
.lds-ripple div {
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}

.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}

@keyframes lds-ripple {
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  4.9% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  5% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0;
    left: 0;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
}
</style>
