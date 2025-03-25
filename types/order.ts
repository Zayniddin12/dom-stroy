export interface TOrder {
  address: string
  payment_type: number[]
  receiver_fish: string
  receiver_phone: string
  receiver_phone2: string
  use_coupon_balance: boolean
  worker_count: number
  latitude: string
  longitude: string
  card: number
}
export interface IProduct {
  id: number
  amount: number
  count?: number
  price: string
  sale_price: string
  final_price: string
  product: {
    id: number
    slug: string
    title: string
    rate: number
    image_src: {
      default: string
    }
    is_liked: boolean
    comment_count: number
  }
  order_price: string
  product_images: IImages[]
}
export interface TCartData {
  total_user_cart: {
    price: string
    products: string
  }
  products: IProduct[]
}
export interface TCoupon {
  title: string
  amount: string
  code: string
}
export interface IAddress {
  address: string
  region: string
  district: string
}
export interface IImages {
  default: string
}
export interface IOrderItems {
  address: string
  created_at: string
  id: number
  order_price: string
  product_images: IImages[]
  status: number
  product_count: number
}
export interface IOrderList {
  total_pages: number
  total: number
  results: IOrderItems[]
}
export interface OrderSingle {
  id: number
  cashback_price: string
  order_cashback: string
  created_at: string
  receiver_fish: string
  receiver_phone: string
  receiver_phone2: string | null
  address: string
  latitude: string
  longitude: string
  total_price: string
  coupon_price: string
  delivery_price: string
  worker_count: number,
  worker_price: string
  total_worker_price: string
  order_price: string
  courier: string | null,
  order_products: IOtherProducts[]
  product_count: number
  status_logs: IStatusLogs[]
  status: number
  delivery_type: number
  discount: string
  nds: {percent: number, price: string}
}
export interface IStatusLogs {
  description: string,
  status_name: string,
  status: number,
  date: string
}
export interface IOtherProductsProduct {
  comment_count: string
  currency: number
  id: number
  images: IImages[]
  rate: number
  sale_price: number
  price: string
  slug: string
  has_comment: boolean
  can_comment: boolean
}
export interface IOtherProducts {
  id: number,
  product_id: number,
  title: string,
  product_price: string,
  amount: number,
  total_price: string,
  unit: {
    id: number,
    title: string
  }
  product: IOtherProductsProduct
}
export interface ICheck {
  cacheback_earning: number
  cashback_percent: number
  cashback_price: number
  delivery_price: number
  delivery_type: number
  nds: number
  nds_price: number
  total_order_discount_price: number
  total_order_price: number
  total_price: number
  total_real_order_price: number
  region: number
  district: number
}