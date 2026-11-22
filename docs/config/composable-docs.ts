import type { ApiTableRow } from '@docs/config/component-docs'

export interface ComposableDocConfig {
  slug: string
  name: string
  description: string
  signature: string
  usage: string
  parameters: ApiTableRow[]
  returns: ApiTableRow[]
  types: ApiTableRow[]
}
