<template>
  <header>
    <div
      class="container flex items-center pt-6"
      :class="showMenu ? 'pb-6' : 'pb-4'"
    >
      <ResponsiveBurger
        class="responsive__burger"
        :is-active="showMenu"
        @toggle="toggleMenu"
      />

      <div
        class="!flex !justify-between items-center w-full"
        :class="
          showMenu
            ? ' opacity-0 invisible -translate-y-4 -rotate-x-45 !hidden'
            : 'opacity-100 visible translate-y-0 rotate-x-0 !block'
        "
      >
        <CommonLogo class="lg:!w-[76px] lg:!h-[35px] block" />
        <div class="flex-center space-x-3">
          <div
            class="transition-200 group flex-center flex-col text-gray-100 hover:text-red cursor-pointer"
            v-for="(item, idx) in computedHeaderActions"
            :key="idx"
            @click="headerAction(item.link, item.lock)"
          >
            <div class="relative w-7 h-7">
              <i
                class="icon-box text-[28px] w-7 h-7 text-gray-100 dark:hover:text-red dark:text-gray-300 hover:text-red duration-300"
                v-if="item.name === 'orders'"
              >
              </i>
              <i
                v-else
                :class="item.icon"
                class="text-[28px] w-7 h-7 text-gray-100 dark:hover:text-red dark:text-gray-300 hover:text-red duration-300"
              />
              <span
                v-if="item.badgeCount"
                class="absolute -top-1 right-[-6px] h-[17px] bg-red rounded-[21px] text-white shadow-[0_2px_12px_rgba(246,37,89,0.3)] text-[13px] flex-center py-0.5 px-[5.5px]"
              >
                {{ item.badgeCount }}
              </span>
            </div>
            <span class="text-xs leading-130 hidden lg:block">
              {{ t(item?.title || '') }}
            </span>
          </div>
          <!--          <HeaderSearch class="flex-grow z-40" :data="searchResult" />-->
        </div>
      </div>
      <!--      burger open state -->
      <div
        :class="
          showMenu
            ? ' opacity-100 visible block translate-y-0 rotate-x-0 w-full'
            : 'opacity-0 hidden invisible -translate-y-4 rotate-x-45'
        "
      >
        <div class="!flex items-center space-x-4 !justify-between">
          <CommonSocials :data="socials" />
          <CommonLanguageSwitcher class="!p-0 w-max" />
        </div>
      </div>
      <!--      burger open state -->
    </div>
    <HeaderSearch
      :class="
        showMenu
          ? ' opacity-0 invisible -translate-y-4 -rotate-x-45 !hidden'
          : 'opacity-100 visible translate-y-0 rotate-x-0 !block'
      "
      class="flex-grow z-40 container pb-4"
      :data="searchResult"
    />
    <!--  MENU  -->
    <div
      class="transition-300 w-screen h-screen header-menu fixed top-[70px] bg-white flex-grow pt-8 pb-6 !z-[-1] dark:bg-dark-200"
      :class="
        showMenu
          ? 'opacity-100 visible translate-y-0 rotate-x-0'
          : 'opacity-0 invisible -translate-y-4 -rotate-x-45'
      "
    >
      <div
        class="container flex flex-col h-[80dvh] justify-between overflow-y-auto"
      >
        <div>
          <transition name="fade" mode="out-in">
            <CommonButton
              v-if="!user"
              text-class="flex-center"
              :text="t('login')"
              class="!px-5 !py-2.5 mb-5"
              @click="emit('open-auth')"
            >
              <template #pre-icon>
                <i class="icon-login text-2xl mr-1"></i>
              </template>
            </CommonButton>
            <HeaderProfileDropdown v-else @logout="showLogoutModal = true" />
          </transition>

          <div
            class="overflow-y-auto"
            :style="height ? { height: `${height}px` } : ''"
          >
            <div id="catalog" class="flex-col flex">
              <HeaderDropdown
                v-for="(
                  category, parentIdx
                ) in categoriesStore.headerCategories"
                :key="parentIdx"
                @focusout="toggleDropDown(parentIdx, false)"
                @click="toggleDropDown(parentIdx, !dropDownActive[parentIdx])"
              >
                <template #head>
                  <div
                    class="flex justify-between items-center w-full text-left overflow-hidden"
                  >
                    <div
                      class="transition-200 leading-[150%] !font-semibold !text-dark dark:!text-white !text-base hover:text-red my-3"
                    >
                      {{ category.title }}
                    </div>
                    <span
                      class="icon-chevron-down transition-200 inline-block text-xl ml-1 transform text-dark group-hover:text-red dark:text-white"
                      :class="[
                        dropDownActive[parentIdx]
                          ? '!-rotate-180 !text-red'
                          : '',
                      ]"
                    ></span>
                  </div>
                </template>
                <NuxtLink
                  v-for="(child, idx) in category.categories"
                  :key="idx"
                  :to="
                    localePath({
                      path: '/products',
                      query: { sections: child?.id, keep: true },
                    })
                  "
                  class="transition-200 font-normal text-sm leading-130 text-dark dark:text-white !mb-3 last:mb-0 block hover:text-red overflow-hidden hover:translate-x-1"
                  @click="toggleMenu(!true)"
                >
                  {{ child.title }}
                </NuxtLink>
              </HeaderDropdown>
            </div>
          </div>
        </div>
        <ul class="text-semibold grid gap-2 mt-5">
          <li>
            <a
              :href="`tel:${commonStore.contacts?.phone}`"
              class="flex items-center group space-x-1"
            >
              <i
                class="icon-incoming-call transition-200 text-gray-300 text-2xl inline-block group-hover:text-red"
              />
              <span
                class="transition-200 text-xs leading-130 text-gray-100 dark:text-gray-300 group-hover:text-red"
              >
                {{ formattedPhone }}
              </span>
            </a>
          </li>
          <li>
            <a
              :href="computedAddress"
              target="_blank"
              class="flex items-center group space-x-1"
            >
              <i
                class="icon-map-square transition-200 text-gray-300 text-2xl inline-block group-hover:text-red"
              />
              <span
                class="transition-200 text-xs leading-130 text-gray-100 dark:text-gray-300 group-hover:text-red"
              >
                {{ commonStore.contacts?.address }}
              </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <CommonModalsLogout
      :show="showLogoutModal"
      @close="showLogoutModal = false"
    />
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useOrderStore } from '~/store/order'
import { useSavedStore } from '~/store/saved'
import { useAuthStore } from '~/store/auth'
import CommonLogo from '~/components/Common/Logo/Logo.vue'
import { useScroll } from '~/composables/useScroll'
import ResponsiveBurger from '~/components/Layout/Header/ResponsiveBurger.vue'
import { useCategoriesStore } from '~/store/categories'
import { useCommonStore } from '~/store/common'
import { formatPhoneNumber } from '~/helpers'
import { searchResult } from '~/data/temp'

const { $event } = useNuxtApp()
const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const orderStore = useOrderStore()
const savedStore = useSavedStore()

const { t, locale } = useI18n()
const localePath = useLocalePath()
const height = ref(0)
const showLogoutModal = ref(false)
const dropDownActive = ref(false)
const user = computed(() => authStore.user)

const commonStore = useCommonStore()

const formattedPhone = computed(() => {
  return formatPhoneNumber(commonStore?.contacts?.phone || '')
})

function toggleDropDown(parentIdx, isActive) {
  dropDownActive.value = {
    ...dropDownActive.value,
    [parentIdx]: isActive,
  }
}

const computedAddress = computed(() => {
  return `https://yandex.ru/maps/?ll=${commonStore?.contacts?.latitude},${commonStore?.contacts?.longitude}&z=18`
})

const categoriesStore = useCategoriesStore()
categoriesStore.fetchHeaderCategories()
categoriesStore.fetchHeaderList()

const computedHeaderActions = computed(() => headerActions())

const emit = defineEmits<{
  (e: 'open-auth'): void
}>()
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
const socials = computed(() => [
  {
    name: 'facebook',
    link: commonStore.contacts?.facebook,
    icon: 'icon-facebook-square',
  },
  {
    name: 'instagram',
    link: commonStore.contacts?.instagram,
    icon: 'icon-instagram-square',
  },
  {
    name: 'telegram',
    link: commonStore.contacts?.telegram,
    icon: 'icon-telegram-square',
  },
])
const headerAction = (link: string, lock: boolean) => {
  if (!authStore.user && lock) {
    $event('open-required')
  } else {
    router.push(localePath(link))
  }
}
const showMenu = ref(false)
function toggleMenu(newValue: boolean) {
  newValue ? hideOverflow() : showOverflow()
  showMenu.value = newValue
}

const { hideOverflow, showOverflow } = useScroll()
watch(
  () => locale.value,
  () => {
    categoriesStore.fetchHeaderCategories()
    categoriesStore.fetchHeaderList()
  }
)

watch(
  () => route.path,
  () => {
    showMenu.value = false
  }
)
</script>

<style scoped>
ul {
  position: relative !important;
}
.responsive__burger {
  padding: 0 !important;
  margin-right: 20px !important;
}
</style>
