<template>
  <div>
    <div class="p-5 pt-0">
      <div class="flex-col md:flex-row flex gap-6">
        <FormGroup :label="$t('enter_phone')">
          <FormInput
            v-maska="`(##) ###-##-##`"
            placeholder="(__) ___-__-__"
            v-model="form.values.number"
            :error="form.$v.value.number.$error"
            prefix-class="pl-3 dark:!text-white"
          >
            >
            <template #prefix> +998</template>
          </FormInput>
        </FormGroup>
      </div>

      <div class="flex gap-2 bg-gray-600 p-3 rounded-lg mt-8 dark:bg-dark-500">
        <i class="icon-info text-dark-300 text-[30px] pt-0.5 dark:text-white" />
        <p class="text-xs dark:text-white">{{ $t('confirm_phone') }}</p>
      </div>

      <CommonButton
        :text="$t('continue')"
        class="w-full mt-3"
        @click="submit"
        :loading="loading"
      />

      <a :href="`tel:${address}`">
        <CommonButton
          :text="$t('callCenter')"
          class="w-full mt-3 leading-6"
          variant="secondary-light"
        >
          <template #post-icon>
            <i class="icon-phone-calling text-[25px] pt-0.5" />
          </template>
        </CommonButton>
      </a>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { TForm } from '~/composables/useForm'
import { useCommonStore } from '~/store/common'

const props = defineProps<{
  form: TForm<any>
  loading: boolean
  address?: string
}>()
const { form } = unref(props)
const { values, $v } = form

const emit = defineEmits(['submit'])

const submit = () => {
  $v.value.$touch()
  if (!form.$v.value.$invalid) {
    emit('submit')
  } else {
    // console.log(form.$v.value)
  }
}
</script>
<style>
.modal-right-side {
  background: linear-gradient(192.83deg, #eb2859 -6.24%, #792036 92.34%);
}
</style>
