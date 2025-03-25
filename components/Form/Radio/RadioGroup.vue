<template>
  <slot>
    <div v-if="items?.length" :class="wrapperClass" class="grid grid-cols-2 gap-x-4">
      <FormRadio
          v-for="(item, index) in items"
          :key="index"
          :disabled="disabled || item.disabled"
          v-model="activeRadio"
          :label="item[labelKey]"
          :value="item[valueKey]"
          :name="radioName"
          :btn-style="itemClass"
          :label-styles="labelStyles"
          :label-active-class="labelActiveClass"
          :border="border"
          :error="error"
      />
    </div>
  </slot>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";

interface Props {
  modelValue: string | number | object
  items: Array<object>
  labelKey?: string
  valueKey?: string
  wrapperClass?: string
  disabled?: boolean
  itemClass?: string
  border?: boolean
  labelStyles?: string
  labelActiveClass?: string
  error?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  wrapperClass: 'flex flex-wrap gap-4',
  labelKey: 'name',
  valueKey: 'id',
  disabled: false,
  itemClass: '',
  labelStyles: ''
})

const activeRadio = ref(props.modelValue)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | object): void
}>()

const radioName = `k-radio-${Math.floor(Math.random() * 1000)}`

const value = ref<string | number | object>([])

watch(
    () => activeRadio.value,
    (newValue) => {
      if (newValue !== value.value) {
        value.value = newValue
      }
      if (!props.disabled) {
        emit('update:modelValue', +value.value)
      }
    }
)
</script>
