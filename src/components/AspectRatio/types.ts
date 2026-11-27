import type { UiResolver } from '@/composables/useUi'

export interface AspectRatioUi {
  root?: UiResolver
}

export interface AspectRatioProps {
  ratio?: number
  ui?: AspectRatioUi
}

export interface AspectRatioSlots {
  default?(): unknown
}
