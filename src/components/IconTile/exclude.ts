import { propsOf } from '@/composables/useUi'
import type { IconTileUi } from '@/components/IconTile/types'
import Icon from '@/components/Icon/Icon.vue'

export const iconTileUiExclude = {
  root: [],
  icon: propsOf(Icon),
} satisfies Record<keyof IconTileUi, readonly string[]>
