export interface TResetPasswordResponse {
  phone: string
  signature: string
}

export interface TResetPasswordVerifyPayload {
  code: string
  signature: string
}

export interface TResetPasswordNewPayload {
  new_password: string
  password_confirm: string
}
