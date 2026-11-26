<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { getColorVariables, getRadiusVariables, oneOf } from '@/composables/useTheme'
import { useUi } from '@/composables/useUi'
import {
  iconTileDefaults,
  iconTileSizes,
  iconTileVariantNames,
} from '@/components/IconTile/constants'
import type { IconTileProps, IconTileSlots } from '@/components/IconTile/types'
import { iconTileIconVariants, iconTileVariants } from '@/components/IconTile/variants'
import Icon from '@/components/Icon/Icon.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<IconTileProps>(), {
  variant: iconTileDefaults.variant,
  color: iconTileDefaults.color,
  size: iconTileDefaults.size,
  radius: iconTileDefaults.radius,
})

defineSlots<IconTileSlots>()
const attrs = useAttrs()

const size = computed(() => oneOf(props.size, iconTileSizes, iconTileDefaults.size))

const iconProps = computed(() => ({
  ...useUi({ base: { class: iconTileIconVariants({ size: size.value }) }, ui: props.ui?.icon?.() }),
  name: props.icon!,
}))

const rootProps = computed(() =>
  useUi({
    base: [
      {
        class: iconTileVariants({
          size: size.value,
          variant: oneOf(props.variant, iconTileVariantNames, iconTileDefaults.variant),
        }),
        style: [
          getColorVariables(props.color, 'icon-tile', iconTileDefaults.color),
          getRadiusVariables(props.radius, 'icon-tile', iconTileDefaults.radius),
        ],
      },
      attrs,
    ],
    ui: props.ui?.root?.(),
  }),
)
</script>

<template>
  <span data-ui="icon-tile-root" v-bind="rootProps">
    <slot>
      <Icon v-if="icon" data-ui="icon-tile-icon" v-bind="iconProps" />
    </slot>
  </span>
</template>
