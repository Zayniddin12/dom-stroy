<template>
  <ClientOnly>
    <form @submit.prevent="onSubmit" autocomplete="off">
      <CardsBlank class="p-5 pr-0">
        <div
          class="pr-5 pb-3 border-b border-solid border-gray-600 dark:border-dark-300 flex-center-between"
        >
          <h1 class="text-2xl leading-130 font-bold text-dark dark:text-white">
            {{ $t('change_phone_number') }}
          </h1>
        </div>
        <div class="mt-6 mr-5">
          <div class="grid md:grid-cols-2 gap-6">
            <FormGroup label="password">
              <FormInput
                v-model="form.values.password"
                :type="showPassword ? 'text' : 'password'"
                :error="form.$v.value.password?.$error"
                :placeholder="$t('enter_password')"
                :autocomplete="false"
              >
                <template #suffix>
                  <button type="button" class="translate-y-1">
                    <i
                      :class="showPassword ? 'icon-eye' : 'icon-eye-closed'"
                      class="transition-300 ease-in-out text-gray-100 text-2xl mr-3"
                      @click.prevent="showPassword = !showPassword"
                    ></i>
                  </button>
                </template>
              </FormInput>
            </FormGroup>

            <FormGroup label="phone_number">
              <FormInput
                v-model="form.values.phone"
                v-maska="`(##) ###-##-##`"
                id="phone_number"
                :error="form.$v.value.phone?.$error"
                placeholder="(__) ___-__-__"
                prefix-class="dark:text-white text-dark text-base px-3 py-2.5 bg-gray-400 dark:bg-[#696969]"
              >
                <template #prefix> +998</template>
              </FormInput>
            </FormGroup>
          </div>
          <div class="w-full items-end justify-end flex gap-4 mt-6">
            <CommonButton
              variant="thirdly"
              class="px-[47px]"
              type="submit"
              :text="$t('save')"
              :loading="loading"
            />
          </div>
        </div>
      </CardsBlank>
    </form>

      <CommonModalsModal
        v-bind="{ show }"
        @close="show = false"
        :title="$t('approval')"
        header-class="p-5"
        inside
      >
        <div class="pt-10 px-5 pb-5">
          <CommonModalsAuthLoginStepTwo
            :phone="form.values.phone"
            @on-submit-otp="submitOtp"
            @resend="onSubmit"
            @step-back="show = false"
            v-bind="{ loading }"
            body-title="enter_confirm_code"
            body-text="reset_phone_otp_text"
            heading-style="mt-0 mb-16 text-center"
            arrow-false
          />
        </div>
      </CommonModalsModal>
  </ClientOnly>
</template>

<script setup lang="ts">
import { useForm } from '~/composables/useForm'
import { minLength, required } from '@vuelidate/validators'
import { useAuthStore } from '~/store/auth'
import { useProfileStore } from '~/store/profile'

import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { deMask, formatPhoneNumber } from '~/helpers'
import * as pkg from 'vue-toastification'
const { useToast } = pkg

const toast = useToast()

const { t: $t } = useI18n()
const localePath = useLocalePath()
const authStore = useAuthStore()
const profileStore = useProfileStore()
const router = useRouter()
const user = computed(() => authStore.user)
const showPassword = ref(false)
const loading = ref(false)
const show = ref(false)
const signature = ref('')

const form = useForm(
  {
    password: '',
    phone: '',
  },
  {
    password: { required },
    phone: { required, minLength: minLength(9) },
  }
)

const onSubmit = () => {
  form.$v.value.$touch()
  if (!form.$v.value.$invalid) {
    loading.value = true
    profileStore
      .updateNumber({ ...form.values, phone: deMask(form.values.phone) })
      .then((res) => {
        show.value = true
        signature.value = res.signature
        toast.success(
          $t('reset_password_code_sent_to', {
            phone: '\n+' + formatPhoneNumber('+998' + form.values.phone),
          })
        )
      })
      .catch((err) => {
        toast.error(err.data.errors[0].message)
      })
      .finally(() => {
        loading.value = false
      })
  }
}

function submitOtp(e: number) {
  profileStore
    .updateNumberVerify({
      code: e,
      signature: signature.value,
      phone: deMask(form.values.phone),
    })
    .then((res) => {
      toast.success($t('your_number_successful_changed'))
      show.value = false
      // router.push(localePath('/profile/settings'))
    })
    .catch((err) => {
      toast.error(err.data.errors[0].message)
    })
    .finally(() => {
      loading.value = false
    })
}
</script>
