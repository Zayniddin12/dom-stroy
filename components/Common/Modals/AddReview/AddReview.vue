<template>
  <CommonModalsModal
      v-if="!success"
    @close="$emit('close')"
    :show="show"
    title=""
    :inside="true"
    body-wrapper-class="!max-w-[580px] p-5 dark:bg-dark-300 transition-300"
  >
    <template #header>
      <div class="flex items-center justify-between w-full relative">
        <h5 class="text-xl font-normal text-dark-200 dark:text-white">
          {{ $t('rate_product') }}
        </h5>
        <i
            v-if="!inside"
            class="cursor-pointer modal-close"
            @click="$emit('close')"
        >
          <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle opacity="0.4" class="cursor-pointer modal-close" cx="12" cy="12" r="10" stroke="#9E9EA5" stroke-width="1.6"/>
            <path d="M15 9.00002L9 15M8.99997 9L14.9999 15" stroke="#9E9EA5" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </i>

      </div>

    </template>
    <form @submit.prevent="sendReview">
      <div class="mt-8">
        <div class="w-max max-w-full mx-auto">
          <p class="text-center mb-3 text-dark-200 dark:text-white transition-300 text-base font-normal">
            {{ $t('rate_your_review') }}
          </p>
          <CommonRatePicker v-model="form.values.rate" />
        </div>
        <div class="mt-5">
          <div class="flex-y-center justify-between">
            <FormLabel for-text="comment_field" :labelClass="'!text-dark-200 dark:!text-white !text-base font-normal'" :label="$t('your_review')" />
            <p v-if="form.$v.value.comment.$error" class="text-sm text-red">{{ $t('minimum_4_characters') }}</p>
          </div>
          <FormTextarea
            v-model="form.values.comment"
            :error="form.$v.value.comment.$error"
            id="comment_field"
            input-class="h-[158px] text-base placeholder:!font-normal text-dark dark:text-white transition-300 font-normal font-proxima"
            no-resize
            class="mt-2 !bg-gray-500 dark:!bg-gray-100"
            :placeholder="$t('enter_your_review')"
            :maxlength="250"
          />
        </div>
        <div class="flex justify-end mt-4">
          <CommonButton class="!px-5 !py-2.5" :text="$t('send')" :loading="loading" />
        </div>
      </div>
    </form>
  </CommonModalsModal>
  <CommonModalsModal
      v-else
      @close="$emit('close')"
      :show="success"
      title=""
      :inside="true"
      body-wrapper-class="!max-w-[580px] p-5 dark:bg-dark-300 transition-300"
  >
    <template #header>
      <div class="flex items-center justify-between w-full relative">
        <h5 class="text-xl font-normal text-dark-200 dark:text-white">
          {{ $t('rate_product') }}
        </h5>
        <i
            v-if="!inside"
            class="cursor-pointer modal-close"
            @click="$emit('close')"
        >
          <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle opacity="0.4" class="cursor-pointer modal-close" cx="12" cy="12" r="10" stroke="#9E9EA5" stroke-width="1.6"/>
            <path d="M15 9.00002L9 15M8.99997 9L14.9999 15" stroke="#9E9EA5" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </i>

      </div>

    </template>
    <div class="flex justify-center items-center flex-col gap-9">
      <img src="/images/logo/check-status.png" alt="checked" class="max-w-[120px] max-h-[120px]"/>
      <div class="block mb-3">
        <h4 class="text-dark-200 text-lg font-semibold dark:text-white transition-300 text-center">{{ $t('thanks_for_commit') }}</h4>
        <p class="text-center dark:text-gray-300 transition-300 text-base font-normal text-gray-100">{{ $t('review_success') }}</p>
      </div>
      <CommonButton class="!px-5 !py-2.5" :text="$t('goto_home')" @click="$emit('close')" />
    </div>
  </CommonModalsModal>
</template>

<script setup lang="ts">
// Modal config
import  type { TReviewPayloadData } from '~/types/feedback'
import * as pkg from 'vue-toastification'
import { useForm } from '~/composables/useForm'
import {minLength, required} from "@vuelidate/validators";

const { useToast } = pkg

interface Props {
  show: boolean
  successMessage?: string
  loading?: boolean
  error?: boolean
  success?: boolean
}
const props = defineProps<Props>()

interface Emits {
  (e: 'send', val: TReviewPayloadData): void
  (e: 'error', val: string): void
  (e: 'close'): void
}
const $emit = defineEmits<Emits>()

const $toast = useToast()
const { t: $t } = useI18n()
const showModal = ref(false)
const form = useForm({
  rate: 0,
  comment: ''
},
    {comment: {minLength: minLength(4), required}}
)
// const form = reactive<TReviewPayloadData>({
//   rate: 0,
//   comment: '',
// })

const fieldError = ref(false)

const sendReview = () => {
  form.$v.value.$touch()
  if (!form.$v.value.$invalid){
    if (form.values.rate < 1) {
      $emit('error', 'rate_is_required')
      return $toast.error($t('rate_is_required'))
    }
    fieldError.value = false
    // $emit('close')
    $emit('send', form.values)
  }
}


watch(() => props.show, () => {
  form.values.comment = ''
  form.values.rate = 0
  form.$v.value.$reset()
})
</script>
<style scoped>
.modal-close svg circle,
path {
  transition: 0.3s ease-in-out;
}
.modal-close:hover svg circle {
  stroke: #fa0738;
  opacity: 1;
}
.modal-close:hover svg path {
  stroke: #fa0738;
}
.modal-close svg circle {
  stroke: #CDCDD0;
}
.modal-close svg path {
  stroke: #CDCDD0;
}
</style>
