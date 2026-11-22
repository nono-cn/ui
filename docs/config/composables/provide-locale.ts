import type { ComposableDocConfig } from '@docs/config/composable-docs'
import { locales } from '@nono/ui'

const provideLocale: ComposableDocConfig = {
  slug: 'provide-locale',
  name: 'provideLocale',
  description:
    'Sets the locale of every component below it, for messages and dates. Call it inside setup of a root or layout component. Without it, components use en.',
  signature: `function provideLocale(
  locale: MaybeRefOrGetter<string | undefined>,
  options?: LocaleOptions,
): LocaleContext`,
  usage: `<script setup lang="ts">
import { ref } from 'vue'
import { provideLocale } from '@nono/ui'

const locale = ref('es-MX')

provideLocale(locale, { messages: { close: 'Descartar' } })
</script>`,
  parameters: [
    {
      name: 'locale',
      type: 'MaybeRefOrGetter<string | undefined>',
      required: true,
      description:
        'BCP 47 tag such as es-MX. Components react when it changes. Dates keep the whole tag; messages use the closest translation.',
    },
    {
      name: 'options.messages',
      type: 'MaybeRefOrGetter<Partial<Messages> | undefined>',
      description: 'Overrides some messages of the translation.',
    },
  ],
  returns: [
    {
      name: 'locale',
      type: 'ComputedRef<Locale>',
      description: `Translation in use: ${locales.join(', ')}.`,
    },
    {
      name: 'tag',
      type: 'ComputedRef<string>',
      description: 'The given tag, canonicalized; the translation when the tag is invalid.',
    },
    {
      name: 't',
      type: '(key: MessageKey, params?: MessageParams) => string',
      description: 'Returns the message for key, filling {name} placeholders from params.',
    },
  ],
  types: [
    {
      name: 'Locale',
      type: locales.map((locale) => `'${locale}'`).join(' | '),
      description: 'Languages with a translation.',
    },
    {
      name: 'LocaleOptions',
      type: '{ messages?: MaybeRefOrGetter<Partial<Messages> | undefined> }',
      description: 'Second parameter of provideLocale.',
    },
  ],
}

export default provideLocale
