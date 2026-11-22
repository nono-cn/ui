import type { emptySizes, emptyVariantNames } from '@/components/Empty/constants'
import type { Radius } from '@/composables/useTheme'
import type { UiResolver } from '@/composables/useUi'
import type { IconName } from '@/icons'

export type EmptySize = (typeof emptySizes)[number]

export type EmptyVariant = (typeof emptyVariantNames)[number]

export interface EmptyUi {
  root?: UiResolver
  header?: UiResolver
  media?: UiResolver
  icon?: UiResolver
  label?: UiResolver
  description?: UiResolver
  content?: UiResolver
}

export interface EmptyProps {
  icon?: IconName
  label?: string
  description?: string
  variant?: EmptyVariant
  size?: EmptySize
  radius?: Radius
  ui?: EmptyUi
}

export interface EmptySlots {
  default?(): unknown
  media?(): unknown
  label?(): unknown
  description?(): unknown
}
