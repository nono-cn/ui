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
import { getColorVariables, oneOf } from '@/composables/useTheme'
import { useUi } from '@/composables/useUi'
import { useLocale } from '@/i18n/useLocale'
import { toProgressState, toProgressValueState } from '@/components/Progress/state'
import {
  progressAnimations,
  progressDefaults,
  progressOrientations,
  progressSizes,
  progressValuePositions,
} from '@/components/Progress/constants'
import type {
  ProgressProps,
  ProgressSlots,
  ProgressState,
  ProgressValueState,
} from '@/components/Progress/types'
import {
  progressIndicatorVariants,
  progressLabelVariants,
  progressTrackVariants,
  progressValueVariants,
  progressVariants,
} from '@/components/Progress/variants'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ProgressProps>(), {
  value: null,
  min: progressDefaults.min,
  max: progressDefaults.max,
  color: progressDefaults.color,
  size: progressDefaults.size,
  orientation: progressDefaults.orientation,
  animation: progressDefaults.animation,
  valuePosition: progressDefaults.valuePosition,
})

const slots = defineSlots<ProgressSlots>()
const attrs = useAttrs()
const { tag } = useLocale()

const size = computed(() => oneOf(props.size, progressSizes, progressDefaults.size))
const orientation = computed(() =>
  oneOf(props.orientation, progressOrientations, progressDefaults.orientation),
)
const hasLabel = computed(() => Boolean(props.label || slots.label))
const hasValue = computed(() => Boolean(props.showValue || slots.value))
const valuePosition = computed(() =>
  orientation.value === 'vertical'
    ? 'outside'
    : oneOf(props.valuePosition, progressValuePositions, progressDefaults.valuePosition),
)
const inside = computed(() => hasValue.value && valuePosition.value === 'inside')

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
        'data-orientation': orientation.value,
        class: progressVariants({ orientation: orientation.value }),
        style: getColorVariables(props.color, 'progress', progressDefaults.color),
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
    base: { class: progressLabelVariants({ size: size.value }) },
    ui: props.ui?.label?.(state),
  })
}

function valueProps(partAttrs: Record<string, unknown>, state: ProgressValueState) {
  return useUi({
    base: [
      {
        class: progressValueVariants({
          size: size.value,
          orientation: orientation.value,
          position: valuePosition.value,
          inverted: props.inverted,
        }),
      },
      partAttrs,
    ],
    ui: props.ui?.value?.(state),
  })
}

function trackProps(state: ProgressState) {
  return useUi({
    base: {
      class: progressTrackVariants({
        size: size.value,
        orientation: orientation.value,
        inside: inside.value,
      }),
    },
    ui: props.ui?.track?.(state),
  })
}

function indicatorProps(state: ProgressState) {
  return useUi({
    base: {
      class: progressIndicatorVariants({
        orientation: orientation.value,
        inverted: props.inverted,
        animation: oneOf(props.animation, progressAnimations, progressDefaults.animation),
      }),
    },
    ui: props.ui?.indicator?.(state),
  })
}
</script>

<template>
  <ProgressRoot data-ui="progress-root" v-bind="rootProps">
    <template #default="{ state: sdkState }">
      <ProgressLabel
        v-if="hasLabel"
        data-ui="progress-label"
        v-bind="labelProps(toState(sdkState))"
      >
        <slot name="label" v-bind="toState(sdkState)">{{ label }}</slot>
      </ProgressLabel>
      <ProgressValue v-if="hasValue && !inside">
        <template #render="{ props: partAttrs, state: valueState, children }">
          <span data-ui="progress-value" v-bind="valueProps(partAttrs, toValueState(valueState))">
            <component :is="children" />
          </span>
        </template>
        <template #default="{ state: valueState }">
          <slot name="value" v-bind="toValueState(valueState)">{{ valueState.text }}</slot>
        </template>
      </ProgressValue>
      <ProgressTrack data-ui="progress-track" v-bind="trackProps(toState(sdkState))">
        <ProgressIndicator
          data-ui="progress-indicator"
          v-bind="indicatorProps(toState(sdkState))"
        />
        <ProgressValue v-if="inside">
          <template #render="{ props: partAttrs, state: valueState, children }">
            <span data-ui="progress-value" v-bind="valueProps(partAttrs, toValueState(valueState))">
              <component :is="children" />
            </span>
          </template>
          <template #default="{ state: valueState }">
            <slot name="value" v-bind="toValueState(valueState)">{{ valueState.text }}</slot>
          </template>
        </ProgressValue>
      </ProgressTrack>
    </template>
  </ProgressRoot>
</template>
