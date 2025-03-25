export interface TChangePassword {
  old_password: string
  new_password: string
  password_confirm: string
}
export interface TChangePhone {
  password: string
  phone: string
}

export interface TChangePhoneVerify {
  code: number
  phone: string
  signature: string
}
