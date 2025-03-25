<template>
  <div>
    <CardsBlank class="p-5">
      <p class="text-2xl leading-130 font-bold text-dark dark:text-white">
        {{ $t('do_you_have_promocode') }}
      </p>
      <FormGroup :label="$t('enter_your_promocode')" class="mt-5">
        <FormInput
          v-model="form.values.promocode"
          :error="form.$v.value.promocode.$error"
          :placeholder="$t('enter_promocode')"
        />
      </FormGroup>

      <CommonButton
        class="w-full mt-4"
        :text="$t('submit')"
        @click="submit"
        :loading="loading"
        :disabled="!form.values.promocode"
      />
    </CardsBlank>
  </div>
</template>

<script setup lang="ts">
import { required } from '@vuelidate/validators'
import * as pkg from 'vue-toastification'
import { useOrderStore } from '~/store/order'
import { formatNumber } from '~/helpers'
const { useToast } = pkg

interface Props {
  price: number
}

const props = defineProps<Props>()

const orderStore = useOrderStore()

const $toast = useToast()
const { t: $t } = useI18n()

const form = useForm(
  {
    promocode: null,
  },
  {
    promocode: {
      required,
    },
  }
)

const loading = ref(false)

function submit() {
  form.$v.value.$touch()

  if (form.$v.value.$invalid) {
    return
  }

  loading.value = true
  useFetcher('promocode/CheckAndGetPromoInfo/', {
    method: 'POST',
    body: {
      promo_code: form.values.promocode,
    },
  })
    .then((res) => {
      if (res?.data?.valid) {
        if (props.price >= res.data.promo.min_order_price) {
          $toast.success($t('promocode_successfully_used'))
          orderStore.promocode = form.values.promocode
        } else {
          $toast.error(
            $t('min_price') +
              ': ' +
              formatNumber(res.data.promo.min_order_price ?? 0)
          )
        }
      } else {
        $toast.error($t('promocode_not_valid'))
      }
    })
    .catch((err) => {})
    .finally(() => {
      loading.value = false
    })
}
</script>
