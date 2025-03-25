<template>
  <div>
    <div class="container">
      <CommonBreadcrumb v-bind="{ routes }" />
      <div class="mt-5 mb-4 md:mb-6 font-proxima">
        <p
          class="mb-1 text-2xl md:text-[32px] leading-130 font-normal text-dark-200 dark:text-white transition-300"
        >
          {{ $t('feedback') }}
        </p>
        <p
          class="text-xl leading-6 font-normal text-gray-200 dark:text-gray-300 transition-300"
        >
          {{ $t('feedback_sub') }}
        </p>
      </div>
      <div
        class="grid grid-cols-2 lg:grid-cols-12 items-start justify-between gap-x-0 gap-y-6 xl:gap-y-0 xl:gap-x-6 font-proxima mb-8"
      >
        <ContactForm
          :loading="loading"
          :form="form"
          @submit="submit"
          class="col-span-6 dark:bg-dark-100 transition-300"
        />
        <ContactAddress :info="contact" class="col-span-6" />
      </div>
    </div>

    <ContactMap
      :model-value="[contact?.longitude, contact?.latitude]"
      class="border-t border-t-gray-400"
    />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useCommonStore } from '~/store/common'
import { useForm } from '~/composables/useForm'
import { required } from '@vuelidate/validators'
import { isPhone } from '~/helpers'

const { t: $t } = useI18n()
const loading = ref(false)
import * as pkg from 'vue-toastification'
const { useToast } = pkg

const toast = useToast()

const commonStore = useCommonStore()

const contact = computed(() => commonStore.contacts)

const form = useForm(
  {
    name: '',
    phone: '',
    text: '',
  },
  {
    name: { required },
    phone: { required, isPhone },
    text: { required },
  }
)

const submit = () => {
  loading.value = true
  useFetcher('settings/application/', {
    method: 'POST',
    body: {
      full_name: form.values.name,
      phone_number: form.values.phone,
      question: form.values.text,
    },
  })
    .then((res) => {
      if (!res?.error) {
        form.values.phone = ''
        form.values.name = ''
        form.values.text = ''
        form.$v.value.$reset()
        toast.success($t('successfully_sent'))
      }
    })
    .finally(() => {
      loading.value = false
    })
}

useHead({
  title: $t('feedback'),
})

const routes = [
  {
    name: $t('main'),
    route: '/',
  },
  {
    name: $t('feedback'),
  },
]
</script>
