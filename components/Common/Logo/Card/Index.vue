<template>
  <div class="flex-center gap-2">
    <CommonBlockPreloader v-bind="{ loading }" width="20px" height="20px">
      <div
        v-if="image"
        class="h-6 w-6 p-0.5 bg-white pointer-events-none rounded border border-solid border-gray-300"
        :class="iconClass"
      >
        <img v-if="image" class="w-full h-full object-contain" :src="image" alt="" />
      </div>
    </CommonBlockPreloader>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import { GlobalConfig } from '~/config/global-config'

interface Props {
  number: string | undefined
  iconClass?: string | []
  loading?: boolean
}
const props = withDefaults(defineProps<Props>(), {})

let image = computed(() => {
  let paymentSystem: string = String(props.number)
    .split('')
    .slice(0, 4)
    .join('')
  let systems = GlobalConfig.paymentSystems
  const logo = systems[paymentSystem as keyof typeof systems]
  return logo
    ? `/images/cards/${
        systems[paymentSystem as keyof typeof systems]
      }-small.svg`
    : undefined
})
</script>
