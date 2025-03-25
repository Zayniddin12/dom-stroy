<template>
  <div>
    <!--    bg-pink-->
    <!--    border-red-->
    <div
      class="max-w-[400px] min-h-[124px] h-full w-full flex items-center rounded-[10px] relative image-upload transition-300 dark:bg-dark-500"
      id="file-upload-wrapper"
      :class="[
        {
          'border-2 border-dashed border-red bg-pink justify-center':
            images && !images.length,
          '!border-[#e74c3c]': error,
        },
      ]"
    >
      <input
        id="file"
        type="file"
        multiple
        name="file"
        class="w-0 h-0 absolute"
        accept="image/png, image/jpeg"
        max="4"
        @change="handleFile"
      />
      <div
        v-if="images && images.length"
        class="flex items-stretch flex-wrap gap-2"
      >
        <div
          v-for="(img, index) in images"
          :key="index"
          class="w-[108px] h-[108px] border border-solid border-gray-600 flex-center relative rounded-lg"
        >
          <img
            :src="img.result"
            alt="avatar"
            class="report-img w-full h-full object-cover relative z-0 rounded-lg"
          />
          <div
            class="w-5 h-5 rounded-full border border-solid border-gray-400 absolute -top-2 -right-2 z-[2] bg-white flex-center group cursor-pointer hover:border-red transition-200"
            @click="removeImage(index)"
          >
            <i
              class="icon-trash text-gray-200 group-hover:text-red transition-200"
            />
          </div>
        </div>

        <div
          v-if="images?.length < 4"
          @click="getFile"
          class="h-[108px] cursor-pointer border-2 border-dashed border-red bg-[#FFF6F9] w-11 flex-center rounded-lg shrink-0 transition-200 group hover:opacity-80 dark:bg-dark-500 hover:bg-white"
        >
          <i
            class="icon-add-circle text-red text-2xl transition-200 group-hover:rotate-90 group-hover:scale-125"
          />
        </div>
      </div>
      <div
        v-else
        class="w-full h-full absolute top-0 flex items-center justify-center flex-col gap-3 max-w-[210px]"
      >
        <p
          class="text-gray-100 text-opacity-60 text-center text-sm font-semibold dark:text-white"
        >
          {{ desc }}
        </p>
        <CommonButton :text="$t('upload_photo')" @click="getFile">
          <template #pre-icon>
            <i class="icon-add-circle text-2xl" />
          </template>
        </CommonButton>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import * as pkg from 'vue-toastification'

const emit = defineEmits(['upload'])
interface Props {
  item: any
  small: boolean
  error: boolean
  desc: string
  image: string
}
const props = withDefaults(defineProps<Props>(), {
  item: '',
  small: false,
  error: false,
  desc: '',
})

const { useToast } = pkg


const toast = useToast()
const {t} = useI18n()
const images = ref<{ file: File; result: string }[]>([])
const imagesBack = ref<{ file: File; result: string }[]>([])

let imageName = ref('')
const handleFile = (event: any) => {
  const file = event.target.files[0]
  imagesBack.value.push(file)
  // imageName.value = image.file?.name
  const reader: FileReader = new FileReader()
  reader.readAsDataURL(file)
  if (event.target.files[0]) {
    reader.onload = (e) => {
      images.value.push({
        file: file,
        result: reader.result,
      })
    }
    upload()
  }
}

const getFile = () => {
  const input = document.getElementById('file')
  input?.click()
}

const removeImage = (index: number) => {
  images.value.splice(index, 1)
  imagesBack.value.splice(index, 1)
  emit('upload', imagesBack.value)
}

const upload = () => {
  emit('upload', imagesBack.value)
}

const dragFile = () => {
  const holder = document.getElementById(`file-upload-wrapper`);

  if (holder) {
    holder.ondragover = function (e: DragEvent) {
      e.preventDefault();
      e.stopPropagation();
      holder.classList.add('!bg-pink')
      holder.classList.add('!border-red')
      return false;
    };
    holder.ondragleave = function (e: DragEvent) {
      e.preventDefault();
      e.stopPropagation();
      holder.classList.remove('!bg-pink')
      holder.classList.remove('!border-red')
      return false;
    };
    holder.ondrop = function (e: DragEvent) {
      e.preventDefault();
      e.stopPropagation();

      if (imagesBack.value?.length === 4){
        toast.error(t('maximum_4_photos'))
      } else{
        const file = e.dataTransfer?.files[0]
          if (file?.type === 'image/png' || file?.type === 'image/jpeg'){
            imagesBack.value.push(file)
            // imageName.value = image.file?.name
            const reader: FileReader = new FileReader()
            reader.readAsDataURL(file)
            if (e.dataTransfer?.files[0]) {
              reader.onload = (e) => {
                images.value.push({
                  file: file,
                  result: reader.result,
                })
              }
              upload()
        }
      }
          else {
            toast.error(t('please_upload_correct_format'))
          }
      }
      // image.file = e?.dataTransfer?.files[0];
      // imageName.value = image?.file?.name;
      // const reader = new FileReader();
      // if (e?.dataTransfer?.files[0]) {
      //   reader.readAsDataURL(e?.dataTransfer?.files[0]);
      //   reader.onload = (e) => {
      //     image.url = e.target?.result;
      //   };
      //   send();
      // }

      // const file = e.dataTransfer.files[0]
      // imagesBack.value.push(file)
      // imageName.value = image.file?.name
      // const reader: FileReader = new FileReader()
      // reader.readAsDataURL(file)
      // if (e.target.files[0]) {
      //   reader.onload = (e) => {
      //     images.value.push({
      //       file: file,
      //       result: reader.result,
      //     })
      //   }
      //   upload()
      // }
    };
  }
};
onMounted(() => {
  dragFile();
})
</script>
<style>
.color {
  color: #e74c3c;
}
</style>
