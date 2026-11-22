<script setup lang="ts">
import { createHoverCardController } from '@ui-sdk/core/hover-card'
import {
  HoverCard as HoverCardRoot,
  HoverCardArrow,
  HoverCardContent,
  HoverCardTrigger,
} from '@ui-sdk/vue/hover-card'
import { computed } from 'vue'
import { getRadiusVariables, oneOf } from '@/composables/useTheme'
import { useUi } from '@/composables/useUi'
import {
  hoverCardAligns,
  hoverCardDefaults,
  hoverCardSides,
} from '@/components/HoverCard/constants'
import type {
  HoverCardContentState,
  HoverCardEmits,
  HoverCardExpose,
  HoverCardOpenChangeDetails,
  HoverCardProps,
  HoverCardSlots,
  HoverCardTriggerState,
} from '@/components/HoverCard/types'
import {
  hoverCardArrowVariants,
  hoverCardContentVariants,
  hoverCardTriggerVariants,
} from '@/components/HoverCard/variants'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<HoverCardProps>(), {
  open: undefined,
  defaultOpen: false,
  disabled: false,
  side: hoverCardDefaults.side,
  align: hoverCardDefaults.align,
  keepMounted: false,
  arrow: hoverCardDefaults.arrow,
  radius: hoverCardDefaults.radius,
  anchor: undefined,
  container: undefined,
})

const emit = defineEmits<HoverCardEmits>()
defineSlots<HoverCardSlots>()

const controller = createHoverCardController()

const rootProps = computed(() => ({
  open: props.open,
  defaultOpen: props.defaultOpen,
  delay: props.delay,
  closeDelay: props.closeDelay,
  disabled: props.disabled,
  container: props.container,
  controller,
  'onUpdate:open': (open: boolean) => emit('update:open', open),
  onOpenChange: (open: boolean, details: HoverCardOpenChangeDetails) =>
    emit('openChange', open, details),
  onOpenChangeComplete: (open: boolean) => emit('openChangeComplete', open),
}))

function triggerProps(attrs: Record<string, unknown>, state: HoverCardTriggerState) {
  return useUi([{ class: hoverCardTriggerVariants() }, attrs], props.ui?.trigger?.(state))
}

const positionProps = computed(() => ({
  side: oneOf(props.side, hoverCardSides, hoverCardDefaults.side),
  align: oneOf(props.align, hoverCardAligns, hoverCardDefaults.align),
  sideOffset: props.sideOffset ?? (props.arrow ? 8 : 4),
  alignOffset: props.alignOffset,
  collisionPadding: props.collisionPadding,
  arrowPadding: props.arrowPadding,
  anchor: props.anchor,
  keepMounted: props.keepMounted,
}))

function contentProps(attrs: Record<string, unknown>, state: HoverCardContentState) {
  return useUi(
    [
      {
        class: hoverCardContentVariants(),
        style: getRadiusVariables(props.radius, 'hover-card', hoverCardDefaults.radius),
      },
      attrs,
    ],
    props.ui?.content?.(state),
  )
}

function arrowProps(state: HoverCardContentState) {
  return useUi({ class: hoverCardArrowVariants() }, props.ui?.arrow?.(state))
}

defineExpose<HoverCardExpose>({
  setOpen: (open, options) => controller.setOpen(open, options),
  close: (options) => controller.close(options),
  toggle: (options) => controller.toggle(options),
  isOpen: () => controller.isOpen(),
  focus: () => controller.focus(),
})
</script>

<template>
  <HoverCardRoot v-bind="rootProps">
    <HoverCardTrigger>
      <template #render="{ props: attrs, state }">
        <span data-ui="hover-card-trigger" v-bind="triggerProps(attrs, state)">
          <slot v-bind="state" />
        </span>
      </template>
    </HoverCardTrigger>
    <HoverCardContent v-bind="positionProps">
      <template #render="{ props: attrs, state, children }">
        <div data-ui="hover-card-content" v-bind="contentProps(attrs, state)">
          <component :is="children" />
        </div>
      </template>
      <template #default="{ state }">
        <slot name="content" :open="state.open" />
        <HoverCardArrow v-if="arrow" data-ui="hover-card-arrow" v-bind="arrowProps(state)" />
      </template>
    </HoverCardContent>
  </HoverCardRoot>
</template>
