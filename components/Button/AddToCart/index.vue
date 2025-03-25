<template>
  <div class="h-full">
    <Transition name="fade" mode="out-in">
      <CommonCounter
        v-if="counter"
        :max="maxCounter"
        :min="1"
        v-model="valueCounter"
        :default-count="1"
        v-bind="{ counterClass }"
        @decrease="decreaseCounter"
      />
      <CommonButton
        v-else
        class="w-full h-full group"
        @click.stop="clickButton"
        v-bind="{ disabled }"
      >
        <template #pre-icon>
          <i class="icon-basket text-2xl  leading-6" />
        </template>
        <span class="text-xs md:text-sm" v-if="disabled">{{
          $t('no_product')
        }}</span>
        <span class="text-xs md:text-sm" v-else>{{ $t(title) }}</span>
      </CommonButton>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { watch } from '#imports'
import { useBasketController } from '~/composables/basketController'

interface Props {
  title?: string
  maxCounter?: number
  counterClass?: string
  id: number
  disabled?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  title: 'add_to_cart',
})
const emit = defineEmits(['submitCount'])
const valueCounter = ref(0)
const counter = ref(false)
function clickButton() {
  valueCounter.value = 1
  counter.value = true
}
function decreaseCounter(num: number) {
  if (!num || num === 0) {
    counter.value = false
    removeFromCart(props.id)
  }
}
watch(
  () => valueCounter.value,
  (newValue) => {
    if (!valueCounter.value) {
      counter.value = false
    }
    emit('submitCount', newValue)
    addToCard(props.id, newValue)
  }
)
const { addToCard, removeFromCart } = useBasketController()
</script>
