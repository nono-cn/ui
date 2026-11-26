import { propsOf } from '@/composables/useUi'
import type { EmptyUi } from '@/components/Empty/types'
import IconTile from '@/components/IconTile/IconTile.vue'

export const emptyUiExclude = {
  root: [],
  media: [],
  icon: propsOf(IconTile),
  label: [],
  description: [],
  content: [],
} satisfies Record<keyof EmptyUi, readonly string[]>
