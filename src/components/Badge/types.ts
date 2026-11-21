import type { badgeSizes, badgeVariantNames } from '@/components/Badge/constants'
import type { Radius } from '@/composables/useTheme'
import type { UiResolver } from '@/composables/useUi'
import type { IconName } from '@/icons'

export type BadgeSize = (typeof badgeSizes)[number]

export type BadgeVariant = (typeof badgeVariantNames)[number]

export interface BadgeUi {
  root?: UiResolver
  leading?: UiResolver
  leadingIcon?: UiResolver
  label?: UiResolver
  trailing?: UiResolver
  trailingIcon?: UiResolver
}

export interface BadgeProps {
  label?: string
  variant?: BadgeVariant
  color?: string
  size?: BadgeSize
  radius?: Radius
  leadingIcon?: IconName
  trailingIcon?: IconName
  ui?: BadgeUi
}

export interface BadgeSlots {
  default?(): unknown
  leading?(): unknown
  trailing?(): unknown
}
