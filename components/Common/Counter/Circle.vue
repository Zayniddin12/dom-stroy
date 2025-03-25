<template>
  <div id="countdown-number" class="inline-block leading-[40px] text-[#334055]">
    {{ number }}
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

interface Emits {
  (e: 'finished'): void
}

const emit = defineEmits<Emits>()

let number = ref(60)

const timer = setInterval(() => {
  if (number.value > 0) {
    number.value--
  } else {
    clearInterval(timer)
    emit('finished')
  }
}, 1000)
</script>
