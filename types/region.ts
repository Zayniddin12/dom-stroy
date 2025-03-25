import type {TDefaultFetchData } from '~/types/index'

export interface TRegion {
  id: number
  title: string
  title_uz: string
  title_sr: string
  title_ru: string
  region?: number
}

export interface TRegionResponse extends TDefaultFetchData {
  results: TRegion[]
}
