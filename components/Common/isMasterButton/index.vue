<template>
  <div>
    <div
        class="bg-orange  border border-white dark:border-dark-300 dark:hover:transition-300 dark:hover:border-red px-5  py-[18px] rounded-xl flex-y-center gap-2 w-full cursor-pointer group shadow-card transition-300"
        @click="show = true"
        v-if="!bonus && !user?.is_master"
    >
      <i
          class="icon-person text-[30px] text-gray-200 group-hover:text-red transition-300"
      />
      <p
          class="text-xl text-white leading-130 font-semibold  transition-300 dark:text-white line-clamp-1">

        {{ $t('confirm_master_status') }}
      </p>
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
  buttonLoading.value = false

  bonus.value = true
  authStore.getUser()

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
