import type { ComputedRef } from 'vue'
import { toLocaleTag, useLocale } from '@/i18n/useLocale'

export type DateInput = Date | number | string

export interface DateFormatOptions extends Intl.DateTimeFormatOptions {
  locale?: string
}

export interface DatesContext {
  locale: ComputedRef<string>
  toDate: (value: DateInput) => Date | undefined
  format: (value: DateInput, options?: DateFormatOptions) => string
}

function toDate(value: DateInput): Date | undefined {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? undefined : date
}

export function useDates(): DatesContext {
  const { tag } = useLocale()

  function format(value: DateInput, { locale, ...options }: DateFormatOptions = {}) {
    const date = toDate(value)
    if (!date) return ''
    return new Intl.DateTimeFormat(toLocaleTag(locale) ?? tag.value, options).format(date)
  }

  return { locale: tag, toDate, format }
}
