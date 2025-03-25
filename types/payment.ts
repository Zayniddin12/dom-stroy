export interface ICardAdd {
  name?: string
  number: string
  expire: string
}
export interface IPaymentServices {
  id: number
  is_cash_valid: boolean
  is_card_valid: boolean
  is_payme_valid: boolean
  is_click_valid: boolean
  is_uzumbank_valid: boolean
  is_karmonpay_valid: boolean
}
