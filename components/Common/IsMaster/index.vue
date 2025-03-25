<template>
  <div>
    <div
      v-if="!bonus && !user?.is_master && isMaster"
      class="bg-gradient-to-r from-[#10131a] to-[#ef7f1a] rounded-2xl border-2 border-white/60 p-4 relative mb-5"
    >
      <p class="text-white text-base font-medium mb-4">{{ $t('isMaster') }}</p>
      <div class="flex items-center gap-x-2">
        <CommonButton
          @click="isMaster = false"
          variant="secondary-light"
          text-class="text-[#242424] text-sm font-semibold"
          :text="$t('no')"
        />
        <CommonButton
          @click="show = true"
          text-class="text-white text-sm font-semibold"
          :text="$t('yes')"
        />
        <img
          class="absolute right-0 bottom-0 md:h-[75%] lg:h-[110%] h-[110%] object-cover"
          src="/images/art-board.png"
          alt="Art board"
        />
      </div>
    </div>

    <div
      v-if="bonus || user?.is_master"
      class="bg-gradient-to-r from-[#10131a] to-[#ef7f1a] rounded-2xl border-2 border-white/60 p-4 relative mb-5"
    >
      <div>
        <p class="text-white text-base font-semibold leading-tight">
          {{ $t('balance') }}
        </p>
        <h3 class="text-red text-[22px] font-bold tracking-tight">
          {{ formatMoneyDecimal(user.cashback_balance / 1000) }}
          {{ $t('ball') }}
        </h3>
        <img
          class="absolute right-0 bottom-0 object-cover"
          src="/images/art.png"
          alt="Art board"
        />
      </div>
    </div>
    <CommonTypoMasterModal
      :show="show"
      :form="form"
      @close="show = false"
      @submit="submit"
      @success="success"
      :loading="buttonLoading"
      :input-error="inputError"
    />
  </div>
</template>
<script setup lang="ts">
import { required } from '@vuelidate/validators'
import * as pkg from 'vue-toastification'
const { useToast } = pkg
const $toast = useToast()
const { t: $t } = useI18n()
const buttonLoading = ref(false)
const show = ref(false)
const inputError = ref(false)
const isMaster = ref(true)
const bonus = ref(false)
const step = ref(1)
const form = useForm(
  {
    message: '',
  },
  {
    message: {
      required,
    },
  }
)

import { useAuthStore } from '~/store/auth'
import { formatMoneyDecimal, moneyMask } from '~/helpers'
const authStore = useAuthStore()
const user = computed(() => authStore.user)

const submit = () => {
  // buttonLoading.value = true
  // form.$v.value.$touch()
  buttonLoading.value = false
  // show.value = false
  bonus.value = true
  authStore.getUser()

  // Check if the input value is not '1290'
  // if (form.values.message !== '1290') {
  //   $toast.error($t('error_message'))  // Replace 'error_message' with your actual error message key
  //   buttonLoading.value = false  // Stop loading state
  //   inputError.value = true
  //   return
  // } else {
  //   $toast.success($t('successfully_sent'))
  //   buttonLoading.value = false
  //   show.value = false
  //   bonus.value = true
  // }
}
const success = (e: boolean) => {
  bonus.value = e
  authStore.getUser()
}

watch(
  () => show.value,
  () => {
    if (!show.value) {
      step.value = 1
      form.values.message = ''
      form.$v.value.$reset()
    }
  }
)
</script>
