<template>
  <div class="flex">
    <template v-for="i in 5" :key="5">
      <span
        v-if="rate === i - getDecimal(rate) && getDecimal(rate) > 0"
        :class="starClass"
        class="icon-star-half"
        ><span class="path1"></span><span class="path2"></span
      ></span>
      <span
        v-else-if="rate >= i"
        :class="starClass"
        class="icon-star text-yellow"
      ></span>
      <span v-else :class="starClass" class="icon-star text-gray-300"></span>
    </template>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  rate?: number
  starClass?: string
}
withDefaults(defineProps<Props>(), { rate: 3.5 })

const getDecimal = (n: number) => {
  n = n - Math.floor(n)
  return n.toFixed(1)
}
</script>
