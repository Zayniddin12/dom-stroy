<template>
  <CommonModalsModal @close="$emit('close')" inside :show="show">
    <div class="p-5">
      <p class="text-xl font-bold leading-6 text-dark dark:text-white">
        {{ $t('report_bug') }}
      </p>
    </div>

    <div class="p-5 pt-0">
      <FormGroup :label="$t('full')">
        <FormTextarea
          no-resize
          :placeholder="$t('report_bug_text')"
          maxlength="500"
          v-model="form.values.message"
          :error="form.$v.value.message.$error"
        />
      </FormGroup>

      <FormGroup class="mt-4" :label="$t('upload_photo')">
        <FormUploadPhoto
          :desc="$t('upload_photo_text')"
          @upload="form.values.images = $event"
        />
      </FormGroup>

      <CommonButton
          variant="thirdly"
        :text="$t('send')"
        class="w-full mt-5"
        @click="submit"
          v-bind="{ disabled, loading }"
      />
    </div>
  </CommonModalsModal>
</template>

<script setup lang="ts">
import type { TForm } from '~/composables/useForm'
const disabled = ref(true)

interface Props {
  show?: boolean
  form: TForm<any>
  loading?: boolean
}

const emit = defineEmits(['submit'])

const props = withDefaults(defineProps<Props>(), {})

const { form } = unref(props)
const { values, $v } = form

const submit = () => {
  form.$v.value.$touch()
  if (!form.$v.value.$invalid) {
    emit('submit')
  }
}


watch(
    () => form.values, // Ensure you watch a function returning the reactive object
    () => {
      if (
          form.values.images.length >= 1 &&
          form.values.message.length >= 5
      ) {
        disabled.value = false;
      } else {
        disabled.value = true;
      }
    },
    {
      deep: true,
    }
);


</script>

<style scoped></style>
