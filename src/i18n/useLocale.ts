import {
  computed,
  inject,
  provide,
  toValue,
  type ComputedRef,
  type InjectionKey,
  type MaybeRefOrGetter,
} from 'vue'
import { defaultLocale, messages, resolveLocale, type Locale } from '@/i18n/messages'
import type { MessageKey, MessageParams, Messages } from '@/i18n/types'

export interface LocaleOptions {
  messages?: MaybeRefOrGetter<Partial<Messages> | undefined>
}

export interface LocaleContext {
  locale: ComputedRef<Locale>
  tag: ComputedRef<string>
  t: (key: MessageKey, params?: MessageParams) => string
}

export function toLocaleTag(value?: string): string | undefined {
  try {
    return Intl.getCanonicalLocales(value?.trim().replaceAll('_', '-') || [])[0]
  } catch {
    return undefined
  }
}

const localeKey: InjectionKey<LocaleContext> = Symbol('nono-ui-locale')

function createLocaleContext(
  locale: MaybeRefOrGetter<string | undefined>,
  options: LocaleOptions = {},
): LocaleContext {
  const resolved = computed(() => resolveLocale(toValue(locale)))
  const tag = computed(() => toLocaleTag(toValue(locale)) ?? resolved.value)
  const current = computed(() => ({ ...messages[resolved.value], ...toValue(options.messages) }))

  function t(key: MessageKey, params: MessageParams = {}) {
    const message = current.value[key] ?? messages[defaultLocale][key]
    return message.replace(/\{(\w+)\}/g, (match, name: string) =>
      name in params ? String(params[name]) : match,
    )
  }

  return { locale: resolved, tag, t }
}

export function provideLocale(
  locale: MaybeRefOrGetter<string | undefined>,
  options?: LocaleOptions,
): LocaleContext {
  const context = createLocaleContext(locale, options)
  provide(localeKey, context)
  return context
}

export function useLocale(): LocaleContext {
  return inject(localeKey, () => createLocaleContext(defaultLocale), true)
}
