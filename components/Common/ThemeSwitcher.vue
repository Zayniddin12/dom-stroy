<template>
  <div
    class="relative transition-300 w-11 h-6 rounded-full bg-red/20 cursor-pointer p-0.5 dark:bg-white/25"
    @click="setTheme"
  >
    <div
      class="absolute w-5 h-5 transition-300  shadow-switcher rounded-full flex items-center justify-center"
      :class="[theme === 'light' ? 'left-0.5 bg-red' : 'left-[1.35rem] bg-white']"
    >
      <Transition name="scale-fade" mode="out-in">
        <span
          :key="theme"
          :class="theme === 'light' ? 'icon-sun text-white' : 'icon-moon'"
          class="text-xs"
        />
      </Transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useTheme } from '~/store/useTheme'

const storeTheme = useTheme()

const theme = computed(() => storeTheme?.theme)
interface Emits {
  (e: 'change-theme', theme: string): void
}
const $emit = defineEmits<Emits>()

const setTheme = () => {
  storeTheme.changeTheme()
  $emit('change-theme', storeTheme.theme)
}

onMounted(() => {
  $emit('change-theme', storeTheme.theme)
})
</script>
