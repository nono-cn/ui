import { Separator as SeparatorRoot } from '@ui-sdk/vue/separator'
import { propsOf } from '@/composables/useUi'
import type { SeparatorUi } from '@/components/Separator/types'

export const separatorUiExclude = {
  root: propsOf(SeparatorRoot),
  label: [],
} satisfies Record<keyof SeparatorUi, readonly string[]>
