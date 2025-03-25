<template>
  <div>
    <transition name="fade" mode="out-in">
      <template v-if="withWord">
        <button
          aria-label="save-button"
          class="button-save transition-300 rounded-md flex-center group save-button"
          @click.stop="likeControl"
          :class="buttonClass"
        >
          <svg
            :class="isLiked ? 'animation' : ''"
            :width="iconWidth"
            :height="iconHeight"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              :class="isLiked ? 'fill-red' : 'fill-transparent'"
              d="M26.9407 6.66669C24.0641 6.66669 22.2566 8.0984 21.2237 9.35645C20.7371 9.94902 19.4238 9.94892 18.9373 9.35632C17.9045 8.0983 16.0972 6.66669 13.22 6.66669C8.09027 6.66669 5 11.5573 5 15.5876C5 20.8662 14.21 28.3075 18.2349 31.3074C19.3352 32.1275 20.8256 32.1276 21.926 31.3077C25.9511 28.3084 35.1608 20.869 35.1608 15.5888C35.1608 11.5573 32.0729 6.66669 26.9407 6.66669Z"
              :stroke="isLiked ? '#0B0A67' : '#9E9EA5'"
              stroke-width="3"
              stroke-linejoin="round"
            />
          </svg>

          <p
            v-if="!isLiked"
            class="text-sm font-semibold leading-130 cursor-pointer transition duration-300 hover:text-red ml-1"
          >
            {{ $t('add_like') }}
          </p>
          <p
            v-else
            class="text-sm font-semibold leading-130 cursor-pointer transition duration-300 hover:text-red ml-1"
          >
            {{ $t('added_like') }}
          </p>
        </button>
      </template>
      <button
        v-else
        aria-label="button-save"
        class="button-save transition-300 w-9 h-9 rounded-md flex-center group save-button"
        :class="buttonClass"
        @click.stop="likeControl"
      >
        <svg
          :class="isLiked ? 'animation' : ''"
          :width="iconWidth"
          :height="iconHeight"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.33331 8.09134C3.33331 11.3333 6.01293 13.0609 7.97447 14.6072C8.66665 15.1528 9.33331 15.6666 9.99998 15.6666C10.6666 15.6666 11.3333 15.1528 12.0255 14.6072C13.987 13.0609 16.6666 11.3333 16.6666 8.09134C16.6666 4.84938 12.9999 2.55025 9.99998 5.66703C7.00009 2.55025 3.33331 4.84938 3.33331 8.09134Z"
            class="transition-300"
            :class="isLiked ? 'fill-red' : 'fill-transparent'"
          />
          <path
            d="M7.97447 14.6072L8.43878 14.0182H8.43878L7.97447 14.6072ZM9.99998 5.66703L9.45961 6.18713C9.601 6.33402 9.7961 6.41703 9.99998 6.41703C10.2039 6.41703 10.399 6.33402 10.5403 6.18713L9.99998 5.66703ZM12.0255 14.6072L11.5612 14.0182L12.0255 14.6072ZM8.43878 14.0182C7.41351 13.21 6.33633 12.4524 5.4791 11.4871C4.64758 10.5508 4.08331 9.47825 4.08331 8.09134H2.58331C2.58331 9.94638 3.35886 11.3586 4.35753 12.4831C5.33049 13.5787 6.57389 14.4581 7.51015 15.1962L8.43878 14.0182ZM4.08331 8.09134C4.08331 6.75096 4.84033 5.63989 5.85348 5.17677C6.81935 4.73527 8.15161 4.82816 9.45961 6.18713L10.5403 5.14693C8.84845 3.38911 6.84738 3.07318 5.22989 3.81254C3.65968 4.53029 2.58331 6.18976 2.58331 8.09134H4.08331ZM7.51015 15.1962C7.84935 15.4636 8.22938 15.7617 8.6184 15.9891C9.00717 16.2162 9.47625 16.4166 9.99998 16.4166V14.9166C9.85704 14.9166 9.65945 14.8601 9.37518 14.694C9.09116 14.528 8.79177 14.2965 8.43878 14.0182L7.51015 15.1962ZM12.4898 15.1962C13.4261 14.4581 14.6695 13.5787 15.6424 12.4831C16.6411 11.3586 17.4166 9.94638 17.4166 8.09134H15.9166C15.9166 9.47825 15.3524 10.5508 14.5209 11.4871C13.6636 12.4524 12.5864 13.21 11.5612 14.0182L12.4898 15.1962ZM17.4166 8.09134C17.4166 6.18976 16.3403 4.53029 14.7701 3.81254C13.1526 3.07318 11.1515 3.38911 9.45961 5.14693L10.5403 6.18713C11.8483 4.82816 13.1806 4.73527 14.1465 5.17677C15.1596 5.63989 15.9166 6.75096 15.9166 8.09134H17.4166ZM11.5612 14.0182C11.2082 14.2965 10.9088 14.528 10.6248 14.694C10.3405 14.8601 10.1429 14.9166 9.99998 14.9166V16.4166C10.5237 16.4166 10.9928 16.2162 11.3816 15.9891C11.7706 15.7617 12.1506 15.4636 12.4898 15.1962L11.5612 14.0182Z"
            class="transition-300"
            :class="isLiked ? 'fill-red' : 'fill-dark'"
          />
        </svg>
      </button>
    </transition>
  </div>
</template>
<script lang="ts" setup>
import { computed, defineEmits, defineProps } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useSavedController } from '~/composables/likeController'

interface Props {
  modelValue: boolean
  iconWidth?: string
  isLikedCustom: boolean
  iconHeight?: string
  id: number
  withWord?: boolean
  buttonClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  iconWidth: '20',
  iconHeight: '20',
  modelValue: false,
  withWord: false,
})

const emit = defineEmits(['update:modelValue'])

const { t } = useI18n()
const route = useRoute()

const isLiked = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  },
})

function likeControl() {
  if (!props.modelValue) {
    console.log(props.modelValue)
    addSavedProduct(props.id).then(() => {
      emit('button-clicked')
    })
  } else {
    deleteSavedProduct(props.id, route.fullPath).then(() => {
      emit('button-clicked')
    })
  }
  isLiked.value = !isLiked.value
}

const { addSavedProduct, deleteSavedProduct, errors } = useSavedController()
</script>
<style scoped>
.animation {
  animation: like 500ms ease-in-out forwards;
}

@keyframes like {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
}

.save-button svg path {
  transition: 0.3s ease-in-out;
}

.save-button:hover svg path {
  stroke: #ef7f1a;
}
</style>
