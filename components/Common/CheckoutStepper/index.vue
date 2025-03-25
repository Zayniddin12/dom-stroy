<template>
  <div
    class="bg-white dark:bg-dark-100 rounded-[44px] p-4 w-full flex-center-between relative overflow-hidden"
  >
    <span class="h-[2px] w-[16px] absolute bg-red left-0" />
    <template v-for="(item, index) in list" :key="index">
      <div
        class="flex-y-center justify-center p-2 md:py-2.5 md:px-4 md:w-1/3 rounded-[24px] relative !z-1 duration-300 whitespace-nowrap"
        :class="[checkStatus(item.id, step)?.bg]"
      >
        <span
          class="md:mr-1 duration-300 text-[24px] leading-[24px]"
          :class="[checkStatus(item.id, step)?.icon, `icon-${item.icon}`]"
        />
        <p
          class="duration-300 font-semibold leading-130 hidden md:block"
          :class="[checkStatus(item.id, step)?.text]"
        >
          {{ $t(item.title) }}
        </p>
      </div>
      <div
        v-if="list?.length !== index + 1"
        class="h-[2px] w-full md:w-[150px] duration-300"
        :class="[checkStatus(item.id, step)?.line]"
      ></div>
    </template>
  </div>
</template>
<script setup lang="ts">
type TList = {
  title: string
  id: number
  icon: string
}
interface Props {
  step: number
  list: TList[]
}

const props = withDefaults(defineProps<Props>(), {})
const current = ref({
  bg: 'bg-red/10',
  text: 'text-dark !block dark:text-white',
  icon: 'text-red',
  line: 'bg-gray-500',
})
const defaultStyle = ref({
  bg: 'bg-gray-500 dark:bg-dark-300',
  text: 'text-dark dark:text-white',
  icon: 'text-dark dark:text-white',
  line: 'bg-gray-500',
})
const done = ref({
  bg: 'bg-red',
  text: 'text-white',
  icon: 'text-white',
  line: 'bg-red',
})
const checkStatus = (status: number, step: number) => {
  if (status > step) {
    return defaultStyle.value
  } else if (status === step) {
    return current.value
  } else {
    return done.value
  }
}
</script>
