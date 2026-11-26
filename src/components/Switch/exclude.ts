import { Switch as SwitchRoot, SwitchThumb } from '@ui-sdk/vue/switch'
import { propsOf } from '@/composables/useUi'
import type { SwitchUi } from '@/components/Switch/types'
import Icon from '@/components/Icon/Icon.vue'

export const switchUiExclude = {
  root: [...propsOf(SwitchRoot), 'ariaBusy'],
  thumb: propsOf(SwitchThumb),
  icon: propsOf(Icon),
} satisfies Record<keyof SwitchUi, readonly string[]>
