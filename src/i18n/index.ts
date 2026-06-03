import en from './en';
import es from './es';

export type Locale = 'en' | 'es';
export const locales: Locale[] = ['en', 'es'];
export const defaultLocale: Locale = 'en';

const dicts = { en, es } as const;

export function getLocale(pathname: string): Locale {
  return pathname.startsWith('/es/') || pathname === '/es' ? 'es' : 'en';
}

export function t(locale: Locale) {
  return dicts[locale];
}

// Given a current path on one locale, return the equivalent path on the other locale.
// Examples:
//   ('/about/', 'en')  -> '/es/about/'
//   ('/es/about/', 'es') -> '/about/'
//   ('/', 'en') -> '/es/'
//   ('/es/', 'es') -> '/'
export function switchLocalePath(pathname: string, currentLocale: Locale): string {
  if (currentLocale === 'en') {
    if (pathname === '/') return '/es/';
    return `/es${pathname}`;
  }
  // es -> en: strip /es prefix
  if (pathname === '/es/' || pathname === '/es') return '/';
  return pathname.replace(/^\/es/, '');
}
