<template>
  <div>
    <CommonButton
      :class="buttonClass"
      variant="secondary"
      @click="showModal = true"
    >
      <i>
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            class="fill-current"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9.5 13.25C8.5335 13.25 7.75 14.0335 7.75 15C7.75 15.9665 8.5335 16.75 9.5 16.75C10.4665 16.75 11.25 15.9665 11.25 15C11.25 14.0335 10.4665 13.25 9.5 13.25ZM6.25 15C6.25 13.2051 7.70507 11.75 9.5 11.75C11.2949 11.75 12.75 13.2051 12.75 15C12.75 16.7949 11.2949 18.25 9.5 18.25C7.70507 18.25 6.25 16.7949 6.25 15Z"
            fill="black"
          />
          <path
            class="fill-current"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M19.5 19.75C18.5335 19.75 17.75 20.5335 17.75 21.5C17.75 22.4665 18.5335 23.25 19.5 23.25C20.4665 23.25 21.25 22.4665 21.25 21.5C21.25 20.5335 20.4665 19.75 19.5 19.75ZM16.25 21.5C16.25 19.7051 17.7051 18.25 19.5 18.25C21.2949 18.25 22.75 19.7051 22.75 21.5C22.75 23.2949 21.2949 24.75 19.5 24.75C17.7051 24.75 16.25 23.2949 16.25 21.5Z"
            fill="black"
          />
          <path
            class="fill-current"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M17.6144 9.06991C17.852 9.40924 17.7694 9.87689 17.4301 10.1144L12.4301 13.6144C12.0908 13.852 11.6231 13.7694 11.3856 13.4301C11.148 13.0908 11.2306 12.6231 11.5699 12.3856L16.5699 8.88558C16.9092 8.64804 17.3769 8.73057 17.6144 9.06991Z"
            fill="black"
          />
          <path
            class="fill-current"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M17.6144 20.9301C17.852 20.5908 17.7694 20.1231 17.4301 19.8856L12.4301 16.3856C12.0908 16.148 11.6231 16.2306 11.3856 16.5699C11.148 16.9092 11.2306 17.3769 11.5699 17.6144L16.5699 21.1144C16.9092 21.352 17.3769 21.2694 17.6144 20.9301Z"
            fill="black"
          />
          <path
            class="fill-current"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M19.5 6.75C18.5335 6.75 17.75 7.5335 17.75 8.5C17.75 9.4665 18.5335 10.25 19.5 10.25C20.4665 10.25 21.25 9.4665 21.25 8.5C21.25 7.5335 20.4665 6.75 19.5 6.75ZM16.25 8.5C16.25 6.70507 17.7051 5.25 19.5 5.25C21.2949 5.25 22.75 6.70507 22.75 8.5C22.75 10.2949 21.2949 11.75 19.5 11.75C17.7051 11.75 16.25 10.2949 16.25 8.5Z"
            fill="black"
          />
        </svg>
      </i>
      <span class="!hidden md:!block">{{ $t('share') }}</span>
    </CommonButton>

    <CommonModalsModal :show="showModal" @close="showModal = false">
      <div class="p-5">
        <p class="text-dark dark:text-white transition-300 leading-6 text-xl font-bold mb-6">
          {{ $t('share') }}
        </p>
        <div
          class="flex justify-center items-center p-3 w-full bg-gray-500 dark:bg-gray-100 rounded-lg gap-[30px] transition-300"
        >
          <span
            v-for="(i, idx) in links"
            :key="idx"
            :class="i.icon"
            class="transition-200 text-gray-200 dark:text-gray-300 hover:text-red dark:hover:text-red text-2xl cursor-pointer"
            @click="share(i.network)"
          ></span>
        </div>
        <div
          class="flex justify-between md:grid md:grid-cols-1-max w-full bg-gray-500 dark:bg-gray-100 transition-300 rounded-lg mt-3 p-1 items-center pl-5 gap-2"
        >
          <p
            class="font-proxima text-base md:text-lg text-dark word-break-all cut-text transition-300 dark:text-white"
          >
            {{ url }}
          </p>
          <button
            @click="copyUrl"
            class="w-[45px] h-[45px] flex items-center justify-center bg-[#CDCDD0] dark:bg-gray-200 rounded-lg cursor-pointer relative group transition-200 hover:opacity-80"
          >
            <CommonTooltip :show="copied" with-trigger class="!-top-5">{{
              $t('copied')
            }}</CommonTooltip>
            <span
              class="icon-copy text-2xl text-gray-100 dark:text-white transition-300 group-hover:text-red"
            ></span>
          </button>
        </div>
      </div>
    </CommonModalsModal>
  </div>
</template>
<script setup lang="ts">
import { copyText } from '~/helpers'

interface Props {
  url: string
  title: string
  buttonClass?: string
}
const props = defineProps<Props>()

const showModal = ref(false)

const links = reactive([
  { icon: 'icon-telegram-square hover:text-[#34AADF]', network: 'telegram' },
  { icon: 'icon-twitter hover:text-[#33CCFF]', network: 'twitter' },
  { icon: 'icon-facebook-square hover:text-[#337FFF]', network: 'facebook' },
])

const share = (network: string) => {
  if (process.client) {
    switch (network) {
      case 'telegram':
        window.open(
          `https://t.me/share/url?url=${props.url}&text=${props.title}`,
          '_blank'
        )
        break
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?text=${props.title}\n+${props.url}`,
          '_blank'
        )
        break
      case 'facebook':
        window.open(
          `https://www.facebook.com/sharer/sharer.php?t=${props.title}\n${props.url}`,
          '_blank'
        )
        break
    }
  }
}

const copied = ref(false)
const copyUrl = async () => {
  if (copied.value) {
    return
  }
  copied.value = true
  await copyText(props.url)
  setTimeout(() => {
    copied.value = false
  }, 3000)
}
</script>

<style>
.cut-text {
  text-overflow: ellipsis;
  overflow: hidden;
  width: 260px;
  white-space: nowrap;
}
</style>
