import { ToggleGroup as ToggleGroupRoot } from '@ui-sdk/vue/toggle'
import { propsOf } from '@/composables/useUi'
import type { ToggleGroupUi } from '@/components/ToggleGroup/types'
import Toggle from '@/components/Toggle/Toggle.vue'

export const toggleGroupUiExclude = {
  root: propsOf(ToggleGroupRoot),
  item: propsOf(Toggle),
} satisfies Record<keyof ToggleGroupUi, readonly string[]>
