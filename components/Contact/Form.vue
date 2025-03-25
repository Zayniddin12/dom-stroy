<template>
  <div class="bg-white rounded-xl w-full xl:w-[580px] p-6 font-proxima">
    <form submit="onSubmit" autocomplete="off">
      <div
        class="grid grid-cols-1 gap-5 md:grid-cols-2 items-center gap-x-6 mb-6"
      >
        <div class="flex flex-col items-start">
          <FormLabel
            for-text="name"
            :label="$t('name')"
            class="mb-2 text-gray-100 font-normal text-sm leading-130 dark:!text-gray-300 transition-300"
          />
          <FormInput
            v-model="form.values.name"
            id="name"
            :error="form.$v.value.name?.$error"
            :placeholder="$t('write_name')"
            input-class="!w-[254px]"
          />
        </div>
        <div class="flex flex-col items-start">
          <FormLabel :label="$t('phone_number')" for-text="phone_number" class="dark:!text-gray-300 transition-300"/>
          <FormInput
            v-model="form.values.phone"
            v-maska="`(##) ###-##-##`"
            id="phone_number"
            :error="form.$v.value.phone?.$error"
            class="mt-2"
            placeholder="(__) ___-__-__"
            prefix-class="text-dark-200 dark:text-white text-base px-3 py-2.5 bg-gray-400 dark:bg-white/10 backdrop-blur-[6px] transition-300"
          >
            <template #prefix class=""> +998</template>
          </FormInput>
        </div>
      </div>
      <div class="w-full flex flex-col mb-6">
        <label
          for="text"
          class="mb-2 text-gray-100 font-normal text-sm leading-130 dark:!text-gray-300 transition-300"
          >{{ $t('text') }}</label
        >
        <textarea
          id="text"
          :placeholder="$t('write_text')"
          v-model="form.values.text"
          maxlength="400"
          :class="
            form.$v.value.text?.$error
              ? '!border-red placeholder:!text-red'
              : ''
          "
          class="bg-gray-500 dark:bg-white/10 transition-300 w-full h-[120px] border border-transparent dark:text-white outline-none py-[10px] px-3 rounded-lg placeholder:text-gray-200 dark:!placeholder:text-gray-300 focus:border-gray-300 duration-200 ease-out resize-none"
        />
        <vue-recaptcha
          class="mt-5"
          ref="recaptcha"
          size="100%"
          :sitekey="siteKey"
          @verify="verifyMethod"
          @expired="expiredMethod"
        />
      </div>
      <CommonButton
        :text="$t('send')"
        type="button"
        class="w-[210px] ml-auto"
        :loading="loading"
        @click="submit"
        :disabled="!captchaToken"
      />
    </form>
  </div>
</template>

<script setup lang="ts">
import { VueRecaptcha } from 'vue-recaptcha'
import type { TForm } from '~/composables/useForm'

const props = defineProps<{
  form: TForm<any>
  loading?: boolean
}>()
const { form } = unref(props)
const { values, $v } = form

const emit = defineEmits(['submit'])

const siteKey =
  import.meta.env.VITE_APP_SITE_KEY ||
  '6Lf1EH4kAAAAAKhbofLev9K_38lfgJP1UO1OCBSu'

const captchaToken = ref('')
function verifyMethod(response: any) {
  captchaToken.value = response
}
function expiredMethod() {
  captchaToken.value = ''
}
function submit() {
  form.$v.value.$touch()
  if (!form.$v.value.$invalid && captchaToken) {
    emit('submit', form.values)
  }
}
</script>
