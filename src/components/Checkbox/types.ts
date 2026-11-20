import type { ChangeDetails } from '@ui-sdk/core'
import type {
  CheckboxCheckedChangeReason,
  CheckboxController,
  CheckedState,
} from '@ui-sdk/core/checkbox'
import type { checkboxSizes } from '@/components/Checkbox/constants'
import type { Radius } from '@/composables/useTheme'
import type { UiAttributes, UiResolver } from '@/composables/useUi'
import type { IconName } from '@/icons'

export type CheckboxSize = (typeof checkboxSizes)[number]

export type CheckboxChangeDetails = ChangeDetails<CheckboxCheckedChangeReason>

export interface CheckboxIndicatorState {
  checked: boolean
  indeterminate: boolean
}

export interface CheckboxUi {
  indicator?: UiResolver<UiAttributes, CheckboxIndicatorState>
  icon?: UiResolver<UiAttributes, CheckboxIndicatorState>
}

export interface CheckboxProps {
  modelValue?: CheckedState
  defaultValue?: CheckedState
  color?: string
  size?: CheckboxSize
  radius?: Radius
  icon?: IconName
  indeterminateIcon?: IconName
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  name?: string
  value?: string
  form?: string
  ui?: CheckboxUi
}

export interface CheckboxEmits {
  'update:modelValue': [value: CheckedState]
  checkedChange: [checked: CheckedState, details: CheckboxChangeDetails]
}

export interface CheckboxSlots {
  indicator?(props: CheckboxIndicatorState): unknown
}

export type CheckboxExpose = Pick<
  CheckboxController,
  'toggle' | 'setChecked' | 'getChecked' | 'focus'
>
