import type { ChangeDetails, PortalProps, PositionProps } from '@ui-sdk/core'
import type { TooltipController, TooltipOpenChangeReason } from '@ui-sdk/core/tooltip'
import type { tooltipAligns, tooltipSides, tooltipTypes } from '@/components/Tooltip/constants'
import type { Radius } from '@/composables/useTheme'
import type { UiResolver } from '@/composables/useUi'

export type TooltipSide = (typeof tooltipSides)[number]

export type TooltipAlign = (typeof tooltipAligns)[number]

export type TooltipType = (typeof tooltipTypes)[number]

export type TooltipOpenChangeDetails = ChangeDetails<TooltipOpenChangeReason>

export interface TooltipTriggerState {
  open: boolean
}

export interface TooltipContentState {
  open: boolean
}

export interface TooltipShortcutState {
  text: string
}

export interface TooltipUi {
  content?: UiResolver<TooltipContentState>
  shortcut?: UiResolver<TooltipContentState>
  arrow?: UiResolver<TooltipContentState>
}

export interface TooltipProps {
  text?: string
  shortcut?: string
  open?: boolean
  defaultOpen?: boolean
  delay?: number
  closeDelay?: number
  disabled?: boolean
  toggleable?: boolean
  closeOnPress?: boolean
  type?: TooltipType
  side?: TooltipSide
  align?: TooltipAlign
  sideOffset?: number
  alignOffset?: number
  collisionPadding?: number
  arrowPadding?: number
  anchor?: PositionProps['anchor']
  container?: PortalProps['container']
  arrow?: boolean
  radius?: Radius
  ui?: TooltipUi
}

export interface TooltipEmits {
  'update:open': [open: boolean]
  openChange: [open: boolean, details: TooltipOpenChangeDetails]
  openChangeComplete: [open: boolean]
}

export interface TooltipSlots {
  default?(props: TooltipTriggerState): unknown
  content?(props: TooltipContentState): unknown
  shortcut?(props: TooltipShortcutState): unknown
}

export type TooltipExpose = Pick<
  TooltipController,
  'setOpen' | 'close' | 'toggle' | 'isOpen' | 'focus'
>
