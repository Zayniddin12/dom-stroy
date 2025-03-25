<template>
  <div
    class="flex gap-1 relative"
    :class="listActive && `dropdown-active-${id}`"
  >
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.66699 7.3335H10.667"
        stroke="#383838"
        stroke-width="1.6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6 10.6665H10.6667"
        stroke="#383838"
        stroke-width="1.6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.33301 14H10.6663"
        stroke="#383838"
        stroke-width="1.6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13.333 15.3332V4.6665L15.333 7.33317"
        stroke="#383838"
        stroke-width="1.6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>

    <div
      class="w-full flex items-stretch transition duration-300 text-sm text-dark leading-130 font-normal relative"
      :class="[
        error ? 'border-red' : 'border-[#F7FAF9]',
        disabled ? 'pointer-events-none' : '',
        inputClass,
        { 'cursor-pointer': readonly },
      ]"
      @click="activeList"
    >
      <input
        ref="input"
        :value="modelValue"
        :id="`a-input-${id}`"
        :class="[
          'font-medium text-base text-dark placeholder:text-gray-200 bg-transparent flex-grow outline-none w-full',
          { 'pointer-events-none': readonly },
          inputStyle,
        ]"
        :placeholder="$t(placeholder ?? '')"
        @input="handleInput"
        @blur="handleBlur"
      />
      <i v-if="loading" class="ml-2 flex-center">
        <svg
          class="rotating"
          width="16"
          height="16"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.64059 25.5596C7.74039 25.5596 6.97541 25.8746 6.34536 26.5045C5.71554 27.1351 5.40039 27.8999 5.40039 28.8001C5.40039 29.7004 5.7153 30.4652 6.34536 31.0957C6.97565 31.7257 7.74062 32.0407 8.64059 32.0407C9.52567 32.0407 10.2868 31.7257 10.9244 31.0957C11.5618 30.466 11.8805 29.7004 11.8805 28.8001C11.8805 27.8999 11.5619 27.1356 10.9244 26.5045C10.2867 25.8751 9.52567 25.5596 8.64059 25.5596Z"
            fill="#6F6F6F"
          />
          <path
            d="M7.92055 18.7204C7.92055 17.7304 7.56821 16.8832 6.86313 16.1775C6.15813 15.4725 5.31049 15.1201 4.32053 15.1201C3.33048 15.1201 2.483 15.4726 1.77792 16.1775C1.073 16.8826 0.720581 17.7301 0.720581 18.7204C0.720581 19.7102 1.07292 20.5573 1.77792 21.2625C2.483 21.9677 3.33048 22.3202 4.32053 22.3202C5.31049 22.3202 6.15813 21.9677 6.86313 21.2625C7.56821 20.5577 7.92055 19.7102 7.92055 18.7204Z"
            fill="#6F6F6F"
          />
          <path
            d="M28.8002 10.4402C29.2948 10.4402 29.7192 10.2636 30.0712 9.9113C30.4237 9.55865 30.6003 9.13475 30.6003 8.63985C30.6003 8.14471 30.4237 7.72113 30.0712 7.36871C29.719 7.01605 29.2948 6.83984 28.8002 6.83984C28.305 6.83984 27.8811 7.01637 27.5286 7.36871C27.1763 7.72121 27 8.14471 27 8.63985C27 9.13499 27.1763 9.55865 27.5286 9.9113C27.8811 10.264 28.305 10.4402 28.8002 10.4402Z"
            fill="#6F6F6F"
          />
          <path
            d="M8.64088 4.68066C7.54571 4.68066 6.61201 5.06697 5.83947 5.83935C5.06686 6.61173 4.68079 7.54551 4.68079 8.64044C4.68079 9.73577 5.06686 10.6691 5.83947 11.4418C6.61225 12.2145 7.54594 12.6007 8.64088 12.6007C9.73581 12.6007 10.6696 12.2142 11.442 11.4418C12.2143 10.6691 12.6007 9.73553 12.6007 8.64044C12.6007 7.54551 12.2143 6.61173 11.442 5.83935C10.6696 5.06697 9.73581 4.68066 8.64088 4.68066Z"
            fill="#6F6F6F"
          />
          <path
            d="M34.6498 17.1894C34.2299 16.7694 33.72 16.5596 33.1202 16.5596C32.5198 16.5596 32.0099 16.7694 31.59 17.1894C31.1704 17.6094 30.9606 18.1195 30.9606 18.7199C30.9606 19.3196 31.1704 19.8304 31.59 20.2495C32.0101 20.6697 32.5198 20.8795 33.1202 20.8795C33.72 20.8795 34.2302 20.6697 34.6498 20.2495C35.07 19.8299 35.2795 19.3196 35.2795 18.7199C35.2795 18.1199 35.0703 17.6097 34.6498 17.1894Z"
            fill="#6F6F6F"
          />
          <path
            d="M28.8003 26.2793C28.1098 26.2793 27.5174 26.5266 27.0222 27.0217C26.5276 27.5163 26.28 28.1091 26.28 28.7995C26.28 29.4894 26.5276 30.0822 27.0222 30.5774C27.5174 31.0724 28.1099 31.3195 28.8003 31.3195C29.4901 31.3195 30.0826 31.072 30.5777 30.5774C31.0729 30.0822 31.3202 29.4897 31.3202 28.7995C31.3202 28.1091 31.0729 27.5169 30.5777 27.0217C30.0827 26.5265 29.4901 26.2793 28.8003 26.2793Z"
            fill="#6F6F6F"
          />
          <path
            d="M18.7204 30.2393C17.9254 30.2393 17.2465 30.5211 16.6837 31.0837C16.1214 31.6463 15.8401 32.3247 15.8401 33.1198C15.8401 33.9149 16.1211 34.5934 16.6837 35.1559C17.2465 35.7185 17.9251 36.0001 18.7204 36.0001C19.5155 36.0001 20.194 35.7185 20.7566 35.1559C21.3192 34.5934 21.6004 33.9149 21.6004 33.1198C21.6004 32.3247 21.3192 31.6463 20.7566 31.0837C20.194 30.5211 19.5155 30.2393 18.7204 30.2393Z"
            fill="#6F6F6F"
          />
          <path
            d="M18.7206 0C17.5207 0 16.5003 0.4198 15.6602 1.2598C14.8203 2.09987 14.4004 3.12009 14.4004 4.32C14.4004 5.51998 14.8202 6.53973 15.6602 7.37988C16.5003 8.21972 17.5205 8.63976 18.7206 8.63976C19.9209 8.63976 20.9407 8.21996 21.7805 7.37988C22.6202 6.54012 23.0402 5.51998 23.0402 4.32C23.0402 3.12017 22.6202 2.10018 21.7805 1.2598C20.9407 0.420037 19.9209 0 18.7206 0Z"
            fill="#6F6F6F"
          />
        </svg>
      </i>
    </div>
    <transition name="dropdown">
      <div
        v-if="listActive && dataList?.length"
        class="datalist bg-white dark:bg-dark-300 !z-10"
        :class="dataList?.length > 5 && 'datalist_scroll'"
      >
        <div
          @click="setDataList(item)"
          class="datalist__option dark:!text-red cursor-pointer flex-y-center"
          v-for="(item, ind) of dataList"
          :key="ind"
          :class="{ 'bg-gray-500': modelValue === item.title }"
        >
          {{ item.title }}
        </div>
        <div v-if="observe" ref="allItemsTarget" class="p-2"></div>
        <!--                <div v-if="true" class="w-full flex-center h-[40px] mb-2">-->
        <!--                  <span  class="spinner "/>-->
        <!--                </div>-->
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

export interface Props {
  list?: any
  placeholder?: string
  modelValue: any
  disabled?: boolean
  error?: boolean
  inputClass?: string
  inputStyle?: string
  outline?: boolean
  observe?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {})

const input = ref(null)
const listActive = ref(false)

const allItemsTarget = ref(null)
const allItemsIsVisible = ref(false)
const allItemsObserver = ref()
const dataList = computed(() => props?.list)

const id = computed(() => {
  return Math.floor(Math.random() * 101)
})

if (props.observe) {
  allItemsObserver.value = useIntersectionObserver(
    allItemsTarget,
    ([{ isIntersecting }]) => {
      allItemsIsVisible.value = isIntersecting
    }
  )
}

const emit = defineEmits(['fetchData', 'update:modelValue', 'blur'])

watch(
  () => allItemsIsVisible.value,
  (newValue) => {
    if (newValue) {
      emit('fetchData')
    }
  }
)

const activeList = () => {
  listActive.value = !listActive.value
}
const setDataList = (item: object) => {
  emit('update:modelValue', item)
  listActive.value = false
}

onBeforeUnmount(() => {
  if (process.client) {
    document.removeEventListener('mousedown', hideEvent)
  }
})

const hideEvent = (e: any) => {
  if (!e.target.closest(`.dropdown-active-${id.value}`) && listActive.value) {
    listActive.value = false
  }
}

const handleInput = (e: any) => {
  listActive.value = true
  emit('update:modelValue', e.target.value)
}
const handleBlur = (e: Event) => {
  emit('blur', e)
}

onMounted(() => {
  if (props.outline) {
    input.value?.focus()
  }
  document.addEventListener('mousedown', hideEvent)
})
</script>

<style lang="css" scoped>
.datalist {
  position: absolute;
  box-shadow: 0px 4px 44px rgba(56, 56, 56, 0.16);
  border-radius: 10px;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  z-index: 1;
  max-height: 250px;
  padding: 0;
  overflow: hidden;
}

.datalist_scroll {
  overflow-y: scroll;
}

.datalist_scroll::-webkit-scrollbar {
  width: 4px;
}

.datalist_scroll::-webkit-scrollbar-track {
  background: #e6e6e6;
  margin: 16px 0;
  position: relative;
  z-index: 2;
  border-radius: 10px;
}

.datalist_scroll::-webkit-scrollbar-thumb {
  background-color: transparent;
  border-radius: 10px;
  border: 2px solid #c4c4c4;
}

.datalist__option {
  height: 44px;
  padding-left: 16px;
  padding-right: 16px;
  transition: all ease 0.3s;
  border-bottom: 1px solid #efefef;
  font-size: 14px;
  font-weight: 600;
}

.datalist__option:hover {
  @apply text-[#383838] bg-[#f2f3f5];
}
@-webkit-keyframes rotating /* Safari and Chrome */ {
  from {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes rotating {
  from {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
.rotating {
  -webkit-animation: rotating 2s linear infinite;
  -moz-animation: rotating 2s linear infinite;
  -ms-animation: rotating 2s linear infinite;
  -o-animation: rotating 2s linear infinite;
  animation: rotating 2s linear infinite;
}
.rotating path {
  fill: rgba(50, 97, 140, 0.8);
}
</style>
