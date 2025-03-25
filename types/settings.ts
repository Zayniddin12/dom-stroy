import type {TDefaultFetchData} from "~/types/index";

export interface TSabout {
  id: number
  description: string
}

export interface ISettingsContact {
  id: number
  phone?: string
  work_from?: string
  work_to: string
  email?: string
  address?: string
  latitude?: number
  longitude?: number
  telegram?: string
  twitter: string
  youtube?: string
  instagram?: string
  facebook?: string
}

export type TAdvertisementType = 'in_product_single' | 'in_product_list'

export interface IAdvertisement {
  id: number
  type: TAdvertisementType
  redirect_url: string
  cover: string
}

export interface IAdvertisementResponse extends TDefaultFetchData {
  results: IAdvertisement[]
}
