<template>
  <div
    class="grid items-center gap-5 !mt-5 md:!mt-0 md:gap-0 grid-cols-1-max space-x-2 mb-5"
  >
    <CommonBlockPreloader width="140px" height="40px" :loading>
      <p :class="titleStyle" class="section-title dark:text-white" v-if="title">
        {{ $t(title ?? '') }}
      </p>
    </CommonBlockPreloader>
    <slot>
      <div
        v-if="sectionLink"
        :key="sectionLink"
        class="flex items-center group space-x-1 cursor-pointer"
      >
        <NuxtLink
          :to="sectionLink"
          class="text-gray-200 dark:text-gray-300 transition-300 font-semibold text-base leading-130 duration-300 group-hover:text-red hidden md:block"
        >
          {{ $t(sectionTitle ?? '') }}
        </NuxtLink>
        <NuxtLink
          :to="sectionLink"
          :key="sectionLink"
          class="text-gray-200 dark:text-gray-300 transition-300 font-normal text-sm leading-130 duration-300 group-hover:text-red md:hidden"
        >
          {{ $t('all') }}
        </NuxtLink>
        <span
          class="text-2xl font-bold icon-arrow-right text-gray-200 duration-300 group-hover:text-red"
        />
      </div>
    </slot>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  title?: string
  sectionLink?: string
  sectionTitle?: string
  titleStyle?: string
}

withDefaults(defineProps<Props>(), {})
const localePath = useLocalePath()
</script>
