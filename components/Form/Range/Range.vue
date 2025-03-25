<template>
  <div class="">
    <label>
      <p>
        <span :class="labelClass">{{ label }}</span>
        <span class="text-sm text-gray-200 font-normal leading-125 ml-0.5">
          ({{ curreny }})
        </span>
      </p>
      <div class="flex items-center justify-between space-x-[6px] mt-[6px]">
        <div class="">
          <p
            class="text-sm text-gray-100 dark:text-gray-300 transition-300 font-normal leading-130 mb-1"
          >
            {{ $t('from') }}
          </p>
          <FormInput
            class="bg-gray-500"
            v-model="value[0]"
            v-maska="moneyMask()"
            placeholder="0"
            maxlength="15"
            :error="!priceValidation"
          />
        </div>
        <div class="inline-block w-4 h-0.5 bg-gray-200 rounded-[1px] mt-6" />
        <div class="">
          <p
            class="text-sm text-gray-100 dark:text-gray-300 transition-300 font-normal leading-130 mb-1"
          >
            {{ $t('to') }}
          </p>
          <FormInput
            class="bg-gray-500"
            v-model="value[1]"
            v-maska="moneyMask()"
            placeholder="0"
            maxlength="15"
            :error="!priceValidation"
          />
        </div>
      </div>
    </label>
  </div>
</template>

<script setup lang="ts">
import { ref, unref } from 'vue'
import { moneyMask, removeSpaces } from '~/helpers'

interface Props {
  label?: string
  curreny?: string
  modelValue: string[]
  labelClass?: string
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: () => ['', ''],
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void
}>()

const value = ref<string[]>(unref(props.modelValue))

const isValidPrice = (val: string[]) => {
  const gte = removeSpaces(val[0])
  const lte = removeSpaces(val[1])
  if (!val) {
    return true
  }
  if (val.length === 0) {
    return true
  }
  if (gte?.length === 0 && lte?.length === 0) {
    return true
  }
  if (gte?.length > 0 && lte?.length === 0) {
    return true
  }
  if (gte?.length === 0 && lte?.length > 0) {
    return true
  }

  return gte?.length > 0 && lte?.length > 0 && +gte < +lte
}

const priceValidation = computed(() => isValidPrice(value.value))

watch(
  () => value.value,
  (newValue) => {
    if (+newValue[0] < +newValue[1]) {
      emit('update:modelValue', newValue)
    }
  },
  {
    deep: true,
  }
)

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue?.length > 0) {
      value.value = newValue
    }
  }
)
</script>
