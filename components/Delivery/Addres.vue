<template xmlns:pre="http://www.w3.org/1999/html">
  <div>
    <div class="mb-4 flex flex-col">
      <div
        class="mb-4 flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0"
      >
        <FormGroup :label="$t('region')" class="md:w-1/2">
          <FormSelect
            custom-class="dark:text-white"
            input-class="dark:!bg-[#464646] !bg-gray-500 !border-none dark:text-white"
            :list="regionStore.region"
            :modelValue="form.values.location.region?.title"
            @update:modelValue="(val) => (form.values.location.region = val)"
            :error="form.$v.value.location.region.$error"
            :placeholder="$t('choose_region')"
            :disabled="regionStore.loading"
            class="w-full"
            @fetchData="regionFetch"
            :loading="regionStore.loading"
            @onclick="regionFetch"
          />
        </FormGroup>
        <FormGroup :label="$t('district_city')" class="md:w-1/2">
          <FormSelect
            custom-class="dark:text-white"
            input-class="dark:!bg-[#464646] !bg-gray-500 !border-none dark:text-white"
            :list="regionStore.district"
            :modelValue="form.values.location.district?.title"
            @update:modelValue="(val) => (form.values.location.district = val)"
            :error="form.$v.value.location.district?.$error"
            :disabled="regionStore.distLoading || isRegionEmpty"
            :placeholder="$t('choose_district')"
            class="w-full"
            no-bts
            @fetchData="districtFetch"
            :loading="regionStore.distLoading"
          />
        </FormGroup>
      </div>
      <FormRadioGroup
        v-if="dataVal?.is_takeaway_available"
        v-bind="{ items }"
        v-model="form.values.express"
        wrapper-class="mt-4"
      />
      <div class="flex mt-4 flex-col md:flex-row md:items-center md:space-x-4">
        <div class="w-full">
          <!--          <h2 class="text-2xl font-bold">{{ $t('choose_location') }}</h2>-->
          <FormLabel
            for-text="name"
            :label="btsBranches.length ? $t('bts_address') : $t('address')"
            class="text-gray-100 font-semibold text-sm leading-130"
          />
          <ClientOnly>
            <FormInputSelect
              v-if="!btsBranches.length"
              v-model="form.values.location.address"
              label-key="title"
              value-key="title"
              selected-option-styles="!p-0 dark:!bg-[#464646]"
              :options="options"
              @get-coords="getCoords"
              class="mt-2 w-full dark:!bg-[#464646] rounded-lg"
            >
              <template #selectedOption>
                <FormInput
                  input-class="dark:!bg-[#464646] dark:!border-none rounded-lg"
                  v-model="form.values.location.address"
                  :class="
                    form.$v.value.location.address?.$error
                      ? '!border-red placeholder:!text-red'
                      : ''
                  "
                  :placeholder="$t('enter_address_delivery')"
                />
              </template>
            </FormInputSelect>
            <FormSelect
              v-else
              custom-class="dark:text-white"
              input-class="dark:!bg-[#464646] !bg-gray-500 !border-none dark:text-white"
              :list="btsBranches"
              :modelValue="form.values.location.address"
              @update:modelValue="
                (val) => {
                  form.values.location.address = val?.title
                  map = [...val?.coordinates]
                  updateSelectedBranch(val)
                }
              "
              :error="form.values.location.address?.$error"
              :placeholder="$t('choose_district')"
              class="w-full"
            />
          </ClientOnly>
        </div>
      </div>
      <div
        class="py-2.5 px-4 w-fit rounded-xl warner inline-flex items-center my-4 dark:bg-[#464646]"
      >
        <i class="mr-1">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="10.0007"
              cy="10"
              r="6.66667"
              stroke="#26D176"
              stroke-width="1.6"
            />
            <path
              d="M10 13.3334V9.33337"
              stroke="#26D176"
              stroke-width="1.6"
              stroke-linecap="round"
            />
            <ellipse
              cx="0.666667"
              cy="0.666667"
              rx="0.666667"
              ry="0.666667"
              transform="matrix(1 0 0 -1 9.33398 8)"
              fill="#26D176"
            />
          </svg>
        </i>
        <p class="text-dark dark:text-white font-semibold text-sm">
          {{ $t('address_warning') }}
        </p>
      </div>
      <ContactMap
        :markerLoc="
          btsBranches.length
            ? '/images/location-bts.svg'
            : '/images/location-carts.svg'
        "
        :navigatorClass="'!right-6'"
        :branch-markers="btsBranches"
        :selectedData="selectedBranch"
        class="h-[330px]"
        :zoom="zoom"
        mapClass="rounded-lg !overflow-hidden border border-gray-500"
        v-model="map"
        @update:modelValue="updateValue"
        @on-click-branch="updateSelectedBranch"
      />
    </div>
    <div
      class="flex flex-col-reverse md:flex-row md:items-center md:justify-between border-t border-gray-600 pt-4 mt-4"
    >
      <CommonButton
        variant="secondary-light"
        class="md:w-1/4"
        @click="backFunc"
      >
        <span class="icon-arrow-left text-[24px] leading-[24px]" />
        {{ $t('to_cart') }}
      </CommonButton>
      <CommonButton
        :disabled="nextActive || nextButtonActive"
        class="md:w-1/4 mb-2 md:mb-0"
        @click="nextFunc"
      >
        {{ $t('continue') }}
        <span class="icon-arrow-right text-[24px] leading-[24px]"
      /></CommonButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRegionStore } from '~/store/region'
import type { TForm } from '~/composables/useForm'
import * as pkg from 'vue-toastification'
import { debounce } from '~/helpers'

const { useToast } = pkg

const toast = useToast()

interface Props {
  step?: number
  form: TForm<any>
  orderLoading: boolean
  typeOfPayment: { is_takeaway_available: boolean; is_cache_available: boolean }
  nextButtonActive: boolean
}

const props = withDefaults(defineProps<Props>(), {})
const { form } = unref(props)
const { values, $v } = form
const regionStore = useRegionStore()
const api = useApi()
const router = useRouter()
const { t, locale } = useI18n()
const localePath = useLocalePath()

const emit = defineEmits(['submit', 'back', 'selectDistrict'])
const map = ref<any>([69.26, 41.31])
const zoom = ref(14)
const mapOptions = ref([])
const btsBranches = ref([])
const branchesData = ref([])
const nextActive = computed(() => {
  return !(
    form.values.location.district?.id &&
    form.values.location.region?.id &&
    form.values.location.address &&
    !props.orderLoading
  )
})
// #RegionFunc

const selectedBranch = ref(null)

const updateSelectedBranch = (branch) => {
  selectedBranch.value = branchesData.value.find((i) => i.id === branch.id)
}

const regionFetch = () => {
  regionStore.fetchRegion()
}

const districtFetch = () => {
  regionStore.fetchDistrict({
    region: form.values.location.region?.id,
  })
}

function getBranches(region?: number, district?: number) {
  api
    .actionGet('GET', 'delivery_bts/branches/', {
      region: region,
      district: district,
    })
    .then((res) => {
      branchesData.value = res
      btsBranches.value = res.map((branch) => ({
        id: branch?.id,
        title: branch?.address,
        coordinates: [branch?.longitude, branch?.latitude],
      }))
    })
    .finally(() => {
      return btsBranches.value
    })
}

watch(
  () => form.values.location.region,
  () => {
    regionStore.fetchDistrict({ region: form.values.location?.region?.id })
    form.values.location.district = {}
  },
  { deep: true }
)
watch(
  () => map.value,
  () => {
    form.values.location.longitude = map.value[0]
    form.values.location.latitude = map.value[1]
    useFetch(
      `https://maps-dev.commeta.io/nominatim/reverse?lat=${form.values.location.latitude}&lon=${form.values.location.longitude}&format=json`,
      {
        method: 'GET',
      }
    ).then((res) => {
      form.values.location.address = res?.data?.value?.display_name
    })
  },
  {
    deep: true,
  }
)
const getCoords = (e: Array<any>) => {
  map.value = [e[0], e[1]]
}
// #StepFunction

const backFunc = () => {
  router.push(localePath('/basket'))
}

const nextFunc = () => {
  form.$v.value.location.$touch()
  if (form.values.location.latitude && form.values.location.longitude) {
    emit('submit', form.values.location)
    form.$v.value.location.$reset()
  } else if (
    form.values.location.district?.delivery_latitude == null ||
    form.values.location.district?.delivery_longitude == null
  ) {
    toast.error(t('no_bts_toast'))
  } else {
    if (!form.values.location.latitude || !form.values.location.longitude) {
      toast.error(t('choose_map'))
    }
  }
}
const updateValue = (a: string[]) => {
  map.value = a
}
onMounted(() => {
  regionStore.fetchRegion()
})
const options = computed(() => {
  const res = ref([])
  if (mapOptions.value?.length) {
    res.value = mapOptions.value.map((el) => {
      return {
        title: el?.display_name,
        coords: [el?.lon, el?.lat],
      }
    })
    return res.value
  }
  return mapOptions.value
})
watch(
  () => form.values.location.address,
  (newValue) => {
    if (newValue) {
      debounce('search-map', () => {
        useFetch(
          `https://maps-dev.commeta.io/nominatim/search?q=${newValue}&format=json&addressdetails=1&limit=5`,
          {
            method: 'GET',
          }
        ).then((res) => {
          mapOptions.value = res?.data?.value
        })
      })
    }
  }
)

// always select first item in items list

const items = [
  { name: t('pick_up'), id: 3 },
  { name: t('delivery'), id: 2 },
]
form.values.express = ref(1)
watch(
  () => form.values.express,
  (newValue) => {
    form.values.express = newValue
  }
)
const dataVal = ref<{
  is_takeaway_available: boolean
  is_cache_available: boolean
}>(props.typeOfPayment?.is_takeaway_available ? props.typeOfPayment : null)
watch(
  form.values,
  async (value: number) => {
    try {
      const { data: resData, error } = await useFetcher(
        `orders/check-takeaway/?district=${form.values.location.district?.id}`,
        {
          method: 'GET',
        }
      )
      if (resData) {
        emit('selectDistrict', resData)
        dataVal.value = resData
      } else if (error.value) {
        // Handle the error
        console.error('API Error:', error.value)
      }
    } catch (err) {
      console.error('An unexpected error occurred:', err)
    }
  },
  { deep: true }
)

watch(
  () => form.values.location.district,
  () => {
    if (
      form.values.location.district.delivery_latitude &&
      form.values.location.district.delivery_longitude &&
      form.values.location.district?.region?.soato !== '1730' &&
      form.values.location.district?.soato !== '1730405'
    ) {
      getBranches(
        form.values.location.district?.region?.id,
        form.values.location.district?.id
      )
    } else if (
      form.values.location.district?.region?.soato !== '1730' &&
      form.values.location.district?.soato !== '1730405'
    ) {
      getBranches(form.values.location.district?.region?.id)
    } else btsBranches.value = []
  },
  { deep: true }
)

watch(
  () => btsBranches.value,
  () => {
    if (btsBranches.value.length !== 0) {
      map.value = [...btsBranches.value[0].coordinates]
      zoom.value = 19
    }
  }
)

const isRegionEmpty = computed(() => {
  return Object.keys(form.values.location.region).length === 0
})
</script>
<style>
.warner {
  @apply bg-white border border-[#BEF1D6] rounded-md dark:border-[#26D176];
}
</style>

<!--commit-->
