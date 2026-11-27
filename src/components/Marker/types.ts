import type { Component } from 'vue'
import type { markerVariantNames } from '@/components/Marker/constants'
import type { UiResolver } from '@/composables/useUi'
import type { IconName } from '@/icons'

export type MarkerVariant = (typeof markerVariantNames)[number]

export interface MarkerUi {
  root?: UiResolver
  icon?: UiResolver
  loadingIcon?: UiResolver
  label?: UiResolver
}

export interface MarkerProps {
  label?: string
  icon?: IconName
  variant?: MarkerVariant
  loading?: boolean
  shimmer?: boolean
  as?: string | Component
  ui?: MarkerUi
}

export interface MarkerSlots {
  default?(): unknown
  icon?(): unknown
  loading?(): unknown
}
