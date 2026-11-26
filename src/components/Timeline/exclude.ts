import {
  TimelineConnector,
  TimelineDescription,
  TimelineItem,
  TimelineMarker,
  Timeline as TimelineRoot,
  TimelineTime,
  TimelineTitle,
} from '@ui-sdk/vue/timeline'
import { propsOf } from '@/composables/useUi'
import type { TimelineUi } from '@/components/Timeline/types'
import Icon from '@/components/Icon/Icon.vue'
import Time from '@/components/Time/Time.vue'

export const timelineUiExclude = {
  root: propsOf(TimelineRoot),
  item: propsOf(TimelineItem),
  marker: propsOf(TimelineMarker),
  icon: propsOf(Icon),
  connector: propsOf(TimelineConnector),
  date: [...propsOf(TimelineTime), ...propsOf(Time)],
  label: propsOf(TimelineTitle),
  description: propsOf(TimelineDescription),
} satisfies Record<keyof TimelineUi, readonly string[]>
