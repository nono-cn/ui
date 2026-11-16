import type { iconSizes } from '@/core/components/icon/constants'
import type { IconName } from '@/core/icons'

export type IconSize = (typeof iconSizes)[number]

export interface IconProps {
  name: IconName
  size?: IconSize
  color?: string
  stroke?: number
}
