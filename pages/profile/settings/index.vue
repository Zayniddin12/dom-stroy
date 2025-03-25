<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
    <NuxtLink
      :to="localePath('/profile/settings/change-password')"
      class="bg-white px-5 py-[18px] rounded-xl flex-y-center gap-2 w-full cursor-pointer group shadow-card transition-300 dark:bg-dark-300 border border-white dark:border-dark-300 dark:hover:transition-300 dark:hover:border-red"
    >
      <i
        class="icon-lock-unlocked text-[27px] text-gray-200 group-hover:text-red transition-300"
      />
      <p
        class="text-xl text-dark leading-130 font-semibold group-hover:text-red transition-300 dark:text-white line-clamp-1"
      >
        {{ $t('change_password') }}
      </p>
    </NuxtLink>
    <NuxtLink
      :to="localePath('/profile/settings/change-number')"
      class="bg-white dark:bg-dark-300 border border-white dark:border-dark-300 dark:hover:transition-300 dark:hover:border-red px-5  py-[18px] rounded-xl flex-y-center gap-2 w-full cursor-pointer group shadow-card transition-300"
    >
      <i
        class="icon-phone text-[30px] text-gray-200 group-hover:text-red transition-300"
      />
      <p
        class="text-xl text-dark leading-130 font-semibold group-hover:text-red transition-300 dark:text-white line-clamp-1">

        {{ $t('change_phone') }}
      </p>
    </NuxtLink>
  <SettingsDarkMode/>
<common-is-master-button/>
  </div>
</template>

<script setup lang="ts">
import Settings from "~/pages/profile/settings.vue";

const localePath = useLocalePath()
</script>

<style scoped>
.shadow-card:hover {
  box-shadow: 0 4px 19px rgba(0, 0, 0, 0.05);
}
</style>
