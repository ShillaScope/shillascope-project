import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['ko', 'en'],
  defaultLocale: 'ko',
  pathnames: {
    '/': '/',
    '/attractions': {
      ko: '/attractions',
      en: '/attractions'
    },
    '/courses': {
      ko: '/courses', 
      en: '/courses'
    },
    '/map': {
      ko: '/map',
      en: '/map'
    }
  }
});