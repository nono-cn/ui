import type { ComposableDocConfig } from '@docs/config/composable-docs'

const useDates: ComposableDocConfig = {
  slug: 'use-dates',
  name: 'useDates',
  description:
    'Formats dates with the locale given to provideLocale, the same way Time does. Call it inside setup.',
  signature: 'function useDates(): DatesContext',
  usage: `<script setup lang="ts">
import { useDates } from '@nono/ui'

const { format } = useDates()

const published = format('2026-04-22T08:30:00Z', { dateStyle: 'long' })
const tokyo = format(Date.now(), { timeStyle: 'short', timeZone: 'Asia/Tokyo' })
</script>

<template>
  <p :title="published">Posted in Tokyo at {{ tokyo }}</p>
</template>`,
  parameters: [],
  returns: [
    {
      name: 'locale',
      type: 'ComputedRef<string>',
      description: 'BCP 47 tag dates are formatted with: the one given to provideLocale, or en.',
    },
    {
      name: 'format',
      type: '(value: DateInput, options?: DateFormatOptions) => string',
      description:
        'Formats the date with Intl.DateTimeFormat. options.locale overrides the locale. Returns an empty string for an invalid date.',
    },
    {
      name: 'toDate',
      type: '(value: DateInput) => Date | undefined',
      description:
        'Turns a Date, a timestamp or an ISO string into a Date, or undefined if invalid.',
    },
  ],
  types: [
    {
      name: 'DateInput',
      type: 'Date | number | string',
      description: 'A Date, a timestamp in milliseconds or an ISO string.',
    },
    {
      name: 'DateFormatOptions',
      type: 'Intl.DateTimeFormatOptions & { locale?: string }',
      description:
        'Any Intl.DateTimeFormat option, such as dateStyle, timeStyle or timeZone, plus a locale.',
    },
  ],
}

export default useDates
