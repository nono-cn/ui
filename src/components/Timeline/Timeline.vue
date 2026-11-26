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
import { getColorVariables, oneOf } from '@/composables/useTheme'
import { useUi } from '@/composables/useUi'
import {
  timelineAligns,
  timelineDefaults,
  timelineOrientations,
  timelineSizes,
  timelineStatuses,
} from '@/components/Timeline/constants'
import { timelineUiExclude } from '@/components/Timeline/exclude'
import type {
  TimelineExpose,
  TimelineItem,
  TimelineItemContext,
  TimelineProps,
  TimelineSlots,
  TimelineStatus,
} from '@/components/Timeline/types'
import {
  timelineConnectorVariants,
  timelineContentVariants,
  timelineDateVariants,
  timelineDescriptionVariants,
  timelineIconVariants,
  timelineItemVariants,
  timelineLabelVariants,
  timelineMarkerVariants,
  timelineRailVariants,
  timelineVariants,
} from '@/components/Timeline/variants'
import Icon from '@/components/Icon/Icon.vue'
import Time from '@/components/Time/Time.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<TimelineProps>(), {
  items: () => [],
  value: undefined,
  reverse: timelineDefaults.reverse,
  dateOptions: undefined,
  orientation: timelineDefaults.orientation,
  align: timelineDefaults.align,
  loop: undefined,
  feed: undefined,
  busy: undefined,
  color: timelineDefaults.color,
  size: timelineDefaults.size,
})

const slots = defineSlots<TimelineSlots>()
const attrs = useAttrs()
const controller = createTimelineController()

const size = computed(() => oneOf(props.size, timelineSizes, timelineDefaults.size))
const orientation = computed(() =>
  oneOf(props.orientation, timelineOrientations, timelineDefaults.orientation),
)
const align = computed(() => oneOf(props.align, timelineAligns, timelineDefaults.align))
const hasOpposite = computed(() => Boolean(slots.opposite) || align.value === 'alternate')

function sideOf({ index }: TimelineItemContext) {
  if (align.value === 'alternate') return index % 2 === 0 ? 'start' : 'end'
  return align.value === 'end' ? 'end' : 'start'
}

const currentIndex = computed(() =>
  props.value === undefined ? -1 : props.items.findIndex((item) => item.value === props.value),
)

function statusOf(item: TimelineItem, index: number): TimelineStatus | undefined {
  if (timelineStatuses.includes(item.status!)) return item.status
  if (currentIndex.value < 0) return undefined
  if (index === currentIndex.value) return 'current'
  return index < currentIndex.value !== props.reverse ? 'complete' : 'upcoming'
}

const itemContexts = computed<TimelineItemContext[]>(() =>
  props.items.map((item, index) => ({
    item,
    index,
    status: statusOf(item, index),
    last: index === props.items.length - 1,
  })),
)

const rootProps = computed(() => ({
  ...useUi({
    base: [
      {
        class: timelineVariants({
          orientation: orientation.value,
          size: size.value,
          opposite: hasOpposite.value,
        }),
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

function itemProps(context: TimelineItemContext) {
  return {
    ...useUi({
      base: {
        class: timelineItemVariants({
          orientation: orientation.value,
          size: size.value,
          opposite: hasOpposite.value,
          side: sideOf(context),
        }),
      },
      ui: props.ui?.item?.(context),
      exclude: timelineUiExclude.item,
    }),
    value: context.item.value,
    status: context.status,
  }
}

function railProps() {
  return { class: timelineRailVariants({ orientation: orientation.value }) }
}

function markerProps(context: TimelineItemContext) {
  return useUi({
    base: {
      class: timelineMarkerVariants({
        kind: slots.marker || context.item.icon ? 'icon' : 'dot',
        status: context.status ?? 'none',
        orientation: orientation.value,
      }),
    },
    ui: props.ui?.marker?.(context),
    exclude: timelineUiExclude.marker,
  })
}

function iconProps(context: TimelineItemContext) {
  return {
    ...useUi({
      base: { class: timelineIconVariants() },
      ui: props.ui?.icon?.(context),
      exclude: timelineUiExclude.icon,
    }),
    name: context.item.icon!,
  }
}

function connectorProps(context: TimelineItemContext) {
  const filled = context.status === 'complete' || (props.reverse && context.status === 'current')

  return useUi({
    base: { class: timelineConnectorVariants({ orientation: orientation.value, filled }) },
    ui: props.ui?.connector?.(context),
    exclude: timelineUiExclude.connector,
  })
}

function contentProps(context: TimelineItemContext) {
  return {
    class: timelineContentVariants({
      orientation: orientation.value,
      size: size.value,
      last: context.last,
      side: sideOf(context),
    }),
  }
}

function oppositeProps(context: TimelineItemContext) {
  return {
    class: timelineContentVariants({
      orientation: orientation.value,
      size: size.value,
      last: context.last,
      side: sideOf(context) === 'start' ? 'end' : 'start',
    }),
  }
}

function dateProps(attrs: Record<string, unknown>, context: TimelineItemContext) {
  return {
    ...useUi({
      base: [{ class: timelineDateVariants({ size: size.value }) }, attrs],
      ui: props.ui?.date?.(context),
      exclude: timelineUiExclude.date,
    }),
    datetime: context.item.date!,
    options: props.dateOptions,
  }
}

function labelProps(context: TimelineItemContext) {
  return useUi({
    base: { class: timelineLabelVariants() },
    ui: props.ui?.label?.(context),
    exclude: timelineUiExclude.label,
  })
}

function descriptionProps(context: TimelineItemContext) {
  return useUi({
    base: { class: timelineDescriptionVariants({ size: size.value }) },
    ui: props.ui?.description?.(context),
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
      v-for="context in itemContexts"
      :key="context.item.value ?? context.index"
      data-ui="timeline-item"
      v-bind="itemProps(context)"
    >
      <div v-if="hasOpposite" data-ui="timeline-opposite" v-bind="oppositeProps(context)">
        <slot name="opposite" v-bind="context" />
      </div>
      <div data-ui="timeline-rail" v-bind="railProps()">
        <TimelineMarker data-ui="timeline-marker" v-bind="markerProps(context)">
          <slot name="marker" v-bind="context">
            <Icon v-if="context.item.icon" data-ui="timeline-icon" v-bind="iconProps(context)" />
          </slot>
        </TimelineMarker>

        <TimelineConnector
          v-if="!context.last"
          data-ui="timeline-connector"
          v-bind="connectorProps(context)"
        />
      </div>

      <div data-ui="timeline-content" v-bind="contentProps(context)">
        <TimelineTitle
          v-if="context.item.label || slots.label"
          data-ui="timeline-label"
          v-bind="labelProps(context)"
        >
          <slot name="label" v-bind="context">{{ context.item.label }}</slot>
        </TimelineTitle>

        <TimelineTime v-if="context.item.date !== undefined">
          <template #render="{ props: timeProps }">
            <Time data-ui="timeline-date" v-bind="dateProps(timeProps, context)">
              <template #default="{ formatted }">
                <slot name="date" v-bind="context" :formatted="formatted">
                  {{ formatted || context.item.date }}
                </slot>
              </template>
            </Time>
          </template>
        </TimelineTime>

        <TimelineDescription
          v-if="context.item.description || slots.description"
          data-ui="timeline-description"
          v-bind="descriptionProps(context)"
        >
          <slot name="description" v-bind="context">{{ context.item.description }}</slot>
        </TimelineDescription>

        <slot name="content" v-bind="context" />
      </div>
    </TimelineItemPart>
  </TimelineRoot>
</template>
