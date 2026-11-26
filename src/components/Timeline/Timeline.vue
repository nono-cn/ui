<script setup lang="ts">
import {
  createTimelineController,
  TimelineConnector,
  TimelineDescription,
  TimelineItem as TimelineItemPart,
  TimelineMarker,
  Timeline as TimelineRoot,
  TimelineTime,
  TimelineTitle,
} from '@ui-sdk/vue/timeline'
import { computed, useAttrs } from 'vue'
import { useDates } from '@/composables/useDates'
import { getColorVariables, oneOf } from '@/composables/useTheme'
import { useUi } from '@/composables/useUi'
import {
  timelineDefaults,
  timelineOrientations,
  timelineSizes,
  timelineStatuses,
} from '@/components/Timeline/constants'
import { timelineUiExclude } from '@/components/Timeline/exclude'
import type {
  TimelineDateState,
  TimelineExpose,
  TimelineItem,
  TimelineItemState,
  TimelineProps,
  TimelineSlots,
  TimelineStatus,
} from '@/components/Timeline/types'
import {
  timelineAvatarSizes,
  timelineConnectorVariants,
  timelineContentVariants,
  timelineDateVariants,
  timelineDescriptionVariants,
  timelineIconVariants,
  timelineItemVariants,
  timelineMarkerVariants,
  timelineRailVariants,
  timelineTitleVariants,
  timelineVariants,
} from '@/components/Timeline/variants'
import Avatar from '@/components/Avatar/Avatar.vue'
import Icon from '@/components/Icon/Icon.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<TimelineProps>(), {
  items: () => [],
  value: undefined,
  reverse: timelineDefaults.reverse,
  dateOptions: undefined,
  orientation: timelineDefaults.orientation,
  loop: undefined,
  feed: undefined,
  busy: undefined,
  color: timelineDefaults.color,
  size: timelineDefaults.size,
})

const slots = defineSlots<TimelineSlots>()
const attrs = useAttrs()
const controller = createTimelineController()
const { toDate, format } = useDates()

const size = computed(() => oneOf(props.size, timelineSizes, timelineDefaults.size))
const orientation = computed(() =>
  oneOf(props.orientation, timelineOrientations, timelineDefaults.orientation),
)
const currentIndex = computed(() =>
  props.value === undefined ? -1 : props.items.findIndex((item) => item.value === props.value),
)

function statusOf(item: TimelineItem, index: number): TimelineStatus | undefined {
  if (timelineStatuses.includes(item.status!)) return item.status
  if (currentIndex.value < 0) return undefined
  if (index === currentIndex.value) return 'current'
  return index < currentIndex.value !== props.reverse ? 'complete' : 'upcoming'
}

const itemStates = computed<TimelineItemState[]>(() =>
  props.items.map((item, index) => ({ item, index, status: statusOf(item, index) })),
)

function isLast({ index }: TimelineItemState) {
  return index === props.items.length - 1
}

function dateStateOf(itemState: TimelineItemState): TimelineDateState {
  const { date } = itemState.item
  const formatted = date === undefined ? '' : format(date, props.dateOptions) || String(date)
  return { ...itemState, formatted }
}

function hasDate(itemState: TimelineItemState) {
  return itemState.item.date !== undefined || Boolean(slots.date)
}

function hasTitle(itemState: TimelineItemState) {
  return Boolean(itemState.item.title || slots.title)
}

function hasDescription(itemState: TimelineItemState) {
  return Boolean(itemState.item.description || slots.description)
}

const rootProps = computed(() => ({
  ...useUi({
    base: [
      {
        class: timelineVariants({ orientation: orientation.value, size: size.value }),
        style: getColorVariables(props.color, 'timeline', timelineDefaults.color),
      },
      attrs,
    ],
    ui: props.ui?.root?.(),
    exclude: timelineUiExclude.root,
  }),
  orientation: orientation.value,
  loop: props.loop,
  feed: props.feed,
  busy: props.busy,
  controller,
}))

function itemProps(itemState: TimelineItemState) {
  return {
    ...useUi({
      base: {
        class: timelineItemVariants({ orientation: orientation.value, size: size.value }),
      },
      ui: props.ui?.item?.(itemState),
      exclude: timelineUiExclude.item,
    }),
    value: itemState.item.value,
    status: itemState.status,
  }
}

function railProps() {
  return { class: timelineRailVariants({ orientation: orientation.value }) }
}

function markerKind(itemState: TimelineItemState) {
  if (slots.marker || itemState.item.icon) return 'icon'
  return itemState.item.avatar ? 'avatar' : 'dot'
}

function markerProps(itemState: TimelineItemState) {
  return useUi({
    base: {
      class: timelineMarkerVariants({
        kind: markerKind(itemState),
        status: itemState.status ?? 'none',
        orientation: orientation.value,
      }),
    },
    ui: props.ui?.marker?.(itemState),
    exclude: timelineUiExclude.marker,
  })
}

function iconProps(itemState: TimelineItemState) {
  return {
    ...useUi({
      base: { class: timelineIconVariants() },
      ui: props.ui?.icon?.(itemState),
      exclude: timelineUiExclude.icon,
    }),
    name: itemState.item.icon!,
  }
}

function avatarProps(itemState: TimelineItemState) {
  return {
    ...itemState.item.avatar,
    ...useUi({
      base: { class: 'size-full' },
      ui: props.ui?.avatar?.(itemState),
      exclude: timelineUiExclude.avatar,
    }),
    size: timelineAvatarSizes[size.value],
  }
}

function connectorProps(itemState: TimelineItemState) {
  const filled =
    itemState.status === 'complete' || (props.reverse && itemState.status === 'current')

  return useUi({
    base: { class: timelineConnectorVariants({ orientation: orientation.value, filled }) },
    ui: props.ui?.connector?.(itemState),
    exclude: timelineUiExclude.connector,
  })
}

function contentProps(itemState: TimelineItemState) {
  return {
    class: timelineContentVariants({
      orientation: orientation.value,
      size: size.value,
      last: isLast(itemState),
    }),
  }
}

function dateProps(dateState: TimelineDateState) {
  const date = dateState.item.date === undefined ? undefined : toDate(dateState.item.date)

  return useUi({
    base: { class: timelineDateVariants({ size: size.value }), datetime: date?.toISOString() },
    ui: props.ui?.date?.(dateState),
    exclude: timelineUiExclude.date,
  })
}

function titleProps(itemState: TimelineItemState) {
  return useUi({
    base: { class: timelineTitleVariants() },
    ui: props.ui?.title?.(itemState),
    exclude: timelineUiExclude.title,
  })
}

function descriptionProps(itemState: TimelineItemState) {
  return useUi({
    base: { class: timelineDescriptionVariants({ size: size.value }) },
    ui: props.ui?.description?.(itemState),
    exclude: timelineUiExclude.description,
  })
}

defineExpose<TimelineExpose>({
  focus: (value) => controller.focus(value),
})
</script>

<template>
  <TimelineRoot data-ui="timeline-root" v-bind="rootProps">
    <TimelineItemPart
      v-for="itemState in itemStates"
      :key="itemState.item.value ?? itemState.index"
      data-ui="timeline-item"
      v-bind="itemProps(itemState)"
    >
      <div data-ui="timeline-rail" v-bind="railProps()">
        <TimelineMarker data-ui="timeline-marker" v-bind="markerProps(itemState)">
          <slot name="marker" v-bind="itemState">
            <Icon
              v-if="itemState.item.icon"
              data-ui="timeline-icon"
              v-bind="iconProps(itemState)"
            />
            <Avatar
              v-else-if="itemState.item.avatar"
              data-ui="timeline-avatar"
              v-bind="avatarProps(itemState)"
            />
          </slot>
        </TimelineMarker>
        <TimelineConnector
          v-if="!isLast(itemState)"
          data-ui="timeline-connector"
          v-bind="connectorProps(itemState)"
        />
      </div>
      <div data-ui="timeline-content" v-bind="contentProps(itemState)">
        <TimelineTime
          v-if="hasDate(itemState)"
          data-ui="timeline-date"
          v-bind="dateProps(dateStateOf(itemState))"
        >
          <slot name="date" v-bind="dateStateOf(itemState)">
            {{ dateStateOf(itemState).formatted }}
          </slot>
        </TimelineTime>
        <TimelineTitle
          v-if="hasTitle(itemState)"
          data-ui="timeline-title"
          v-bind="titleProps(itemState)"
        >
          <slot name="title" v-bind="itemState">{{ itemState.item.title }}</slot>
        </TimelineTitle>
        <TimelineDescription
          v-if="hasDescription(itemState)"
          data-ui="timeline-description"
          v-bind="descriptionProps(itemState)"
        >
          <slot name="description" v-bind="itemState">{{ itemState.item.description }}</slot>
        </TimelineDescription>
      </div>
    </TimelineItemPart>
  </TimelineRoot>
</template>
