<template>
  <div
    class="flex-center h-screen w-full flex items-center lg:justify-between flex-col lg:flex-row lg:gap-6 container relative z-[999999999999999]"
  >
    <div>
      <img
        src="/images/logo.svg"
        class="logo mx-auto mb-6 lg:hidden"
        alt="parfum-logo"
      />
      <img
        src="/phones.png"
        alt="phones"
        class="max-w-[250px] lg:max-w-[422px]"
      />
    </div>
    <div class="text-center lg:text-left">
      <img
        src="/images/logo.svg"
        class="logo hidden lg:block"
        alt="parfum-logo"
      />
      <div class="mt-10">
        <p class="text-gray-200 text-xs md:text-sm leading-4 tracking-[0.24em]">
          {{ $t('our_app') }}
        </p>
        <p
          class="text-xl md:text-[36px] font-bold leading-130 text-dark mx-auto lg:mx-0 max-w-[70%] mt-3"
        >
          {{ $t('responsive_title') }}
        </p>
        <p class="text-sm leading-130 font-normal text-dark mt-4">
          {{ $t('responsive_text') }}
        </p>

        <div
          class="flex-y-center gap-4 justify-center lg:justify-start mt-8 md:mt-[50px]"
        >
          <div class="relative group">
            <CommonAppLink
              provider="apple"
              :url="GlobalConfig.appsLinks.appStore"
            />
            <CommonTooltip
              v-if="!GlobalConfig.appsLinks.appStore"
              class="!-top-5"
            >
              {{ $t('soon') }}
            </CommonTooltip>
          </div>

          <div class="relative group">
            <CommonAppLink
              provider="google"
              :url="GlobalConfig.appsLinks.googlePlay"
            />
            <CommonTooltip
              v-if="!GlobalConfig.appsLinks.googlePlay"
              class="!-top-5"
            >
              {{ $t('soon') }}
            </CommonTooltip>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GlobalConfig } from '~/config/global-config'
</script>

<style scoped>

</style>
