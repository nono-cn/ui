<script setup lang="ts">
import type {
  ProgressState as SdkState,
  ProgressValueState as SdkValueState,
} from '@ui-sdk/core/progress'
import {
  Progress as ProgressRoot,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
} from '@ui-sdk/vue/progress'
import { computed, useAttrs } from 'vue'
import type { ProgressState, ProgressValueState } from '@/components/Progress/types'
import {
  progressCircularDefaults,
  progressCircularSizes,
  progressCircularThickness,
} from '@/components/ProgressCircular/constants'
import type {
  ProgressCircularProps,
  ProgressCircularSlots,
} from '@/components/ProgressCircular/types'
import {
  progressCircularIndicatorVariants,
  progressCircularLabelVariants,
  progressCircularSvgVariants,
  progressCircularTrackVariants,
  progressCircularValueVariants,
  progressCircularVariants,
} from '@/components/ProgressCircular/variants'
import { getColorVariables, oneOf } from '@/composables/useTheme'
import { useUi } from '@/composables/useUi'
import { useLocale } from '@/i18n/useLocale'
import { toProgressState, toProgressValueState } from '@/components/Progress/state'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ProgressCircularProps>(), {
  value: null,
  min: progressCircularDefaults.min,
  max: progressCircularDefaults.max,
  color: progressCircularDefaults.color,
  size: progressCircularDefaults.size,
})

const slots = defineSlots<ProgressCircularSlots>()
const attrs = useAttrs()
const { tag } = useLocale()

const size = computed(() => oneOf(props.size, progressCircularSizes, progressCircularDefaults.size))
const hasLabel = computed(() => Boolean(props.label || slots.label))
const hasValue = computed(() => Boolean(props.showValue || slots.value))
const strokeWidth = computed(() => {
  const thickness = props.thickness ?? progressCircularThickness[size.value]
  return Number.isFinite(thickness) ? Math.min(Math.max(thickness, 1), 25) : 10
})
const circle = computed(() => ({
  cx: 50,
  cy: 50,
  r: 50 - strokeWidth.value / 2,
  'stroke-width': strokeWidth.value,
}))

function toState(state: SdkState) {
  return toProgressState(state, props.min, props.max)
}

function toValueState(state: SdkValueState) {
  return toProgressValueState(state, props.min, props.max)
}

const rootProps = computed(() => ({
  ...useUi({
    base: [
      {
        class: progressCircularVariants(),
        style: getColorVariables(props.color, 'progress-circular', progressCircularDefaults.color),
      },
      attrs,
    ],
    ui: props.ui?.root?.(),
  }),
  value: props.value,
  min: props.min,
  max: props.max,
  format: props.format,
  locale: props.locale ?? tag.value,
  getValueLabel: props.getValueLabel,
}))

function labelProps(state: ProgressState) {
  return useUi({
    base: { class: progressCircularLabelVariants({ size: size.value }) },
    ui: props.ui?.label?.(state),
  })
}

function valueProps(partAttrs: Record<string, unknown>, state: ProgressValueState) {
  return useUi({
    base: [{ class: progressCircularValueVariants({ size: size.value }) }, partAttrs],
    ui: props.ui?.value?.(state),
  })
}

function svgProps(state: ProgressState) {
  return useUi({
    base: {
      viewBox: '0 0 100 100',
      'aria-hidden': 'true',
      class: progressCircularSvgVariants({ size: size.value, inverted: props.inverted }),
    },
    ui: props.ui?.svg?.(state),
  })
}

function trackProps(partAttrs: Record<string, unknown>, state: ProgressState) {
  return useUi({
    base: [{ ...circle.value, class: progressCircularTrackVariants() }, partAttrs],
    ui: props.ui?.track?.(state),
  })
}

function indicatorProps(partAttrs: Record<string, unknown>, state: ProgressState) {
  const sdkAttrs = Object.fromEntries(Object.entries(partAttrs).filter(([key]) => key !== 'style'))
  return useUi({
    base: [
      {
        ...circle.value,
        pathLength: 100,
        'stroke-linecap': state.percent === 0 ? 'butt' : 'round',
        class: progressCircularIndicatorVariants(),
        style: state.percent === null ? undefined : { strokeDashoffset: 100 - state.percent },
      },
      sdkAttrs,
    ],
    ui: props.ui?.indicator?.(state),
  })
}
</script>

<template>
  <ProgressRoot data-ui="progress-circular-root" v-bind="rootProps">
    <template #default="{ state: sdkState }">
      <svg data-ui="progress-circular-svg" v-bind="svgProps(toState(sdkState))">
        <ProgressTrack>
          <template #render="{ props: partAttrs, state: trackState }">
            <circle
              data-ui="progress-circular-track"
              v-bind="trackProps(partAttrs, toState(trackState))"
            />
          </template>
        </ProgressTrack>
        <ProgressIndicator>
          <template #render="{ props: partAttrs, state: indicatorState }">
            <circle
              data-ui="progress-circular-indicator"
              v-bind="indicatorProps(partAttrs, toState(indicatorState))"
            />
          </template>
        </ProgressIndicator>
      </svg>
      <ProgressValue v-if="hasValue">
        <template #render="{ props: partAttrs, state: valueState, children }">
          <span
            data-ui="progress-circular-value"
            v-bind="valueProps(partAttrs, toValueState(valueState))"
          >
            <component :is="children" />
          </span>
        </template>
        <template #default="{ state: valueState }">
          <slot name="value" v-bind="toValueState(valueState)">{{ valueState.text }}</slot>
        </template>
      </ProgressValue>
      <ProgressLabel
        v-if="hasLabel"
        data-ui="progress-circular-label"
        v-bind="labelProps(toState(sdkState))"
      >
        <slot name="label" v-bind="toState(sdkState)">{{ label }}</slot>
      </ProgressLabel>
    </template>
  </ProgressRoot>
</template>
