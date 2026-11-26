import type {
  AvatarLoadingStatus,
  AvatarLoadingStatusChangeReason,
  AvatarOptions,
} from '@ui-sdk/vue/avatar'
import type { avatarSizes, avatarVariantNames } from '@/components/Avatar/constants'
import type { Radius } from '@/composables/useTheme'
import type { UiResolver } from '@/composables/useUi'
import type { IconName } from '@/icons'

export type AvatarSize = (typeof avatarSizes)[number]

export type AvatarVariant = (typeof avatarVariantNames)[number]

export type { AvatarLoadingStatus, AvatarLoadingStatusChangeReason }

export interface AvatarUi {
  root?: UiResolver
  image?: UiResolver
  fallback?: UiResolver
  text?: UiResolver
  icon?: UiResolver
}

export interface AvatarProps {
  image?: string
  text?: string
  icon?: IconName
  variant?: AvatarVariant
  color?: string
  size?: AvatarSize
  radius?: Radius
  delay?: number
  onLoadingStatusChange?: AvatarOptions['onLoadingStatusChange']
  ui?: AvatarUi
}

export interface AvatarSlots {
  default?(): unknown
}
