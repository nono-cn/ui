import type { iconTileSizes, iconTileVariantNames } from '@/components/IconTile/constants'
import type { Radius } from '@/composables/useTheme'
import type { UiResolver } from '@/composables/useUi'
import type { IconName } from '@/icons'

export type IconTileSize = (typeof iconTileSizes)[number]

export type IconTileVariant = (typeof iconTileVariantNames)[number]

export interface IconTileUi {
  root?: UiResolver
  icon?: UiResolver
}

export interface IconTileProps {
  icon?: IconName
  variant?: IconTileVariant
  color?: string
  size?: IconTileSize
  radius?: Radius
  ui?: IconTileUi
}

export interface IconTileSlots {
  default?(): unknown
}
