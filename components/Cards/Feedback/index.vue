<template>
  <div>
    <!--    Comment-->
    <div class="bg-gray-550 dark:bg-dark-300 transition-300 p-5">
      <!-- Author -->
      <div class="grid grid-cols-max-1">
        <div
          :class="{
            'box-content border border-gray-200': data?.img && !loading,
          }"
          class="w-11 h-11 rounded-full overflow-hidden mr-3"
        >
          <CommonBlockPreloader
            :loading="loading"
            width="100%"
            height="100%"
            border-radius="100%"
            preloader-class="w-full h-full"
            class="w-full h-full"
            v-if="loading"
          />
          <img
            v-else
            :src="
              data?.user?.avatar_src?.default || '/images/defaults/user.svg'
            "
            class="w-full h-full object-cover object-center"
            alt="image"
          />
        </div>
        <div>
          <CommonBlockPreloader
            :loading="loading"
            width="200px"
            height="28px"
            preloader-class="mb-1"
          >
            <h5 class="font-semibold text-dark dark:text-white text-xl">
              {{ data?.user?.full_name ?? 'User' }}
            </h5>
          </CommonBlockPreloader>
          <div class="flex items-center">
            <CommonBlockPreloader
              :loading="loading"
              width="88px"
              height="16px"
              preloader-class="mr-1"
            >
              <CommonRating :rate="data?.rate" class="mr-2" />
            </CommonBlockPreloader>
            <CommonBlockPreloader :loading="loading" width="88px" height="16px">
              <p class="text-sm text-gray-100">
                {{ commentDate }}
              </p>
            </CommonBlockPreloader>
          </div>
        </div>
      </div>
      <!-- Comment -->
      <div v-if="loading">
        <CommonBlockPreloader
          :loading="loading"
          :width="i === 3 ? '80%' : '100%'"
          height="22px"
          preloader-class="mt-2"
          v-for="i in 3"
          :key="i"
        />
      </div>
      <p
        v-if="data?.comment && !loading"
        class="text-dark dark:text-white text-base mt-3"
      >
        {{ data?.comment }}
      </p>
    </div>
    <!--    Reply-->
    <div class="mt-3 ml-20 h-fit flex gap-x-3">
      <div class="min-h-max w-0.5 bg-gray-400 dark:bg-dark-300 transition-300" />
      <div>
        <!-- Author -->
        <div class="grid grid-cols-max-1">
          <div
            :class="{
              'box-content border border-gray-200': data?.img && !loading,
            }"
            class="w-11 h-11 rounded-full overflow-hidden mr-3"
          >
            <CommonBlockPreloader
              :loading="loading"
              width="100%"
              height="100%"
              border-radius="100%"
              preloader-class="w-full h-full"
              class="w-full h-full"
              v-if="loading"
            />
            <img
              v-else
              :src="
                '/images/market-logo.svg'
              "
              class="w-full h-full object-cover object-center"
              alt="image"
            />
          </div>
          <div>
            <CommonBlockPreloader
              :loading="loading"
              width="200px"
              height="28px"
              preloader-class="mb-1"
            >
              <h5 class="font-semibold text-dark dark:text-white text-xl">
                {{ data?.answer?.user?.full_name ?? 'Дом строй' }}
              </h5>
            </CommonBlockPreloader>
          </div>
        </div>
        <!-- Comment -->
        <div v-if="loading">
          <CommonBlockPreloader
            :loading="loading"
            :width="i === 3 ? '80%' : '100%'"
            height="22px"
            preloader-class="mt-2"
            v-for="i in 3"
            :key="i"
          />
        </div>
        <p
          v-if="data?.comment && !loading"
          class="text-dark dark:text-white text-base mt-3"
        >
          {{ data?.answer }}
        </p>
<!--        rgrhe-->
        <CommonBlockPreloader
            v-if="data?.answered_at != null"
          :loading="loading"
          width="88px"
          height="16px"
        >
          <p class="text-sm text-gray-100">
            {{ answerDate }}
          </p>
        </CommonBlockPreloader>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import 'dayjs/locale/uz-latn'
import 'dayjs/locale/ru'
import relativeTime from 'dayjs/plugin/relativeTime'

import type { TFeedback } from '~/types/feedback'

dayjs.extend(relativeTime)

const { locale, t } = useI18n()

interface Props {
  data: TFeedback
  loading?: boolean
}

const props = defineProps<Props>()

const commentDate = computed(() => {
  const date = props?.data?.created_at
  if (
    dayjs(date).format('DD-MM-YYYY') === dayjs(new Date()).format('DD-MM-YYYY')
  ) {
    return `${t('today')}, ${dayjs(date).format('HH:mm')}`
  }
  return dayjs(date)
    .locale(locale.value === 'uz' ? 'uz-latn' : locale.value)
    .format('D MMMM, YYYY, HH:mm')
})

const answerDate = computed(() => {
  const date = props?.data?.answered_at
  if (
      dayjs(date).format('DD-MM-YYYY') === dayjs(new Date()).format('DD-MM-YYYY')
  ) {
    return `${t('today')}, ${dayjs(date).format('HH:mm')}`
  }
  return dayjs(date)
      .locale(locale.value === 'uz' ? 'uz-latn' : locale.value)
      .format('D MMMM, YYYY, HH:mm')
})
</script>
