<template>
  <div class="flex flex-col justify-between h-full">
    <div>
      <h2 class="text-dark dark:text-white text-2xl font-bold mb-12">
        {{ $t('safety') }}
      </h2>
      <div>
        <h3 class="text-xl text-dark dark:text-white font-bold mb-4">
          {{ $t('set_password') }}
        </h3>
        <form @submit.prevent="onSubmit" autocomplete="off">
          <div class="mb-4">
            <FormLabel :label="$t('password')" for-text="phone_number" />
            <FormInput
              v-model="passwords.password"
              auto-focus
              id="phone_number"
              :type="showPassword ? 'text' : 'password'"
              class="mt-2"
              :placeholder="$t('enter_password')"
              :error="$v.password?.$error || error"
              input-class="placeholder:text-gray-100"
              suffix-class="text-gray-200 text-2xl py-1 px-3 cursor-pointer flex-center"
              :autocomplete="false"
              @enter="onSubmit"
            >
              <template #suffix>
                <i
                  :class="!showPassword ? 'icon-eye' : 'icon-eye-closed'"
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
              :error="$v.rePassword?.$error || error"
              input-class="placeholder:text-gray-100 font-normal"
              suffix-class="text-gray-200 text-2xl py-1 px-3 cursor-pointer flex-center"
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
        </form>
      </div>
    </div>
    <CommonButton
      :loading="loading"
      :text="$t('approve')"
      class="w-full"
      @click="onSubmit"
    />
  </div>
</template>
<script setup lang="ts">
import { minLength, required, sameAs } from '@vuelidate/validators'
import { computed } from 'vue'
import useVuelidate from '@vuelidate/core'

interface Props {
  loading?: boolean
  error?: boolean
}
defineProps<Props>()

const emit = defineEmits<{
  (e: 'on-submit', value: object): void
  (e: 'login'): void
}>()
const passwords = ref({
  password: '',
  rePassword: '',
})
const rules = {
  password: { required, minLength: minLength(8) },
  rePassword: {
    required,
    sameAsPassword: sameAs(computed(() => passwords.value.password)),
  },
}
const $v = useVuelidate(rules, passwords)
const showPassword = ref(false)
const loading = ref(false)
function onSubmit() {
  $v.value.$touch()
  if (!$v.value.$invalid) {
    emit('on-submit', passwords.value)
  }
}
</script>
<style>
.auth-or::before,
.auth-or::after {
  content: '';
  width: 100%;
  height: 2px;
  background: #cdcdd0;
  opacity: 0.7;
  border-radius: 1px;
  display: block;
}
</style>
