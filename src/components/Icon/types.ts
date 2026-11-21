import type { iconSizes } from '@/components/Icon/constants'
import type { UiResolver } from '@/composables/useUi'
import type { IconName } from '@/icons'

export type IconSize = (typeof iconSizes)[number]

export interface IconUi {
  root?: UiResolver
}

export interface IconProps {
  name: IconName
  size?: IconSize
  color?: string
  stroke?: number
  ui?: IconUi
}
