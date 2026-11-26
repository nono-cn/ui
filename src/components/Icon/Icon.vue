<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { getColorVariables, oneOf } from '@/composables/useTheme'
import { useUi } from '@/composables/useUi'
import { iconDefaults, iconSizes } from '@/components/Icon/constants'
import type { IconProps } from '@/components/Icon/types'
import { iconVariants } from '@/components/Icon/variants'
import { icons } from '@/icons'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<IconProps>(), {
  size: iconDefaults.size,
  color: iconDefaults.color,
  stroke: iconDefaults.stroke,
})

const attrs = useAttrs()

const node = computed(() => icons[props.name] ?? [])

const rootAttrs = computed(() => {
  const color = props.color?.trim() || iconDefaults.color
  const inherit = color === 'currentColor'
  const stroke = Number(props.stroke)
  const ui = useUi({
    base: [
      {
        class: iconVariants({ size: oneOf(props.size, iconSizes, iconDefaults.size), inherit }),
        style: inherit ? {} : getColorVariables(color, 'icon', 'primary'),
      },
      attrs,
    ],
    ui: props.ui?.root?.(),
  })
  const labelled = ui['aria-label'] != null || ui['aria-labelledby'] != null

  return {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': Number.isFinite(stroke) && stroke > 0 ? stroke : iconDefaults.stroke,
    'stroke-linecap': 'round' as const,
    'stroke-linejoin': 'round' as const,
    ...(labelled ? {} : { 'aria-hidden': 'true' as const }),
    ...ui,
  }
})
</script>

<template>
  <svg data-ui="icon-root" v-bind="rootAttrs">
    <component
      :is="tag"
      v-for="([tag, nodeAttrs], index) in node"
      :key="index"
      v-bind="nodeAttrs"
    />
  </svg>
</template>
