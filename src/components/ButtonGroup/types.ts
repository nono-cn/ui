import type { buttonGroupOrientations, buttonGroupSizes } from '@/components/ButtonGroup/constants'
import type { UiResolver } from '@/composables/useUi'

export type ButtonGroupSize = (typeof buttonGroupSizes)[number]

export type ButtonGroupOrientation = (typeof buttonGroupOrientations)[number]

export interface ButtonGroupUi {
  root?: UiResolver
}

export interface ButtonGroupProps {
  size?: ButtonGroupSize
  orientation?: ButtonGroupOrientation
  ui?: ButtonGroupUi
}

export interface ButtonGroupSlots {
  default?(): unknown
}
