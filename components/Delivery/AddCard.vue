<template>
  <div class="grid md:grid-cols-12">
    <FormGroup :label="$t('card_number')" class="col-span-4">
      <FormInput
        placeholder="____-____-____-____"
        v-maska="`#### #### #### ####`"
        v-model="paymentForm.values.number"
        :error="paymentForm.$v.value.number.$error || error"
        class=""
      >
        <template #suffix>
          <CommonLogoCard :number="paymentForm.values.number" class="mr-3" />
        </template>
      </FormInput>
    </FormGroup>
    <FormGroup
      :label="$t('expiry_date')"
      class="sm:ml-6 col-span-4 mt-4 sm:mt-0"
    >
      <FormInput
        placeholder="__/__"
        v-maska="`##/##`"
        v-model="paymentForm.values.expire"
        :error="paymentForm.$v.value.expire.$error || error"
        class="sm:!w-[68px]"
      />
    </FormGroup>
  </div>
</template>

<script setup lang="ts">
import type { TForm } from '~/composables/useForm'

const props = defineProps<{
  paymentForm: TForm<any>
  error: boolean
}>()

const { paymentForm } = unref(props)
</script>
