<template>
  <div>
    <div class="mb-4 flex space-y-4 flex-col">
      <div
        class="flex flex-col md:flex-row md:items-end md:space-x-4 space-y-4 md:space-y-0 w-full"
      >
        <div class="flex flex-col items-start md:w-1/2">
          <FormLabel
            for-text="name"
            :label="$t('name')"
            class="mb-2 text-gray-100 font-semibold text-sm leading-130"
          />
          <FormInput
            v-model="form.values.contact.receiverName"
            id="name"
            :error="form.$v.value.contact.receiverName?.$error"
            :placeholder="$t('write_name')"
          />
        </div>
      </div>
      <div
        class="flex flex-col md:flex-row md:items-end md:space-x-4 space-y-4 md:space-y-0 w-full items-end"
      >
        <div class="flex flex-col items-start w-full md:w-1/2">
          <FormLabel
            :label="$t('phone_number')"
            for-text="phone_number"
            class="mb-2 text-gray-100 font-semibold text-sm leading-130"
          />
          <FormInput
            v-model="form.values.contact.receiverPhone"
            v-maska="`(##) ###-##-##`"
            id="phone_number"
            :error="form.$v.value.contact.receiverPhone?.$error"
            placeholder="(__) ___-__-__"
            prefix-class="dark:text-white text-dark text-base px-3 py-2.5 bg-gray-400 dark:bg-[#696969]"
            disabled
          >
            <template #prefix> +998</template>
          </FormInput>
        </div>
        <transition name="fade" mode="out-in">
          <div :key="form.values.contact.extraPhone" class="md:w-1/2 w-full">
            <CommonButton
              v-if="!form.values.contact.extraPhone"
              @click="form.values.contact.extraPhone = true"
              class="w-full"
              variant="light"
            >
              <span class="icon-add-circle text-[24px] leading-[24px]" />
              {{ $t('add_number') }}</CommonButton
            >
            <div v-else class="flex flex-col items-start w-full">
              <FormLabel
                :label="$t('phone_number')"
                for-text="phone_number"
                class="mb-2 text-gray-100 font-semibold text-sm leading-130"
              />
              <FormInput
                v-model="form.values.contact.receiverPhone2"
                v-maska="`(##) ###-##-##`"
                id="phone_number"
                placeholder="(__) ___-__-__"
                :error="form.values.contact.extraPhoneError"
                prefix-class="dark:text-white text-dark text-base px-3 py-2.5 bg-gray-400 dark:bg-[#696969]"
                suffix-class="px-3 py-2.5 flex-center"
              >
                <template #prefix> +998</template>
                <template #suffix>
                  <span
                    @click="form.values.contact.extraPhone = false"
                    class="icon-close-circle text-[24px] leading-[24px] text-gray-200 cursor-pointer transition-200 ease-in-out hover:text-red"
                  />
                </template>
              </FormInput>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
  <div
    class="flex flex-col-reverse md:flex-row md:items-center md:justify-between border-t border-gray-600 pt-4 mt-4"
  >
    <CommonButton variant="secondary-light" class="md:w-1/4" @click="backFunc">
      <span class="icon-arrow-left text-[24px] leading-[24px]" />
      {{ $t('back') }}
    </CommonButton>
    <CommonButton
      class="md:w-1/4 mb-2 md:mb-2"
      @click="nextFunc"
      :disabled="!nextActive"
    >
      {{ $t('continue') }}
      <span class="icon-arrow-right text-[24px] leading-[24px]"
    /></CommonButton>
  </div>
</template>
<script setup lang="ts">
import { isPhone } from '~/helpers'
import type { TForm } from '~/composables/useForm'

interface Props {
  step?: number
  form: TForm<any>
  verified: boolean
}
const props = withDefaults(defineProps<Props>(), {})
const { form } = unref(props)
const { values, $v } = form
const router = useRouter()

const emit = defineEmits(['submit', 'back'])
const nextActive = computed(() => {
  if (
    form.values.contact.receiverName &&
    form.values.contact.receiverPhone &&
    !form.values.contact.extraPhoneError &&
    !form.values.contact.extraPhone
  ) {
    return true
  } else if (
    form.values.contact.receiverName &&
    form.values.contact.receiverPhone &&
    !form.values.contact.extraPhoneError &&
    form.values.contact.extraPhone &&
    isPhone(form.values.contact.receiverPhone2) &&
    props.verified
  ) {
    return true
  } else {
    return false
  }
})
const backFunc = () => {
  emit('back')
}

watch(
  () => form.values.contact.extraPhone,
  (value) => {
    if (!value) {
      form.values.contact.receiverPhone2 = ''
      form.values.contact.extraPhoneError = false
    }
  }
)
// #StepFunction
const nextFunc = () => {
  form.$v.value.contact.$touch
  const phone = form.values.contact.receiverPhone2
  if (phone) {
    form.values.contact.extraPhoneError = !isPhone(phone)
  }
  if (!form.$v.value.contact.$invalid && !form.values.contact.extraPhoneError) {
    emit('submit', form.values)
  }
}
</script>
