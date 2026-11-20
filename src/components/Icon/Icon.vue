<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { cn, type ClassValue } from '@/composables/cn'
import { getColorVariables, oneOf } from '@/composables/useTheme'
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
  const labelled = attrs['aria-label'] != null || attrs['aria-labelledby'] != null
  const color = props.color?.trim() || iconDefaults.color
  const inherit = color === 'currentColor'
  const stroke = Number(props.stroke)

  return {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': Number.isFinite(stroke) && stroke > 0 ? stroke : iconDefaults.stroke,
    'stroke-linecap': 'round' as const,
    'stroke-linejoin': 'round' as const,
    ...(labelled ? {} : { 'aria-hidden': 'true' as const }),
    ...attrs,
    class: cn(
      iconVariants({ size: oneOf(props.size, iconSizes, iconDefaults.size), inherit }),
      attrs.class as ClassValue,
    ),
    style: [inherit ? {} : getColorVariables(color, 'icon', 'primary'), attrs.style],
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
