import type { InputSize, InputVariant } from '@/components/Input/types'
import type { Radius } from '@/composables/useTheme'
import type { UiResolver } from '@/composables/useUi'
import type { IconName } from '@/icons'

export type PasswordInputAutoComplete = 'current-password' | 'new-password' | 'off' | (string & {})

export interface PasswordInputUi {
  root?: UiResolver
  input?: UiResolver
  leading?: UiResolver
  leadingIcon?: UiResolver
  trailing?: UiResolver
  toggle?: UiResolver
  toggleIcon?: UiResolver
}

export interface PasswordInputProps {
  modelValue?: string
  defaultValue?: string
  visible?: boolean
  defaultVisible?: boolean
  autoComplete?: PasswordInputAutoComplete
  name?: string
  form?: string
  placeholder?: string
  variant?: InputVariant
  color?: string
  size?: InputSize
  radius?: Radius
  icon?: IconName
  toggleLabel?: string
  highlight?: boolean
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  ui?: PasswordInputUi
}

export interface PasswordInputEmits {
  'update:modelValue': [value: string]
  'update:visible': [visible: boolean]
}

export interface PasswordInputSlotProps {
  visible: boolean
  capsLock: boolean
}

export interface PasswordInputSlots {
  leading?(): unknown
  trailing?(props: PasswordInputSlotProps): unknown
  iconToggle?(props: { visible: boolean }): unknown
}
