import type { badgeSizes, badgeVariantNames } from '@/components/Badge/constants'
import type { Radius } from '@/composables/useTheme'
import type { IconName } from '@/icons'

export type BadgeSize = (typeof badgeSizes)[number]

export type BadgeVariant = (typeof badgeVariantNames)[number]

export interface BadgeProps {
  label?: string
  variant?: BadgeVariant
  color?: string
  size?: BadgeSize
  radius?: Radius
  leadingIcon?: IconName
  trailingIcon?: IconName
}

export interface BadgeSlots {
  default?(): unknown
  leading?(): unknown
  trailing?(): unknown
}
