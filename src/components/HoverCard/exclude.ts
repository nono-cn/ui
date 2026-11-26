import { HoverCardArrow } from '@ui-sdk/vue/hover-card'
import { propsOf } from '@/composables/useUi'
import type { HoverCardUi } from '@/components/HoverCard/types'

export const hoverCardUiExclude = {
  trigger: [],
  content: [],
  arrow: propsOf(HoverCardArrow),
} satisfies Record<keyof HoverCardUi, readonly string[]>
