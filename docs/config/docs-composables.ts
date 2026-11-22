import type { ComposableDocConfig } from '@docs/config/composable-docs'
import provideLocale from '@docs/config/composables/provide-locale'
import useDates from '@docs/config/composables/use-dates'

export const docsComposables: ComposableDocConfig[] = [provideLocale, useDates].sort((a, b) =>
  a.name.localeCompare(b.name),
)

export const docsComposablesBySlug = Object.fromEntries(
  docsComposables.map((composable) => [composable.slug, composable]),
)
