<script setup lang="ts">
import { createTooltipController } from '@ui-sdk/core/tooltip'
import {
  Tooltip as TooltipRoot,
  TooltipArrow,
  TooltipContent,
  TooltipShortcut,
  TooltipTrigger,
} from '@ui-sdk/vue/tooltip'
import { computed } from 'vue'
import Kbd from '@/components/Kbd/Kbd.vue'
import AsChild from '@/components/AsChild/AsChild'
import { getRadiusVariables, oneOf } from '@/composables/useTheme'
import { useUi } from '@/composables/useUi'
import {
  tooltipAligns,
  tooltipDefaults,
  tooltipSides,
  tooltipTypes,
} from '@/components/Tooltip/constants'
import type {
  TooltipContentState,
  TooltipEmits,
  TooltipExpose,
  TooltipOpenChangeDetails,
  TooltipProps,
  TooltipSlots,
} from '@/components/Tooltip/types'
import { tooltipArrowVariants, tooltipContentVariants } from '@/components/Tooltip/variants'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<TooltipProps>(), {
  open: undefined,
  defaultOpen: false,
  disabled: false,
  toggleable: false,
  closeOnPress: true,
  side: tooltipDefaults.side,
  align: tooltipDefaults.align,
  arrow: tooltipDefaults.arrow,
  radius: tooltipDefaults.radius,
  anchor: undefined,
  container: undefined,
})

const emit = defineEmits<TooltipEmits>()
defineSlots<TooltipSlots>()

const controller = createTooltipController()

const rootProps = computed(() => ({
  open: props.open,
  defaultOpen: props.defaultOpen,
  delay: props.delay,
  closeDelay: props.closeDelay,
  disabled: props.disabled,
  toggleable: props.toggleable,
  closeOnPress: props.closeOnPress,
  type: props.type && oneOf(props.type, tooltipTypes, 'description'),
  shortcut: props.shortcut || undefined,
  container: props.container,
  controller,
  'onUpdate:open': (open: boolean) => emit('update:open', open),
  onOpenChange: (open: boolean, details: TooltipOpenChangeDetails) =>
    emit('openChange', open, details),
  onOpenChangeComplete: (open: boolean) => emit('openChangeComplete', open),
}))

function triggerProps(attrs: Record<string, unknown>) {
  return { ...attrs, type: undefined }
}

const positionProps = computed(() => ({
  side: oneOf(props.side, tooltipSides, tooltipDefaults.side),
  align: oneOf(props.align, tooltipAligns, tooltipDefaults.align),
  sideOffset: props.sideOffset ?? (props.arrow ? 8 : 4),
  alignOffset: props.alignOffset,
  collisionPadding: props.collisionPadding,
  arrowPadding: props.arrowPadding,
  anchor: props.anchor,
}))

function contentProps(attrs: Record<string, unknown>, state: TooltipContentState) {
  return useUi({
    base: [
      {
        class: tooltipContentVariants(),
        style: getRadiusVariables(props.radius, 'tooltip', tooltipDefaults.radius),
      },
      attrs,
    ],
    ui: props.ui?.content?.(state),
  })
}

function shortcutProps(attrs: Record<string, unknown>, state: TooltipContentState) {
  return useUi({ base: attrs, ui: props.ui?.shortcut?.(state) })
}

function arrowProps(state: TooltipContentState) {
  return useUi({ base: { class: tooltipArrowVariants() }, ui: props.ui?.arrow?.(state) })
}

defineExpose<TooltipExpose>({
  setOpen: (open, options) => controller.setOpen(open, options),
  close: (options) => controller.close(options),
  toggle: (options) => controller.toggle(options),
  isOpen: () => controller.isOpen(),
  focus: () => controller.focus(),
})
</script>

<template>
  <TooltipRoot v-bind="rootProps">
    <TooltipTrigger>
      <template #render="{ props: attrs, state }">
        <AsChild v-bind="triggerProps(attrs)">
          <slot v-bind="state" />
        </AsChild>
      </template>
    </TooltipTrigger>
    <TooltipContent v-bind="positionProps">
      <template #render="{ props: attrs, state, children }">
        <div data-ui="tooltip-content" v-bind="contentProps(attrs, state)">
          <component :is="children" />
        </div>
      </template>
      <template #default="{ state }">
        <slot name="content" :open="state.open">
          {{ text }}
        </slot>
        <TooltipShortcut v-if="shortcut">
          <template #render="{ props: attrs, state: shortcutState }">
            <AsChild data-ui="tooltip-shortcut" v-bind="shortcutProps(attrs, state)">
              <slot name="shortcut" :text="shortcutState.text">
                <Kbd size="sm" :shortcut="shortcut" />
              </slot>
            </AsChild>
          </template>
        </TooltipShortcut>
        <TooltipArrow v-if="arrow" data-ui="tooltip-arrow" v-bind="arrowProps(state)" />
      </template>
    </TooltipContent>
  </TooltipRoot>
</template>
