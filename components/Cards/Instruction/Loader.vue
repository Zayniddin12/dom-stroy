<template>
  <div>
    <div
        class="rounded-xl bg-gray-500 p-4 group transition-200 border border-transparent dark:bg-dark-300"
    >
      <CommonBlockPreloader width="160px" height="18.2px" :loading="loading">
        <p
            class="transition-200 text-sm font-bold text-dark leading-130 group-hover:text-red"
        >
          {{ card?.title }}
        </p>
      </CommonBlockPreloader>

      <div class="mt-4 bg-white rounded-[9px] py-2 px-3 transition-200 dark:bg-dark-500">
        <CommonBlockPreloader
            v-for="i in 2"
            :key="i"
            width="100%"
            height="15.59px"
            :loading="loading"
            preloader-class="mb-0.5"
        />
        <CommonBlockPreloader
            width="100%"
            height="15.59px"
            :loading="loading"
            preloader-class="mb-2"
        >
          <div
              class="text-xs font-semibold text-dark leading-130 mb-2 line-clamp-[4] "
              v-html="card?.description"
          />
        </CommonBlockPreloader>

        <CommonBlockPreloader height="18px" width="70px" :loading="loading">
          <div
              class="transition-200 flex-y-center gap-1 text-dark group-hover:text-red text-xs leading-130 font-normal group"
          >
            {{ $t('more') }}
            <i
                class="icon-arrow-right text-red text-lg transition-300 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100"
            />
          </div>
        </CommonBlockPreloader>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  card: {
    title: string
    id: number
    description: string
  }
  loading?: boolean
}

withDefaults(defineProps<Props>(), {})
const localePath = useLocalePath()
</script>
