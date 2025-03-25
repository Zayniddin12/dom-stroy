import type {TDefaultFetchData } from '~/types/index'
import type {TCategory } from '~/types/categories'
import type {TManufacture } from '~/types/manufacture'

export interface TProduct {
  id: number
  title: string
  comment_count: number
  slug: string
  rate: number
  price: string
  sale_price: string | null
  price_without_discount: string | null
  images: {
    default: string
    extra_small: string
    large: string
    medium: string
    small: string
  }[]
  is_new: boolean
  is_liked: boolean
  is_cart: boolean
  unit: {
    id: number
    title: string
  }
  manufacturer: {
    id: number
    title: string
  }
}

export interface TProducts extends TDefaultFetchData {
  total: number
  results: TProduct[]
}

export interface TFetchProductsParams {
  ordering?: string
  category_id__in?: string
  manufacturer_id__in?: string
  sale_price__gt?: number
  sale_price__isnull?: string
  price__gte?: number
  price__lte?: number
  colors?: string
  category_id?: number
  search?: string
  page?: number
  size?: number
  is_recommendation?: boolean
  in_sale?: boolean
}

export type IFilterItems = TCategory[] | TManufacture[]

export interface IFilterData {
  checked?: boolean
  expanded?: boolean
  items?: IFilterItems
}

export type TPayload = {
  page?: number
}