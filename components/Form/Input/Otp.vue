<template>
  <div class="flex space-x-4">
    <input
      v-for="index in digits"
      :key="index"
      type="number"
      maxlength="1"
      :class="[context.classes?.digit, { 'border !border-red-500': error }]"
      :value="tmp[index - 1] || ''"
      @input="handleInput(index - 1, $event)"
      @focus="handleFocus"
      @paste="handlePaste"
      :data="`otp-data-id-${index}-${uuid}`"
      @keydown.delete="handleDelete(index - 1, $event)"
      class="text-center focus:outline-none focus-visible:orange"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { generateUniqueId } from '~/helpers'

interface Props {
  context?: object
  error: boolean
}
const props = withDefaults(defineProps<Props>(), {
  context: {
    digits: 6,
    node: {
      input(i: number) {
        return i
      },
    },
    classes: {
      digit:
        'w-11 h-11 rounded-xl py-2.5 px-4 border border-dark !ml-1.5 md:ml-4 dark:text-white dark:bg-[#ffffff1a]',
    },
  },
})
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'submit'): void
}>()

const digits = Number(props.context?.digits)
const tmp = ref(props.context?.value || '')

const uuid = generateUniqueId()

/**
 * Handle input, advancing or retreating focus.
 */
function handleInput(index, e) {
  const value = e.target.value

  if (value) {
    const updatedTmp = tmp.value.split('')
    updatedTmp[index] = value
    tmp.value = updatedTmp.join('')

    // Move focus to the next input if not the last digit
    if (index < digits - 1) {
      const inputs = e.target.parentElement.querySelectorAll('input')
      inputs.item(index + 1)?.focus()
    }

    // If all digits are filled, emit submit event
    if (tmp.value.length === digits) {
      emit('submit')
    }

    emit('update:modelValue', tmp.value)
  }
}

/**
 * Handle deletion of a character, moving focus backward.
 */
function handleDelete(index, e) {
  if (e.key === 'Backspace') {
    const updatedTmp = tmp.value.split('')
    updatedTmp[index] = '' // Clear the current value
    tmp.value = updatedTmp.join('')

    // Focus previous input if not the first one
    if (index > 0) {
      const inputs = e.target.parentElement.querySelectorAll('input')
      inputs.item(index - 1)?.focus()
    }

    emit('update:modelValue', tmp.value)
  }
}

/**
 * On focus, select the text in our input.
 */
function handleFocus(e) {
  e.target.select()
}

/**
 * Handle the paste event.
 */
function handlePaste(e) {
  const paste = e.clipboardData.getData('text')
  if (typeof paste === 'string') {
    // Paste only up to the number of digits allowed
    tmp.value = paste.substr(0, digits)

    const inputs = e.target.parentElement.querySelectorAll('input')
    for (let i = 0; i < tmp.value.length; i++) {
      inputs.item(i).value = tmp.value[i]
    }

    // Focus on the last character after paste
    inputs.item(tmp.value.length - 1)?.focus()

    emit('update:modelValue', tmp.value)
    if (tmp.value.length === digits) {
      emit('submit')
    }
  }
}

onMounted(() => {
  const otpInput = document.querySelector(
    `[data='otp-data-id-1-${uuid}']`
  ) as HTMLInputElement
  otpInput?.focus()
})
</script>