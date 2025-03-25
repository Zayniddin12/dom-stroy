import type {IProfileAction } from '~/types/header'

export const socialLinks = [
  {
    name: 'facebook',
    link: 'https://facebook.com',
    icon: 'icon-facebook-square',
  },
  {
    name: 'instagram',
    link: 'https://instagram.com',
    icon: 'icon-instagram-square',
  },
  {
    name: 'telegram',
    link: 'https://telegram.org',
    icon: 'icon-telegram-square',
  },
]

export const profileActions: IProfileAction[] = [
  {
    name: 'profile',
    title: 'profile',
    icon: 'icon-user',
    link: '/profile',
  },
  {
    name: 'cards',
    title: 'my_cards',
    icon: 'icon-card',
    link: '/profile/cards',
  },
  {
    name: 'settings',
    title: 'settings',
    icon: 'icon-settings-regular',
    link: '/profile/settings',
  },
  {
    name: 'log-out',
    title: 'log_out',
    icon: 'icon-logout',
    link: '/',
  },
]
