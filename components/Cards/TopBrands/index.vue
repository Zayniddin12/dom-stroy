<template>
  <div
    class="brand-card bg-white dark:bg-dark-300 rounded-2xl p-4 flex flex-col"
  >
    <div class="flex items-center space-x-3 group">
      <CommonBlockPreloader
        class="shrink-0"
        :loading="loading"
        width="44px"
        height="44px"
        border-radius="999px"
      >
        <img
          v-if="card && card?.icon"
          class="border border-gray-300 rounded-full w-11 h-11 object-contain dark:bg-white"
          :src="card?.icon"
          alt="profile-photo"
        />
      </CommonBlockPreloader>
      <div class="flex flex-col w-full">
        <CommonBlockPreloader
          :loading="loading"
          width="100%"
          height="20px"
          border-radius="4px"
          margin="2px 0 0 0"
        >
          <NuxtLink
            :to="
              localePath({
                path: '/products',
                query: { manufacturers: card?.id },
              })
            "
            class="text-dark dark:text-white font-semibold text-xl leading-130 duration-300 group-hover:text-red"
          >
            {{ card?.title }}
          </NuxtLink>
        </CommonBlockPreloader>
        <CommonBlockPreloader
          :loading="loading"
          width="100%"
          height="20px"
          border-radius="4px"
          margin="4px 0 0 0"
        >
          <p
            class="text-gray-100 dark:text-gray-300 font-normal text-xs leading-[16px]"
          >
            {{ card?.description }}
          </p>
        </CommonBlockPreloader>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-2 mt-4 grow-[1]">
      <template v-if="card?.products?.length > 2">
        <NuxtLink
          v-for="(item, index) in card?.products"
          class="relative group"
          :class="index === 0 ? 'col-span-2 max-h-[200px]' : 'max-h-[120px]'"
          :to="localePath(`/products/${item?.slug}`)"
        >
          <CommonBlockPreloader
            :loading="loading"
            width="100%"
            height="100%"
            border-radius="16px"
            margin=""
          >
            <img
              v-if="item?.images[0]?.compressed"
              class="w-full object-cover rounded-lg"
              :class="index === 0 ? 'max-h-[200px] h-full ' : 'h-[120px]'"
              :src="item?.images[0]?.compressed"
              alt="image-parfume"
            />

            <div
              class="shadow-img absolute bottom-0 p-2 duration-300 opacity-0 group-hover:opacity-100 flex items-end justify-start rounded-b-lg"
            >
              <p class="text-white font-semibold text-sm leading-[17px]">
                {{ formatMoneyDecimal(item?.price) }} {{ $t('sum') }}
              </p>
            </div>
          </CommonBlockPreloader>
        </NuxtLink>
      </template>
      <template v-else-if="card?.products?.length === 2">
        <NuxtLink
          v-for="(item, index) in card?.products"
          class="relative group col-span-2 max-h-[160px]"
          :to="localePath(`/products/${item?.slug}`)"
        >
          <CommonBlockPreloader
            :loading="loading"
            width="100%"
            height="100%"
            border-radius="16px"
            margin=""
          >
            <img
              v-if="item?.images[0]?.compressed"
              class="w-full object-cover rounded-lg max-h-[160px]"
              :src="item?.images[0]?.compressed"
              alt="image-parfume"
            />
            <div
              class="shadow-img absolute bottom-0 p-2 duration-300 opacity-0 group-hover:opacity-100 flex items-end justify-start rounded-b-lg"
            >
              <p class="text-white font-semibold text-sm leading-[17px]">
                {{ formatMoneyDecimal(item?.price) }} {{ $t('sum') }}
              </p>
            </div>
          </CommonBlockPreloader>
        </NuxtLink>
      </template>
      <template v-else-if="card?.products?.length === 1">
        <NuxtLink
          v-for="(item, index) in card?.products"
          class="relative group col-span-2 w-full h-full'"
          :to="localePath(`/products/${item?.slug}`)"
        >
          <CommonBlockPreloader
            :loading="loading"
            width="100%"
            height="100%"
            border-radius="16px"
            margin=""
            content-wrapper-class="!h-full !flex items-center justify-center"
            class="!h-full"
          >
            <img
              v-if="item?.images[0]?.compressed"
              class="w-full object-cover rounded-lg m-auto"
              :src="item?.images[0]?.compressed"
              alt="image-parfume"
            />
            <div
              class="shadow-img absolute bottom-0 p-2 duration-300 opacity-0 group-hover:opacity-100 flex items-end justify-start rounded-b-lg"
            >
              <p class="text-white font-semibold text-sm leading-[17px]">
                {{ formatMoneyDecimal(item?.price) }} {{ $t('sum') }}
              </p>
            </div>
          </CommonBlockPreloader>
        </NuxtLink>
      </template>
      <template v-else>
        <img
          class="w-full h-full object-cover col-span-2 rounded-lg"
          src="/images/defaults/image.webp"
          alt="image-parfume"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { TProductsManufacture } from '~/types/manufacture'
import { formatMoneyDecimal } from '../../../helpers'

const localePath = useLocalePath()

interface Props {
  card?: TProductsManufacture
  loading?: boolean
  useDefault?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  useDefault: false,
})
</script>

<style scoped>
.brand-card {
  transition: all ease 0.3s;
  border: 1px solid transparent;
}

.brand-card:hover {
  border: 1px solid #eaebed;
  box-shadow: 0px 8px 40px rgba(40, 40, 40, 0.12);
  cursor: pointer;
}

.brand-card:hover .shadow-img {
  opacity: 1;
}

.shadow-img {
  background: linear-gradient(
    180deg,
    rgba(26, 26, 26, 0) 0%,
    rgba(26, 26, 26, 0.8) 73.96%,
    #1a1a1a 100%
  );
  height: 80px;
  width: 100%;
}
</style>
