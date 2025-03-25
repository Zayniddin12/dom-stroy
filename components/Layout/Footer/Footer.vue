<template>
  <div class="flex flex-col bg-white dark:bg-dark">
    <div class="border-t-4 border-red py-4 md:py-9">
      <!--    gray section-->
      <div class="mx-4">
        <div
          class="container mx-auto bg-gray-600 dark:bg-dark-300 duration-300 rounded-2xl p-4 flex items-center justify-between"
        >
          <div
            class="w-full flex md:items-center justify-center md:justify-between flex-wrap gap-x-4 gap-y-2"
          >
            <div
              class="flex w-full md:w-auto justify-center md:justify-between items-start md:items-end flex-col md:flex-row gap-y-2"
            >
              <div class="flex items-center justify-between w-full md:w-auto">
                <CommonLogo :dark="false" class="max-w-[90px] md:w-auto" />
              </div>
              <div class="!ml-0 md:hidden">
                <div class="flex items-center justify-around gap-4">
                  <div class="relative group">
                    <CommonAppLink
                      :url="GlobalConfig.appsLinks.appStore"
                      provider="apple"
                    />
                    <CommonTooltip
                      v-if="!GlobalConfig.appsLinks.appStore"
                      class="!-top-5"
                      >{{ $t('soon') }}
                    </CommonTooltip>
                  </div>
                  <div class="relative group">
                    <CommonAppLink
                      :url="GlobalConfig.appsLinks.googlePlay"
                      provider="google"
                    />
                    <CommonTooltip
                      v-if="!GlobalConfig.appsLinks.appStore"
                      class="!-top-5"
                      >{{ $t('soon') }}
                    </CommonTooltip>
                  </div>
                </div>
              </div>
              <div
                v-if="commonStore.contacts?.phone"
                class="flex items-center md:ml-8 group justify-center"
              >
                <!--here phone icon-->
                <span
                  class="icon-phone-calling text-[28px] text-gray-200 duration-300 group-hover:text-red"
                ></span>
                <a
                  :href="`tel:${commonStore.contacts?.phone}`"
                  class="ml-3 text-dark-200 dark:text-white font-normal text-base leading-140 duration-300 group-hover:text-red"
                >
                  {{ formattedPhone }}</a
                >
              </div>
              <div
                v-if="commonStore.contacts?.email"
                class="flex items-center md:ml-8 group justify-center"
              >
                <span
                  class="icon-letter-regular text-[28px] text-gray-200 duration-300 group-hover:text-red"
                ></span>
                <a
                  :href="`mailto:${commonStore.contacts?.email}`"
                  class="ml-3 text-dark-200 dark:text-white font-normal text-base leading-140 duration-300 group-hover:text-red"
                >
                  {{ commonStore.contacts?.email }}</a
                >
              </div>
            </div>
            <div class="mt-4 !ml-0 md:mt-0 hidden md:block">
              <div class="flex items-center justify-around gap-4">
                <div class="relative group">
                  <CommonAppLink
                    :url="GlobalConfig.appsLinks.appStore"
                    provider="apple"
                  />
                  <CommonTooltip
                    v-if="!GlobalConfig.appsLinks.appStore"
                    class="!-top-5"
                    >{{ $t('soon') }}
                  </CommonTooltip>
                </div>
                <div class="relative group">
                  <CommonAppLink
                    :url="GlobalConfig.appsLinks.googlePlay"
                    provider="google"
                  />
                  <CommonTooltip
                    v-if="!GlobalConfig.appsLinks.appStore"
                    class="!-top-5"
                    >{{ $t('soon') }}
                  </CommonTooltip>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="container mx-auto px-0 sm:grid sm:grid-cols-4 lg:space-x-[100px] items-center pt-4 md:pt-8"
        >
          <div
            class="sm:col-span-4 lg:col-span-2 flex sm:flex-row items-start md:space-x-[60px] footer__links justify-between"
          >
            <div
              v-for="(item, index) in footerLinks"
              :key="index"
              class="footer__links-items"
            >
              <div>
                <h4
                  v-if="!item.checkUser"
                  class="text-dark font-semibold text-base leading-125 mb-3 mt-3 lg:mt-0"
                >
                  {{ item?.title }}
                </h4>
                <ul v-if="!item.checkUser" class="flex flex-col">
                  <li
                    v-for="(link, index) in item?.items"
                    :key="index"
                    class="text-dark font-semibold text-base leding-140 my-1"
                  >
                    <nuxt-link
                      v-if="!link?.emit"
                      :to="getLocalePath(link?.path)"
                      class="text-gray-200 block font-semibold text-sm leading-130 duration-300 hover:text-red hover:translate-x-2"
                    >
                      {{ link?.title }}
                    </nuxt-link>
                    <span
                      v-else
                      @click="emit(link?.emit, link?.value)"
                      class="text-gray-200 block font-semibold text-sm leading-130 duration-300 hover:text-red cursor-pointer"
                    >
                      {{ link?.title }}
                    </span>
                  </li>
                </ul>
              </div>
              <div class="mt-3" v-if="index === footerLinks.length - 1">
                <p class="mb-3 text-base font-semibold text-dark leading-125">
                  {{ $t('our') }}
                </p>
                <CommonSocials :data="socials" />
              </div>
            </div>
          </div>
          <div
            class="col-span-4 lg:col-span-2 flex md:justify-center items-start"
          >
            <div
              class="bg-gray-600 dark:bg-dark-300 duration-300 rounded-2xl p-5 mt-5 lg:mt-0 flex flex-wrap md:flex-nowrap md:space-x-[60px] items-center justify-center"
            >
              <div class="flex flex-col">
                <h4
                  class="text-dark dark:text-white font-bold text-base md:text-xl leading-140 duration-300"
                >
                  {{ $t('be_in_our_tg') }}
                </h4>
                <a
                  :href="commonStore.contacts?.telegram"
                  class="w-full mt-3 bg-[#2684FC] bg-opacity-[8%] rounded-[10px] p-3 flex items-center duration-300 border border-transparent group hover:border hover:border-blue"
                >
                  <img
                    src="/images/telegram.svg"
                    class="w-6 h-6"
                    alt="telegram"
                  />
                  <h4
                    class="ml-2 text-dark dark:text-white font-semibold text-base duration-300 group-hover:text-blue leading-130"
                  >
                    {{ $t('contact_with_tg') }}
                  </h4>
                </a>
              </div>
              <img
                src="/images/send-light.png"
                class="send-img max-w-[90px] mt-[24px] md:mt-0 w-full h-full dark:hidden"
                alt="send"
              />
              <img
                src="/images/send.png"
                class="send-img max-w-[90px] mt-[24px] md:mt-0 w-full h-full hidden dark:block"
                alt="send"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mx-auto w-full pt-5 dark:bg-dark-300 duration-300 bg-gray-600">
      <div class="mx-4">
        <div
          class="container px-0 flex items-center justify-between md:space-x-4"
        >
          <div
            class="w-full flex md:items-end items-baseline flex-col md:flex-row justify-between"
          >
            <h4
              class="text-dark dark:text-white duration-300 font-semibold text-sm leading-130"
            >
              <span>{{ $t('bonasera') }}</span>
              {{ currentYear }}. {{ $t('all_rights_reserved') }}
            </h4>
            <div class="hidden md:block m-3 md:m-0">
              <div v-if="!isDarkMode" class="flex items-end">
                <CommonLogoUicLogo
                  secondary-color="black"
                  container-class="flex items-end"
                />
              </div>
              <div v-else class="flex items-end">
                <CommonLogoUicLogo main-color="white" secondary-color="white" />
              </div>
            </div>
            <NuxtLink
              :to="localePath('/pages/terms-of-use')"
              class="text-dark dark:text-white font-semibold text-sm leading-130 duration-300 hover:text-red mt-3 md:mt-0 dark:hover:text-orange"
            >
              {{ $t('privacy_policy') }}
            </NuxtLink>
          </div>
          <div class="md:hidden my-3 mx-3 md:m-0">
            <CommonLogoUicLogo main-color="dark:!bg-red-500 dark:!text-white" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useAuthStore } from '~/store/auth'
import { useCategoriesStore } from '~/store/categories'
import { formatPhoneNumber } from '~/helpers'
import { useCommonStore } from '~/store/common'
import { useI18n } from 'vue-i18n'
import { GlobalConfig } from '~/config/global-config'

const commonStore = useCommonStore()
const categoriesStore = useCategoriesStore()

const { t: $t } = useI18n()

const currentYear = new Date().getFullYear()
const localePath = useLocalePath()
const authStore = useAuthStore()
const emit = defineEmits<{
  (e: 'open-auth', value: string): void
}>()
const formattedPhone = computed(() => {
  return formatPhoneNumber(commonStore?.contacts?.phone || '')
})

const isDarkMode = ref(false)

const checkDarkMode = () => {
  isDarkMode.value = document.documentElement.classList.contains('dark')
}

onMounted(() => {
  checkDarkMode()

  const observer = new MutationObserver(() => {
    checkDarkMode()
  })

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  })

  onUnmounted(() => {
    observer.disconnect()
  })
})

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
const checkUser = computed(() => {
  if (authStore?.user) {
    return true
  } else {
    return false
  }
})
const footerList = computed(() => categoriesStore?.footerList)

const footerLinks = computed(() => {
  return [
    ...footerList.value,
    {
      checkUser: checkUser.value,
      title: $t('user'),
      items: [
        {
          title: $t('enter'),
          emit: 'open-auth',
          value: 'login',
        },
        {
          title: $t('register'),
          emit: 'open-auth',
          value: 'register',
        },
      ],
    },
  ]
})
onMounted(() => {
  categoriesStore.fetchFooterList()
})
const getLocalePath = (path: string) => {
  const param = path.split('?')
  const query = param[1]
  if (query) {
    const queryParam = query.split('=')
    return localePath({
      path: param[0],
      query: { [queryParam[0]]: queryParam[1] },
    })
  } else {
    return localePath({ path: param[0], query: {} })
  }
}
</script>

<style scoped>
@media screen and (max-width: 600px) {
  .footer__links {
    display: flex !important;
    flex-wrap: wrap !important;
    justify-content: space-between !important;
  }
}
@media screen and (max-width: 768px) {
  .send-img {
    display: none !important;
  }
}
</style>
