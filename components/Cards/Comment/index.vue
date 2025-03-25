<template>
  <NuxtLink
    :to="localePath(`/products/${card?.product?.slug}`)"
    class="comment-card cursor-pointer bg-white dark:bg-dark-100 rounded-2xl p-5 flex flex-col gap-4 justify-between"
    :class="{ 'pointer-events-none': loading }"
  >
    <div class="flex items-start space-x-5">
      <CommonBlockPreloader
        :loading="loading"
        width="62px"
        height="76px"
        border-radius="8px"
      >
        <div
          class="w-[62px] h-[76px] border border-gray-600 dark:border-dark-300 p-2 rounded-lg"
          v-if="
            card?.product?.images &&
            card?.product?.images?.length &&
            Object.keys(card?.product?.images[0]).length
          "
        >
          <img
            :src="card?.product?.images[0]?.small"
            class="w-full h-full object-cover object-fit"
            alt="product-image"
            sizes="lg:62px"
          />
        </div>
      </CommonBlockPreloader>
      <div class="flex flex-col w-full">
        <CommonBlockPreloader
          :loading="loading"
          width="100%"
          height="20px"
          border-radius="4px"
        >
          <h4
            class="text-dark dark:text-white font-bold text-base leading-120 line-clamp-1"
          >
            {{ card?.product?.title }}
          </h4>
        </CommonBlockPreloader>
        <CommonBlockPreloader
          :loading="loading"
          width="100%"
          height="40px"
          border-radius="4px"
          margin="4px 0 0 0"
        >
          <h5
            class="text-dark font-normal text-sm leading-140 mt-1 line-clamp-3 dark:text-gray-400"
          >
            {{ card?.comment }}
          </h5>
        </CommonBlockPreloader>
      </div>
    </div>
    <div>
      <!-- Author -->
      <div class="grid grid-cols-max-1">
        <CommonBlockPreloader
          :loading="loading"
          width="40px"
          height="40px"
          border-radius="999px"
          margin="4px 0 0 0"
        >
          <div class="w-10 h-10 rounded-full overflow-hidden mr-3">
            <img
              :src="
                card?.user?.avatar_src?.small || '/images/defaults/user.svg'
              "
              class="w-full h-full object-cover"
              alt="avatar"
            />
          </div>
        </CommonBlockPreloader>
        <div class="flex items-end justify-between">
          <div class="w-full">
            <CommonBlockPreloader
              :loading="loading"
              width="100%"
              height="20px"
              border-radius="4px"
              margin="0 0 0 12px"
            >
              <h5
                class="font-semibold text-dark dark:text-white text-base leading-130 line-clamp-1"
              >
                {{ card?.user.full_name ?? 'user' }}
              </h5>
            </CommonBlockPreloader>
            <CommonBlockPreloader
              :loading="loading"
              width="100%"
              height="20px"
              border-radius="4px"
              margin="2px 0 0 12px"
            >
              <div class="flex items-center mt-0.5">
                <CommonRating :rate="card?.rate" class="mr-2" />
                <p class="text-xs leading-130 text-gray-200">
                  {{ commentDate }}
                </p>
                <span
                  class="bg-gray-100 w-1.5 h-1.5 rounded-full block mx-2"
                ></span>
                <p class="text-xs leading-130 text-gray-200">
                  {{ commentHour }}
                </p>
              </div>
            </CommonBlockPreloader>
          </div>
          <span
            v-if="!loading"
            class="comment-card__link duration-300 icon-external-link text-red opacity-0 text-[24px]"
          ></span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import type { TComment } from '~/types/comments'
const { locale, t } = useI18n()

interface Props {
  card: TComment
  loading?: boolean
}

const props = defineProps<Props>()
const localePath = useLocalePath()

const commentDate = computed(() => {
  const date = props?.card?.created_at
  if (
    dayjs(date).format('DD-MM-YYYY') === dayjs(new Date()).format('DD-MM-YYYY')
  ) {
    return `${t('today')}`
  }
  return dayjs(date)
    .locale(locale.value === 'uz' ? 'uz-latn' : locale.value)
    .format('DD.MM.YYYY')
})

const commentHour = computed(() => {
  const date = props?.card?.created_at
  return dayjs(date)
    .locale(locale.value === 'uz' ? 'uz-latn' : locale.value)
    .format('HH:MM')
})
</script>

<style scoped>
.comment-card {
  transition: all ease 0.3s;
}

.comment-card:hover {
  box-shadow: 0 4px 30px rgba(56, 56, 56, 0.09);
}

.comment-card:hover .comment-card__link {
  opacity: 1;
}
</style>
