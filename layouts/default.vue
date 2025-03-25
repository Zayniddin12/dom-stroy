<template>
  <div>
    <div class="flex flex-col justify-between min-h-screen">
      <div class="grow-[1] bg-gray-600 dark:bg-dark-200">
        <LayoutHeader @open-auth="show = true" />
        <div>
          <slot />
        </div>
      </div>
      <LayoutFooter @open-auth="openAuth" class="bg-white" />
    </div>
    <Transition name="fade">
      <CommonLoader v-if="loading" />
    </Transition>
    <CardsOffline v-if="false" />
    <CommonModalsAuthModal
      v-bind="{ show }"
      @close="show = false"
      :component-layout-prop="layoutText"
    />
    <CommonModalsAuthRequired
      :show="authRequiredShow"
      @close="authRequiredShow = false"
      inside
    />
  </div>
</template>
<script setup lang="ts">
import { useOrderStore } from '~/store/order'
import { useSavedStore } from '~/store/saved'
import { useCommonStore } from '~/store/common'
import { useAuthStore } from '~/store/auth'
import { useCategoriesStore } from '~/store/categories'

const { $event, $listen } = useNuxtApp()
const show = ref(false)
const authRequiredShow = ref(false)
const loading = ref(true)
const orderStore = useOrderStore()
const savedStore = useSavedStore()
const authStore = useAuthStore()
const categoriesStore = useCategoriesStore()
const isOffline = ref(false)
const layoutText = ref('login')
await useAsyncData<any, any>(async () => {
  // await categoriesStore.fetchHeaderCategories()
  // await categoriesStore.fetchHeaderList()
  await categoriesStore.fetchFooterList()
})
onMounted(() => {
  isOffline.value = !navigator.onLine

  if (process.client) {
    window.addEventListener('offline', () => {
      isOffline.value = true
      document.body.style.overflowY = 'hidden'
    })
    window.addEventListener('online', () => {
      document.body.style.overflowY = 'auto'
      isOffline.value = false
    })
  }
  setTimeout(() => {
    loading.value = false
  }, 900)
  orderStore.fetchCartProducts()
  savedStore.fetchSavedProducts()
  // categoriesStore.fetchHeaderCategories()
  // categoriesStore.fetchHeaderList()
  if (authStore.user) {
    orderStore.fetchOrders(1)
  }
})

const openAuth = (e: string) => {
  show.value = true
  layoutText.value = e
}

$listen('open-auth', (user) => {
  authRequiredShow.value = false
  setTimeout(() => {
    return openAuth(user)
  }, 200)
})

$listen('open-required', () => {
  authRequiredShow.value = true
})

// Items
const commonStore = useCommonStore()
commonStore.fetchContacts()
</script>
