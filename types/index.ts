import { FetchError } from 'ohmyfetch/dist/node'

export interface ISocialLinkResponse {
  name: string
  link: string
  icon: string
}

export interface TFetcherData<TData, TError> {
  data: TData
  error?: FetchError<TError> | null
}

export interface TDefaultFetchData {
  current_page: number
  links: {
    next: string
    previous: null | string
  }
  page_items: number
  page_size: number
  total: number
  total_pages: number
}

export interface TBanner {
  id: number
  title: string
  sub_title: string
  image_src: {
    default: string
    optimized: string
    banner: string
  }
  url: string
}

export interface IBanners extends TDefaultFetchData {
  results: TBanner[]
}

export interface IStoryItem {
  id: 1
  title: string
  description: string
  image_src: {
    default: string
    large: string
    medium: string
  }
  url: string
  video: string
  video_duration: number
  has_seen: boolean
}

export interface IStory {
  id: number
  title: string
  description: string
  url: string
  video_duration: number
  image_src: {
    small: string
    large: string
    medium: string
  }
  product_id: number
  has_seen: boolean
  items: IStoryItem[]
}

export interface IStoryResult extends TDefaultFetchData {
  results: IStory[]
}

export interface ICombinedStoryItem extends IStoryItem {
  parent: number
}

export interface ILiveStream {
  id: number
  title: string
  cover: string
  link: string
}
