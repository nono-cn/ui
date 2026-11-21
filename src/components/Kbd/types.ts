import type { kbdSizes, kbdVariantNames } from '@/components/Kbd/constants'
import type { Radius } from '@/composables/useTheme'
import type { UiResolver } from '@/composables/useUi'

export type KbdSize = (typeof kbdSizes)[number]

export type KbdVariant = (typeof kbdVariantNames)[number]

export interface KbdUi {
  root?: UiResolver
}

export interface KbdGroupUi {
  root?: UiResolver
}

export interface KbdProps {
  label?: string
  variant?: KbdVariant
  color?: string
  size?: KbdSize
  radius?: Radius
  ui?: KbdUi
}

export interface KbdSlots {
  default?(): unknown
}

export interface KbdGroupProps {
  ui?: KbdGroupUi
}

export interface KbdGroupSlots {
  default?(): unknown
}
