import type { ButtonActionDetails } from '@ui-sdk/vue/button'
import type {
  buttonIconSizes,
  buttonSizes,
  buttonTextSizes,
  buttonVariantNames,
} from '@/components/Button/constants'
import type { Radius } from '@/composables/useTheme'
import type { IconName } from '@/icons'

export type ButtonSize = (typeof buttonSizes)[number]

export type ButtonTextSize = (typeof buttonTextSizes)[number]

export type ButtonIconSize = (typeof buttonIconSizes)[number]

export type ButtonVariant = (typeof buttonVariantNames)[number]

export interface ButtonProps {
  label?: string
  variant?: ButtonVariant
  color?: string
  size?: ButtonSize
  radius?: Radius
  leadingIcon?: IconName
  trailingIcon?: IconName
  block?: boolean
  disabled?: boolean
  focusableWhenDisabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  pendingAnnouncement?: string
  onClick?: (event: MouseEvent, details: ButtonActionDetails) => unknown
}

export interface ButtonSlots {
  default?(): unknown
  leading?(): unknown
  loading?(): unknown
  trailing?(): unknown
}
