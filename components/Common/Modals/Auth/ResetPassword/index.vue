<template>
  <div class="h-full flex flex-col justify-between">
    <i
      class="text-dark dark:text-white inline-block text-3xl font-bold md:mb-12 mb-4 icon-arrow-left transition-300 ease-in-out hover:text-gray-200 cursor-pointer"
      @click="emit('login')"
    />
    <Transition name="fade" mode="out-in">
      <div :key="step">
        <!--        STEP ONE -->
        <div v-show="step === 1" class="md:mt-[-13rem] mb-4 md:mb-0">
          <h3 class="text-dark dark:text-white text-xl font-bold mb-4">
            {{ $t('reset_password') }}
          </h3>
          <div class="">
            <FormLabel :label="$t('phone_number')" for-text="phone_number" />
            <FormInput
              v-model="form.values.phone"
              auto-focus
              v-maska="`(##) ###-##-##`"
              id="phone_number"
              class="mt-2"
              placeholder="(__) ___-__-__"
              :error="form.$v.value.phone?.$error"
              input-class="placeholder:text-gray-100"
              prefix-class="dark:text-white text-dark text-base px-3 py-2.5 bg-gray-400 dark:bg-[#696969]"
              @enter="onSubmit"
              :autocomplete="false"
            >
              <template #prefix> +998 </template>
            </FormInput>
          </div>
        </div>
        <!--        STEP SECOND -->
        <div v-show="step === 2" class="text-center -mt-8">
          <h3 class="text-dark text-xl font-bold mb-3">
            {{ $t('enter_code') }}
          </h3>
          <p class="text-gray-100 text-sm mb-5">
            {{ $t('code_sent_phone_reset') }} <br />
            <span class="font-bold text-dark inline-flex items-center">
              +998 {{ form.values?.phone }}
              <i
                class="icon-edit-square text-xl font-semibold text-gray-100 ml-2 transition-300 ease-in-out hover:text-dark cursor-pointer"
                @click="step = 1"
              ></i>
            </span>
          </p>
          <FormInputOtp
            v-model="form.values.otp"
            :error="form.$v.value.otp?.$error || errors.otp"
          />
          <div class="mt-4">
            <span class="text-gray-200 text-xs">{{
              $t('not_received_code')
            }}</span>
            <CommonTimer
              v-if="!timeout"
              :seconds="60"
              @timeout="timeout = true"
              class="text-red text-xs inline-block ml-2"
            />
            <span
              v-else
              @click="resend"
              class="text-red text-xs ml-1.5 cursor-pointer transition-300 ease-in-out hover:opacity-70"
            >
              {{ $t('resend_code') }}
            </span>
          </div>
        </div>
        <!--        STEP THIRD -->
        <div v-show="step === 3" class="md:mt-[-13rem] mb-4 md:mb-0">
          <h3 class="text-dark dark:text-white text-xl font-bold mb-4">
            {{ $t('new_password') }}
          </h3>
          <div class="mb-4">
            <FormLabel :label="$t('password')" for-text="phone_number" />
            <FormInput
              v-model="passwords.password"
              id="phone_number"
              :type="showPassword ? 'text' : 'password'"
              class="mt-2"
              :placeholder="$t('enter_password')"
              :error="$v.rePassword?.$error"
              input-class="placeholder:text-gray-100"
              suffix-class="text-gray-200 text-2xl px-3 py-2.5 cursor-pointer h-11"
              :autocomplete="false"
              @enter="onSubmit"
            >
              <template #suffix>
                <i
                  :class="!showPassword ? 'icon-eye mt-1' : 'icon-eye-closed'"
                  class="transition-300 ease-in-out"
                  @click="showPassword = !showPassword"
                ></i>
              </template>
            </FormInput>
          </div>
          <div class="">
            <FormLabel :label="$t('approval')" for-text="phone_number" />
            <FormInput
              v-model="passwords.rePassword"
              id="phone_number"
              :type="showPassword ? 'text' : 'password'"
              class="mt-2"
              :placeholder="$t('re_enter_password')"
              :error="$v.rePassword?.$error"
              input-class="placeholder:text-gray-100 "
              suffix-class="text-gray-200 text-2xl px-3 py-2.5 cursor-pointer h-11"
              :autocomplete="false"
              @enter="onSubmit"
            >
              <template #suffix>
                <i
                  :class="!showPassword ? 'icon-eye' : 'icon-eye-closed'"
                  @click="showPassword = !showPassword"
                ></i>
              </template>
            </FormInput>
          </div>
        </div>
      </div>
    </Transition>
    <CommonButton
      :text="$t('approve')"
      @click="onSubmit"
      class="w-full"
      :loading="loading"
    />
  </div>
</template>
<script setup lang="ts">
import { useForm } from '~/composables/useForm'
import { required, minLength, sameAs } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import { deMask } from '~/helpers'
import * as pkg from 'vue-toastification'

const { useToast } = pkg

const toast = useToast()
const { t } = useI18n()
const form = useForm(
  {
    phone: '',
    otp: '',
  },
  {
    phone: { minLength: minLength(9), required },
    otp: { minLength: minLength(6), required },
  }
)
const passwords = ref({
  password: '',
  rePassword: '',
})
const rules = {
  password: { required, minLength: minLength(6) },
  rePassword: {
    required,
    sameAsPassword: sameAs(computed(() => passwords.value.password)),
  },
}
const $v = useVuelidate(rules, passwords)
const showPassword = ref(false)
const passwordErrors = ref<boolean>(false)
const emit = defineEmits<{
  (e: 'step-back'): void
  (e: 'close'): void
  (e: 'login'): void
}>()

const previous = ref('')
watch(
  () => form.values.otp,
  () => {
    if (form.values.otp.length === 6 && form.values.otp !== previous.value) {
      previous.value = form.values.otp
      checkOtp()
    }
  }
)
watch(
  () => passwords.value,
  () => {
    if (passwordErrors.value) {
      passwordErrors.value = false
    }
  },
  {
    deep: true,
  }
)
const timeout = ref(false)
const checkOtp = async () => {
  form.$v.value.otp.$touch()
  if (!form.$v.value.otp.$invalid) {
    await passwordVerify(form.values.otp)
  }
}
async function onSubmit() {
  if (step.value === 1) {
    form.$v.value.phone.$touch()
    if (!form.$v.value.phone.$invalid) {
      await passwordReset(deMask(form.values.phone))
    }
  } else if (step.value === 2) {
    await checkOtp()
  } else {
    $v.value.$touch()
    if (!$v.value.password.$invalid && !$v.value.rePassword.$invalid) {
      await setNewPassword({
        new_password: passwords.value.password,
        password_confirm: passwords.value.rePassword,
      })
      if (step.value === 4) {
        emit('login')
      }
    } else {
      if (
        passwords.value.password?.length < 6 ||
        passwords.value.rePassword?.length < 6
      ) {
        toast.error(t('min_password'))
      } else {
        toast.error(t('password_error'))
      }
      passwordErrors.value = true
    }
  }
}

const resend = () => {
  timeout.value = false
  form.$v.value.$reset()
  passwordReset(deMask(form.values.phone))
}

// Reset password logic
const { loading, passwordReset, step, errors, passwordVerify, setNewPassword } =
  useResetPassword()
</script>
