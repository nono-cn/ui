import {
  PasswordInputControl,
  PasswordInput as PasswordInputRoot,
  PasswordInputToggle,
} from '@ui-sdk/vue/password-input'
import { propsOf } from '@/composables/useUi'
import type { PasswordUi } from '@/components/Password/types'
import Icon from '@/components/Icon/Icon.vue'

export const passwordUiExclude = {
  root: propsOf(PasswordInputRoot),
  input: propsOf(PasswordInputControl),
  leadingIcon: propsOf(Icon),
  toggle: propsOf(PasswordInputToggle),
  toggleIcon: propsOf(Icon),
} satisfies Record<keyof PasswordUi, readonly string[]>
