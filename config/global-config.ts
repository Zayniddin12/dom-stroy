import { usePaymentStore } from '~/store/payment'

export const GlobalConfig = {
  paymentSystems: {
    '8600': 'uzcard',
    '9860': 'humo',
    '5440': 'mastercard',
    '4200': 'visa',
    '6262': 'mastercard',
  },
  appsLinks: {
    appStore: 'https://apps.apple.com/uz/app/%D0%B4%D0%BE%D0%BC-%D1%81%D1%82%D1%80%D0%BE%D0%B9/id6670239674',
    googlePlay:
      'https://play.google.com/store/apps/details?id=uz.domstroy.domstroyapp&pcampaignid=web_share',
  },
}
export const OrderTabList = [
  {
    link: {
      path: '/my-orders',
    },
    name: 'active_orders',
    icon: 'delivery',
  },
  {
    link: {
      path: '/my-orders/history',
    },
    name: 'history_of_orders',
    icon: 'history',
  },
]
export const orderFormStatus = [
  {
    id: 1,
    title: 'delivery_address',
    icon: 'location',
  },
  {
    id: 2,
    title: 'contact_detail',
    icon: 'user',
  },
  {
    id: 3,
    title: 'payment',
    icon: 'money-wallet',
  },
]
export const orderStatus = [
  {
    id: 1,
    title: 'order_approved',
    icon: 'checklist',
  },
  {
    id: 2,
    title: 'on_way',
    icon: 'box',
  },
  {
    id: 3,
    title: 'delivered',
    icon: 'delivered',
  },
]
