<template>
  <div
    v-if="countImg == 1"
    class="rounded-xl border border-solid border-gray-500 flex justify-center items-center h-full w-full"
  >
    <img
      v-if="images[0].default"
      :src="images[0].default"
      alt="images"
      class="h-full w-full object-cover rounded-xl"
    />
  </div>
  <div
    v-else-if="countImg == 2"
    class="rounded-xl p-1 bg-white border border-solid border-gray-500 max-h-[120px] relative w-[120px] flex flex-col justify-center flex-shrink-0 overflow-hidden divide-y divide-y-dark/10"
  >
    <div
      class="h-[60px]"
      v-for="(item, i) in images"
      :key="i"
    >
      <img
        v-if="item?.default"
        :src="item.default"
        alt="images"
        class="w-full h-full object-cover"
      />
    </div>
  </div>
  <div
    v-else-if="countImg > 2"
    class="rounded-xl border border-solid border-gray-500 h-[120px] w-[120px] grid grid-cols-2 grid-rows-[60px,60px] p-1 overflow-hidden"
  >
    <div
      class="h-[60px] w-[60px] fourImg flex justify-center items-center p-1 relative"
      v-for="(item, i) in images"
      :key="i"
      :class="{ blurImg: i == 3 }"
    >
      <nuxt-link :to="i == 3 ? '/' : ''" class="block">
        <img
          v-if="item?.default"
          :src="item.default"
          alt="images"
          class="h-full w-full object-contain"
        />
      </nuxt-link>
    </div>
  </div>
  <div
    v-else
    class="rounded-xl border border-solid border-gray-500 flex justify-center items-center p-1 h-full w-full"
  >
    <img
      src="/images/defaults/image.webp"
      alt="images"
      class="h-full w-full object-cover"
    />
  </div>
</template>

<script setup lang="ts">
import type { IImages } from '~/types/order'

interface Props {
  countImg: number
  images?: IImages[]
}

withDefaults(defineProps<Props>(), {
  countImg: 1,
})
</script>

<style scoped>
.img-double:not(:last-child) {
  border-bottom: 1px solid #f7f8fa;
}

.fourImg:nth-child(1) {
  border-right: 1px solid #f7f8fa;
  border-bottom: 1px solid #f7f8fa;
}
.fourImg:nth-child(4) {
  /*border-left: 1px solid #f7f8fa;*/
  border-top: 1px solid #f7f8fa;
}
.fourImg:nth-child(3) {
  border-right: 1px solid #f7f8fa;
  /*border-top: 1px solid #f7f8fa;*/
}

.blurImg ::before {
  content: '+3';
  position: absolute;
  width: 55px;
  height: 55px;
  top: 0;
  z-index: 2;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: rgba(56, 56, 56, 0.4);
  mix-blend-mode: normal;
  backdrop-filter: blur(2px);
  border-radius: 0 0 8px 0;
}
</style>
