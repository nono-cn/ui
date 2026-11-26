import { Button as ButtonRoot } from '@ui-sdk/vue/button'
import { propsOf } from '@/composables/useUi'
import type { ButtonUi } from '@/components/Button/types'
import Icon from '@/components/Icon/Icon.vue'

export const buttonUiExclude = {
  root: propsOf(ButtonRoot),
  icon: propsOf(Icon),
  label: [],
  trailingIcon: propsOf(Icon),
  loadingIcon: propsOf(Icon),
} satisfies Record<keyof ButtonUi, readonly string[]>
