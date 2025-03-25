<template>
  <div class="flex-y-center gap-4">
    <div
      class="group relative w-[120px] h-[120px] overflow-hidden rounded-full"
    >
      <input
        accept="image/png, image/jpeg"
        id="file"
        type="file"
        name="file"
        class="w-0 h-0 absolute"
        @change="handleFile"
      />
      <transition name="fade" mode="out-in">
        <div
          v-if="image.url"
          class="w-full h-full relative overflow-hidden cursor-pointer"
        >
          <CommonAvatar class="!w-full !h-full" :image="image?.url" />
          <div
            class="flex-center absolute w-full h-full inset-0 z-10 bg-dark bg-opacity-[52%] transition-300 opacity-0 group-hover:opacity-100"
            @click="removeImage"
          >
            <div class="flex-center w-11 h-11 rounded-full bg-white">
              <i class="icon-trash text-2xl text-red" />
            </div>
          </div>
        </div>
        <div
          v-else
          class="w-full h-full flex items-center gap-5 cursor-pointer"
          @click="getFile"
        >
          <CommonAvatar class="!w-full !h-full" :image="image.url" />
        </div>
      </transition>
    </div>
    <div class="flex-y-center gap-1 cursor-pointer group" @click="getFile">
      <i
        class="icon-edit-square text-xl text-gray-100 -mb-1 transition-300 group-hover:text-red"
      />
      <p
        class="text-gray-100 text-base leading-130 font-semibold transition-300 group-hover:text-red"
      >
        {{ $t('change_photo') }}
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'

const emit = defineEmits(['upload', 'remove'])
interface Props {
  item: any
  small: boolean
  error: boolean
  desc: string
  image: string
  label: string
}
const props = withDefaults(defineProps<Props>(), {
  item: '',
  small: false,
  error: false,
  desc: '',
})
const image = reactive({
  url: props?.image,
  file: null,
})

let imageName = ref('')
const handleFile = (event: any) => {
  image.file = event.target.files[0]
  imageName.value = image.file?.name
  const reader = new FileReader()
  if (event.target.files[0]) {
    reader.readAsDataURL(event.target.files[0])
    reader.onload = (e) => {
      image.url = e.target?.result
    }
    send()
  }
}
const getFile = () => {
  const input = document.getElementById('file')
  input?.click()
}
const removeImage = () => {
  image.file = null
  image.url = null
  emit('remove')
}
const send = () => {
  emit('upload', image)
}
onMounted(() => {
  if (props.item) {
    image.url = props.item
  }
})
</script>
