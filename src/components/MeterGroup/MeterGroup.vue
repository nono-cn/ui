<script setup lang="ts">
import { formatNumber } from '@ui-sdk/core/number'
import { Meter, MeterLabel, MeterTrack, MeterValue } from '@ui-sdk/vue/meter'
import { computed, useAttrs } from 'vue'
import { getColorVariables, oneOf } from '@/composables/useTheme'
import { useUi } from '@/composables/useUi'
import { useLocale } from '@/i18n/useLocale'
import {
  meterGroupDefaults,
  meterGroupLegends,
  meterGroupOrientations,
  meterGroupSizes,
} from '@/components/MeterGroup/constants'
import { meterGroupUiExclude } from '@/components/MeterGroup/exclude'
import type {
  MeterGroupContext,
  MeterGroupItemContext,
  MeterGroupProps,
  MeterGroupSlots,
} from '@/components/MeterGroup/types'
import {
  meterGroupDotVariants,
  meterGroupIconVariants,
  meterGroupItemLabelVariants,
  meterGroupItemValueVariants,
  meterGroupItemVariants,
  meterGroupLabelVariants,
  meterGroupLeadingVariants,
  meterGroupLegendVariants,
  meterGroupMeterVariants,
  meterGroupSegmentVariants,
  meterGroupTrackVariants,
  meterGroupValueVariants,
  meterGroupVariants,
} from '@/components/MeterGroup/variants'
import Icon from '@/components/Icon/Icon.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<MeterGroupProps>(), {
  items: () => [],
  max: meterGroupDefaults.max,
  color: meterGroupDefaults.color,
  size: meterGroupDefaults.size,
  orientation: meterGroupDefaults.orientation,
  legend: meterGroupDefaults.legend,
})

const slots = defineSlots<MeterGroupSlots>()
const attrs = useAttrs()
const { tag } = useLocale()

const size = computed(() => oneOf(props.size, meterGroupSizes, meterGroupDefaults.size))
const orientation = computed(() =>
  oneOf(props.orientation, meterGroupOrientations, meterGroupDefaults.orientation),
)
const legend = computed(() =>
  orientation.value === 'vertical' && props.legend === 'inline'
    ? 'list'
    : oneOf(props.legend, meterGroupLegends, meterGroupDefaults.legend),
)
const locale = computed(() => props.locale ?? tag.value)
const hasLabel = computed(() => Boolean(props.label || slots.label))
const hasValue = computed(() => Boolean(props.showValue || slots.value))

function amountOf(value: number) {
  return Number.isFinite(value) ? Math.max(0, value) : 0
}

function percentOf(value: number) {
  return props.max > 0 ? (Math.min(amountOf(value), props.max) / props.max) * 100 : 0
}

function formatValue(value: number) {
  const format = props.format
  if (typeof format === 'function') return format(value)
  if (format && format.style !== 'percent') return formatNumber(value, locale.value, format)
  return formatNumber(percentOf(value) / 100, locale.value, format ?? { style: 'percent' })
}

const total = computed(() => props.items.reduce((sum, item) => sum + amountOf(item.value), 0))

const context = computed<MeterGroupContext>(() => ({
  value: total.value,
  percent: percentOf(total.value),
  max: props.max,
  text: formatValue(total.value),
}))

const itemContexts = computed<MeterGroupItemContext[]>(() => {
  const scale = Math.max(total.value, props.max)

  return props.items.map((item, index) => ({
    item,
    index,
    percent: scale > 0 ? (amountOf(item.value) / scale) * 100 : 0,
    text: formatValue(item.value),
  }))
})

function colorOf({ item }: MeterGroupItemContext) {
  return getColorVariables(item.color || props.color, 'meter-group', meterGroupDefaults.color)
}

const rootProps = computed(() =>
  useUi({
    base: [
      {
        'data-orientation': orientation.value,
        class: meterGroupVariants({ orientation: orientation.value }),
        style: getColorVariables(props.color, 'meter-group', meterGroupDefaults.color),
      },
      attrs,
    ],
    ui: props.ui?.root?.(),
    exclude: meterGroupUiExclude.root,
  }),
)

const meterProps = computed(() => ({
  ...useUi({
    base: { class: meterGroupMeterVariants({ orientation: orientation.value }) },
    ui: props.ui?.meter?.(context.value),
    exclude: meterGroupUiExclude.meter,
  }),
  value: total.value,
  min: 0,
  max: props.max,
  format: props.format,
  locale: locale.value,
  getValueLabel: props.getValueLabel,
}))

const labelProps = computed(() =>
  useUi({
    base: { class: meterGroupLabelVariants({ size: size.value }) },
    ui: props.ui?.label?.(context.value),
    exclude: meterGroupUiExclude.label,
  }),
)

function valueProps(partAttrs: Record<string, unknown>) {
  return useUi({
    base: [
      { class: meterGroupValueVariants({ size: size.value, orientation: orientation.value }) },
      partAttrs,
    ],
    ui: props.ui?.value?.(context.value),
    exclude: meterGroupUiExclude.value,
  })
}

const trackProps = computed(() =>
  useUi({
    base: {
      class: meterGroupTrackVariants({ size: size.value, orientation: orientation.value }),
    },
    ui: props.ui?.track?.(context.value),
    exclude: meterGroupUiExclude.track,
  }),
)

function segmentProps(itemContext: MeterGroupItemContext) {
  const extent = `${itemContext.percent}%`

  return useUi({
    base: {
      class: meterGroupSegmentVariants({
        orientation: orientation.value,
        separated: props.separated,
      }),
      style: [
        colorOf(itemContext),
        orientation.value === 'vertical' ? { height: extent } : { width: extent },
      ],
    },
    ui: props.ui?.segment?.(itemContext),
    exclude: meterGroupUiExclude.segment,
  })
}

const legendProps = computed(() =>
  useUi({
    base: { class: meterGroupLegendVariants({ legend: legend.value, size: size.value }) },
    ui: props.ui?.legend?.(),
    exclude: meterGroupUiExclude.legend,
  }),
)

function itemProps(itemContext: MeterGroupItemContext) {
  return useUi({
    base: { class: meterGroupItemVariants(), style: colorOf(itemContext) },
    ui: props.ui?.item?.(itemContext),
    exclude: meterGroupUiExclude.item,
  })
}

const leadingProps = computed(() => ({ class: meterGroupLeadingVariants({ size: size.value }) }))

function iconProps(itemContext: MeterGroupItemContext) {
  return {
    ...useUi({
      base: { class: meterGroupIconVariants() },
      ui: props.ui?.itemIcon?.(itemContext),
      exclude: meterGroupUiExclude.itemIcon,
    }),
    name: itemContext.item.icon!,
  }
}

function dotProps(itemContext: MeterGroupItemContext) {
  return useUi({
    base: { class: meterGroupDotVariants() },
    ui: props.ui?.itemDot?.(itemContext),
    exclude: meterGroupUiExclude.itemDot,
  })
}

function hasItemLabel({ item }: MeterGroupItemContext) {
  return Boolean(item.label || slots['item-label'])
}

function itemLabelProps(itemContext: MeterGroupItemContext) {
  return useUi({
    base: { class: meterGroupItemLabelVariants() },
    ui: props.ui?.itemLabel?.(itemContext),
    exclude: meterGroupUiExclude.itemLabel,
  })
}

function itemValueProps(itemContext: MeterGroupItemContext) {
  return useUi({
    base: { class: meterGroupItemValueVariants({ legend: legend.value }) },
    ui: props.ui?.itemValue?.(itemContext),
    exclude: meterGroupUiExclude.itemValue,
  })
}
</script>

<template>
  <div data-ui="meter-group-root" v-bind="rootProps">
    <Meter data-ui="meter-group-meter" v-bind="meterProps">
      <MeterLabel v-if="hasLabel" data-ui="meter-group-label" v-bind="labelProps">
        <slot name="label" v-bind="context">{{ label }}</slot>
      </MeterLabel>
      <MeterValue v-if="hasValue">
        <template #render="{ props: partAttrs, children }">
          <span data-ui="meter-group-value" v-bind="valueProps(partAttrs)">
            <component :is="children" />
          </span>
        </template>
        <template #default>
          <slot name="value" v-bind="context">{{ context.text }}</slot>
        </template>
      </MeterValue>
      <MeterTrack data-ui="meter-group-track" v-bind="trackProps">
        <template v-for="itemContext in itemContexts" :key="itemContext.index">
          <span
            v-if="itemContext.percent > 0"
            data-ui="meter-group-segment"
            v-bind="segmentProps(itemContext)"
          />
        </template>
      </MeterTrack>
    </Meter>
    <ul v-if="legend !== 'none'" data-ui="meter-group-legend" v-bind="legendProps">
      <li
        v-for="itemContext in itemContexts"
        :key="itemContext.index"
        data-ui="meter-group-item"
        v-bind="itemProps(itemContext)"
      >
        <span data-ui="meter-group-item-leading" v-bind="leadingProps">
          <slot name="item-leading" v-bind="itemContext">
            <Icon
              v-if="itemContext.item.icon"
              data-ui="meter-group-item-icon"
              v-bind="iconProps(itemContext)"
            />
            <span v-else data-ui="meter-group-item-dot" v-bind="dotProps(itemContext)" />
          </slot>
        </span>
        <span
          v-if="hasItemLabel(itemContext)"
          data-ui="meter-group-item-label"
          v-bind="itemLabelProps(itemContext)"
        >
          <slot name="item-label" v-bind="itemContext">{{ itemContext.item.label }}</slot>
        </span>
        <span data-ui="meter-group-item-value" v-bind="itemValueProps(itemContext)">
          <slot name="item-value" v-bind="itemContext">{{ itemContext.text }}</slot>
        </span>
      </li>
    </ul>
  </div>
</template>
