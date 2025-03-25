<template>
    <div class="dark:bg-dark-200">
      <div class="container profile">
        <CommonBreadcrumb v-bind="{ routes }" />
        <h1 class="mt-8 text-3xl leading-130 font-bold text-dark dark:text-white">
          {{ $t('profile') }}
        </h1>
        <div class="grid md:grid-cols-12 gap-6 my-6">
          <div class="w-full col-span-8 md:col-span-4">

            <CommonIsMaster />



            <CardsBlank class="!p-4 dark:bg-dark-100">
              <div class="flex-y-center gap-4">
                <CommonAvatar
                    class="shrink-0"
                    :image="user?.avatar_src?.small"
                />
                <CommonBlockPreloader height="26px" width="150px">
                  <p
                      class="text-xl font-bold leading-130 text-dark dark:text-white"
                      style="word-break: break-word"
                  >
                    {{ user?.full_name }}
                  </p>
                </CommonBlockPreloader>
              </div>
              <div class="h-px w-full bg-gray-500 my-5 dark:dark:bg-dark-300 transition dark:duration-300"/>
              <TabsTabItem
                  :tab="{
                  id: 1,
                  name: 'personal_detail',
                  icon: 'user-rounded',
                  link: { name: 'profile', path: '/profile' },
                }"
                  class="mb-2"
              />
              <div class="flex flex-col gap-2 instruction_tab">
                <TabsTabItem
                    v-for="(tab, index) in tabList"
                    :key="index"
                    v-bind="{ tab }"
                />
              </div>
              <div class="h-px w-full bg-gray-500 my-3 dark:dark:bg-dark-300 transition dark:duration-300" />
              <div class="flex flex-col gap-2 instruction_tab">
                <TabsTabItem
                    v-for="(tab, index) in tabListSecond"
                    :key="index"
                    v-bind="{ tab }"
                />
              </div>
            </CardsBlank>
          </div>
          <div class="w-full col-span-8">
            <transition name="profile-page-change" mode="out-in">
              <div :key="$route.name">
                <NuxtPage />
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { tabList, tabListSecond } from '~/config/profile'
import { useAuthStore } from '~/store/auth'
const authStore = useAuthStore()
const user = computed(() => authStore.user)

definePageMeta({
  middleware: ['auth'],
})

const { t: $t } = useI18n()

const routes = [
  {
    name: $t('main'),
    route: '/',
  },
  {
    name: $t('profile'),
  },
]

useHead({
  title: $t('profile'),
})
</script>

<style>
.instruction_tab .router-link-active {
  @apply bg-red bg-opacity-10;
}

.instruction_tab .router-link-active .card-icon {
  @apply bg-red;
}

.instruction_tab .router-link-active:hover .card-icon i {
  @apply !text-white;
}

.instruction_tab .router-link-active:hover .card-icon svg path {
  @apply !fill-white;
}
</style>
