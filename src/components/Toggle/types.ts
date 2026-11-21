import type { ChangeDetails } from '@ui-sdk/core'
import type { ToggleController, TogglePressedChangeReason } from '@ui-sdk/core/toggle'
import type {
  toggleIconSizes,
  toggleSizes,
  toggleTextSizes,
  toggleVariantNames,
} from '@/components/Toggle/constants'
import type { Radius } from '@/composables/useTheme'
import type { UiResolver } from '@/composables/useUi'
import type { IconName } from '@/icons'

export type ToggleSize = (typeof toggleSizes)[number]

export type ToggleTextSize = (typeof toggleTextSizes)[number]

export type ToggleIconSize = (typeof toggleIconSizes)[number]

export type ToggleVariant = (typeof toggleVariantNames)[number]

export type TogglePressedChangeDetails = ChangeDetails<TogglePressedChangeReason>

export interface ToggleSlotProps {
  pressed: boolean
}

export interface ToggleUi {
  root?: UiResolver
  leading?: UiResolver
  leadingIcon?: UiResolver
  label?: UiResolver
  trailing?: UiResolver
  trailingIcon?: UiResolver
}

export interface ToggleProps {
  modelValue?: boolean
  defaultValue?: boolean
  label?: string
  variant?: ToggleVariant
  color?: string
  size?: ToggleSize
  radius?: Radius
  leadingIcon?: IconName
  trailingIcon?: IconName
  disabled?: boolean
  focusableWhenDisabled?: boolean
  ui?: ToggleUi
}

export interface ToggleEmits {
  'update:modelValue': [value: boolean]
  pressedChange: [pressed: boolean, details: TogglePressedChangeDetails]
}

export interface ToggleSlots {
  default?(props: ToggleSlotProps): unknown
  leading?(props: ToggleSlotProps): unknown
  trailing?(props: ToggleSlotProps): unknown
}

export type ToggleExpose = Pick<ToggleController, 'toggle' | 'setPressed' | 'isPressed' | 'focus'>
