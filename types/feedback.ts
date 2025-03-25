export interface TFeedback {
  author: string
  rate: number
  created_at: string | Date
  img?: string | null
  comment?: string
}

export interface TReviewRate {
  rate: number
  percent: number
  count: number
}

export interface TReviewPayloadData {
  rate: number
  comment: string
  product: number
}
