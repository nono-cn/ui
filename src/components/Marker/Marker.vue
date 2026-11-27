<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { cn } from '@/composables/cn'
import { oneOf } from '@/composables/useTheme'
import { useUi } from '@/composables/useUi'
import { markerDefaults, markerVariantNames } from '@/components/Marker/constants'
import { markerUiExclude } from '@/components/Marker/exclude'
import type { MarkerProps, MarkerSlots } from '@/components/Marker/types'
import {
  markerIconVariants,
  markerLabelVariants,
  markerLeadingVariants,
  markerVariants,
} from '@/components/Marker/variants'
import Icon from '@/components/Icon/Icon.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<MarkerProps>(), {
  variant: markerDefaults.variant,
  loading: markerDefaults.loading,
  shimmer: markerDefaults.shimmer,
  as: markerDefaults.as,
})

const slots = defineSlots<MarkerSlots>()
const attrs = useAttrs()

const hasLeading = computed(() => Boolean(props.loading || props.icon || slots.icon))
const hasLabel = computed(() => Boolean(props.label || slots.default))

const leadingProps = computed(() => ({
  class: markerLeadingVariants(),
  'aria-hidden': 'true' as const,
}))

const loadingIconProps = computed(() => ({
  ...useUi({
    base: { class: cn(markerIconVariants(), 'animate-spin') },
    ui: props.ui?.loadingIcon?.(),
    exclude: markerUiExclude.loadingIcon,
  }),
  name: 'spinner' as const,
}))

const iconProps = computed(() => ({
  ...useUi({
    base: { class: markerIconVariants() },
    ui: props.ui?.icon?.(),
    exclude: markerUiExclude.icon,
  }),
  name: props.icon!,
}))

const labelProps = computed(() =>
  useUi({
    base: { class: markerLabelVariants({ shimmer: props.shimmer }) },
    ui: props.ui?.label?.(),
    exclude: markerUiExclude.label,
  }),
)

const rootProps = computed(() =>
  useUi({
    base: [
      {
        class: markerVariants({
          variant: oneOf(props.variant, markerVariantNames, markerDefaults.variant),
        }),
      },
      attrs,
    ],
    ui: props.ui?.root?.(),
    exclude: markerUiExclude.root,
  }),
)
</script>

<template>
  <component :is="as" data-ui="marker-root" v-bind="rootProps">
    <span v-if="hasLeading" data-ui="marker-leading" v-bind="leadingProps">
      <slot v-if="loading" name="loading">
        <Icon data-ui="marker-loading-icon" v-bind="loadingIconProps" />
      </slot>
      <slot v-else name="icon">
        <Icon v-if="icon" data-ui="marker-icon" v-bind="iconProps" />
      </slot>
    </span>
    <span v-if="hasLabel" data-ui="marker-label" v-bind="labelProps">
      <slot>{{ label }}</slot>
    </span>
  </component>
</template>
