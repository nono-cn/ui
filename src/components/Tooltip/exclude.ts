import { TooltipArrow } from '@ui-sdk/vue/tooltip'
import { propsOf } from '@/composables/useUi'
import type { TooltipUi } from '@/components/Tooltip/types'

export const tooltipUiExclude = {
  content: [],
  shortcut: [],
  arrow: propsOf(TooltipArrow),
} satisfies Record<keyof TooltipUi, readonly string[]>
