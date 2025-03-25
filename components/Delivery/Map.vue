<template>
  <div :class="mapClass" class="h-36 relative rounded-xl block">
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
        v-for="(location, index) in locationList"
        :key="index"
        :settings="{ coordinates: location.coordinates }"
        @click="handleMarkerClick(location.coordinates)"
      >
        <img
          :src="markerLoc ?? '/images/location-mark.svg'"
          class="pin"
          alt="location-mark"
        />
      </yandex-map-marker>
      <yandex-map-default-scheme-layer />
      <yandex-map-default-features-layer />
      <yandex-map-listener :settings="{ onClick: logMapClick }" />
    </yandex-map>
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
import { ref, shallowRef, watch } from 'vue'
import type { DomEventHandler } from '@yandex/ymaps3-types'

interface Props {
  markerLoc?: string
  navigatorClass?: string
  mapClass?: string
  modelValue?: string
  locationList: { coordinates: number[]; id: number }[] // List of locations to display
}
const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: object): void
}>()
const map = shallowRef(null)
const center = ref(props.modelValue || [69.26861792476403, 41.340635417786]) // Default to Moscow if no value
const zoom = ref(15)

const logMapClick: DomEventHandler = (object, event) => {
  let cords = event.coordinates // Reverse order for latitude/longitude
  emit('update:modelValue', center.value)
}

// Handle marker click and emit coordinates
const handleMarkerClick = (coordinates: number[]) => {
  center.value = coordinates // Update center to the selected marker's coordinates
  emit('update:modelValue', coordinates) // Emit the selected marker's coordinates
}

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue && newValue !== center.value) {
      center.value = newValue
    }
  }
)

watch(
  () => props.locationList,
  () => {
    if (props.locationList?.length) {
      center.value = props.locationList[0].coordinates
    }
  },
  {
    immediate: true,
    deep: true,
  }
)
</script>

<style>
/* Add your existing styles here */
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
