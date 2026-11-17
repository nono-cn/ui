import ar from '@/i18n/locales/ar'
import en from '@/i18n/locales/en'
import es from '@/i18n/locales/es'
import ptBR from '@/i18n/locales/pt-BR'
import ptPT from '@/i18n/locales/pt-PT'
import type { Messages } from '@/i18n/types'

export const messages = {
  en,
  es,
  'pt-BR': ptBR,
  'pt-PT': ptPT,
  ar,
} satisfies Record<string, Messages>

export type Locale = keyof typeof messages

export const locales = Object.keys(messages) as Locale[]

export const defaultLocale: Locale = 'en'

export function resolveLocale(value?: string): Locale {
  const tag = value?.trim().replaceAll('_', '-').toLowerCase() ?? ''
  const exact = locales.find((locale) => locale.toLowerCase() === tag)
  if (exact) return exact

  const [language] = tag.split('-')
  if (language === 'pt') return tag === 'pt' || tag.startsWith('pt-br-') ? 'pt-BR' : 'pt-PT'

  return locales.find((locale) => locale === language) ?? defaultLocale
}
