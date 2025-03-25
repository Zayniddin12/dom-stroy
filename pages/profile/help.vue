<template>
  <div class="">
    <CardsBlank class="p-5 pr-0">
      <div
        class="pr-5 pb-3 mb-5 md:border-b border-solid border-gray-600 flex-center-between dark:border-dark-300"
      >
        <CommonBlockPreloader height="31.2px" width="150px" :loading="loading">
          <p class="text-2xl leading-130 font-bold text-dark dark:text-white">
            {{ $t('help') }}
          </p>
        </CommonBlockPreloader>
      </div>

      <div
        class="border border-solid border-gray-400 rounded-lg md:flex items-stretch justify-between mr-5 dark:border-dark-300"
      >
        <div
          class="w-full h-auto p-4 md:border-r border-solid border-gray-400 dark:border-dark-300"
        >
          <div class="flex-y-center gap-3">
            <CommonBlockPreloader width="30px" height="30px" :loading="loading">
              <i class="icon-phone text-red text-3xl" />
            </CommonBlockPreloader>
            <div>
              <CommonBlockPreloader
                width="70px"
                height="20.8px"
                :loading="loading"
                preloader-class="mb-1"
              >
                <p class="text-gray-200 text-base leading-130 font-semibold">
                  {{ $t('phone_number') }}:
                </p>
              </CommonBlockPreloader>
              <CommonBlockPreloader
                width="120px"
                height="20.8px"
                :loading="loading"
              >
                <a
                  :href="`tel: ${data?.phone}`"
                  class="text-dark leading-130 font-semibold text-base transition-200 dark:text-white hover:text-red dark:hover:text-red"
                >
                  +{{ formatPhoneNumber(data?.phone) }}
                </a>
              </CommonBlockPreloader>
            </div>
          </div>
        </div>
        <div class="w-full h-auto p-4">
          <div class="flex-y-center gap-3">
            <CommonBlockPreloader width="30px" height="30px" :loading="loading">
              <i class="icon-letter text-red text-3xl" />
            </CommonBlockPreloader>
            <div>
              <CommonBlockPreloader
                width="70px"
                height="20.8px"
                :loading="loading"
                preloader-class="mb-1"
              >
                <p class="text-gray-200 text-base leading-130 font-semibold">
                  {{ $t('email') }}:
                </p>
              </CommonBlockPreloader>
              <CommonBlockPreloader
                width="120px"
                height="20.8px"
                :loading="loading"
              >
                <a
                  :href="`mailto: ${data?.email}`"
                  class="text-dark leading-130 font-semibold text-base hover:text-red transition-200 dark:text-white dark:hover:text-red"
                >
                  {{ data?.email }}
                </a>
              </CommonBlockPreloader>
            </div>
          </div>
        </div>
      </div>
      <div class="grid md:grid-cols-2 gap-6 mt-4 pr-5">
        <CommonButton
          text-class="!font-bold"
          :text="$t('report_bug')"
          class="w-full !justify-start"
          variant="light"
          @click="show = true"
        >
          <template #pre-icon>
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M25 15C25 9.47715 20.5228 5 15 5C9.47715 5 5 9.47715 5 15C5 20.5228 9.47715 25 15 25C20.5228 25 25 20.5228 25 15ZM15 9.25C15.4142 9.25 15.75 9.58579 15.75 10V16C15.75 16.4142 15.4142 16.75 15 16.75C14.5858 16.75 14.25 16.4142 14.25 16V10C14.25 9.58579 14.5858 9.25 15 9.25ZM15 20C15.5523 20 16 19.5523 16 19C16 18.4477 15.5523 18 15 18C14.4477 18 14 18.4477 14 19C14 19.5523 14.4477 20 15 20Z"
                fill="#EF7F1A"
              />
            </svg>
          </template>
        </CommonButton>
        <a :href="data?.telegram" target="_blank" rel="noopener" class="w-full">
          <CommonButton
            :text="$t('contact_with_tg')"
            text-class="!text-[#1c9ddd] !font-bold"
            class="w-full button-telegram !justify-start !bg-[#EDF8FD] dark:!bg-dark-300"
          >
            <template #pre-icon>
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="14"
                  cy="14"
                  r="12.25"
                  fill="url(#paint0_linear_82_17911)"
                />
                <path
                  d="M20.1132 8.93269C20.2223 8.2279 19.5522 7.67161 18.9256 7.94675L6.44422 13.4267C5.99482 13.624 6.0277 14.3047 6.49378 14.4532L9.06775 15.2728C9.55901 15.4293 10.091 15.3484 10.5199 15.052L16.3231 11.0427C16.4981 10.9218 16.6888 11.1707 16.5393 11.3248L12.3621 15.6316C11.9569 16.0493 12.0373 16.7573 12.5247 17.0629L17.2016 19.9958C17.7261 20.3247 18.401 19.9942 18.4991 19.3604L20.1132 8.93269Z"
                  fill="white"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_82_17911"
                    x1="14"
                    y1="1.75"
                    x2="14"
                    y2="26.25"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#37BBFE" />
                    <stop offset="1" stop-color="#007DBB" />
                  </linearGradient>
                </defs>
              </svg>
            </template>
          </CommonButton>
        </a>
      </div>
    </CardsBlank>
    <CardsBlank class="mt-[29px] pr-0">
      <Faq />
    </CardsBlank>
    <CommonTypoModal
      :show="show"
      :form="form"
      @close="show = false"
      @submit="submit"
      :loading="buttonLoading"
    />
  </div>
</template>

<script setup lang="ts">
import { formatPhoneNumber } from '~/helpers'
import { required } from '@vuelidate/validators'
import { useFetcher } from '~/composables/fetcher'
import * as pkg from 'vue-toastification'
import Faq from '~/components/Sections/Faq.vue'
const { useToast } = pkg

const $toast = useToast()

const loading = ref(true)
const buttonLoading = ref(false)
const show = ref(false)
const data = ref()
const { t: $t } = useI18n()

const form = useForm(
  {
    message: '',
    images: [],
  },
  {
    message: {
      required,
    },
  }
)

const submit = () => {
  buttonLoading.value = true
  form.$v.value.$touch()
  const newData = new FormData()
  newData.append('content', form.values.message)
  for (let i = 0; i < form.values.images.length; i++) {
    let obj = form.values.images[i]
    newData.append(`images[${i}]`, obj)
  }
  if (!form.$v.value.$invalid) {
    useFetcher('settings/typo/', {
      method: 'POST',
      body: newData,
    })
      .then((res) => {
        if (!res?.error) {
          form.values.message = ''
          form.values.images = []
          form.$v.value.$reset()
          show.value = false
          $toast.success($t('successfully_sent'))
        } else {
          $toast.error($t(res?.error?.response?._data?.errors[0].error))
        }
      })
      .finally(() => {
        buttonLoading.value = false
      })
  }
}

watch(
  () => show.value,
  () => {
    if (!show.value) {
      form.values.message = ''
      form.$v.value.$reset()
    }
  }
)

onMounted(() => {
  useFetcher('settings/contacts/')
    .then((res: any) => {
      data.value = res?.data
    })
    .finally(() => {
      loading.value = false
    })
})
</script>

<style scoped>
.button-telegram:hover {
  box-shadow: 0 3px 20px #bedcef;
}
</style>
