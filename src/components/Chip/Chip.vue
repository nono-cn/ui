<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { cn, type ClassValue } from '@/composables/cn'
import { getColorVariables, oneOf } from '@/composables/useTheme'
import { chipDefaults, chipPositions, chipSizes } from '@/components/Chip/constants'
import type { ChipProps, ChipSlots } from '@/components/Chip/types'
import { chipIndicatorVariants, chipVariants } from '@/components/Chip/variants'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ChipProps>(), {
  color: chipDefaults.color,
  size: chipDefaults.size,
  position: chipDefaults.position,
  show: chipDefaults.show,
  inset: chipDefaults.inset,
  standalone: chipDefaults.standalone,
})

defineSlots<ChipSlots>()
const attrs = useAttrs()

const indicatorProps = computed(() => ({
  'data-slot': 'indicator',
  class: chipIndicatorVariants({
    size: oneOf(props.size, chipSizes, chipDefaults.size),
    position: props.standalone
      ? undefined
      : oneOf(props.position, chipPositions, chipDefaults.position),
    inset: props.inset,
    standalone: props.standalone,
  }),
}))

const rootProps = computed(() => ({
  'data-slot': 'chip',
  ...attrs,
  class: cn(chipVariants(), attrs.class as ClassValue),
  style: [getColorVariables(props.color, 'chip', chipDefaults.color), attrs.style],
}))
</script>

<template>
  <div v-bind="rootProps">
    <slot />
    <span v-if="show" v-bind="indicatorProps" />
  </div>
</template>
