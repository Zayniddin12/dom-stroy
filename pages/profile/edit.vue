<template>
  <CardsBlank class="p-5 pr-0 dark:bg-dark-100">
    <div
        class="pr-5 pb-3 border-b border-solid border-gray-600 dark:border-dark-300 flex-center-between"
    >
      <p class="text-2xl leading-130 font-bold text-dark dark:text-white">
        {{ $t('personal_detail') }}
      </p>
    </div>
    <FormUploadAvatar
        @upload="mainForm.values.avatar = $event.file"
        @remove="mainForm.values.avatar = 'nothing'"
        class="my-5"
        :image="mainForm.values.avatar"
    />

    <div class="grid grid-cols-2 gap-6 pr-5">
      <FormGroup :label="$t('name')">
        <FormInput
            :placeholder="$t('name')"
            v-model="mainForm.values.full_name"
            :error="mainForm.$v.value.full_name.$error"
        />
      </FormGroup>
      <!--      <FormGroup :label="$t('surname')">-->
      <!--        <FormInput-->
      <!--          :placeholder="$t('surname')"-->
      <!--          v-model="mainForm.values.last_name"-->
      <!--          :error="mainForm.$v.value.last_name.$error"-->
      <!--        />-->
      <!--      </FormGroup>-->
      <FormGroup :label="$t('address')">
        <FormInput
            :placeholder="$t('address')"
            v-model="mainForm.values.address"
        />
      </FormGroup>
    </div>

    <div
        class="flex items-end justify-end gap-4 pr-5 border-t pt-5 mt-5 border-solid border-gray-600 dark:border-dark-300"
    >
      <NuxtLink :to="localePath('/profile')">
        <CommonButton
            variant="primary-light"
            text-class="dark:text-[#f9524e]"
            class="!dark:bg-[#f9524e10] w-full px-10 py-3"
            :text="$t('cancel')"/>
      </NuxtLink>
      <CommonButton
          class="px-10 py-3"
          :text="$t('save')"
          @click="submit"
          v-bind="{ loading }"
      />
    </div>
  </CardsBlank>
</template>

<script setup lang="ts">
import {useForm} from '~/composables/useForm'
import {required} from '@vuelidate/validators'
import {useAuthStore} from '~/store/auth'
import {useProfileStore} from '~/store/profile'
import * as pkg from 'vue-toastification'

const {useToast} = pkg

const toast = useToast()


const authStore = useAuthStore()
const profileStore = useProfileStore()
const loading = ref(false)
const user = computed(() => authStore.user)
const router = useRouter()
const {t: $t} = useI18n()
const localePath = useLocalePath()
const mainForm = useForm(
    {
      full_name: user.value?.full_name || '',
      address: user.value?.address || '',
      avatar: user?.value?.avatar_src?.small || '',
      // last_name: '',
    },
    {
      full_name: {
        required,
      },
      // last_name: {
      //   required,
      // },
    }
)

const submit = () => {
  if (!mainForm.$v.value.$invalid) {
    loading.value = true
    const formData = new FormData()
    if (typeof mainForm.values.avatar !== 'string') {
      formData.append('avatar', mainForm.values.avatar)
    }

    if (mainForm.values.avatar === 'nothing') {
      mainForm.values.avatar = ''
      formData.append('avatar', mainForm.values.avatar)
    }

    formData.append('full_name', mainForm.values.full_name)
    formData.append('address', mainForm.values.address)
    profileStore
        .updateProfile(formData)
        .then(() => {
          // Todo: SHOW STATUS CHANGED MESSAGE
          router.push(localePath('/profile'))
        })
        .catch((err) => {
          if (err.response?._data?.errors) {
            toast.error($t(err.response?._data?.errors[0]?.error))
          }
        })
        .finally(() => {
          loading.value = false
        })
  }
}

useHead({
  title: $t('personal_detail'),
})
</script>
