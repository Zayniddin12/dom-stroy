<template>
  <CommonModalsModal  :show="show" @close="close" maxWidth bodyWrapperClass="max-sm:!h-screen max-sm:!w-screen max-sm:!max-w-screen max-sm:!rounded-none" bodyClass="max-sm:!px-0">
    <div class="grid md:grid-cols-12 h-full">
      <div
        class="col-span-6 bg-white dark:bg-dark-300 duration-300 rounded-xl md:rounded-tl-xl md:rounded-bl-xl p-6"
      >
        <Transition name="fade" mode="out-in">
          <div :key="componentLayout" class="h-full">
            <CommonModalsAuthLogin
              v-show="componentLayout === 'login'"
              @forgot-password="componentLayout = 'password'"
              @register="componentLayout = 'register'"
              @close="close"
            />
            <CommonModalsAuthResetPassword
              v-show="componentLayout === 'password'"
              @close="close"
              @login="componentLayout = 'login'"
            />
            <CommonModalsAuthRegister
              v-show="componentLayout === 'register'"
              @login="componentLayout = 'login'"
              @close="close"
            />
          </div>
        </Transition>
      </div>
      <div
        class="col-span-6 !bg-orange p-6 modal-right-side rounded-tr-xl rounded-br-xl flex-col items-center pt-10 overflow-hidden hidden md:flex"
      >
        <CommonLogo :dark="true" class="md:w-[137px] sm:w-[110px] w-[100px]" />
        <p class="text-center mt-5 mb-4 text-white text-sm leading-130">
          {{ $t('auth_text') }}
        </p>
        <div
          class="flex items-center justify-center relative pointer-events-none"
        >
          <img
            class="w-[223px] h-[259px]"
            src="/images/temp/phones.png"
            alt="image"
          />
          <img
            src="/images/temp/auth_deco.png"
            class="absolute max-w-[400px]"
            alt="image"
          />
        </div>
        <img
          src="/images/temp/auth_shadow.png"
          class="pointer-events-none"
          alt="image"
        />
        <div class="flex items-center justify-around gap-4">
          <div class="relative group">
            <CommonAppLink
              :url="GlobalConfig.appsLinks.appStore"
              provider="apple"
            />

            <CommonTooltip
              v-if="!GlobalConfig.appsLinks.appStore"
              class="!-top-5"
              >{{ $t('soon') }}</CommonTooltip
            >
          </div>
          <div class="relative group">
            <CommonAppLink
              :url="GlobalConfig.appsLinks.googlePlay"
              provider="google"
            />
            <CommonTooltip
              v-if="!GlobalConfig.appsLinks.appStore"
              class="!-top-5"
              >{{ $t('soon') }}</CommonTooltip
            >
          </div>
        </div>
      </div>
    </div>
  </CommonModalsModal>
</template>
<script setup lang="ts">
import { GlobalConfig } from '~/config/global-config'

interface Props {
  show: boolean
  componentLayoutProp?: string
}
const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits(['close'])

const phone = ref(1)
let componentLayout = ref('login')
const close = () => {
  componentLayout.value = 'login'
  emit('close')
}

watch(
  () => props.componentLayoutProp,
  (value) => {
    componentLayout.value = value
  },
  {
    deep: true,
    immediate: true,
  }
)
</script>

<style>
.modal-right-side {
  background: linear-gradient(180deg, #ef7f1a 0%, #89490f 100%) !important;
}
</style>
