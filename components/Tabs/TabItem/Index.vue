<template>
  <NuxtLink
      :to="localePath(tab?.link?.path)"
      class="flex-y-center gap-3 transition-300 bg-gray-600 dark:bg-dark-300 transition dark:duration-300  p-3 pb-2.5 border border-solid border-transparent hover:border-red  group rounded-lg cursor-pointer"
      :class="{ '!bg-gray-600 pointer-events-none': loading }"
  >
    <CommonBlockPreloader :loading="loading" width="32px" height="32px">
      <div
          class="w-8 h-8 rounded bg-gray-300 flex-center transition-300 group-hover:bg-red group-hover:bg-opacity-10 transition dark:duration-300 card-icon dark:bg-white/10"
      >
        <svg
            v-if="tab?.icon === 'settings'"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
          <path
              class="group-hover:fill-red transition-300"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9.82383 0.121793C9.52756 0 9.15196 0 8.40078 0C7.6496 0 7.27401 0 6.97773 0.121793C6.5827 0.284183 6.26885 0.595662 6.10523 0.987706C6.03053 1.16667 6.0013 1.3748 5.98986 1.67839C5.97305 2.12454 5.74251 2.53752 5.35291 2.76074C4.96332 2.98397 4.48769 2.97563 4.08997 2.76701C3.81933 2.62504 3.62309 2.5461 3.42957 2.52081C3.00565 2.46542 2.57693 2.57943 2.23771 2.83776C1.98329 3.0315 1.7955 3.35432 1.4199 3.99995C1.04431 4.64557 0.856516 4.96839 0.814659 5.28392C0.758849 5.70464 0.873726 6.13013 1.13402 6.46678C1.25283 6.62045 1.4198 6.74962 1.67894 6.91122C2.05991 7.14879 2.30504 7.55349 2.30501 8.00002C2.30499 8.4465 2.05987 8.85114 1.67894 9.08868C1.41975 9.2503 1.25276 9.37948 1.13394 9.53316C0.873647 9.86982 0.75877 10.2953 0.81458 10.716C0.856438 11.0316 1.04423 11.3544 1.41982 12C1.79542 12.6456 1.98321 12.9684 2.23763 13.1622C2.57685 13.4205 3.00557 13.5345 3.42949 13.4791C3.623 13.4538 3.81922 13.3749 4.08985 13.233C4.4876 13.0243 4.96326 13.016 5.35288 13.2392C5.74249 13.4625 5.97305 13.8755 5.98986 14.3217C6.0013 14.6252 6.03054 14.8333 6.10523 15.0123C6.26885 15.4043 6.5827 15.7158 6.97773 15.8782C7.27401 16 7.6496 16 8.40078 16C9.15196 16 9.52756 16 9.82383 15.8782C10.2189 15.7158 10.5327 15.4043 10.6963 15.0123C10.771 14.8333 10.8003 14.6252 10.8117 14.3216C10.8285 13.8754 11.059 13.4625 11.4486 13.2392C11.8382 13.016 12.3139 13.0243 12.7117 13.2329C12.9823 13.3749 13.1785 13.4538 13.372 13.4791C13.7959 13.5345 14.2246 13.4205 14.5639 13.1621C14.8183 12.9684 15.0061 12.6456 15.3817 11.9999C15.7573 11.3543 15.945 11.0315 15.9869 10.716C16.0427 10.2953 15.9278 9.86976 15.6675 9.53311C15.5487 9.37944 15.3817 9.25025 15.1226 9.08864C14.7416 8.8511 14.4965 8.44643 14.4965 7.99993C14.4966 7.55348 14.7417 7.14887 15.1226 6.91135C15.3818 6.74972 15.5488 6.62053 15.6676 6.46684C15.9279 6.13018 16.0428 5.7047 15.987 5.28398C15.9451 4.96844 15.7573 4.64563 15.3817 4C15.0061 3.35437 14.8183 3.03156 14.5639 2.83781C14.2247 2.57949 13.796 2.46548 13.3721 2.52087C13.1786 2.54615 12.9823 2.62509 12.7117 2.76704C12.314 2.97567 11.8383 2.98401 11.4487 2.76077C11.0591 2.53752 10.8285 2.12453 10.8117 1.67835C10.8003 1.37478 10.771 1.16666 10.6963 0.987706C10.5327 0.595662 10.2189 0.284183 9.82383 0.121793ZM8.40078 10.4C9.73636 10.4 10.8191 9.32548 10.8191 8C10.8191 6.67452 9.73636 5.6 8.40078 5.6C7.06521 5.6 5.98251 6.67452 5.98251 8C5.98251 9.32548 7.06521 10.4 8.40078 10.4Z"
              fill="white"
          />
        </svg>
        <svg
            v-else-if="tab?.icon === 'document-text'"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
          <path
              class="group-hover:fill-red transition-300"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.73804 4.93726C4.80078 5.87452 4.80078 7.38301 4.80078 10.4V13.6C4.80078 16.617 4.80078 18.1255 5.73804 19.0627C6.6753 20 8.18379 20 11.2008 20H12.8008C15.8178 20 17.3263 20 18.2635 19.0627C19.2008 18.1255 19.2008 16.617 19.2008 13.6V10.4C19.2008 7.38301 19.2008 5.87452 18.2635 4.93726C17.3263 4 15.8178 4 12.8008 4H11.2008C8.18379 4 6.6753 4 5.73804 4.93726ZM8.20078 8.8C8.20078 8.46863 8.46941 8.2 8.80078 8.2H15.2008C15.5322 8.2 15.8008 8.46863 15.8008 8.8C15.8008 9.13137 15.5322 9.4 15.2008 9.4H8.80078C8.46941 9.4 8.20078 9.13137 8.20078 8.8ZM8.20078 12C8.20078 11.6686 8.46941 11.4 8.80078 11.4H15.2008C15.5322 11.4 15.8008 11.6686 15.8008 12C15.8008 12.3314 15.5322 12.6 15.2008 12.6H8.80078C8.46941 12.6 8.20078 12.3314 8.20078 12ZM8.80078 14.6C8.46941 14.6 8.20078 14.8686 8.20078 15.2C8.20078 15.5314 8.46941 15.8 8.80078 15.8H12.8008C13.1322 15.8 13.4008 15.5314 13.4008 15.2C13.4008 14.8686 13.1322 14.6 12.8008 14.6H8.80078Z"
              fill="white"
          />
        </svg>
        <svg
            v-else-if="tab?.icon === 'check-tick'"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
          <path
              class="group-hover:fill-red transition-300"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12ZM12 16.6C12.3314 16.6 12.6 16.3314 12.6 16V11.2C12.6 10.8686 12.3314 10.6 12 10.6C11.6686 10.6 11.4 10.8686 11.4 11.2V16C11.4 16.3314 11.6686 16.6 12 16.6ZM12 8C12.4418 8 12.8 8.35817 12.8 8.8C12.8 9.24183 12.4418 9.6 12 9.6C11.5582 9.6 11.2 9.24183 11.2 8.8C11.2 8.35817 11.5582 8 12 8Z"
              fill="white"
          />
        </svg>

        <i
            v-else
            :class="`icon-${tab?.icon}`"
            class="text-2xl text-white group-hover:text-red transition-300"
        />
      </div>
    </CommonBlockPreloader>
    <CommonBlockPreloader height="20.8px" width="150px" :loading="loading">
      <p class="text-dark leading-130 font-semibold text-base dark:text-white  transition dark:duration-300  ">
        {{ $t(tab?.name) }}
      </p>
    </CommonBlockPreloader>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { RouteParamsRaw } from 'vue-router'

interface Props {
  tab: {
    id: number
    name: string
    icon: string
    link: RouteParamsRaw
  }
  active?: boolean
  loading?: boolean
}

withDefaults(defineProps<Props>(), {})
const localePath = useLocalePath()
</script>

<style scoped>
.router-link-exact-active {
  @apply bg-red bg-opacity-10 border-red;
}

.router-link-exact-active .card-icon {
  @apply bg-red;
}

.router-link-exact-active:hover .card-icon i {
  @apply !text-white;
}

.router-link-exact-active:hover .card-icon svg path {
  @apply !fill-white;
}

/*.router-link-active {*/
/*  @apply bg-red bg-opacity-10;*/
/*}*/

/*.router-link-active .card-icon {*/
/*  @apply bg-red;*/
/*}*/

/*.router-link-active:hover .card-icon i {*/
/*  @apply !text-white;*/
/*}*/

/*.router-link-active:hover .card-icon svg path {*/
/*  @apply !fill-white;*/
/*}*/
</style>
