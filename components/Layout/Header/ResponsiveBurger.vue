<template>
  <CommonButton
    @click="toggleBurger"
    variant="custom"
    class="header-burger transition-200 group !px-0 !py-0"
  >
    <div class="flex items-center space-x-1 relative z-10">
      <div
        class="transition-200 plate plate4 flex-center rounded-full"
        :class="{
          'active shadow-[inset_0_0_0_2px_#6F6F6F] group-hover:!shadow-[inset_0_0_0_2px_#383838] scale-[0.8]':
            active,
        }"
      >
        <svg
          class="burger !w-7 !h-7"
          height="120"
          width="120"
          viewBox="0 0 100 100"
        >
          <path class="line line1" d="M 50,35 H 30" />
          <path class="line line2" d="M 50,35 H 70" />
          <path class="line line3" d="M 50,50 H 30" />
          <path class="line line4" d="M 50,50 H 70" />
          <path class="line line5" d="M 50,65 H 30" />
          <path class="line line6" d="M 50,65 H 70" />
        </svg>

        <svg
          class="x text-2xl !w-9 !h-9"
          version="1.1"
          height="90"
          width="80"
          viewBox="0 0 100 100"
        >
          <path class="line" d="M 34,32 L 66,68" />
          <path class="line" d="M 66,32 L 34,68" />
        </svg>
      </div>
    </div>
  </CommonButton>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

export interface Props {
  isActive: boolean
}
const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'toggle', value: boolean): void
}>()

const { t } = useI18n()

const active = ref(false)

function toggleBurger() {
  active.value = !active.value
  emit('toggle', active.value)
}

watch(
  () => props.isActive,
  (newValue) => {
    active.value = newValue
  }
)
</script>

<style scoped>
svg {
  height: 40px;
  position: absolute;
  width: 40px;
}

svg path {
  stroke: red !important;
}

.plate {
  height: 30px;
  width: 30px;
}

.x {
  transform: scale(0);
  transition: transform 400ms;
}

.line {
  width: 28px !important;
  height: 28px !important;
  fill: none;
  stroke: black;
  stroke-width: 6px;
  stroke-linecap: round;
  stroke-linejoin: round;
  transform-origin: 50%;
  transition: stroke-dasharray 500ms 200ms, stroke-dashoffset 500ms 200ms,
    transform 500ms 200ms;
}

.x .line {
  stroke-width: 6px;
}

.plate4 .x {
  transition: transform 400ms;
}

.plate4 .line {
  transform-origin: 50%;
  transition: transform 400ms 100ms;
}

.active.plate4 .line {
  transition: transform 400ms;
}

.active.plate4 .line1 {
  transform: translateX(18px) translateY(-3px) rotate(-45deg) scale(0.7);
}

.active.plate4 .line2 {
  transform: translateX(-18px) translateY(-3px) rotate(45deg) scale(0.7);
}

.active.plate4 .line3 {
  transform: translateY(0px) rotate(45deg) scale(0.7);
}

.active.plate4 .line4 {
  transform: translateY(0px) rotate(-45deg) scale(0.7);
}

.active.plate4 .line5 {
  transform: translateX(18px) translateY(3px) rotate(45deg) scale(0.7);
}

.active.plate4 .line6 {
  transform: translateX(-18px) translateY(3px) rotate(-45deg) scale(0.7);
}

.active.plate4 .x {
  transition: transform 400ms 100ms;
  transform: scale(1);
}

svg path {
  stroke: #6f6f6f !important;
}
</style>
