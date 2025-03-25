<template>
  <CommonModalsModal :show="show" @close="emit('close')" inside>
    <div class="p-5">
      <p class="text-xl leading-6 font-bold text-dark dark:text-white">
        {{ $t('successful') }}
      </p>
    </div>

    <div class="mt-5 pr-5 pl-5 pb-5">
      <div class="flex-y-center space-x-3">
        <img src="/images/ordered-logo.svg" alt="ordered logo" />
        <p
          class="text-xl leading-130 text-dark font-bold text-left dark:text-white"
        >
          {{
            paymentType === 1
              ? $t('payment_with_cash')
              : $t('successfully_ordered')
          }}
        </p>
      </div>
      <div
        class="bg-gray-500 p-2 md:p-4 rounded-lg mt-4 md:mt-12 flex flex-wrap w-full dark:bg-[#575757]"
      >
        <div
          class="flex flex-col items-start mb-3"
          :class="paymentType === 1 ? 'w-full' : 'w-full'"
        >
          <p
            class="font-semibold text-xs text-gray-200 leading-130 mb-1 dark:text-gray-300"
          >
            {{ $t('number_order') }}:
          </p>
          <p
            class="font-bold leading-130 text-dark dark:text-white flex items-end"
          >
            <span
              class="icon-basket-solid text-dark_green text-[24px] leading-[24px] mr-0.5"
            />{{ formatNumber(data?.id) }}
          </p>
        </div>
        <div class="flex flex-col items-start w-full">
          <p
            class="font-semibold text-xs text-gray-200 leading-130 mb-1 dark:text-gray-300"
          >
            {{ $t('total') }}:
          </p>
          <p
            class="font-bold leading-130 text-dark dark:text-white flex items-end"
          >
            <span
              class="icon-money-wallet text-dark_green text-[24px] leading-[24px] mr-0.5"
            />{{ formatNumber(parseInt(data?.price)) }} UZS
          </p>
        </div>
        <div class="flex flex-col items-start w-[47%]" v-if="paymentType !== 1">
          <p
            class="font-semibold text-xs text-gray-200 leading-130 mb-1 dark:text-gray-300"
          >
            {{ $t('cashback') }}:
          </p>
          <p
            class="font-bold leading-130 text-dark dark:text-white flex items-end"
          >
            <span
              class="icon-money-circle text-dark_green text-[24px] leading-[24px] mr-0.5"
            />+{{ formatNumber(parseInt(data?.cashback)) }} UZS
          </p>
        </div>
      </div>
        <p v-if="props.form.values.express === 3" class="mt-4 text-base font-semibold text-dark">Olib ketish manzillari</p>
      <div
        v-if="props.form.values.express === 3"
        class="mt-1 bg-[#F2F3F5] dark:bg-[#ffffff1a] rounded-lg !relative"
      >
        <DeliveryMap :location-list="locationList" @update:model-value="updateCoordinates" />
        <div class="relative">
          <img class="absolute z-2" src="/images/location.svg" alt="image" />
          <a
            :href="`https://yandex.uz/maps/?ll=${selectedCoordinates[0] ?? 69.26861792476403},${selectedCoordinates[1] ?? 41.340635417786}&mode=routes&rtext=~${selectedCoordinates[1] ?? 41.340635417786},${selectedCoordinates[0] ?? 69.26861792476403}&ruri=~&z=12`"
            target="_blank"
            class="mx-auto w-full"
          >
            <CommonButton
              class="mx-auto !py-2.5 z-1 w-full"
              :text="$t('pick_up_address')"
              :disabled
            />
          </a>
        </div>
      </div>
      <a
        :href="`tel:${commonStore.contacts?.phone}`"
        v-if="props.form.values.express === 3"
        class="px-3 py-2 flex justify-between items-center bg-[#292929] rounded-xl mt-4 border border-transparent hover:border-red cursor-pointer duration-300"
      >
        <p class="text-sm font-medium tracking-[0.15px] text-white">
          {{ $t('contact_with_us') }}
        </p>
        <span class="rounded-lg bg-[#ffffff52] px-3 py-0.5 w-max block">
          <img src="/images/phone.svg" alt="ico" />
        </span>
      </a>

      <div class="flex gap-2 mt-4">
        <CommonButton
          class="w-full"
          :text="$t('status_order')"
          @click="showStatus(data?.id)"
        />
        <CommonButton
          class="w-full"
          :text="$t('go_home')"
          @click="emit('go-main')"
          variant="register"
        />
      </div>
    </div>
  </CommonModalsModal>
</template>
<script setup lang="ts">
import { formatNumber } from '~/helpers'
import { useCommonStore } from '~/store/common'
interface Props {
  show: boolean
  data?: object
  paymentType: number
  form: any
}

const commonStore = useCommonStore()
const props = defineProps<Props>()
const locationList = ref([])
const disabled = ref(true)
const map = ref<any>([+props.data?.longitude, +props?.data?.latitude])
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'go-main'): void
}>()
const localePath = useLocalePath()
const router = useRouter()
const api = useApi()
const selectedCoordinates = ref([])
const showStatus = (id: number) => {
  emit('close')
  setTimeout(() => {
    router.push(localePath(`/order/${id}`))
  })
}

function updateCoordinates(coordinates) {
  disabled.value = false
  selectedCoordinates.value = coordinates
}

function getLocations() {
  api.actionGet('GET', 'settings/takeaway-locations/').then((response) => {
    locationList.value = response.results.map((branch: any) => {
      return {
        id: branch.id,
        coordinates: [branch.location.longitude, branch.location.latitude],
      }
    })
  })
}

onMounted(() => {
  getLocations()
})

///map
// watch(
//   () => map.value,
//   () => {
//     form.values.location.longitude = map.value[1].toPrecision(8)
//     form.values.location.latitude = map.value[0].toPrecision(8)
//     useFetch(
//       `https://api-maps.yandex.ru/2.1/?text=${
//         form.values.location.latitude
//       },${form.values.location.longitude}&lang=${
//         locale.value === 'uz' ? 'uz_Uz' : 'ru_RU'
//       }&apikey=f51aa9c0-18f4-4d68-b60b-b76ff48d8d11f`,
//       {
//         method: 'GET',
//       }
//     ).then((res) => {
//       form.values.location.address =
//         res?.data?.value?.features[0]?.properties?.GeocoderMetaData?.text
//     })
//   },
//   {
//     deep: true,
//   }
// )
</script>
<style>
.modal-right-side {
  background: linear-gradient(192.83deg, #eb2859 -6.24%, #792036 92.34%);
}
</style>

<!--commit-->
