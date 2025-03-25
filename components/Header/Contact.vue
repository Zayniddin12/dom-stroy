<template>
  <div class="bg-gray-600 dark:bg-dark-300 duration-300 py-3 hidden lg:block">
    <div class="container flex items-center justify-between">
      <ul class="flex items-center text-semibold space-x-6">
        <li v-if="commonStore.contacts?.phone">
          <a
            :href="`tel:${commonStore.contacts?.phone}`"
            class="flex items-center group space-x-1"
          >
            <i
              class="icon-incoming-call transition-200 text-gray-300 text-2xl inline-block group-hover:text-orange"
            />
            <span
              class="transition-200 text-xs leading-130 text-gray-100 dark:text-gray-300 group-hover:text-orange"
            >
              {{ formattedPhone }}
            </span>
          </a>
        </li>
        <li v-if="commonStore.contacts?.address">
          <a
            :href="computedAddress"
            target="_blank"
            class="flex items-center group space-x-1"
          >
            <i
              class="icon-map-square transition-200 text-gray-300 text-2xl inline-block group-hover:text-orange"
            />
            <span
              class="transition-200 text-xs leading-130 text-gray-100 dark:text-gray-300 group-hover:text-orange"
            >
              {{ commonStore.contacts?.address }}
            </span>
          </a>
        </li>

      </ul>
      <div class="flex items-center space-x-[30px]">
        <CommonThemeSwitcher />
        <CommonSocials :data="socials" is-bottom />
        <CommonLanguageSwitcher iiuuiuol />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCommonStore } from '~/store/common'
import { computed } from 'vue'
import { formatPhoneNumber } from '~/helpers'

const commonStore = useCommonStore()

const formattedPhone = computed(() => {
  return formatPhoneNumber(commonStore?.contacts?.phone || '')
})

const computedAddress = computed(() => {
  return `https://yandex.ru/maps/?ll=${commonStore?.contacts?.latitude},${commonStore?.contacts?.longitude}&z=18`
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
</script>

<style scoped></style>
