<template>
  <header data="header" class="header sticky top-0 w-screen z-40 bg-white">
    <!--  HEADER CONTACT  -->
    <HeaderContact />

    <!--  HEADER MAIN  -->
    <div class="bg-white dark:bg-dark-100 duration-300 py-4 hidden lg:block">
      <div class="container flex items-center justify-between space-x-8">
        <div class="flex items-center flex-grow">
          <CommonLogo
            :dark="false"
            class="mr-6 md:w-[156px] sm:w-[130px] w-[100px]"
          />
          <LazyHeaderBurger
            class="!mr-4 !py-2.5 !px-3"
            :is-active="showMenu"
            @toggle="toggleMenu"
          />
          <HeaderSearch class="flex-grow z-40" :data="searchResult" />
        </div>
        <div class="flex-y-center space-x-8">
          <div class="flex-center space-x-5">
            <div
              class="transition-200 group flex-center flex-col text-gray-100 hover:text-red cursor-pointer"
              v-for="(item, idx) in computedHeaderActions"
              :key="idx"
              @click="headerAction(item?.link, item?.lock)"
            >
              <div class="relative w-7 h-7">
                <i
                  class="icon-box text-[28px] w-7 h-7 text-gray-100 dark:hover:text-red dark:text-gray-300 group-hover:text-red duration-300"
                  v-if="item.name === 'orders'"
                />
                <i
                  v-else
                  :class="item.icon"
                  class="text-[28px] w-7 h-7 text-gray-100 dark:hover:text-red dark:text-gray-300 group-hover:text-red duration-300"
                />
                <span
                  v-if="item.badgeCount"
                  class="absolute -top-1 right-[-6px] h-[17px] bg-red rounded-[21px] text-white shadow-[0_2px_12px_rgba(246,37,89,0.3)] text-[13px] flex-center py-0.5 px-[5.5px]"
                >
                  {{ item.badgeCount }}
                </span>
              </div>
              <span
                class="text-xs leading-130 hidden lg:block text-gray-100 dark:group-hover:text-red dark:text-gray-300 group-hover:text-red duration-300"
              >
                {{ t(item?.title || '') }}
              </span>
            </div>
          </div>

          <transition name="fade" mode="out-in">
            <CommonButton
              v-if="!user"
              text-class="flex-center"
              :text="t('login')"
              class="!py-2.5 !px-5"
              @click="emit('open-auth')"
            >
              <template #pre-icon>
                <i class="icon-login text-2xl mr-1"></i>
              </template>
            </CommonButton>

            <HeaderProfileDropdown v-else @logout="showLogoutModal = true" />
          </transition>
        </div>
      </div>
    </div>

    <!--  MOBILE RESPONSIVE-->
    <LayoutNavigation
      class="block lg:hidden dark:bg-dark-100"
      @open-auth="$emit('open-auth')"
    />
    <!--  MOBILE RESPONSIVE-->
    <!--  CATEGORIES  -->
    <HeaderCategories v-if="showCategories" />

    <!--  MENU  -->
    <div
      class="transition-300 w-screen h-screen header-menu fixed top-[148px] bg-white dark:bg-dark-200 flex-grow z-10 pt-16 pb-6"
      :class="
        showMenu
          ? 'opacity-100 visible translate-y-0 rotate-x-0'
          : 'opacity-0 invisible -translate-y-4 -rotate-x-45'
      "
    >
      <div
        class="overflow-y-auto"
        :style="height ? { height: `${height}px` } : ''"
      >
        <div
          id="catalog"
          class="container grid grid-cols-4 gap-y-[50px] overflow-auto pb-auto"
        >
          <div
            class="h-fit"
            v-for="(category, prentIdx) in categoriesStore.headerCategories"
            :key="prentIdx"
          >
            <NuxtLink
              :to="
                localePath({
                  path: '/products',
                  query: { sections: category?.id, keep: true },
                })
              "
              class="transition-200 font-bold text-xl leading-[120%] inline-block mb-6 text-dark hover:text-red dark:hover:text-red dark:text-white"
              @click="toggleMenu(false)"
            >
              {{ category.title }}
            </NuxtLink>

            <NuxtLink
              v-for="(child, idx) in category.categories"
              :key="idx"
              :to="
                localePath({
                  path: '/products',
                  query: { sections: child?.id, keep: true },
                })
              "
              class="transition-200 font-semibold text-base leading-130 text-dark dark:text-white mb-3 last:mb-0 block dark:hover:text-red hover:text-red hover:translate-x-1"
              @click="toggleMenu(false)"
            >
              {{ child.title }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </header>

  <!--  LOGOUT MODAL  -->
  <CommonModalsLogout
    :show="showLogoutModal"
    @close="showLogoutModal = false"
  />
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import CommonLogo from '../../Common/Logo/Logo.vue'
import { searchResult } from '~/data/temp'
import { useAuthStore } from '~/store/auth'
import { useOrderStore } from '~/store/order'
import { useCategoriesStore } from '~/store/categories'
import { useScroll } from '~/composables/useScroll'
import { useSavedStore } from '~/store/saved'

interface IAddress {
  title: string
  coords: number[]
}

const emit = defineEmits<{
  (e: 'open-auth'): void
}>()

const { t, locale } = useI18n()
const localePath = useLocalePath()
const authStore = useAuthStore()
const orderStore = useOrderStore()
const savedStore = useSavedStore()
const router = useRouter()
const { $event } = useNuxtApp()

const user = computed(() => authStore.user)
const route = useRoute()
const height = ref(0)
const catalogHeight = ref()
const { hideOverflow, showOverflow } = useScroll()

const categoriesStore = useCategoriesStore()
categoriesStore.fetchHeaderCategories()
categoriesStore.fetchHeaderList()

const showMenu = ref(false)
function toggleMenu(newValue: boolean) {
  newValue ? hideOverflow() : showOverflow()
  showMenu.value = newValue
}

const computedHeaderActions = computed(() => headerActions())

const showLogoutModal = ref(false)
const headerAction = (link: string, lock: boolean) => {
  if (!authStore.user && lock) {
    $event('open-required')
  } else {
    router.push(localePath(link))
  }
}
watch(
  () => route.path,
  () => toggleMenu(false)
)
watch(
  () => locale.value,
  () => {
    categoriesStore.fetchHeaderCategories()
    categoriesStore.fetchHeaderList()
  }
)
onMounted(() => {
  if (process.client) {
    window.addEventListener('resize', () => {
      height.value = window.innerHeight - 260
      catalogHeight.value = document.getElementById('catalog')?.clientHeight
    })
    height.value = window.innerHeight - 260
    catalogHeight.value = document.getElementById('catalog')?.clientHeight
  }
})

function headerActions() {
  return [
    {
      name: 'orders',
      icon: 'icon-box',
      title: 'my_orders',
      link: '/my-orders',
      badgeCount: orderStore.ordersTotal,
      lock: true,
    },
    {
      name: 'cart',
      icon: 'icon-basket',
      title: 'basket',
      link: '/basket',
      badgeCount: orderStore.getCartTotal(),
      lock: false,
    },
    {
      name: 'favourites',
      icon: 'icon-heart',
      title: 'favourites',
      link: '/saved',
      badgeCount: savedStore.total,
      lock: false,
    },
  ]
}
const showCategories = computed(() => {
  const routeName = route.name || '';
  return routeName.includes('index') || routeName.startsWith('about');
})
</script>

<style scoped>
header.header {
  filter: drop-shadow(0 8px 44px rgba(56, 56, 56, 0.12));
}
</style>
