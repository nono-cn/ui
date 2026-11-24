import type { ChangeDetails, DismissAttemptDetails, PortalProps, PositionProps } from '@ui-sdk/core'
import type {
  PopoverController,
  PopoverDismissReason,
  PopoverFinalFocus,
  PopoverInitialFocus,
  PopoverOpenChangeReason,
} from '@ui-sdk/core/popover'
import type { popoverAligns, popoverSides } from '@/components/Popover/constants'
import type { Radius } from '@/composables/useTheme'
import type { UiResolver } from '@/composables/useUi'

export type PopoverSide = (typeof popoverSides)[number]

export type PopoverAlign = (typeof popoverAligns)[number]

export type PopoverModal = boolean | 'trap-focus'

export type PopoverOpenChangeDetails = ChangeDetails<PopoverOpenChangeReason>

export type PopoverDismissAttemptDetails = DismissAttemptDetails<PopoverDismissReason>

export interface PopoverTriggerState {
  open: boolean
  disabled: boolean
}

export interface PopoverTriggerSlotProps extends PopoverTriggerState {
  shortcut: string
}

export interface PopoverContentState {
  open: boolean
}

export interface PopoverContentSlotProps {
  open: boolean
  close: () => void
}

export interface PopoverUi {
  content?: UiResolver<PopoverContentState>
  label?: UiResolver<PopoverContentState>
  description?: UiResolver<PopoverContentState>
  arrow?: UiResolver<PopoverContentState>
}

export interface PopoverProps {
  label?: string
  description?: string
  open?: boolean
  defaultOpen?: boolean
  modal?: PopoverModal
  dismissible?: boolean
  disabled?: boolean
  shortcut?: string
  openOnHover?: boolean
  delay?: number
  closeDelay?: number
  side?: PopoverSide
  align?: PopoverAlign
  sideOffset?: number
  alignOffset?: number
  collisionPadding?: number
  arrowPadding?: number
  anchor?: PositionProps['anchor']
  container?: PortalProps['container']
  initialFocus?: PopoverInitialFocus
  finalFocus?: PopoverFinalFocus
  keepMounted?: boolean
  arrow?: boolean
  radius?: Radius
  ui?: PopoverUi
}

export interface PopoverEmits {
  'update:open': [open: boolean]
  openChange: [open: boolean, details: PopoverOpenChangeDetails]
  openChangeComplete: [open: boolean]
  dismissAttempt: [details: PopoverDismissAttemptDetails]
}

export interface PopoverSlots {
  default?(props: PopoverTriggerSlotProps): unknown
  label?(): unknown
  description?(): unknown
  content?(props: PopoverContentSlotProps): unknown
}

export type PopoverExpose = Pick<
  PopoverController,
  'setOpen' | 'close' | 'toggle' | 'isOpen' | 'focus'
>
