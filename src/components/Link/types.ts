import type { ButtonSize, ButtonVariant } from '@/components/Button/types'
import type { Radius } from '@/composables/useTheme'
import type { UiResolver } from '@/composables/useUi'
import type { IconName } from '@/icons'

export type LinkTo = string | Record<string, unknown>

export interface LinkUi {
  root?: UiResolver
  leading?: UiResolver
  leadingIcon?: UiResolver
  label?: UiResolver
  trailing?: UiResolver
  trailingIcon?: UiResolver
}

export interface LinkProps {
  label?: string
  to?: LinkTo
  href?: string
  external?: boolean
  replace?: boolean
  exact?: boolean
  disabled?: boolean
  variant?: ButtonVariant
  color?: string
  size?: ButtonSize
  radius?: Radius
  leadingIcon?: IconName
  trailingIcon?: IconName
  block?: boolean
  square?: boolean
  ui?: LinkUi
}

export interface LinkSlots {
  default?(): unknown
  leading?(): unknown
  trailing?(): unknown
}
