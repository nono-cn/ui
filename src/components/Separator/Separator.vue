<script setup lang="ts">
import { Separator as SeparatorRoot } from '@ui-sdk/vue/separator'
import { computed, useAttrs } from 'vue'
import { cn, type ClassValue } from '@/composables/cn'
import { getColorVariables, oneOf } from '@/composables/useTheme'
import {
  separatorDefaults,
  separatorOrientations,
  separatorPositions,
  separatorSizes,
  separatorTypes,
} from '@/components/Separator/constants'
import type { SeparatorProps, SeparatorSlots } from '@/components/Separator/types'
import { separatorLabelVariants, separatorVariants } from '@/components/Separator/variants'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<SeparatorProps>(), {
  orientation: separatorDefaults.orientation,
  decorative: separatorDefaults.decorative,
  type: separatorDefaults.type,
  size: separatorDefaults.size,
  color: separatorDefaults.color,
  position: separatorDefaults.position,
})

const slots = defineSlots<SeparatorSlots>()
const attrs = useAttrs()

const orientation = computed(() =>
  oneOf(props.orientation, separatorOrientations, separatorDefaults.orientation),
)
const hasLabel = computed(() => Boolean(props.label || slots.default))

const labelProps = {
  'data-slot': 'label',
  class: separatorLabelVariants(),
}

const rootProps = computed(() => ({
  ...attrs,
  orientation: orientation.value,
  decorative: props.decorative,
  class: cn(
    separatorVariants({
      orientation: orientation.value,
      type: oneOf(props.type, separatorTypes, separatorDefaults.type),
      size: oneOf(props.size, separatorSizes, separatorDefaults.size),
      position: oneOf(props.position, separatorPositions, separatorDefaults.position),
    }),
    attrs.class as ClassValue,
  ),
  style: [
    getColorVariables(props.color === 'neutral' ? 'border' : props.color, 'separator', 'border'),
    attrs.style,
  ],
}))
</script>

<template>
  <SeparatorRoot v-bind="rootProps">
    <span v-if="hasLabel" v-bind="labelProps">
      <slot>{{ label }}</slot>
    </span>
  </SeparatorRoot>
</template>
