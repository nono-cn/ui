import type { ButtonActionDetails, ButtonState } from '@ui-sdk/vue/button'
import type { FunctionalComponent } from 'vue'
import type {
  buttonIconSizes,
  buttonSizes,
  buttonTextSizes,
  buttonVariantNames,
} from '@/components/Button/constants'
import type { Radius } from '@/composables/useTheme'
import type { UiResolver } from '@/composables/useUi'
import type { IconName } from '@/icons'

export type ButtonSize = (typeof buttonSizes)[number]

export type ButtonTextSize = (typeof buttonTextSizes)[number]

export type ButtonIconSize = (typeof buttonIconSizes)[number]

export type ButtonVariant = (typeof buttonVariantNames)[number]

export interface ButtonUi {
  root?: UiResolver
  leading?: UiResolver
  leadingIcon?: UiResolver
  spinner?: UiResolver
  label?: UiResolver
  trailing?: UiResolver
  trailingIcon?: UiResolver
}

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
  ui?: ButtonUi
}

export interface ButtonSlots {
  default?(): unknown
  leading?(): unknown
  loading?(): unknown
  trailing?(): unknown
}

export interface ButtonInternalSlots {
  render?(props: {
    props: Record<string, unknown>
    state: ButtonState
    children: FunctionalComponent
  }): unknown
}
