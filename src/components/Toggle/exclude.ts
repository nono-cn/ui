import { Toggle as ToggleRoot } from '@ui-sdk/vue/toggle'
import { propsOf } from '@/composables/useUi'
import type { ToggleUi } from '@/components/Toggle/types'
import Icon from '@/components/Icon/Icon.vue'

export const toggleUiExclude = {
  root: propsOf(ToggleRoot),
  leadingIcon: propsOf(Icon),
  label: [],
  trailingIcon: propsOf(Icon),
} satisfies Record<keyof ToggleUi, readonly string[]>
