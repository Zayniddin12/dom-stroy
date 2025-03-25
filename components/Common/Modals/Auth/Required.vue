<template>
  <div>
    <CommonModalsModal :show="show" @close="emit('close')" inside>
      <div class="p-5">
        <div class="flex-center mb-5">
          <img
            src="/images/temp/auth-required.png"
            class="max-w-[184px] w-full"
            alt="lock image"
          />
        </div>
        <p class="text-center text-dark dark:text-white font-semibold mb-5">
          {{ $t('full_usage_rule') }}
        </p>
        <CommonButton :text="$t('login')" class="w-full mb-2" @click="login" />
        <CommonButton
          :text="$t('register')"
          variant="register"
          class="w-full"
          @click="register"
        />
      </div>
    </CommonModalsModal>
  </div>
</template>
<script setup lang="ts">
interface Props {
  show: boolean
  inside?: boolean
}
const props = withDefaults(defineProps<Props>(), {})
const emit = defineEmits<{
  (e: 'close'): void
}>()
const login = () => {
  $event('open-auth', 'login')
}
const register = () => {
  $event('open-auth', 'register')
}
const { $event } = useNuxtApp()
</script>
