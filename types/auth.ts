import type { TFetcherData } from '~/types/index'

export interface TUser {
  id: number
  phone: string
  full_name: string
  address: string
  coupon_balance: string
  cashback_balance: string
  language: 'uz' | 'sr' | 'ru'
  // Not sure about the types of the avatar_src
  avatar_src: {
    default: string
  }
}

export interface TLoginPayload {
  phone: string
  password: string
}

export interface TAuthTokens {
  refresh?: string
  access: string
}

export interface TAuthRegisterEntryPayload {
  full_name: string
  phone: string
  district: string
}

export interface TAuthRegisterError {
  status_code: number
  errors: {
    error: string
    message: string
  }[]
}

export interface TAuthRegisterVerifyPayload {
  phone: string
  code: string
  session: string
}

export interface TAuthRegisterResponse {
  email: string | null
  full_name: string
  token: TAuthTokens
}
