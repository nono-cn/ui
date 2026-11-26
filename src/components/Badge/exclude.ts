import { propsOf } from '@/composables/useUi'
import type { BadgeUi } from '@/components/Badge/types'
import Icon from '@/components/Icon/Icon.vue'

export const badgeUiExclude = {
  root: [],
  leadingIcon: propsOf(Icon),
  label: [],
  trailingIcon: propsOf(Icon),
} satisfies Record<keyof BadgeUi, readonly string[]>
