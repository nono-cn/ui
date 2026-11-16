import type { iconSizes } from '@/components/Icon/constants'
import type { IconName } from '@/icons'

export type IconSize = (typeof iconSizes)[number]

export interface IconProps {
  name: IconName
  size?: IconSize
  color?: string
  stroke?: number
}
