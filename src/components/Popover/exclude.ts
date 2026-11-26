import { PopoverArrow, PopoverDescription, PopoverTitle } from '@ui-sdk/vue/popover'
import { propsOf } from '@/composables/useUi'
import type { PopoverUi } from '@/components/Popover/types'

export const popoverUiExclude = {
  content: [],
  label: propsOf(PopoverTitle),
  description: propsOf(PopoverDescription),
  arrow: propsOf(PopoverArrow),
} satisfies Record<keyof PopoverUi, readonly string[]>
