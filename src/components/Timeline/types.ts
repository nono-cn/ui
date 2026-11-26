import type { TimelineController } from '@ui-sdk/core/timeline'
import type {
  timelineAligns,
  timelineOrientations,
  timelineSizes,
  timelineStatuses,
} from '@/components/Timeline/constants'
import type { DateFormatOptions, DateInput } from '@/composables/useDates'
import type { UiResolver } from '@/composables/useUi'
import type { IconName } from '@/icons'

export type TimelineSize = (typeof timelineSizes)[number]

export type TimelineOrientation = (typeof timelineOrientations)[number]

export type TimelineAlign = (typeof timelineAligns)[number]

export type TimelineStatus = (typeof timelineStatuses)[number]

export interface TimelineItem {
  value?: string
  date?: DateInput
  label?: string
  description?: string
  icon?: IconName
  status?: TimelineStatus
}

export interface TimelineItemContext {
  item: TimelineItem
  index: number
  status: TimelineStatus | undefined
  last: boolean
}

export interface TimelineDateSlotProps extends TimelineItemContext {
  formatted: string
}

export interface TimelineUi {
  root?: UiResolver
  item?: UiResolver<TimelineItemContext>
  marker?: UiResolver<TimelineItemContext>
  icon?: UiResolver<TimelineItemContext>
  connector?: UiResolver<TimelineItemContext>
  date?: UiResolver<TimelineItemContext>
  label?: UiResolver<TimelineItemContext>
  description?: UiResolver<TimelineItemContext>
}

export interface TimelineProps {
  items?: TimelineItem[]
  value?: string
  reverse?: boolean
  dateOptions?: DateFormatOptions
  orientation?: TimelineOrientation
  align?: TimelineAlign
  loop?: boolean
  feed?: boolean
  busy?: boolean
  color?: string
  size?: TimelineSize
  ui?: TimelineUi
}

export interface TimelineSlots {
  marker?(props: TimelineItemContext): unknown
  date?(props: TimelineDateSlotProps): unknown
  label?(props: TimelineItemContext): unknown
  description?(props: TimelineItemContext): unknown
  content?(props: TimelineItemContext): unknown
  opposite?(props: TimelineItemContext): unknown
}

export type TimelineExpose = Pick<TimelineController, 'focus'>
