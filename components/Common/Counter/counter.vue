<template>
  <div
    class="i-counter h-full grid grid-cols-[50px_1fr_50px] gap-0.5 rounded-xl d-grid md:gap-2 align-items-center"
  >
    <button
      @click="decrease"
      class="i-counter__btn decrease__btn"
      :class="counterClass"
      :disabled="disableDecrease"
    >
      <span class="md:text-2xl text-xl leading-6 text-red icon-minus-circle" />
    </button>
    <div :class="[{ readonly }, inputStyle]" class="h-full">
      <input
        type="text"
        :readonly="readonly"
        v-model="count"
        v-maska="inputMask"
        :min="min"
        :max="max"
        class="i-counter__value flex-center border dark:!border-gray-100"
        :class="[{ error }, counterClass]"
        @input="onChangeCount"
      />
    </div>
    <button
      @click="increase"
      class="i-counter__btn increase__btn relative"
      :disabled="disableIncrease"
      :class="[
        { '!bg-gray-400 !border-gray-400 !cursor-not-allowed': max === count },
        counterClass,
      ]"
    >
      <span
        class="md:text-2xl text-xl leading-6 text-green icon-add-circle transition-300"
        :class="{ '!text-gray-300': max === count }"
      />
      <CommonTooltip
        with-trigger
        :show="max === count"
        class="whitespace-nowrap"
      >
        Max {{ max }}
      </CommonTooltip>
    </button>
  </div>
</template>

<script setup lang="ts">
// ******* PROPS *******
import { ref, watch } from 'vue'
import { debounce } from '~/helpers'

interface Props {
  defaultCount?: number
  disableIncrease?: boolean
  disableDecrease?: boolean
  error?: boolean
  readonly?: boolean
  residentValidation?: boolean
  inputMask?: string
  max?: number
  min?: number
  counterClass?: string
  inputStyle?: string
}
const props = withDefaults(defineProps<Props>(), {
  defaultCount: 0,
  min: 0,
  max: 999,
  inputMask: '###',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
  (e: 'decrease', value: number): void
}>()

const count = ref(0)

watch(
  () => props.defaultCount,
  (newValue) => {
    if (newValue) {
      count.value = newValue
    }
  },
  { immediate: true }
)

watch(
  () => count.value,
  () => {
    if (count.value < props.min) {
      count.value = props.min
    }
    if (count.value > props.max) {
      count.value = props.max
    }
    debounce('count', () => emit('update:modelValue', count.value), 300)
  },
  { immediate: true, deep: true }
)

const decrease = () => {
  if (
    count.value > 0 &&
    !props.disableDecrease &&
    ((props.residentValidation && count.value - 1 >= props.defaultCount) ||
      !props.residentValidation)
  ) {
    count.value--
    emit('decrease', count.value)
  }
}
const increase = () => {
  if (!props.disableIncrease) {
    count.value++
  }
}
const onChangeCount = (event: InputEvent) => {
  const target = event.target as HTMLInputElement

  if (target?.value.includes('-') || event.data?.includes('-')) {
    return event.preventDefault()
  }
}
</script>

<style scoped>
.i-counter__btn {
  @apply bg-white w-[50px] h-full border border-white flex items-center justify-center transition-all duration-300;
}
.i-counter__btn.decrease__btn {
  @apply rounded-r-sm rounded-l-lg hover:border-red/20 hover:bg-[#fbf3f5];
}
.i-counter__btn.increase__btn {
  @apply rounded-l-sm rounded-r-lg hover:border-green/20 hover:bg-[#eef9f5];
}
.i-counter__btn:nth-of-type(2):disabled {
  @apply bg-[#7D867D33] cursor-not-allowed;
}
.i-counter__btn:nth-of-type(2):disabled .i-counter__btn-icon {
  @apply bg-[#7d867d];
}
.i-counter__btn-icon {
  @apply bg-[#7dba28] rounded-full;
}
.i-counter__value {
  @apply bg-white w-full h-full rounded-sm text-base font-semibold leading-130 outline-none text-center border border-transparent focus:border-red transition duration-300;
}
.error {
  @apply border border-solid border-[#fd5757];
}
.readonly {
  @apply relative before:w-full before:h-full before:bg-transparent before:z-10 before:absolute before:top-0 before:left-0;
}
</style>
