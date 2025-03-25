<template>
  <ul>
    <li
        class="flex-center-between py-3 border-b border-[#F7F8FA] dark:border-b-dark-300 transition-300"
    >
      <p
          class="text-xl leading-140 font-semibold text-gray-200"
      >
        <span>{{ $t('total_price') }}: </span>
      </p>
      <CommonBlockPreloader height="20px" width="170px" :loading="loading">
        <p
            class="leading-140 font-semibold text-dark dark:text-white flex-shrink-0 text-2xl"
        >
          {{ formatMoneyDecimal(data?.total_price) }}
          <span class="text-gray-200 text-xl">uzs</span>
        </p>
      </CommonBlockPreloader>
    </li>
    <li
      class="flex-center-between py-3 border-b border-[#F7F8FA] dark:border-b-dark-300 transition-300"
    >
      <p
        class="text-base leading-140 font-semibold text-gray-100"
      >
        <span>{{ $t('itogo') }}: </span>
      </p>
      <CommonBlockPreloader height="20px" width="170px" :loading="loading">
        <p
          class="leading-140 font-semibold text-dark dark:text-white flex-shrink-0"
        >
          {{ formatMoneyDecimal(data?.total_real_order_price) }}
          <span class="text-xl">uzs</span>
        </p>
      </CommonBlockPreloader>
    </li>
    <li
      class="flex-center-between py-3 border-b border-[#F7F8FA] dark:border-b-dark-300 transition-300"
    >
      <p
        class="text-base leading-140 font-semibold text-gray-100"
      >
        {{ $t('sale') }}:
      </p>
      <CommonBlockPreloader height="20px" width="170px" :loading="loading">
        <p
          class="leading-140 font-semibold text-dark dark:text-white flex-shrink-0"
        >
          {{
            data?.total_order_discount_price &&
            parseInt(data?.total_order_discount_price)
              ? ''
              : '-'
          }}
          {{ formatMoneyDecimal(data?.total_order_discount_price)
          }}<span class="text-xl"> uzs</span>
        </p>
      </CommonBlockPreloader>
    </li>
    <li
        v-if="data?.promo_discount"
        class="flex-center-between py-3 border-b border-[#F7F8FA] dark:border-b-dark-300 transition-300"
    >
      <p
          class="text-base leading-140 font-semibold text-gray-100"
      >
        {{ $t('using_promocode') }}:
      </p>
      <CommonBlockPreloader height="20px" width="170px" :loading="loading">
        <p
            class="leading-140 font-semibold text-dark dark:text-white flex-shrink-0"
        >
          {{
            data?.promo_discount &&
            parseInt(data?.promo_discount)
                ? '-'
                : '-'
          }}{{ formatMoneyDecimal(data?.promo_discount)}}<span class="text-xl">uzs</span>
        </p>
      </CommonBlockPreloader>
    </li>
<!--    <li-->
<!--      v-if="account"-->
<!--      class="flex-center-between py-3 border-b border-[#F7F8FA] dark:border-b-dark-300 transition-300"-->
<!--    >-->
<!--      <p-->
<!--        class="leading-140 font-normal text-gray-100 dark:text-gray-300 transition-300"-->
<!--      >-->
<!--        {{ $t('cashback_in_account') }}:-->
<!--      </p>-->
<!--      <CommonBlockPreloader height="20px" width="100px" :loading="loading">-->
<!--        <p-->
<!--          class="leading-140 font-normal text-dark-200 text-2xl dark:text-white flex-shrink-0 transition-300"-->
<!--        >-->
<!--          {{ formatMoneyDecimal(account) }} <span class="text-xl">uzs</span>-->
<!--        </p>-->
<!--      </CommonBlockPreloader>-->
<!--    </li>-->
        <li class="flex-center-between py-3 duration-300 border-b border-[#F7F8FA] dark:border-b-dark-300">
          <p class="leading-140 font-semibold text-gray-100 text-base">{{ $t('nds') }}:</p>
          <CommonBlockPreloader height="20px" width="170px" :loading="loading">
            <p class="leading-140 font-semibold text-dark dark:text-white flex-shrink-0">
              {{ formatNumber(parseInt(data?.nds_price)) }} UZS ({{
                parseInt(data?.nds)
              }}%)
            </p>
          </CommonBlockPreloader>
        </li>
    <li class="flex-center-between py-3 border-b border-[#F7F8FA] dark:border-b-dark-300 duration-300 ">
      <p class="leading-140 font-semibold text-gray-100">
        {{ $t('delivery_way') }}: <br />
        <CommonBlockPreloader height="15px" width="140px" :loading="loading">
              <span class="text-red" v-if="data?.delivery_type">
                ({{ data?.delivery_type }})
              </span>
        </CommonBlockPreloader>
      </p>
      <CommonBlockPreloader height="20px" width="170px" :loading="loading">
        <p class="leading-140 font-semibold text-dark dark:text-white flex-shrink-0">
          {{ data?.delivery_price && parseInt(data?.delivery_price) ? '+' : ''
          }}{{ formatMoneyDecimal(data?.delivery_price) }} UZS
        </p>
      </CommonBlockPreloader>
    </li>
    <!--    <li-->
    <!--      v-if="$route?.path !== '/basket'"-->
    <!--      class="flex-center-between py-3 bg-pink duration-300 -mx-5 px-5"-->
    <!--    >-->
    <!--      <p class="leading-140 font-semibold text-red">{{ $t('cashback') }}:</p>-->
    <!--      <CommonBlockPreloader height="20px" width="170px" :loading="loading">-->
    <!--        <p class="leading-140 font-semibold text-red flex-shrink-0">-->
    <!--          {{-->
    <!--            data?.cacheback_earning && parseInt(data?.cacheback_earning)-->
    <!--              ? '+'-->
    <!--              : ''-->
    <!--          }}{{ formatNumber(parseInt(data?.cacheback_earning)) }} UZS ({{-->
    <!--            parseInt(settingsStore.settings?.cashback_percent)-->
    <!--          }}%)-->
    <!--        </p>-->
    <!--      </CommonBlockPreloader>-->
    <!--    </li>-->
    <li
      v-if="parseInt(data?.cashback_price)"
      class="flex-center-between py-3 duration-300"
    >
      <p class="leading-140 font-normal text-gray-100">
        {{ $t('cashback_usage') }}:
      </p>
      <CommonBlockPreloader height="20px" width="170px" :loading="loading">
        <p class="leading-140 font-normal text-dark flex-shrink-0">
          {{ formatNumber(parseInt(data?.cashback_price)) }}
          <span class="text-xl"> uzs</span>
        </p>
      </CommonBlockPreloader>
    </li>
  </ul>
</template>
<script setup lang="ts">
import type { ICheck } from '~/types/order'
import { formatMoneyDecimal, formatNumber } from '~/helpers'
import { useSettingsStore } from '~/store/settings'
import { useOrderStore } from '~/store/order'

interface Props {
  data: ICheck
  loading: boolean
  account: number
  basket: boolean
}
defineProps<Props>()

const settingsStore = useSettingsStore()
const orderStore = useOrderStore()
settingsStore.getSetting()
</script>
