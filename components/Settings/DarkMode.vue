<template>
    <div
        class="bg-white dark:bg-dark-300 border border-white dark:border-dark-300 dark:hover:transition-300 flex items-center justify-between dark:hover:border-red px-5 py-3 rounded-xl  w-full cursor-pointer group shadow-card transition-300"
    >
      <div class="flex items-center gap-2">
        <i
            class="icon-dark text-[22px] text-gray-200 group-hover:text-red transition-300 mt-0.5"
        />
        <p
            class="text-xl text-dark leading-130 font-semibold group-hover:text-red transition-300 dark:text-white line-clamp-1">

          {{ $t('dark') }}
        </p>
      </div>


      <div class=" p-2"><CommonThemeSwitcher /></div>
    </div>
</template>
<script setup lang="ts">
</script>