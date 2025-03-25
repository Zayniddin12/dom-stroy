<template>
  <div class="flex flex-col justify-between h-full">
    <div>
      <h2 class="text-dark dark:text-white text-2xl font-bold mb-12">
        {{ $t('register_main') }}
      </h2>
      <div>
        <h3 class="text-xl text-dark dark:text-white font-bold mb-4">
          {{ $t('enter_your_data') }}
        </h3>
        <form submit="onSubmit" autocomplete="off">
          <div class="mb-4">
            <FormLabel :label="$t('fio')" for-text="fio" />
            <FormInput
              v-model="form.values.stepOne.full_name"
              auto-focus
              id="fio"
              class="mt-2"
              :placeholder="$t('enter_your_full_name')"
              :error="form.$v.value.stepOne.full_name?.$error"
              input-class="placeholder:text-gray-100"
              :autocomplete="false"
              @enter="login"
            />
          </div>
          <div class="mb-4">
            <FormGroup class="mb-4" :label="$t('region')">
              <FormSelect
                custom-class="bg-[#ffffff1a] dark:text-white"
                input-class="placeholder:text-gray-100 dark:!bg-white/10 dark:text-white !bg-gray-600 !border-none"
                :list="regionStore.region"
                :modelValue="form?.values?.stepOne?.region?.title"
                @update:modelValue="(val) => (form.values.stepOne.region = val)"
                :error="form.$v.value.stepOne.region.$error"
                :placeholder="$t('choose_region')"
                :disabled="regionStore.loading"
                class="w-full"
                @fetchData="regionFetch"
                :loading="regionStore.loading"
                :no-bts="false"
              />
            </FormGroup>
            <FormGroup :label="$t('district_city')">
              <FormSelect
                custom-class="bg-[#ffffff1a] dark:!text-white hover:!text-[#383838]"
                input-class="placeholder:text-gray-100 dark:!bg-white/10 dark:text-white !bg-gray-600 !border-none"
                :no-bts="false"
                :list="regionStore.district"
                :modelValue="form?.values?.stepOne?.district?.title"
                @update:modelValue="
                  (val) => (form.values.stepOne.district = val)
                "
                :error="form.$v.value.stepOne.district?.$error"
                :disabled="
                  regionStore.distLoading && !form.values.stepOne.region
                "
                :placeholder="$t('choose_district')"
                class="w-full"
                @fetchData="districtFetch"
                :loading="regionStore.distLoading"
              />
            </FormGroup>
          </div>
          <div class="mb-4">
            <FormLabel :label="$t('phone_number')" for-text="phone_number" />
            <FormInput
              v-model="form.values.stepOne.phone"
              v-maska="`(##) ###-##-##`"
              id="phone_number"
              class="mt-2"
              placeholder="(__) ___-__-__"
              :error="form.$v.value.stepOne.phone?.$error || error"
              input-class="placeholder:text-gray-100"
              prefix-class="dark:text-white text-dark text-base px-3 py-2.5 bg-gray-400 dark:bg-[#696969]"
              :autocomplete="false"
              @enter="login"
            >
              <template #prefix> +998 </template>
            </FormInput>
          </div>
        </form>
      </div>
    </div>
    <div class="flex-y-center my-4">
      <FormCheckbox
        v-model="form.values.stepOne.checked"
        :checked="form.values.stepOne.checked"
        :error="form.$v.value.stepOne.checked?.$error"
      />
      <i18n-t
        class="cursor-pointer text-xs leading-[124%] text-dark dark:text-white font-normal"
        for="terms_of_use"
        keypath="by_pressing_this_you_will_allow_rules"
        tag="p"
        @click="form.values.stepOne.checked = !form.values.stepOne.checked"
      >
        <template #rules>
          <NuxtLink
            class="underline hover:text-primary transition-300"
            target="_blank"
            to="/pages/privacy-policy"
            >{{ $t('terms_of_use') }}
          </NuxtLink>
        </template>
      </i18n-t>
    </div>
    <div>
      <CommonButton
        :text="$t('register')"
        class="w-full"
        @click="login"
        :loading="loading"
      />
      <div class="auth-or w-full flex-center my-3">
        <span class="mx-3 text-xs text-gray-200 flex-shrink-0">{{
          $t('have_account')
        }}</span>
      </div>
      <CommonButton
        :text="$t('login')"
        class="w-full"
        @click="emit('login')"
        variant="secondary"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { TForm } from '~/composables/useForm'
import { isPhone } from '~/helpers'
import * as pkg from 'vue-toastification'
import { useRegionStore } from '~/store/region'

interface Props {
  loading?: boolean
  phoneError?: boolean
  formData: TForm<any>
}
const props = defineProps<Props>()
const regionStore = useRegionStore()
const form = unref(props.formData)
const { values, $v } = form
const emit = defineEmits<{
  (e: 'on-submit', value: object): void
  (e: 'login'): void
}>()

interface Props {
  step?: number
  form: TForm<any>
  orderLoading: boolean
}

const { useToast } = pkg
const { t } = useI18n()
const toast = useToast()

const error = ref(false)
watch(
  () => props.phoneError,
  (val) => {
    error.value = val
  },
  {
    immediate: true,
  }
)
watch(
  () => form.values,
  (val) => {
    if (error.value) {
      error.value = false
    }
  },
  {
    deep: true,
    immediate: true,
  }
)
function login() {
  form.$v.value.stepOne.$touch()
  if (!form.$v.value.stepOne.$invalid) {
    emit('on-submit', form.values.stepOne)
  } else {
    if (!isPhone(form.values.stepOne.phone)) {
      toast.error(t('phone_error'))
    } else {
      toast.error(t('fill_in_form'))
    }
  }
}

const regionFetch = () => {
  regionStore.fetchRegion()
}

const districtFetch = () => {
  regionStore.fetchDistrict({
    region: form.values.stepOne.region?.id,
  })
}
watch(
  () => form?.values?.stepOne?.region,
  () => {
    regionStore.fetchDistrict({ region: form.values.stepOne?.region?.id })
    form.values.stepOne.district = {}
  },
  { deep: true }
)

onMounted(() => {
  regionStore.fetchRegion()
})
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
