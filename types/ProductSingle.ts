export interface TProductSingle {
  id: number
  title: string
  slug: string
  manufacturer: {
    id: number
    title: string
    override_price: string
    warehouse: number
    icon: string
  }
  colors: {
    id: number
    title: string
    image_src: {
      default: string
      small: string
    }
    color: string
  }[]
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
  feature: string
  apply: string
  unit: {
    id: number
    title: string
  }
  unit_value: number
  category: {
    id: number
    title: string
    parent_id: number
    categories: []
    icon_src: {
      default: string
      medium: string
      small: string
    }
  }
  sale_price: string
  price: string
  product_group: number
  rate: number
  comment_count: number
  can_comment: boolean
  views: number
  is_new: boolean
  is_liked: boolean
  is_cart: boolean
  has_comment: boolean
  active_megasale: null
  cart_product_color_id: null
  groups: {
    id: number
    title: string
    slug: string
  }[]
  year: string
  manufactured_country: string
  targeted_audience: string
  targeted_gender: string
  weight: string
}
