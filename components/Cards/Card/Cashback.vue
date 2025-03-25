<template>
  <common-block-preloader>
    <div class="container">
      <div
        class="px-8 py-6 rounded-2xl bg-dark-200 bg-[url('/images/bg-cashback.svg')] dark:bg-[url('/images/bg-dark-cashback.svg')] bg-cover bg-center"
      >
        <div>
          <p class="text-2xl font-bold leading-130 text-white">
            {{ $t('balance') }}
          </p>
          <p class="text-orange text-[40px] font-bold">
            {{ formatMoneyDecimal(sum) }} {{ $t('ball') }}
          </p>
        </div>
      </div>
    </div>
  </common-block-preloader>
</template>
<script setup lang="ts">
import { formatMoneyDecimal } from '../../../helpers'

interface Props {
  sum?: boolean
}
defineProps<Props>()
</script>
