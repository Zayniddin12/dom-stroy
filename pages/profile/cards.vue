<template>
  <div>
    <CardsBlank class="p-5 pr-0">
      <div
        class="pr-5 pb-3 border-b border-solid border-gray-600 flex-center-between dark:border-dark-300"
      >
        <CommonBlockPreloader height="31.2px" width="150px" :loading="loading">
          <p class="text-2xl leading-130 font-bold text-dark dark:text-white">
            {{ $t('my_cards') }}
          </p>
        </CommonBlockPreloader>
        <CommonBlockPreloader width="140px" height="40px" :loading="loading">
          <CommonButton
            :variant="'light'"
            :text="$t('add')"
            class="px-6"
            text-class="flex-y-center gap-1"
            @click="showAdd = true"
          >
            <template #pre-icon>
              <i class="icon-add-circle text-xl" />
            </template>
          </CommonButton>
        </CommonBlockPreloader>
      </div>
      <div class="mt-5">
        <div
          class="grid lg:grid-cols-2 gap-6 pr-5"
          v-if="paymentStore?.cards?.length"
        >
          <CardsCard
            v-for="(item, index) in paymentStore.cards"
            :key="index"
            :card="item"
            v-bind="{ loading }"
            @delete="onDeleteCard(item?.id)"
          />
        </div>
        <CommonNoData
          v-else
          class="py-[147px]"
          img="/images/no-data/cards.svg"
          :title="$t('no_cards')"
          :subtitle="$t('no_cards_text')"
        />
      </div>
    </CardsBlank>
    <CommonModalsCardAdd :show="showAdd" @close="showAdd = false" @submit="" />
    <CommonModalsModal :show="deleteModal" @close="deleteModal = false" inside>
      <div class="p-5">
        <p class="text-xl leading-6 font-bold text-dark dark:text-white">
          {{ $t('delete_card') }}
        </p>
      </div>
      <div class="p-5 pt-1">
        <p class="text-dark text-sm leading-[17px] font-normal dark:text-white">
          {{ $t('delete_card_text') }}
        </p>

        <div class="flex-y-center gap-4 mt-8">
          <CommonButton
            class="w-full"
            variant="light-dark"
            :text="$t('cancel')"
            @click="deleteModal = false"
          />
          <CommonButton
            class="w-full"
            :text="$t('delete')"
            @click="onDeleteAction"
          />
        </div>
      </div>
    </CommonModalsModal>
  </div>
</template>

<script setup lang="ts">
import { usePaymentStore } from '~/store/payment'


const loading = computed(() => paymentStore.loading)
const showAdd = ref(false)
const deleteModal = ref(false)
const cardId = ref()
const onDeleteCard = (id: number) => {
  deleteModal.value = true
  cardId.value = id
}
const onDeleteAction = () => {
  deleteCard(cardId.value)
  deleteModal.value = false
}
const paymentStore = usePaymentStore()
const data = computed(() => paymentStore.cards)
  paymentStore.fetchCards()


const { deleteCard } = useCardController()
</script>
