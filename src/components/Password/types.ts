import type { InputSize, InputVariant } from '@/components/Input/types'
import type { Radius } from '@/composables/useTheme'
import type { UiResolver } from '@/composables/useUi'
import type { IconName } from '@/icons'

export type PasswordAutoComplete = 'current-password' | 'new-password' | 'off' | (string & {})

export interface PasswordUi {
  root?: UiResolver
  input?: UiResolver
  leadingIcon?: UiResolver
  toggle?: UiResolver
  toggleIcon?: UiResolver
}

export interface PasswordProps {
  modelValue?: string
  defaultValue?: string
  visible?: boolean
  defaultVisible?: boolean
  autoComplete?: PasswordAutoComplete
  name?: string
  form?: string
  variant?: InputVariant
  color?: string
  size?: InputSize
  radius?: Radius
  icon?: IconName
  highlight?: boolean
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  ui?: PasswordUi
}

export interface PasswordEmits {
  'update:modelValue': [value: string]
  'update:visible': [visible: boolean]
}

export interface PasswordSlotProps {
  visible: boolean
  capsLock: boolean
}

export interface PasswordSlots {
  leading?(): unknown
  trailing?(props: PasswordSlotProps): unknown
  iconToggle?(props: { visible: boolean }): unknown
}
