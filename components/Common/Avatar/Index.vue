<template>
  <div
    class="w-20 h-20 border-[1.5px] border-solid border-gray-300 rounded-full overflow-hidden"
  >
    <CommonBlockPreloader
      width="100%"
      height="100%"
      circle
      v-if="loading"
      v-bind="{ loading }"
    />
    <div v-else class="w-full h-full bg-white">
      <img
          v-if="defaultImage"
          :src="defaultImage"
          class="!w-full !h-full object-cover"
          alt="avatar"
          @error="defaultImage = null"
      />
      <img
          v-else
          src="/images/defaults/profile-user.png"
          class="!w-full !h-full object-cover"
          alt="avatar"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  image?: string
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {})

const defaultImage = ref('')

watch(
  () => props.image,
  () => {
    defaultImage.value = props.image
  },
  {
    immediate: true,
  }
)
</script>
