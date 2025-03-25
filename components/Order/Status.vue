<template>
  <div>
    <div class="bg-white dark:bg-dark-100 rounded-2xl p-5 py-10 flex-center flex-col transition-300">
      <img
          v-if="url"
        :src="url"
        class="max-w-[100px] max-h-[100px] w-full h-full object-cover"
      />
      <CommonBlockPreloader
        :loading="loading"
        height="30px"
        width="400px"
        margin="0 0 16px"
      >
        <h3 class="text-xl text-dark font-bold mt-5 dark:text-white transition-300">
          {{ log?.status_name }}
        </h3>
      </CommonBlockPreloader>
      <CommonBlockPreloader
        :loading="loading"
        height="17px"
        width="700px"
        margin="0 0 16px"
      >
        <p class="text-gray-200 text-base font-normal dark:text-gray-300 mt-1.5 transition-300">
          {{ log?.description }}
        </p>
      </CommonBlockPreloader>
      <CommonBlockPreloader :loading="loading" height="17px" width="200px">
        <p class="text-xs text-dark transition-300 font-normal mt-3">
          {{ dayjs(log?.date).format('DD.MM.YYYY') }}
        </p>
      </CommonBlockPreloader>
    </div>
    <div
        v-if="courier"
      class="bg-white dark:bg-dark-100 transition-300 rounded-2xl p-5 mt-5 flex justify-between items-center"
    >
      <div>
        <p class="text-gray-200 text-sm mb-1 dark:text-gray-300 transition-300">{{ courier?.role_name }}</p>
        <h3 class="text-lg text-dark dark:text-white transition-300 font-normal">
          {{ courier?.full_name?.length ? courier?.full_name : $t('anonymous') }}
        </h3>
      </div>
      <a :href="`tel:+998${courier?.contact_phone}`">
        <CommonButton :text="`+${formatPhoneNumber('+998' + courier?.contact_phone)}`" />
      </a>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { IStatusLogs } from '~/types/order'
import dayjs from 'dayjs'
import {formatPhoneNumber} from "~/helpers";

interface Props {
  logs: IStatusLogs[]
  status: number
  loading?: boolean
  courier: {
    car_number: string
    contact_phone:string
    full_name: string
    role_name: string
  }
}
const props = withDefaults(defineProps<Props>(), {})

const log = computed(() => {
  const res = props.logs?.find((el) => el?.status === props?.status)
  return res
})

const url = computed(() => {
  if (props.status === 5) {
    return `/images/logo/clock-status.png`
  } else if (props.status === 6) {
    return `/images/logo/check-status.png`
  } else {
    return ''
  }
})
</script>
