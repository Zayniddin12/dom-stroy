import type {TDefaultFetchData } from '~/types/index'
import type {TProducts } from '~/types/products'

export interface TProductsManufacture {
  icon: string
  id: number
  override_price: string
  products: TProducts
  slug: string
  title: string
}

export interface TManufacture {
  id: number | string
  title: string
  override_price: string
  warehouse: number
  icon: string
}

export interface TProductsManufactures extends TDefaultFetchData {
  results: TProductsManufacture[]
}

export interface TManufactures extends TDefaultFetchData {
  results: TManufacture[]
}
