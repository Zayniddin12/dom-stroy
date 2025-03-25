<template>
  <div :class="mapClass" class="h-[485px] relative block dark:hidden">
    <div
      v-if="showData && branchMarkers?.length"
      class="flex absolute gap-x-3 shadow-[8px_0px_20px_0px_rgba(146,144,144,0.25)] border border-gray-500 z-1 bg-white dark:bg-dark-200 rounded-lg py-4 pl-4 pr-3 overflow-y-auto w-full sm:w-[46%] h-full"
    >
      <div>
        <p class="text-base font-semibold text-dark-200">
          {{ selectedData?.address }}
        </p>
        <p class="text-xs font-semibold text-gray-200 mt-2.5">
          {{ $t('bts_point') }}
        </p>
        <div class="flex gap-x-2.5 mt-4">
          <i class="icon-clock-circle text-2xl text-red" />
          <p class="text-sm font-medium text-dark-200">
            {{ $t('working_hours') }}
          </p>
        </div>
        <div
          class="max-w-60 p-3 bg-gray-600 mt-2 rounded-xl flex flex-col gap-y-2.5"
        >
          <div class="flex-center-between">
            <p class="text-sm font-medium text-gray-100">{{ $t('monday') }}</p>
            <p class="text-sm font-medium text-dark-300">
              {{ selectedData?.working_hours[1] }}
            </p>
          </div>
          <div class="h-px w-full bg-gray-400" />
          <div class="flex-center-between">
            <p class="text-sm font-medium text-gray-100">{{ $t('tuesday') }}</p>
            <p class="text-sm font-medium text-dark-300">
              {{ selectedData?.working_hours[2] }}
            </p>
          </div>
          <div class="h-px w-full bg-gray-400" />
          <div class="flex-center-between">
            <p class="text-sm font-medium text-gray-100">
              {{ $t('wednesday') }}
            </p>
            <p class="text-sm font-medium text-dark-300">
              {{ selectedData?.working_hours[3] }}
            </p>
          </div>
          <div class="h-px w-full bg-gray-400" />
          <div class="flex-center-between">
            <p class="text-sm font-medium text-gray-100">
              {{ $t('thursday') }}
            </p>
            <p class="text-sm font-medium text-dark-300">
              {{ selectedData?.working_hours[4] }}
            </p>
          </div>
          <div class="h-px w-full bg-gray-400" />
          <div class="flex-center-between">
            <p class="text-sm font-medium text-gray-100">{{ $t('friday') }}</p>
            <p class="text-sm font-medium text-dark-300">
              {{ selectedData?.working_hours[5] }}
            </p>
          </div>
          <div class="h-px w-full bg-gray-400" />
          <div class="flex-center-between">
            <p class="text-sm font-medium text-gray-100">
              {{ $t('saturday') }}
            </p>
            <p class="text-sm font-medium text-dark-300">
              {{ selectedData?.working_hours[6] }}
            </p>
          </div>
          <div class="h-px w-full bg-gray-400" />
          <div class="flex-center-between">
            <p class="text-sm font-medium text-gray-100">{{ $t('sunday') }}</p>
            <p class="text-sm font-medium text-dark-300">
              {{ selectedData?.working_hours[7] }}
            </p>
          </div>
        </div>
      </div>
      <div class="-translate-y-0.5">
        <i
          class="icon-close-circle-regular text-[28px] text-gray-200 hover:text-red transition-300 cursor-pointer"
          @click="showData = false"
        />
      </div>
    </div>
    <div
      v-else-if="!showData && branchMarkers?.length"
      class="p-1 w-fit group absolute top-2 left-2 flex items-center shadow-[8px_0px_20px_0px_rgba(146,144,144,0.25)] border border-gray-500 z-1 bg-white hover:bg-gray-550 cursor-pointer transition-300 rounded-lg"
      @click="
        () => {
          if (selectedData) showData = true
        }
      "
    >
      <i
        class="icon-hamburger-menu text-[28px] text-gray-200 group-hover:text-red transition-300 cursor-pointer"
      />
    </div>
    <yandex-map
      v-model="map"
      cursor-grab
      :coords="center"
      class="map w-full"
      :settings="{
        location: {
          center,
          zoom,
        },
        theme: 'light',
        showScaleInCopyrights: true,
      }"
    >
      <yandex-map-marker
        v-for="(marker, index) in markers"
        :key="index"
        :settings="{ coordinates: marker.coordinates }"
        @click="
          () => {
            if (branchMarkers?.length) logMapClick({}, marker)
          }
        "
      >
        <img
          :src="markerLoc ?? '/images/location-mark.svg'"
          class="pin"
          :class="{
            'scale-110': selectedMarker == marker.id,
          }"
          alt="location-mark"
        />
      </yandex-map-marker>
      <yandex-map-default-scheme-layer />
      <yandex-map-default-features-layer />
      <yandex-map-listener
        v-if="!branchMarkers.length"
        :settings="{ onClick: logMapClick }"
      />
    </yandex-map>
    <div class="container !relative">
      <div
        :class="navigatorClass"
        class="absolute right-4 bottom-6 flex flex-col gap-2"
      >
        <div
          class="p-1.5 hover:bg-orange group transition-300 bg-white rounded-lg border cursor-pointer border-gray-400 hover:border-orange size-8 flex justify-center items-center"
          @click="zoom++"
        >
          <span
            class="icon-plus text-orange group-hover:text-white transition-300 text-[20px]"
          />
        </div>
        <div
          class="p-1.5 bg-white hover:bg-orange group transition-300 rounded-lg border cursor-pointer border-gray-400 hover:border-orange size-8 flex justify-center items-center"
          @click="zoom--"
        >
          <span
            class="icon-minus text-orange group-hover:text-white transition-300 text-[20px]"
          />
        </div>
        <div
          class="p-1.5 bg-white hover:bg-orange group transition-300 rounded-lg border cursor-pointer border-gray-400 hover:border-orange size-8 flex justify-center items-center"
          @click="getCurrentLocation"
        >
          <span
            class="icon-gps text-orange group-hover:text-white transition-300 text-[20px]"
          />
        </div>
      </div>
    </div>
  </div>
  <div :class="mapClass" class="h-[485px] relative dark:block hidden">
    <div
      v-if="showData && branchMarkers?.length"
      class="absolute flex gap-x-3 shadow-[8px_0px_20px_0px_rgba(48,48,48,0.25)] border border-dark-300 z-1 bg-dark-100 rounded-lg py-4 pl-4 pr-3 overflow-y-auto w-full sm:w-[46%] h-full"
    >
      <div>
        <p class="text-base font-semibold text-white">
          {{ selectedData?.address }}
        </p>
        <p class="text-xs font-semibold text-gray-200 mt-2.5">
          {{ $t('bts_point') }}
        </p>
        <div class="flex gap-x-2.5 mt-4">
          <i class="icon-clock-circle text-2xl text-red" />
          <p class="text-sm font-medium text-white">
            {{ $t('working_hours') }}
          </p>
        </div>
        <div
          class="max-w-60 p-3 bg-dark-300 mt-2 rounded-xl flex flex-col gap-y-2.5"
        >
          <div class="flex-center-between">
            <p class="text-sm font-medium text-gray-200">{{ $t('monday') }}</p>
            <p class="text-sm font-medium text-white">
              {{ selectedData?.working_hours[1] }}
            </p>
          </div>
          <div class="h-px w-full bg-gray-400" />
          <div class="flex-center-between">
            <p class="text-sm font-medium text-gray-200">{{ $t('tuesday') }}</p>
            <p class="text-sm font-medium text-white">
              {{ selectedData?.working_hours[2] }}
            </p>
          </div>
          <div class="h-px w-full bg-gray-400" />
          <div class="flex-center-between">
            <p class="text-sm font-medium text-gray-200">
              {{ $t('wednesday') }}
            </p>
            <p class="text-sm font-medium text-white">
              {{ selectedData?.working_hours[3] }}
            </p>
          </div>
          <div class="h-px w-full bg-gray-400" />
          <div class="flex-center-between">
            <p class="text-sm font-medium text-gray-200">
              {{ $t('thursday') }}
            </p>
            <p class="text-sm font-medium text-white">
              {{ selectedData?.working_hours[4] }}
            </p>
          </div>
          <div class="h-px w-full bg-gray-400" />
          <div class="flex-center-between">
            <p class="text-sm font-medium text-gray-200">{{ $t('friday') }}</p>
            <p class="text-sm font-medium text-white">
              {{ selectedData?.working_hours[5] }}
            </p>
          </div>
          <div class="h-px w-full bg-gray-400" />
          <div class="flex-center-between">
            <p class="text-sm font-medium text-gray-200">
              {{ $t('saturday') }}
            </p>
            <p class="text-sm font-medium text-white">
              {{ selectedData?.working_hours[6] }}
            </p>
          </div>
          <div class="h-px w-full bg-gray-400" />
          <div class="flex-center-between">
            <p class="text-sm font-medium text-gray-200">{{ $t('sunday') }}</p>
            <p class="text-sm font-medium text-white">
              {{ selectedData?.working_hours[7] }}
            </p>
          </div>
        </div>
      </div>
      <div class="-translate-y-0.5">
        <i
          class="icon-close-circle-regular text-[28px] text-gray-200 hover:text-red transition-300 cursor-pointer"
          @click="showData = false"
        />
      </div>
    </div>
    <div
      v-else
      class="p-1 w-fit group absolute top-2 left-2 flex items-center shadow-[8px_0px_20px_0px_rgba(146,144,144,0.25)] border border-gray-500 z-1 bg-white hover:bg-gray-550 cursor-pointer transition-300 rounded-lg"
      @click="showData = true"
    >
      <i
        class="icon-hamburger-menu text-[28px] text-gray-200 group-hover:text-red transition-300 cursor-pointer"
      />
    </div>
    <yandex-map
      v-model="map"
      :coords="center"
      cursor-grab
      class="map"
      :settings="{
        location: {
          center,
          zoom,
        },
        theme: 'dark',
        showScaleInCopyrights: true,
      }"
    >
      <yandex-map-marker
        v-for="(marker, index) in markers"
        :key="index"
        :settings="{ coordinates: marker.coordinates }"
        @click="
          () => {
            if (branchMarkers?.length) logMapClick({}, marker)
          }
        "
      >
        <img
          :src="markerLoc ?? '/images/location-mark.svg'"
          class="pin"
          alt="location-mark"
        />
      </yandex-map-marker>
      <yandex-map-default-scheme-layer />
      <yandex-map-default-features-layer />
      <yandex-map-listener
        v-if="!branchMarkers.length"
        :settings="{ onClick: logMapClick }"
      />
    </yandex-map>
    <div class="container !relative">
      <div
        :class="navigatorClass"
        class="absolute right-4 bottom-6 flex flex-col gap-2"
      >
        <div
          class="p-1.5 hover:bg-orange group transition-300 bg-white rounded-lg border cursor-pointer border-gray-400 hover:border-orange size-8 flex justify-center items-center"
          @click="zoom++"
        >
          <span
            class="icon-plus text-orange group-hover:text-white transition-300 text-[20px]"
          />
        </div>
        <div
          class="p-1.5 bg-white hover:bg-orange group transition-300 rounded-lg border cursor-pointer border-gray-400 hover:border-orange size-8 flex justify-center items-center"
          @click="zoom--"
        >
          <span
            class="icon-minus text-orange group-hover:text-white transition-300 text-[20px]"
          />
        </div>
        <div
          class="p-1.5 bg-white hover:bg-orange group transition-300 rounded-lg border cursor-pointer border-gray-400 hover:border-orange size-8 flex justify-center items-center"
          @click="getCurrentLocation"
        >
          <span
            class="icon-gps text-orange group-hover:text-white transition-300 text-[20px]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  YandexMap,
  YandexMapMarker,
  YandexMapListener,
  YandexMapDefaultSchemeLayer,
  YandexMapDefaultFeaturesLayer,
} from 'vue-yandex-maps'
import { ref, shallowRef } from 'vue'
import type { DomEventHandler } from '@yandex/ymaps3-types'
import type { BehaviorType } from '@yandex/ymaps3-types'

interface Props {
  markerLoc?: string
  navigatorClass?: string
  mapClass?: string
  selectedData?: object
  modelValue?: string
  center?: []
  zoom?: number
  branchMarkers?: []
}
const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: object): void
  (e: 'onClickBranch', value: object): void
}>()
const map = shallowRef(null)
const center = ref(props.modelValue)
const zoom = ref(props.zoom ?? 9)
const selectedMarker = ref()
const showData = ref(false)
const markers = ref([
  {
    id: 1,
    coordinates: props.modelValue,
  },
])

const getCurrentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { longitude, latitude } = position.coords
        center.value = [longitude, latitude]
        markers.value = [{ id: 1, coordinates: center.value }]
      },
      (error) => {
        console.error('Error getting location: ', error)
      }
    )
  } else {
    console.error('Geolocation is not supported by this browser.')
  }
}
// function onClick(e: any) {
// try {
//  if (process.client) {
//    console.log('fnrhgfre')
//   let cords = e?.get('coords')
//    console.log()
//    console.log(e?.get('coords'))
//     center.value = [cords[0], cords[1]]
//       emit('update:modelValue', center.value)
//     }
//  } catch (err) {}
// }
// function onMarkerClick(address: string | undefined) {
//   try {
//     if (process.client && address) {
//       coords.value = [address.latitude, address.longitude]
//      emit('update:modelValue', coords.value)
//   }
//  } catch (err) {}
// }

const logMapClick: DomEventHandler = (object, event) => {
  selectedMarker.value = event.id
  let cords = event.coordinates
  center.value = [cords[0], cords[1]]
  markers.value = [{ id: 1, coordinates: center.value }, ...props.branchMarkers]
  showData.value = true
  emit('update:modelValue', center.value)
  emit('onClickBranch', event)
}
watch(props, () => {
  if (props.modelValue !== center.value) {
    center.value = props.modelValue
    markers.value = [
      { id: 1, coordinates: center.value },
      ...props.branchMarkers,
    ]
  }
})

watch(
  () => props.branchMarkers,
  () => (markers.value = [...props.branchMarkers]),
  { immediate: true, deep: true }
)
</script>

<style>
.cluster {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background: black;
  color: #fff;
  border-radius: 100%;
  cursor: pointer;
  border: 2px solid black;
  outline: 2px solid black;
}

.fade-in {
  animation: fadeIn 0.3s;
}
.pin {
  cursor: pointer;
  max-width: 60px;
  width: 60px; /* imageSize width */
  height: 70px; /* imageSize height */
  transform: translate(-30px, -70px); /* imageOffset (x, y) */
  display: inline-block;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.ymaps3x0--map-copyrights {
  display: none !important;
}
</style>
