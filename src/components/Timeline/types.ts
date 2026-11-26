import type { TimelineController } from '@ui-sdk/core/timeline'
import type {
  timelineOrientations,
  timelineSizes,
  timelineStatuses,
} from '@/components/Timeline/constants'
import type { AvatarProps } from '@/components/Avatar/types'
import type { DateFormatOptions, DateInput } from '@/composables/useDates'
import type { UiResolver } from '@/composables/useUi'
import type { IconName } from '@/icons'

export type TimelineSize = (typeof timelineSizes)[number]

export type TimelineOrientation = (typeof timelineOrientations)[number]

export type TimelineStatus = (typeof timelineStatuses)[number]

export interface TimelineItem {
  value?: string
  date?: DateInput
  title?: string
  description?: string
  icon?: IconName
  avatar?: Omit<AvatarProps, 'size'>
  status?: TimelineStatus
}

export interface TimelineItemState {
  item: TimelineItem
  index: number
  status: TimelineStatus | undefined
}

export interface TimelineDateState extends TimelineItemState {
  formatted: string
}

export interface TimelineUi {
  root?: UiResolver
  item?: UiResolver<TimelineItemState>
  marker?: UiResolver<TimelineItemState>
  icon?: UiResolver<TimelineItemState>
  avatar?: UiResolver<TimelineItemState>
  connector?: UiResolver<TimelineItemState>
  date?: UiResolver<TimelineDateState>
  title?: UiResolver<TimelineItemState>
  description?: UiResolver<TimelineItemState>
}

export interface TimelineProps {
  items?: TimelineItem[]
  value?: string
  reverse?: boolean
  dateOptions?: DateFormatOptions
  orientation?: TimelineOrientation
  loop?: boolean
  feed?: boolean
  busy?: boolean
  color?: string
  size?: TimelineSize
  ui?: TimelineUi
}

export interface TimelineSlots {
  marker?(props: TimelineItemState): unknown
  date?(props: TimelineDateState): unknown
  title?(props: TimelineItemState): unknown
  description?(props: TimelineItemState): unknown
}

export type TimelineExpose = Pick<TimelineController, 'focus'>
