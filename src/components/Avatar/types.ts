import type {
  AvatarLoadingStatus,
  AvatarLoadingStatusChangeReason,
  AvatarOptions,
} from '@ui-sdk/vue/avatar'
import type { avatarSizes, avatarVariantNames } from '@/components/Avatar/constants'
import type { Radius } from '@/composables/useTheme'
import type { IconName } from '@/icons'

export type AvatarSize = (typeof avatarSizes)[number]

export type AvatarVariant = (typeof avatarVariantNames)[number]

export type { AvatarLoadingStatus, AvatarLoadingStatusChangeReason }

export interface AvatarProps {
  src?: string
  alt?: string
  text?: string
  icon?: IconName
  variant?: AvatarVariant
  color?: string
  size?: AvatarSize
  radius?: Radius
  delay?: number
  onLoadingStatusChange?: AvatarOptions['onLoadingStatusChange']
}

export interface AvatarSlots {
  default?(): unknown
}
