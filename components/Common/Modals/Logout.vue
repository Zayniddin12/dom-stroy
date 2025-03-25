<template>
  <CommonModalsModal v-bind="{ show }" @close="$emit('close')" inside>
    <div class="p-5">
      <p class="text-xl leading-6 font-bold text-dark dark:text-white">
        {{ $t('log_out_from_account') }}
      </p>
    </div>
    <div class="p-5 pt-1">
      <p class="text-dark text-sm leading-[17px] font-normal dark:text-white">
        {{ $t('log_out_from_account_text') }}
      </p>

      <div class="flex-y-center gap-4 mt-8">
        <CommonButton
            class="w-full"
            variant="light"
            :text="$t('cancel')"
            @click="emit('close')"
        />
        <CommonButton class="w-full" :text="$t('log_out')" @click="logOut"/>
      </div>
    </div>
  </CommonModalsModal>
</template>

<script setup lang="ts">
import {useAuthStore} from '~/store/auth'
import {useRouter} from 'vue-router'
import {useOrderStore} from "~/store/order";
import {useSavedStore} from "~/store/saved";

const orderStore = useOrderStore()
const savedStore = useSavedStore()

interface Props {
  show: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const authStore = useAuthStore()
const router = useRouter()
const localePath = useLocalePath()

const logOut = () => {
  authStore.logOut()
  emit('close')
  if (['/profile', '/my-orders', '/checkout'].includes(router?.currentRoute?.value?.path)) {
    router.push(localePath('/'))
  }
  setTimeout(() => {
    orderStore.fetchCartProducts()
    orderStore.ordersTotal = 0
    savedStore.fetchSavedProducts()
  }, 100)
}
</script>
