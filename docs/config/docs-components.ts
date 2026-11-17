import type { ComponentDocConfig } from '@docs/config/component-docs'
import badge from '@docs/config/components/badge'
import button from '@docs/config/components/button'
import icon from '@docs/config/components/icon'
import kbd from '@docs/config/components/kbd'
import separator from '@docs/config/components/separator'

export const docsComponents: ComponentDocConfig[] = [badge, button, icon, kbd, separator].sort(
  (a, b) => a.title.localeCompare(b.title),
)

export const docsComponentsBySlug = Object.fromEntries(
  docsComponents.map((component) => [component.slug, component]),
)
