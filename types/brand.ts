import type {TDefaultFetchData } from '~/types/index'

export interface TBrand {
  icon: string
  id: number
  override_price: string
  title: string
  warehouse: number
}

export interface TBrandResponse extends TDefaultFetchData {
  results: TBrand[]
}
