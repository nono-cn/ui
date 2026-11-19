import type { ChangeDetails } from '@ui-sdk/core'
import type { SwitchCheckedChangeReason, SwitchController } from '@ui-sdk/core/switch'
import type { switchSizes } from '@/components/Switch/constants'
import type { Radius } from '@/composables/useTheme'
import type { UiAttributes, UiResolver } from '@/composables/useUi'
import type { IconName } from '@/icons'

export type SwitchSize = (typeof switchSizes)[number]

export type SwitchChangeDetails = ChangeDetails<SwitchCheckedChangeReason>

export interface SwitchThumbState {
  checked: boolean
  loading: boolean
}

export interface SwitchUi {
  thumb?: UiResolver<UiAttributes, SwitchThumbState>
  icon?: UiResolver<UiAttributes, SwitchThumbState>
}

export interface SwitchProps {
  modelValue?: boolean
  defaultValue?: boolean
  color?: string
  size?: SwitchSize
  radius?: Radius
  checkedIcon?: IconName
  uncheckedIcon?: IconName
  loading?: boolean
  loadingIcon?: IconName
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  name?: string
  value?: string
  form?: string
  ui?: SwitchUi
}

export interface SwitchEmits {
  'update:modelValue': [value: boolean]
  checkedChange: [checked: boolean, details: SwitchChangeDetails]
}

export interface SwitchSlots {
  thumb?(props: SwitchThumbState): unknown
}

export type SwitchExpose = Pick<SwitchController, 'toggle' | 'setChecked' | 'getChecked' | 'focus'>
