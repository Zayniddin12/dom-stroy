<template>
  <div class="flex flex-col justify-between h-full">
    <div>
      <h2 class="dark:text-white text-dark text-2xl font-bold mb-12">
        {{ $t('welcome') }}
      </h2>
      <div>
        <h3 class="text-xl text-dark dark:text-white font-bold mb-4">
          {{ $t('enter') }}
        </h3>
        <form submit="onSubmit" autocomplete="off">
          <div class="mb-4">
            <FormLabel :label="$t('phone_number')" for-text="phone_number" />
            <FormInput
              v-model="form.values.phone"
              auto-focus
              v-maska="`(##) ###-##-##`"
              id="phone_number"
              class="mt-2"
              placeholder="(__) ___-__-__"
              :error="form.$v.value.phone?.$error || error"
              input-class="placeholder:text-gray-100"
              prefix-class="dark:text-white text-dark text-base px-3 py-2.5 bg-gray-400 dark:bg-[#696969]"
              :autocomplete="false"
              @enter="login"
            >
              <template #prefix> +998 </template>
            </FormInput>
          </div>
          <div class="mb-4">
            <FormLabel :label="$t('password')" for-text="password" />
            <FormInput
              v-model="form.values.password"
              id="password"
              class="mt-2"
              :type="showPassword ? 'text' : 'password'"
              :error="form.$v.value.password?.$error || error"
              suffix-class="flex-center p-2 cursor-pointer"
              :autocomplete="false"
              @enter="login"
              :placeholder="$t('enter_password')"
            >
              <template #suffix>
                <i
                  :class="!showPassword ? 'icon-eye' : 'icon-eye-closed'"
                  class="transition-300 ease-in-out text-gray-100 dark:text-white text-2xl"
                  @click="showPassword = !showPassword"
                ></i>
              </template>
            </FormInput>
          </div>
          <div class="flex justify-end my-2">
            <span
              class="text-sm text-red cursor-pointer opacity-70 transition-300 ease-in-out hover:opacity-100"
              @click="emit('forgot-password')"
            >
              {{ $t('forgot_password') }}
            </span>
          </div>
        </form>
      </div>
    </div>
    <div>
      <CommonButton
        :text="$t('login')"
        class="w-full"
        @click="login"
        :loading="loading"
      />
      <div class="auth-or w-full flex-center my-3">
        <span class="mx-3 text-xs text-gray-200">{{ $t('or') }}</span>
      </div>
      <CommonButton
        :text="$t('register')"
        variant="secondary"
        text-class="!font-semibold"
        class="w-full"
        @click="emit('register')"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useForm } from '~/composables/useForm'
import { isPhone } from '~/helpers'
import { required } from '@vuelidate/validators'
import type { TLoginPayload } from '~/types/auth'
import * as pkg from 'vue-toastification'
const { useToast } = pkg

const toast = useToast()
const { t } = useI18n()

interface Props {
  loading?: boolean
  errors?: {
    phone?: boolean
    password?: boolean
  }
}
const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'on-submit', value: TLoginPayload): void
  (e: 'forgot-password'): void
  (e: 'register'): void
}>()
const form = useForm(
  {
    phone: '',
    password: '',
  },
  {
    phone: { required, isPhone },
    password: { required },
  }
)
const error = ref(false)
const showPassword = ref(false)
function login() {
  form.$v.value.$touch()
  if (!form.$v.value.$invalid) {
    emit('on-submit', form.values)
  } else {
    if (!isPhone(form.values.phone)) {
      toast.error(t('phone_error'))
    } else {
      toast.error(t('write_number_password'))
    }
  }
}
watch(
  () => props.errors,
  (value) => {
    if (value?.phone || value?.password) {
      error.value = true
    } else {
      error.value = false
    }
  },
  { deep: true }
)
watch(
  () => form.values,
  () => {
    error.value = false
  },
  { deep: true }
)
</script>

<style>
.auth-or::before,
.auth-or::after {
  content: '';
  width: 100%;
  height: 1px;
  background: #cdcdd0;
  opacity: 0.7;
  display: block;
}
</style>
