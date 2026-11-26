<script setup lang="ts">
import { Separator as SeparatorRoot } from '@ui-sdk/vue/separator'
import { computed, useAttrs } from 'vue'
import { getColorVariables, oneOf } from '@/composables/useTheme'
import { useUi } from '@/composables/useUi'
import {
  separatorDefaults,
  separatorOrientations,
  separatorPositions,
  separatorSizes,
  separatorTypes,
} from '@/components/Separator/constants'
import { separatorUiExclude } from '@/components/Separator/exclude'
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

const labelProps = computed(() =>
  useUi({
    base: { class: separatorLabelVariants() },
    ui: props.ui?.label?.(),
    exclude: separatorUiExclude.label,
  }),
)

const rootProps = computed(() => ({
  ...useUi({
    base: [
      {
        class: separatorVariants({
          orientation: orientation.value,
          type: oneOf(props.type, separatorTypes, separatorDefaults.type),
          size: oneOf(props.size, separatorSizes, separatorDefaults.size),
          position: oneOf(props.position, separatorPositions, separatorDefaults.position),
        }),
        style: getColorVariables(
          props.color === 'neutral' ? 'border' : props.color,
          'separator',
          'border',
        ),
      },
      attrs,
    ],
    ui: props.ui?.root?.(),
    exclude: separatorUiExclude.root,
  }),
  orientation: orientation.value,
  decorative: props.decorative,
}))
</script>

<template>
  <SeparatorRoot data-ui="separator-root" v-bind="rootProps">
    <span v-if="hasLabel" data-ui="separator-label" v-bind="labelProps">
      <slot>{{ label }}</slot>
    </span>
  </SeparatorRoot>
</template>
