<template>
  <div>
    <NuxtLoadingIndicator color="#EF7F1A" />
    <NuxtLayout>
      <main class="main">
        <NuxtPage />
      </main>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/auth'
import { checkMobile } from '#imports'
import 'swiper/css'

import { useTheme } from '~/store/useTheme'

const authStore = useAuthStore()
const { data } = await useAsyncData('init', async () => authStore.authInit())

checkMobile()

const storeTheme = useTheme()

storeTheme.initTheme()

// if ('setup' in route.query) {
//   throw new Error('error in setup')
// }
// if ('mounted' in route.query) {
//   onMounted(() => {
//     throw new Error('error in mounted')
//   })
// }
</script>
