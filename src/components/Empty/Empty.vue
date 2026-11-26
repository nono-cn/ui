<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { getRadiusVariables, oneOf } from '@/composables/useTheme'
import { useUi } from '@/composables/useUi'
import { emptyDefaults, emptySizes, emptyVariantNames } from '@/components/Empty/constants'
import type { EmptyProps, EmptySize, EmptySlots } from '@/components/Empty/types'
import {
  emptyContentVariants,
  emptyDescriptionVariants,
  emptyHeaderVariants,
  emptyLabelVariants,
  emptyMediaVariants,
  emptyVariants,
} from '@/components/Empty/variants'
import IconTile from '@/components/IconTile/IconTile.vue'
import type { IconTileSize } from '@/components/IconTile/types'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<EmptyProps>(), {
  variant: emptyDefaults.variant,
  size: emptyDefaults.size,
  radius: emptyDefaults.radius,
})

const slots = defineSlots<EmptySlots>()
const attrs = useAttrs()

const iconTileSizes = { sm: 'md', md: 'lg', lg: 'xl' } satisfies Record<EmptySize, IconTileSize>

const size = computed(() => oneOf(props.size, emptySizes, emptyDefaults.size))
const hasMedia = computed(() => Boolean(props.icon || slots.media))
const hasLabel = computed(() => Boolean(props.label || slots.label))
const hasDescription = computed(() => Boolean(props.description || slots.description))
const hasHeader = computed(() => hasMedia.value || hasLabel.value || hasDescription.value)

const headerProps = computed(() =>
  useUi({ base: { class: emptyHeaderVariants({ size: size.value }) }, ui: props.ui?.header?.() }),
)

const mediaProps = computed(() =>
  useUi({ base: { class: emptyMediaVariants({ size: size.value }) }, ui: props.ui?.media?.() }),
)

const iconProps = computed(() => ({
  ...useUi({ base: {}, ui: props.ui?.icon?.() }),
  icon: props.icon,
  size: iconTileSizes[size.value],
}))

const labelProps = computed(() =>
  useUi({ base: { class: emptyLabelVariants({ size: size.value }) }, ui: props.ui?.label?.() }),
)

const descriptionProps = computed(() =>
  useUi({
    base: { class: emptyDescriptionVariants({ size: size.value }) },
    ui: props.ui?.description?.(),
  }),
)

const contentProps = computed(() =>
  useUi({ base: { class: emptyContentVariants() }, ui: props.ui?.content?.() }),
)

const rootProps = computed(() =>
  useUi({
    base: [
      {
        class: emptyVariants({
          size: size.value,
          variant: oneOf(props.variant, emptyVariantNames, emptyDefaults.variant),
        }),
        style: getRadiusVariables(props.radius, 'empty', emptyDefaults.radius),
      },
      attrs,
    ],
    ui: props.ui?.root?.(),
  }),
)
</script>

<template>
  <div data-ui="empty-root" v-bind="rootProps">
    <div v-if="hasHeader" data-ui="empty-header" v-bind="headerProps">
      <div v-if="hasMedia" data-ui="empty-media" v-bind="mediaProps">
        <slot name="media">
          <IconTile data-ui="empty-icon" v-bind="iconProps" />
        </slot>
      </div>
      <div v-if="hasLabel" data-ui="empty-label" v-bind="labelProps">
        <slot name="label">{{ label }}</slot>
      </div>
      <div v-if="hasDescription" data-ui="empty-description" v-bind="descriptionProps">
        <slot name="description">{{ description }}</slot>
      </div>
    </div>
    <div v-if="slots.default" data-ui="empty-content" v-bind="contentProps">
      <slot />
    </div>
  </div>
</template>
