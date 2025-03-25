<template>
  <div class="bg-white dark:bg-dark-100 transition-300 rounded-xl w-full xl:w-[580px] min-h-[352px] h-full p-6">
    <p class="font-bold text-[24px] !leading-120 mb-2 dark:text-white transition-300">
      {{ $t('client_name') }}
    </p>
    <p class="text-gray-200 font-semibold mb-5 text-base leading-140 dark:text-gray-300 transition-300">
      {{ $t('enjoy_shopping') }}
    </p>
    <div
      class="grid grid-cols-1 md:grid-cols-2 gap-y-2 xl:gap-y-4 gap-x-2 xl:gap-x-4 mb-[31px]"
    >
      <ContactCardInfo
        :card="{
          title: $t('time_work'),
          subtitle: `${info?.work_from.substring(
            0,
            5
          )} - ${info?.work_to.substring(0, 5)}`,
          icon: 'time',
        }"
      />
      <a :href="'tel:' + info.phone" v-if="info.phone">
        <ContactCardInfo
          class="cursor-pointer hover:border-red duration-200 ease-out group"
          :card="{
            title: $t('phone_number'),
            subtitle: '+' + formatPhoneNumber(info.phone),
            icon: 'phone',
          }"
        />
      </a>
      <a :href="`mailto:${info.email}`" v-if="info.email">
        <ContactCardInfo
          class="cursor-pointer hover:border-red duration-200 ease-out group"
          :card="{
            title: $t('email'),
            subtitle: info?.email,
            icon: 'email',
          }"
        />
      </a>
      <ContactCardInfo
        :card="{
          title: $t('address'),
          subtitle: info.address,
          icon: 'icon',
        }"
      />
    </div>
    <div class="flex items-center justify-start">
      <div class="flex items-center justify-center gap-x-3">
        <template v-for="(item, index) in contactSocials" :key="index">
          <a
            v-if="item.link"
            :href="item.link"
            target="_blank"
            class="w-8 h-8 flex items-center relative justify-center bg-gray-500 dark:bg-gray-900/10 border border-gray-500 dark:border-gray-900/10 dark:hover:border-gray-red hover:!border-red transition-300 rounded-lg group hover:bg-light_red duration-200 ease-out cursor-pointer"
          >
            <i
              :class="item.icon"
              class="text-xs text-gray-100 dark:text-white transition-300 group-hover:text-red duration-200 ease-out"
            ></i>
          </a>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ISettingsContact } from '~/types/settings'
import { formatPhoneNumber } from '~/helpers'

interface Props {
  info: ISettingsContact
}

const props = withDefaults(defineProps<Props>(), {})

const contactSocials = computed(() => [
  {
    id: 1,
    icon: 'icon-twitter',
    link: props?.info?.twitter,
    name: 'Twitter',
  },
  {
    id: 2,
    icon: 'icon-youtube',
    link: props?.info?.youtube,
    name: 'YouTube',
  },
  {
    id: 3,
    icon: 'icon-instagram',
    link: props?.info?.instagram,
    name: 'Instagram',
  },
  {
    id: 4,
    icon: 'icon-telegram',
    link: props?.info?.telegram,
    name: 'Telegram',
  },
])
</script>
