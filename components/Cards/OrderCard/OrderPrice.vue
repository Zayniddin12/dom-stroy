<template>
  <div class="flex items-start justify-between w-full">
    <div class="flex-shrink-0">
      <p class="text-red text-xs line-through" v-if="salePrice">
        {{ formatNumber(price) }} UZS
      </p>
      <p class="text-dark font-bold dark:text-white">
        {{ formatNumber(salePrice ? salePrice : price) }} UZS
      </p>
      <div class="mt-1">
        <slot></slot>
      </div>
    </div>
    <div>
      <slot name="delete"></slot>
    </div>
  </div>

  <slot name="counter"></slot>
</template>

<script setup lang="ts">
import { formatNumber } from '~/helpers'

interface Props {
  price: number
  salePrice?: number
}

defineProps<Props>()
</script>
