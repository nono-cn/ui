import type { ComponentDocConfig } from '@docs/config/component-docs'
import button from '@docs/config/components/button'
import icon from '@docs/config/components/icon'

export const docsComponents: ComponentDocConfig[] = [button, icon].sort((a, b) =>
  a.title.localeCompare(b.title),
)

export const docsComponentsBySlug = Object.fromEntries(
  docsComponents.map((component) => [component.slug, component]),
)
