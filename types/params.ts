export interface TParams {
  size?: number
  offset?: number
  page?: number
  search?: string
  gender?: 'male' | 'female'
  region?: number
}

export interface TFilterOptions {
  merge?: boolean
  force?: boolean
  returnOnly?: boolean
}
