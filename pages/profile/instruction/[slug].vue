<template>
  <transition name="fade" mode="out-in">
    <div :key="loading">
      <CardsBlank class="!p-5">
        <CommonBlockPreloader height="24px" width="70%" :loading="loading">
          <NuxtLink
            :to="localePath('/profile/instruction')"
            class="flex-y-center gap-3 tex-base leading-130 font-bold text-dark group dark:text-white"
          >
            <i
              class="icon-arrow-left text-2xl text-gray-100 transition-300 group-hover:-translate-x-1 dark:text-white mt-0.5"
            />
            {{ data?.title }}
          </NuxtLink>
        </CommonBlockPreloader>

        <div class="mt-4">
          <CommonBlockPreloader
            v-for="item in 8"
            :key="item"
            height="16px"
            width="100%"
            :loading="loading"
            preloader-class="mb-0.5"
          />
          <CommonBlockPreloader height="16px" width="100%" :loading="loading">
            <div
              class="whitespace-pre-line text-dark text-sm leading-130 font-semibold dark:text-white"
              v-html="data?.content"
            />
          </CommonBlockPreloader>
        </div>
      </CardsBlank>

      <CardsBlank class="mt-5">
        <transition name="fade" mode="out-in">
          <div :key="expressed" class="w-full">
            <div v-if="!expressed" class="flex-center-between">
              <CommonBlockPreloader
                height="18.2px"
                width="150px"
                :loading="loading"
              >
                <p class="text-[#1E2833] text-sm leading-130 font-bold dark:text-white">
                  {{ $t('expressed_to_instruction') }}
                </p>
              </CommonBlockPreloader>
              <div class="flex-y-center gap-4">
                <CommonBlockPreloader
                  width="164px"
                  height="40px"
                  :loading="loading"
                >
                  <CommonButton
                    variant="secondary"
                    :text="$t('no')"
                    class="w-[164px]"
                    @click="reaction('no')"
                  />
                </CommonBlockPreloader>
                <CommonBlockPreloader
                  width="164px"
                  height="40px"
                  :loading="loading"
                >
                  <CommonButton
                    :text="$t('yes')"
                    class="w-[164px]"
                    @click="reaction('yes')"
                  />
                </CommonBlockPreloader>
              </div>
            </div>
            <p v-else class="text-[#1E2833] text-sm leading-130 font-bold dark:text-white">
              {{ $t('after_expressed') }}
            </p>
          </div>
        </transition>
      </CardsBlank>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useFetcher } from '~/composables/fetcher'
import * as pkg from 'vue-toastification'
const { useToast } = pkg

const toast = useToast()


const expressed = ref(false)
const localePath = useLocalePath()
const loading = ref(true)
const data = ref()
const route = useRoute()
const { t: $t } = useI18n()

const card = {
  name: 'Регистрация в приложения',
  slug: 'slug',
  description:
    'Регистрация состоит из 3-х шагов На 1-м этапе вы вводите свои личные данные (Ф.И.Ш, номер телефона, адрес проживания) и подтверждаете свой профиль кодом подтверждения, отправленным на ваш номер телефона. После проверки вы устанавливаете пароль и пользуетесь приложение. \n\n Регистрация состоит из 3-х шагов На 1-м этапе вы вводите свои личные данные (Ф.И.Ш, номер телефона, адрес проживания) и подтверждаете свой профиль кодом подтверждения, отправленным на ваш номер телефона. После проверки вы устанавливаете пароль и пользуетесь приложением',
}

onMounted(() => {
  useFetcher(`settings/instructions/${route.params.slug}`)
    .then((res: any) => {
      data.value = res?.data
      expressed.value = res?.data?.is_answered
    })
    .finally(() => {
      loading.value = false
    })
})

function reaction(answer: string) {
  useFetcher(`settings/instructions/${route.params.slug}/answer/`, {
    method: 'POST',
    body: {
      instruction: +route.params.slug,
      answer: answer,
    },
  })
    .then((res) => {
      if (res?.error) {
        if (res?.error?.status === 500) {
          toast.error($t('server_error'))
        } else {
          toast.error($t(res?.error?.response?._data?.errors[0].error))
        }
      } else {
        expressed.value = true
      }
    })
    .catch((err) => {
      // Todo: ERRROR SHOW
    })
}
</script>
