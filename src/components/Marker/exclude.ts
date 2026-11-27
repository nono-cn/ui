import { propsOf } from '@/composables/useUi'
import type { MarkerUi } from '@/components/Marker/types'
import Icon from '@/components/Icon/Icon.vue'

export const markerUiExclude = {
  root: [],
  icon: propsOf(Icon),
  loadingIcon: propsOf(Icon),
  label: [],
} satisfies Record<keyof MarkerUi, readonly string[]>
