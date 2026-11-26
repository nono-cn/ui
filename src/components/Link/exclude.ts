import { propsOf } from '@/composables/useUi'
import type { LinkUi } from '@/components/Link/types'
import Icon from '@/components/Icon/Icon.vue'

export const linkUiExclude = {
  root: ['href'],
  leadingIcon: propsOf(Icon),
  label: [],
  trailingIcon: propsOf(Icon),
} satisfies Record<keyof LinkUi, readonly string[]>
