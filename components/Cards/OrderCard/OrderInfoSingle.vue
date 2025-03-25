<template>
  <div>
    <CommonBlockPreloader :loading="loading" height="23px" width="300px">
      <NuxtLink
        :to="localePath(`/products/${id}`)"
        class="md:text-dark dark:text-white text-gray-100 font-bold leading-130 text-xs md:text-xl line-clamp-2 transition-200 ease-in-out group-hover:text-red"
      >
        {{ title }}
      </NuxtLink>
    </CommonBlockPreloader>
    <div class="flex items-center gap-[8px]">
      <CommonBlockPreloader
        :loading="loading"
        height="23px"
        width="300px"
        margin="8px 4px 0 0"
        class="!block"
      >
        <CommonRating
          :rate="rate"
          class="gap-2"
          star-class="!text-lg hidden md:block"
        />
      </CommonBlockPreloader>
      <CommonBlockPreloader :loading="loading" height="23px" width="10%">
        <p
          class="text-[#9E9EA5] text-[14px] leading-130 font-normal"
          v-if="commentCount"
        >
          {{ commentCount }}
        </p>
      </CommonBlockPreloader>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  rate?: number
  title?: string
  rank?: number
  id?: string
  loading?: boolean
  commentCount: number
}
withDefaults(defineProps<Props>(), {
  rate: 4,
  title: 'Today Parfum туалетная вода Absolute',
  rank: 68,
})
const localePath = useLocalePath()
</script>
