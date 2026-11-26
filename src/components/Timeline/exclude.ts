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
import Avatar from '@/components/Avatar/Avatar.vue'
import Icon from '@/components/Icon/Icon.vue'

export const timelineUiExclude = {
  root: propsOf(TimelineRoot),
  item: propsOf(TimelineItem),
  marker: propsOf(TimelineMarker),
  icon: propsOf(Icon),
  avatar: propsOf(Avatar),
  connector: propsOf(TimelineConnector),
  date: [...propsOf(TimelineTime), 'datetime'],
  title: propsOf(TimelineTitle),
  description: propsOf(TimelineDescription),
} satisfies Record<keyof TimelineUi, readonly string[]>
