import { propsOf } from '@/composables/useUi'
import type { AlertUi } from '@/components/Alert/types'
import Icon from '@/components/Icon/Icon.vue'

export const alertUiExclude = {
  root: [],
  icon: propsOf(Icon),
  label: [],
  description: [],
} satisfies Record<keyof AlertUi, readonly string[]>
