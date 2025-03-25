<template>
  <div>
    <div class="p-5 pt-0">
      <div class="flex-col md:flex-row  flex gap-6">
        <FormGroup :label="$t('card_number')">
          <FormInput
            placeholder="____-____-____-____"
            v-maska="`#### #### #### ####`"
            v-model="form.values.number"
            :error="form.$v.value.number.$error"
          >
            <template #suffix>
              <CommonLogoCard :number="form.values.number" class="mr-3" />
            </template>
          </FormInput>
        </FormGroup>
        <FormGroup
          :label="$t('expiry_date')"
          class="mt-4 md:mt-0 md:!max-w-[100px]"
        >
          <FormInput
            placeholder="__/__"
            v-maska="`##/##`"
            v-model="form.values.expire"
            :error="form.$v.value.expire.$error"
            input-class="!px-2 flex-center md:!px-7"
          />
        </FormGroup>
      </div>
      <CommonButton
          variant="primary"
        :text="$t('add_card')"
        v-bind="{ disabled, loading }"
        class="w-full mt-6"
        @click="submit"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { TForm } from '~/composables/useForm'

const disabled = ref(true)

const props = defineProps<{
  form: TForm<any>
  loading: boolean
}>()
const { form } = unref(props)
const { values, $v } = form

const phone = ref(1)

watch(
  form.values,
  () => {
    if (form.values.expire.length === 5 && form.values.number.length === 19) {
      disabled.value = false
    } else {
      disabled.value = true
    }
  },
  {
    deep: true,
  }
)

const emit = defineEmits(['submit'])

const submit = () => {
  form.$v.value.$touch()
  if (!form.$v.value.$invalid) {
    emit('submit')
  }
}
</script>
<style>
.modal-right-side {
  background: linear-gradient(192.83deg, #eb2859 -6.24%, #792036 92.34%);
}
</style>
