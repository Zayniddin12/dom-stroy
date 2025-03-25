import type {TDefaultFetchData } from '~/types/index'

export interface TCategory {
  id: number | string
  parent_id?: number
  title: string
  icon_src?: {
    default: string
    medium: string
    small: string
  }
  categories?: TCategory[]
  category?: number
}

export interface TCategoryResponse extends TDefaultFetchData {
  results: TCategory[]
}
