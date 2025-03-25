<template>
  <div class="p-5 pt-0">
    <FormGroup :label="$t('enter_discount_card')">
      <FormInput
          :placeholder="$t('enterCode')"
          v-model="form.values.number"
          :error="form.$v.value.number.$error"
      />
    </FormGroup>
    <a :href="`tel:${address}`">
      <CommonButton
          :text="$t('callCenter')"
          class="w-full mt-8"
          variant="light"
      >
        <template #post-icon>
          <i class="icon-phone-calling text-[25px] pt-0.5" />
        </template>
      </CommonButton>
    </a>

    <CommonButton
        :text="$t('save')"
        class="w-full mt-3"
        @click="submit"
        :loading="loading"
    />
  </div>


</template>
<script setup lang="ts">
import type {TForm} from '~/composables/useForm'

const props = defineProps<{
  form: TForm<any>
  loading: boolean
  address?:string
}>()
const {form} = unref(props)
const {values, $v} = form

const emit = defineEmits(['submit'])

const submit = () => {
  form.$v.value.$touch()
  if (!form.$v.value.$invalid && form.values.number.length > 0) {
    emit('submit')
  }

}

</script>
<style>
.modal-right-side {
  background: linear-gradient(192.83deg, #eb2859 -6.24%, #792036 92.34%);
}
</style>
