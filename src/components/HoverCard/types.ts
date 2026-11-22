import type { ChangeDetails, PortalProps, PositionProps } from '@ui-sdk/core'
import type { HoverCardController, HoverCardOpenChangeReason } from '@ui-sdk/core/hover-card'
import type { hoverCardAligns, hoverCardSides } from '@/components/HoverCard/constants'
import type { Radius } from '@/composables/useTheme'
import type { UiResolver } from '@/composables/useUi'

export type HoverCardSide = (typeof hoverCardSides)[number]

export type HoverCardAlign = (typeof hoverCardAligns)[number]

export type HoverCardOpenChangeDetails = ChangeDetails<HoverCardOpenChangeReason>

export interface HoverCardTriggerState {
  open: boolean
}

export interface HoverCardContentState {
  open: boolean
}

export interface HoverCardUi {
  trigger?: UiResolver<HoverCardTriggerState>
  content?: UiResolver<HoverCardContentState>
  arrow?: UiResolver<HoverCardContentState>
}

export interface HoverCardProps {
  open?: boolean
  defaultOpen?: boolean
  delay?: number
  closeDelay?: number
  disabled?: boolean
  side?: HoverCardSide
  align?: HoverCardAlign
  sideOffset?: number
  alignOffset?: number
  collisionPadding?: number
  arrowPadding?: number
  anchor?: PositionProps['anchor']
  container?: PortalProps['container']
  keepMounted?: boolean
  arrow?: boolean
  radius?: Radius
  ui?: HoverCardUi
}

export interface HoverCardEmits {
  'update:open': [open: boolean]
  openChange: [open: boolean, details: HoverCardOpenChangeDetails]
  openChangeComplete: [open: boolean]
}

export interface HoverCardSlots {
  default?(props: HoverCardTriggerState): unknown
  content?(props: HoverCardContentState): unknown
}

export type HoverCardExpose = Pick<
  HoverCardController,
  'setOpen' | 'close' | 'toggle' | 'isOpen' | 'focus'
>
