import type { DateFormatOptions, DateInput } from '@/composables/useDates'
import type { UiResolver } from '@/composables/useUi'

export interface TimeUi {
  root?: UiResolver
}

export interface TimeProps {
  datetime: DateInput
  options?: DateFormatOptions
  ui?: TimeUi
}

export interface TimeSlots {
  default?(props: { formatted: string }): unknown
}
