<template>
  <FormInput
    :id="id"
    v-model="search"
    :placeholder="placeholder ?? $t('search')"
    class="transition-200 focus-within:!border-dark dark:focus-within:!border-gray-600"
    @focus="$emit('focus')"
    ref="searchInput"
    @focusout="$emit('focusout')"
    @update:modelValue="$emit('update:modelValue', search)"
  >
    <template #prefix>
      <div class="flex-center">
        <i
          class="icon-search-regular text-xl text-gray-100 inline-block pl-2.5"
        />
      </div>
    </template>
    <template #suffix>
      <Transition name="fade" mode="out-in">
        <button
          :key="loading"
          class="input-clear-btn transition-200 flex-center text-gray-100 hover:text-red opacity-0 invisible group"
          :class="{
            '!opacity-100 !visible': search.length > 0,
            'pointer-events-none': loading,
          }"
          @click="clearSearch"
        >
          <span
            v-if="!loading"
            class="icon-close-circle-colored transition-200 text-xl inline-block pr-2.5"
          >
            <span class="path1"></span>
            <span class="path2"></span>
          </span>
          <svg
            v-else
            class="animate-spin -ml-1 mr-3 h-4 w-4 text-red"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </button>
      </Transition>
    </template>
  </FormInput>
</template>

<script lang="ts" setup>
const { t } = useI18n()
export interface Props {
  placeholder?: string
  loading?: boolean
  id?: string
}
defineProps<Props>()

const emit = defineEmits<{
  (e: 'clear'): void
  (e: 'focus'): void
  (e: 'focusout'): void
  (e: 'update:modelValue', value: string): void
}>()

const search = ref('')
const searchInput = ref()

function clearSearch() {
  search.value = ''
  emit('clear')
}

defineExpose({ clearSearch, searchInput })
</script>

<style scoped>
.input-clear-btn .icon-close-circle-colored span:before {
  transition: all 0.2s ease-in-out;
}

.input-clear-btn:hover .icon-close-circle-colored .path1:before,
.input-clear-btn:hover .icon-close-circle-colored .path2:before {
  color: #0b0a67;
}
</style>
