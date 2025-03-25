<template>
  <div class="relative overflow-y-hidden h-screen w-full font-proxima dark:!bg-dark-200">
    <LayoutHeader class="z-20" @open-auth="show = true" />
    <div class="container h-[calc(100%_-_191px)] relative">
      <div class="w-full h-full flex items-center justify-center">
        <div class="text-center text-dark mx-auto relative z-20">
          <img src="/images/404.svg" alt="404" class="select-none mx-auto dark:hidden block" />
          <img src="/images/404Dark.svg" alt="404" class="select-none mx-auto dark:block hidden" />
          <p class="mt-9 mb-1.5 text-[32px] font-bold leading-[46px] dark:text-white transition-300">
            {{ $t('error') }}
          </p>
          <p class="mb-9 text-2xl dark:text-white transition-300">{{ $t(computedStatus?.text ?? '') }}</p>
          <NuxtLink
            :to="localePath('/')"
            class="w-[202px] mx-auto flex items-center justify-center py-2.5 rounded-md bg-red text-white text-sm leading-6 hover:bg-dark_red hover:shadow-btn duration-200 ease-out"
          >
            <svg
              class="inline-block mr-2"
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.79126 12.7665C4.4877 10.6568 4.33592 9.60201 4.76829 8.70014C5.20066 7.79826 6.12095 7.25005 7.96153 6.15363L9.0694 5.49368C10.7408 4.49802 11.5766 4.00018 12.5 4.00018C13.4234 4.00018 14.2592 4.49801 15.9306 5.49368L17.0385 6.15363C18.879 7.25005 19.7993 7.79826 20.2317 8.70014C20.6641 9.60201 20.5123 10.6568 20.2087 12.7665L19.9857 14.3164C19.5958 17.0263 19.4008 18.3813 18.4608 19.1907C17.5207 20.0002 16.1421 20.0002 13.3849 20.0002H11.6151C8.8579 20.0002 7.47927 20.0002 6.53922 19.1907C5.59917 18.3813 5.4042 17.0263 5.01427 14.3164L4.79126 12.7665Z"
                stroke="white"
                stroke-width="1.5"
              />
              <path
                d="M14.9016 16.8H10.1016"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
            {{ $t('back_to_home') }}
          </NuxtLink>

        </div>
      </div>
    </div>
    <img
      class="absolute inset-x-0 mx-auto select-none top-[221px] z-10 w-full"
      src="/images/line1.svg"
      alt="line"
    />
    <img
      class="absolute inset-x-0 mx-auto select-none bottom-[120px] z-10 w-full"
      src="/images/line2.svg"
      alt="line"
    />

<!--    <CommonModalsAuthRequired v-bind="{ show }" @close="show = false" />-->
    <CommonModalsAuthModal
        v-bind="{ show }"
        @close="show = false"
        :component-layout-prop="'login'"
    />
  </div>
</template>

<script setup lang="ts">
import { useCommonStore } from '~/store/common'
import { computed } from 'vue'


import {checkMobile} from "#imports";
import {useAuthStore} from "~/store/auth";
import {useTheme} from "~/store/useTheme";

interface Props {
  error: {
    url: string
    statusCode: '404' | '500'
    statusMessage: string
    message: string
    stack: string
  }
}
const props = defineProps<Props>()
const storeTheme = useTheme()
storeTheme.initTheme()
const commonStore = useCommonStore()

onBeforeMount(() => commonStore.fetchContacts())

const show = ref(false)

const computedStatus = computed(() => {
  const statusData = {
    '400': {
      title: 'error',
      text: 'error_text',
    },
    '404': {
      title: 'error_page_not_found',
      text: 'error_page_not_found_text',
    },
    '500': {
      title: 'error_server',
      text: 'error_server_text',
    },
    '502': {
      title: 'error_server',
      text: 'error_server_text',
    },
    '504': {
      title: 'error_server',
      text: 'error_server_text',
    },
  }
  return statusData[props.error.statusCode as keyof typeof statusData]
})

const authStore = useAuthStore()
const { data } = await useAsyncData('init', async () => authStore.authInit())
checkMobile()
</script>
