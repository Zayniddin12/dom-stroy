import { str } from '@storybook/docs-tools'

export interface TEditProfile {
  full_name: string
  address: string
  avatar_src: {
    [key: string]: string
  }
}

export interface TChangeNumberStepOne {
  data: {
    phone: string
    signature: string
  }
}
