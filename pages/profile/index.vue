<template>
  <div>
    <CardsBlank class="p-5 pr-0 dark:bg-dark-100 dark:duration-300">
      <div
        class="pr-5 pb-3 border-b border-solid dark:border-dark-300 border-gray-600 flex-center-between"
      >
        <CommonBlockPreloader height="31.2px" width="150px" :loading="loading">
          <p class="text-2xl leading-130 font-bold text-dark dark:text-white">
            {{ $t('personal_detail') }}
          </p>
        </CommonBlockPreloader>
        <CommonBlockPreloader width="88px" height="40px" :loading="loading">
          <CommonButton
            variant="primary-light"
            :text="$t('log_out')"
            text-class="flex-y-center dark:text-[#f9524e]"
            class="!dark:bg-[#f9524e10] !px-8"
            @click="showLogoutModal = true"
          >
            <template #post-icon>
              <i class="icon-log mt-0.5"></i>
            </template>
          </CommonButton>
        </CommonBlockPreloader>
      </div>

      <CommonAvatar
        :image="user?.avatar_src?.default"
        class="my-5 bg-red"
        :loading="loading"
      />
      <div
        class="border border-solid border-gray-400 rounded-lg md:flex items-stretch justify-between mr-5 dark:border-dark-300"
      >
        <div
          class="w-full h-auto p-4 md:border-r border-solid border-gray-400 dark:border-dark-300"
        >
          <CommonBlockPreloader
            width="70px"
            height="20.8px"
            :loading="loading"
            preloader-class="mb-1"
          >
            <p
              class="text-gray-200 text-base leading-130 font-semibold mb-1 dark:text-white"
            >
              {{ $t('name') }}:
            </p>
          </CommonBlockPreloader>
          <CommonBlockPreloader
            width="120px"
            height="20.8px"
            :loading="loading"
          >
            <p
              class="text-dark leading-130 font-semibold text-base dark:text-white"
            >
              {{ user?.full_name }}
            </p>
          </CommonBlockPreloader>
        </div>

        <div
          v-if="false"
          class="w-full h-auto p-4 border-r border-solid border-gray-400 dark:border-dark-300"
        >
          <CommonBlockPreloader
            width="70px"
            height="20.8px"
            :loading="loading"
            preloader-class="mb-1"
          >
            <p
              class="text-gray-200 text-base leading-130 font-semibold mb-1 dark:text-white"
            >
              {{ $t('surname') }}:
            </p>
          </CommonBlockPreloader>
          <CommonBlockPreloader
            width="120px"
            height="20.8px"
            :loading="loading"
          >
            <p
              class="text-dark leading-130 font-semibold text-base dark:text-white"
            >
              Домлахонов
            </p>
          </CommonBlockPreloader>
        </div>

        <div class="w-full h-auto p-4">
          <CommonBlockPreloader
            width="70px"
            height="20.8px"
            :loading="loading"
            preloader-class="mb-1"
          >
            <p
              class="text-gray-200 text-base leading-130 font-semibold mb-1 dark:text-white"
            >
              {{ $t('address') }}:
            </p>
          </CommonBlockPreloader>
          <CommonBlockPreloader
            width="120px"
            height="20.8px"
            :loading="loading"
          >
            <p
              v-if="user?.address"
              class="text-dark break leading-130 font-semibold text-base dark:text-white"
            >
              {{ user?.address }}
            </p>
            <p v-else>-</p>
          </CommonBlockPreloader>
        </div>
      </div>
      <div class="flex items-end justify-end pr-5 mt-4">
        <CommonBlockPreloader height="43.5px" width="110px" :loading="loading">
          <nuxt-link :to="localePath('/profile/edit')">
            <CommonButton
              :text="$t('edit')"
              text-class="flex-y-center gap-1"
              class="!px-6"
            >
              <template #pre-icon>
                <div class="-mb-1">
                  <i class="icon-edit-square text-2xl" />
                </div>
              </template>
            </CommonButton>
          </nuxt-link>
        </CommonBlockPreloader>
      </div>
    </CardsBlank>
    <CommonModalsLogout
      :show="showLogoutModal"
      @close="showLogoutModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '~/store/auth'

const { t: $t } = useI18n()
const authStore = useAuthStore()

const loading = ref(false)
const showLogoutModal = ref(false)
const localePath = useLocalePath()
const user = computed(() => authStore.user)

useHead({
  title: $t('profile'),
})
</script>
<style scoped>
.break {
  word-break: break-word;
}
</style>
