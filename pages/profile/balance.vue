<template>
  <div>
    <CardsBlank class="p-5 pr-0">
      <div
        class="pr-5 pb-3 border-b border-solid border-gray-600 flex-center-between dark:border-dark-300"
      >
        <CommonBlockPreloader height="31.2px" width="150px" :loading="loading">
          <p class="text-2xl leading-130 font-bold text-dark dark:text-white">
            {{ $t('your_cashback') }}
          </p>
        </CommonBlockPreloader>
        <CommonBlockPreloader
          v-if="false"
          width="88px"
          height="40px"
          :loading="loading"
        >
          <CommonButton
            :variant="'light'"
            :text="$t('activation')"
            text-class="flex-y-center"
            @click="show = true"
          >
            <template #pre-icon>
              <i class="icon-unread text-2xl" />
            </template>
          </CommonButton>
        </CommonBlockPreloader>
      </div>
      <div class="pr-5 mt-5 flex-center-between">
        <p
          class="text-base leading-130 font-semibold text-dark dark:text-white"
        >
          {{ $t('ur_balance') }}:
        </p>
        <p class="text-2xl font-bold leading-7 text-dark dark:text-white">
          {{ formatMoneyDecimal(authStore?.user?.cashback_balance) }} UZS
        </p>
      </div>
    </CardsBlank>
    <CommonModalsModal :show="show" @close="show = false">
      <div class="p-5">
        <p class="text-xl leading-6 font-bold text-dark dark:text-white">
          {{ $t('activation_bonus') }}
        </p>
      </div>

      <div class="p-5 pt-0">
        <FormGroup :label="$t('promocode')">
          <FormInput
            v-model="promocode"
            v-maska="'### ###'"
            :placeholder="$t('enter_promocode')"
          />
        </FormGroup>
        <CommonButton
          class="w-full mt-6"
          :text="$t('submit')"
          :disabled="promocode.length < 7"
          @click="show = false"
        />
      </div>
    </CommonModalsModal>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

import { formatMoneyDecimal } from '~/helpers'
import { useAuthStore } from '~/store/auth'

const authStore = useAuthStore()

const loading = ref(true)
const promocode = ref('')
const show = ref(false)

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 200)
})

watch(
  () => show.value,
  () => {
    if (!show.value) {
      promocode.value = ''
    }
  }
)
</script>
