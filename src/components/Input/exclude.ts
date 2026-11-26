import { InputClear, InputGroup, Input as InputRoot } from '@ui-sdk/vue/input'
import { propsOf } from '@/composables/useUi'
import type { InputUi } from '@/components/Input/types'
import Icon from '@/components/Icon/Icon.vue'

export const inputUiExclude = {
  root: propsOf(InputGroup),
  input: propsOf(InputRoot),
  leadingIcon: propsOf(Icon),
  trailingIcon: propsOf(Icon),
  clear: propsOf(InputClear),
  clearIcon: propsOf(Icon),
} satisfies Record<keyof InputUi, readonly string[]>
