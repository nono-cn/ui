import type { inputSizes, inputVariantNames } from '@/components/Input/constants'
import type { Radius } from '@/composables/useTheme'
import type { UiResolver } from '@/composables/useUi'
import type { IconName } from '@/icons'

export type InputSize = (typeof inputSizes)[number]

export type InputVariant = (typeof inputVariantNames)[number]

export interface InputUi {
  root?: UiResolver
  input?: UiResolver
  leading?: UiResolver
  leadingIcon?: UiResolver
  trailing?: UiResolver
  trailingIcon?: UiResolver
  clear?: UiResolver
  clearIcon?: UiResolver
}

export interface InputProps {
  modelValue?: string
  defaultValue?: string
  type?: string
  placeholder?: string
  variant?: InputVariant
  color?: string
  size?: InputSize
  radius?: Radius
  icon?: IconName
  trailingIcon?: IconName
  clearable?: boolean
  clearLabel?: string
  highlight?: boolean
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  ui?: InputUi
}

export interface InputEmits {
  'update:modelValue': [value: string]
}

export interface InputSlots {
  leading?(): unknown
  trailing?(): unknown
  iconClear?(): unknown
}
