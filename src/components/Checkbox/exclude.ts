import { Checkbox as CheckboxRoot, CheckboxIndicator } from '@ui-sdk/vue/checkbox'
import { propsOf } from '@/composables/useUi'
import type { CheckboxUi } from '@/components/Checkbox/types'
import Icon from '@/components/Icon/Icon.vue'

export const checkboxUiExclude = {
  root: propsOf(CheckboxRoot),
  indicator: propsOf(CheckboxIndicator),
  icon: propsOf(Icon),
} satisfies Record<keyof CheckboxUi, readonly string[]>
