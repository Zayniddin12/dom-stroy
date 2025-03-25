import type {TDefaultFetchData } from '~/types/index'

export interface TComment {
  id: number
  user: {
    id: number
    full_name: string
    avatar_src: {
      default: string
      small: string
      extra_small: string
    }
  }
  rate: number
  comment: string
  created_at: string
  product: {
    id: number
    title: string
    slug: string
    images: [
      {
        default: string
        large: string
        medium: string
        small: string
        extra_small: string
      }
    ]
    description: string
    is_new: boolean
    is_liked: boolean
    is_cart: boolean
  }
}

export interface TComments {
  results: TComment[]
}
export interface IRates {
  rate: number
  percent: number
  count: number
}
export interface IRatings {
  rate: number
  total: number
  rates: IRates[]
}
