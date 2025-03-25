<template>
  <ClientOnly>
    <form @submit.prevent="onSubmit">
      <CardsBlank class="p-5 pr-0">
        <div
          class="pr-5 pb-3 border-b border-solid border-gray-600 dark:border-dark-300 flex-center-between"
        >
          <p class="text-2xl leading-130 font-bold text-dark dark:text-white">
            {{ $t('change_password') }}
          </p>
        </div>
        <div class="mt-6 mr-5">
          <div class="grid md:grid-cols-2 gap-6">
            <FormGroup label="old_password">
              <FormInput
                v-model="form.values.old_password"
                :type="showPassword ? 'text' : 'password'"
                :error="form.$v.value.old_password?.$error"
                :placeholder="$t('enter_password')"
                :autocomplete="false"
              >
                <template #suffix>
                  <button type="button" class="translate-y-1">
                    <i
                      :class="showPassword ? 'icon-eye' : 'icon-eye-closed'"
                      class="transition-300 ease-in-out text-gray-100 text-2xl mr-3"
                      @click.prevent="showPassword = !showPassword"
                    ></i>
                  </button>
                </template>
              </FormInput>
            </FormGroup>
          </div>
          <div class="grid md:grid-cols-2 gap-6 my-6">
            <FormGroup label="new_password">
              <FormInput
                v-model="form.values.new_password"
                :type="showPasswordNew ? 'text' : 'password'"
                :error="form.$v.value.new_password?.$error"
                :placeholder="$t('enter_password')"
                :autocomplete="false"
              >
                <template #suffix>
                  <button type="button" class="translate-y-1">
                    <i
                      :class="showPasswordNew ? 'icon-eye' : 'icon-eye-closed'"
                      class="transition-300 ease-in-out text-gray-100 text-2xl mr-3"
                      @click.prevent="showPasswordNew = !showPasswordNew"
                    ></i>
                  </button>
                </template>
              </FormInput>
            </FormGroup>
            <FormGroup label="confirm_password">
              <FormInput
                v-model="form.values.password_confirm"
                :type="showPasswordNewRepeat ? 'text' : 'password'"
                :error="form.$v.value.password_confirm?.$error"
                :placeholder="$t('enter_password')"
                :autocomplete="false"
              >
                <template #suffix>
                  <button type="button" class="translate-y-1">
                    <i
                      :class="
                        showPasswordNewRepeat ? 'icon-eye' : 'icon-eye-closed'
                      "
                      class="transition-300 ease-in-out text-gray-100 text-2xl mr-3"
                      @click.prevent="
                        showPasswordNewRepeat = !showPasswordNewRepeat
                      "
                    ></i>
                  </button>
                </template>
              </FormInput>
            </FormGroup>
          </div>

          <div class="w-full items-end justify-end flex gap-4">
            <CommonButton
                variant="thirdly"
              class="px-[47px]"
              type="submit"
              :text="$t('save')"
              v-bind="{ disabled, loading }"
            />
          </div>
        </div>
      </CardsBlank>
    </form>
  </ClientOnly>
</template>

<script setup lang="ts">
import { useForm } from '~/composables/useForm'
import { minLength, required } from '@vuelidate/validators'
import { useAuthStore } from '~/store/auth'
import { useProfileStore } from '~/store/profile'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import * as pkg from 'vue-toastification'
import { useApi } from '~/composables/useApi'
const { useToast } = pkg

const toast = useToast()

const { action: $put } = useApi()

const { t: $t } = useI18n()
const localePath = useLocalePath()
const authStore = useAuthStore()
const profileStore = useProfileStore()

const router = useRouter()
const user = computed(() => authStore.user)
const showPassword = ref(false)
const showPasswordNew = ref(false)
const showPasswordNewRepeat = ref(false)
const loading = ref(false)
const disabled = ref(true)

const form = useForm(
  {
    old_password: '',
    new_password: '',
    password_confirm: '',
  },
  {
    old_password: { required },
    new_password: {
      required,
      minLength: minLength(8),
      sameAs(value: string) {
        return value === form.values.new_password
      },
    },
    password_confirm: {
      required,
      minLength: minLength(8),
      sameAs(value: string) {
        return value === form.values.new_password
      },
    },
  }
)

const onSubmit = () => {
  form.$v.value.$touch()
  if (!form.$v.value.$invalid) {
    loading.value = true
    // profileStore
    //   .updatePassword(form.values)
    //   .then((res) => {
    //     toast.success(res.message)
    //     router.push(localePath('/profile/settings'))
    //   })
    //   .catch((err) => {
    //     toast.error(err.response._data.errors[0].message)
    //   })
    //   .finally(() => {
    //     loading.value = false
    //   })
    $put('PUT', 'account/password-change/', form.values)
      .then((res) => {
        toast.success(res.message)
        router.push(localePath('/profile/settings'))
      })
      .catch((err) => {
        toast.error(err.response._data.errors[0].message)
      })
      .finally(() => {
        loading.value = false
      })
  }
}
watch(
    () => form.values, // Ensure you watch a function returning the reactive object
    () => {
      if (
          form.values.old_password.length >= 5 &&
          form.values.new_password.length >= 5 &&
          form.values.password_confirm.length >= 5
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
