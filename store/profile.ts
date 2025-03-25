import type { TChangeNumberStepOne, TEditProfile } from '~/types/profile'
import { useAuthStore } from '~/store/auth'
import type { TUser } from '~/types/auth'
import type {
  TChangePassword,
  TChangePhone,
  TChangePhoneVerify,
} from '~/types/changePassword'

export const useProfileStore = defineStore('profileStore', {
  state: () => ({
    profile: {} as TEditProfile,
    changePassword: {} as TChangePassword,
  }),
  actions: {
    updateProfile(payload: TEditProfile) {
      const authStore = useAuthStore()
      return new Promise((resolve, reject) => {
        useFetcher<TUser>('account/edit/', {
          method: 'PUT',
          body: payload,
        })
          .then((res) => {
            if (res.error) {
              reject(res.error)
            } else {
              this.profile = res.data
              authStore.user = { ...authStore.user, ...res.data }
              resolve(res.data)
            }
          })
          .catch((err) => {
            reject(err.data)
          })
      })
    },
    updatePassword(payload: TChangePassword) {
      return new Promise((resolve, reject) => {
        useFetcher<TUser>('account/password-change/', {
          method: 'PUT',
          body: payload,
        })
          .then((res) => {
            if (res.error) {
              reject(res.error)
            } else {
              resolve(res.data)
            }
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    updateNumber(payload: TChangePhone) {
      return new Promise((resolve, reject) => {
        useFetcher<TChangeNumberStepOne>('account/change-phone/', {
          method: 'POST',
          body: payload,
        })
          .then((res) => {
            if (res.error) {
              reject(res.error)
            } else {
              resolve(res.data)
            }
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    updateNumberVerify(payload: TChangePhoneVerify) {
      return new Promise((resolve, reject) => {
        useFetcher<TChangeNumberStepOne>('account/change-phone/verify/', {
          method: 'POST',
          body: payload,
        })
          .then((res) => {
            if (res.error) {
              reject(res.error)
            } else {
              resolve(res.data)
            }
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
  },
})
