<template>
  <Transition name="fade" mode="out-in">
    <CardsBlank :key="loading" class="!p-5">
      <transition name="fade" mode="out-in">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <template v-if="loading">
            <CardsInstructionLoader v-for="i in 6" :key="i" loading />
          </template>
          <template v-else-if="!loading && data.length">
            <CardsInstruction
              v-for="(item, index) in data"
              :key="index"
              :card="item"
            />
          </template>
          <template v-else>
            <CommonNoData
              class="py-[147px]"
              img="/images/no-data/products.svg"
              :title="$t('no_cards')"
              :subtitle="$t('no_cards_text')"
            />
          </template>
        </div>
      </transition>
    </CardsBlank>
  </Transition>
</template>

<script setup lang="ts">
import { useFetcher } from '~/composables/fetcher'
import NoData from '~/components/Common/NoData/NoData.vue'

const data = ref()

const loading = ref(true)
const getInstruction = () => {
  useFetcher('settings/instructions/')
    .then((res: any) => {
      data.value = res?.data?.results
    })
    .finally(() => {
      loading.value = false
    })
}
getInstruction()
</script>
