import parsePhoneNumber from 'libphonenumber-js'

export const getImageUrl = (url: string) => {
  return new URL(`/assets/fake-images/${url}`, import.meta.url).href
}

export function formatPhoneNumber(number: string) {
  const format = number
    ?.replace(/\D/g, '')
    .match(/(\d{0,3})(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/)
  return `${format && format[1] ? format[1] : ''}
          (${format && format[2] ? format[2] : ''})
          ${format && format[3] ? format[3] : ''}
          ${format && format[4] ? format[4] : ''}
          ${format && format[5] ? format[5] : ''}`.replace(/\n/g, '')
}
export function phone(x: string) {
  return x
    ? x.replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5')
    : ''
}

export const deMask = (value: string) => value?.replace(/[)(_\s-)]/g, '')
export function isPhone(value: string) {
  if (!value?.length) {
    return true
  }
  const phoneNumber = parsePhoneNumber(value, 'UZ')
  return phoneNumber?.isValid()
}

export function formatMoneyDecimal(number: any, fix = 0, option = 'decimal') {
  let style: string
  if (['USD', 'RUB'].includes(option)) {
    style = 'currency'
  } else if (['kilogram', 'meter', 'percent'].includes(option)) {
    style = 'unit'
  } else {
    style = ''
  }

  const newStyle: string = style
  const option2 = {
    newStyle, //  unit currency percent decimal
    [newStyle]: option,
    maximumFractionDigits: fix,
    minimumFractionDigits: fix,
  }
  return number
    ? new Intl.NumberFormat('ru-RU', option2).format(number)
    : '0,00'
}

export function hashCardNumberMore(number: string) {
  const firstFourNumber = number?.slice(0, 4)
  const middleTwoNumber = number?.slice(4, 6)
  const lastFourNumber = number?.slice(12, 16)

  return `${firstFourNumber} ${middleTwoNumber}** **** ${lastFourNumber}`
}
export function isIOS() {
  return (
    [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod',
      'MacIntel',
    ].includes(navigator?.platform) ||
    navigator?.platform?.includes('Mac') ||
    (navigator?.userAgent?.includes('Mac') && 'ontouchend' in document)
  )
}

export function formatNumber(number: string | number) {
  return number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

const timeouts: { [key: string]: any } = {}

const cTimeout = (key = 'key') => {
  if (timeouts[key]) {
    clearTimeout(timeouts[key])
    timeouts[key] = undefined
  }
}

export const debounce = (key = 'key', fn = () => {}, timeout = 500) => {
  const sTimeout = (key: string, fn: any, timeout: number) => {
    cTimeout(key)

    timeouts[key] = setTimeout(() => {
      try {
        fn()
      } catch (e) {}

      timeouts[key] = undefined
    }, timeout)
  }

  return sTimeout(key, fn, timeout)
}

export const checkExpireDate = (value: any) => {
  let month = value.slice(0, 2)
  let year = value.slice(3, 5)

  let currentMonth = new Date().getMonth() + 1
  let currentYear = String(new Date().getFullYear()).slice(2, 5)
  let checkMonth =
    +month <= 12 &&
    (+year !== +currentYear ||
      (+year === +currentYear && +month >= currentMonth))
  let checkYear = year >= currentYear && year <= +currentYear + 5

  return checkYear && checkMonth
}

export const cardNumberValidator = (value: string) =>
  /8600|9860|5440|6262|4200|5614/.test(value)

export async function copyText(text: string) {
  await navigator.clipboard.writeText(text)
}

export const generateUniqueId = () =>
  Date.now().toString(36) + Math.random().toString(36).substr(2)

export const onErrorImage = (img: HTMLImageElement) => {
  img.onerror = null
  img.src = '/images/defaults/image.png'
}

export const moneyMask = () => ({
  mask: [
    'D',
    '##',
    '###',
    '# ###',
    '## ###',
    '### ###',
    '# ### ###',
    '## ### ###',
    '### ### ###',
    '# ### ### ###',
  ],
  tokens: {
    D: {
      pattern: /[1-9]/,
    },
  },
})

export const removeSpaces = (text: string) => {
  return text?.replace(/\s/g, '')
}

export function getText(htmlContent: string) {
  let text: string
  if (process.client) {
    const el = document.createElement('div')
    el.innerHTML = htmlContent
    text = el.textContent
    el.remove()
  }
  return text
}
