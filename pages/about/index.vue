<template>
  <div class="container mx-auto">
    <CommonBreadcrumb v-bind="{ routes }" />

    <!--    <pre v-if="bannerText" v-html="bannerText"></pre>-->
    <div
      class="banner flex flex-col md:flex-row justify-between items-center gap-[40px] mt-5 md:mt-[34px]"
    >
      <div class="md:w-[60%] max-w-[681px]">
        <CommonBlockPreloader :loading="loading" height="40px" width="90%">
          <p
            v-if="bannerText"
            class="text-[#383838] dark:text-white leading-130 text-2xl md:text-[30px] lg:text-4xl font-bold"
          >
            {{ $t('about') }}
          </p>
        </CommonBlockPreloader>

        <CommonBlockPreloader
          :loading="loading"
          height="25px"
          width="100%"
          margin="20px 0"
          line="4"
          v-for="i in 5"
          :key="i"
        >
        </CommonBlockPreloader>
        <CommonBlockPreloader
          :loading="loading"
          height="25px"
          width="100%"
          margin="20px 0"
        >
          <div class="about-banner" v-if="bannerText" v-html="bannerText"></div>
        </CommonBlockPreloader>
      </div>
      <div class="w-full md:!w-[40%]">
        <img
          src="/images/aboutGroup.png"
          alt="about banner"
          class="w-full md:ml-auto"
        />
      </div>
    </div>
  </div>
  <div class="bg-white dark:bg-dark-300 mt-[72px]">
    <div class="container mx-auto pt-8 pb-[52px]">
      <h3
        class="text-[#383838] dark:text-white leading-130 text-xl md:text-2xl lg:text-[32px] font-bold"
      >
        {{ $t('statistics') }}
      </h3>
      <div class="mt-2 sm:mt-4 md:mt-8">
        <div
          class="grid grid-cols-1 md:flex md:flex-wrap md:items-center md:justify-between gap-2 sm:gap-4 md:gap-8 w-full"
        >
          <LazyAboutStatistic
            v-for="(item, index) in statistics"
            :key="index"
            :card="item"
            :loading="loading"
          />
        </div>
      </div>
    </div>
  </div>

  <div class="container mx-auto mt-16 pb-16">
    <CommonSectionsSectionHead
      :title="'parfume_from_top_brands'"
      section-link="/brands"
      :section-title="'all_brands'"
    />

    <div
      class="grid grid-cols-1 md:!gird-cols-2 lg:grid-cols-4 md:gap-x-6 gap-y-3 md:space-y-0"
    >
      <CardsTopBrands
        v-for="(item, index) in manufactures"
        :key="index"
        :card="item"
        :loading="manufacturesLoading"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useSettingsStore } from '~/store/settings'
import { useStatisticStore } from '~/store/statistics'
import { useManufactureStore } from '~/store/manufacture'

const aboutSettingStore = useSettingsStore()

const statisticStore = useStatisticStore()
const manufacturesStore = useManufactureStore()

const manufactures = computed(() => manufacturesStore.manufactures)
const manufacturesLoading = computed(
  () => manufacturesStore.manufacturesLoading
)

const { t: $t } = useI18n()

const statistics = computed(() => [
  {
    index: 0,
    icon: 'icon-users-group',
    title: $t('clients_trusted_us'),
    statistic: statisticStore?.statistics?.users_count,
  },
  {
    index: 1,
    icon: 'icon-list-heart',
    title: $t('quality_products'),
    statistic: statisticStore?.statistics?.categories_count,
  },
  {
    index: 2,
    icon: 'icon-users-group',
    title: $t('orders_to_date'),
    statistic: statisticStore?.statistics?.orders_count,
  },
])

const loading = ref(true)

const data = ref([])

const bannerText = computed(() => aboutSettingStore?.data?.description)

onMounted(() => {
  aboutSettingStore.getAboutSetting()
  statisticStore.fetchData()

  manufacturesStore.fetchManufactures({ size: 4 }).finally(() => {
    loading.value = false
  })
})

useHead({
  title: $t('about'),
})

const routes = [
  {
    name: $t('main'),
    route: '/',
  },
  {
    name: $t('about'),
  },
]
</script>

<style>
.about-banner p {
  @apply text-dark font-normal text-xs sm:text-base md:text-lg mt-4 dark:text-white;
}
</style>
