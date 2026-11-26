import type { ButtonActionDetails, ButtonState } from '@ui-sdk/vue/button'
import type { FunctionalComponent } from 'vue'
import type { buttonSizes, buttonVariantNames } from '@/components/Button/constants'
import type { Radius } from '@/composables/useTheme'
import type { UiResolver } from '@/composables/useUi'
import type { IconName } from '@/icons'

export type ButtonSize = (typeof buttonSizes)[number]

export type ButtonVariant = (typeof buttonVariantNames)[number]

export interface ButtonUi {
  root?: UiResolver
  icon?: UiResolver
  label?: UiResolver
  trailingIcon?: UiResolver
  loadingIcon?: UiResolver
}

export interface ButtonProps {
  label?: string
  variant?: ButtonVariant
  color?: string
  size?: ButtonSize
  radius?: Radius
  icon?: IconName
  trailingIcon?: IconName
  block?: boolean
  square?: boolean
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
