<script setup lang="ts">
import { formatShortcut } from '@ui-sdk/core'
import { createPopoverController } from '@ui-sdk/core/popover'
import {
  Popover as PopoverRoot,
  PopoverArrow,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from '@ui-sdk/vue/popover'
import { computed } from 'vue'
import AsChild from '@/components/AsChild/AsChild'
import { getRadiusVariables, oneOf } from '@/composables/useTheme'
import { useUi } from '@/composables/useUi'
import { popoverAligns, popoverDefaults, popoverSides } from '@/components/Popover/constants'
import type {
  PopoverContentState,
  PopoverDismissAttemptDetails,
  PopoverEmits,
  PopoverExpose,
  PopoverOpenChangeDetails,
  PopoverProps,
  PopoverSlots,
} from '@/components/Popover/types'
import {
  popoverArrowVariants,
  popoverContentVariants,
  popoverDescriptionVariants,
  popoverLabelVariants,
} from '@/components/Popover/variants'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<PopoverProps>(), {
  open: undefined,
  defaultOpen: undefined,
  modal: popoverDefaults.modal,
  dismissible: true,
  disabled: false,
  openOnHover: false,
  side: popoverDefaults.side,
  align: popoverDefaults.align,
  anchor: undefined,
  container: undefined,
  keepMounted: false,
  arrow: popoverDefaults.arrow,
  radius: popoverDefaults.radius,
})

const emit = defineEmits<PopoverEmits>()
const slots = defineSlots<PopoverSlots>()

const controller = createPopoverController()

const hasLabel = computed(() => Boolean(props.label || slots.label))
const hasDescription = computed(() => Boolean(props.description || slots.description))
const shortcutText = computed(() => (props.shortcut ? formatShortcut(props.shortcut) : ''))

const rootProps = computed(() => ({
  open: props.open,
  defaultOpen: props.defaultOpen,
  modal: props.modal,
  dismissible: props.dismissible,
  openOnHover: props.openOnHover,
  delay: props.delay,
  closeDelay: props.closeDelay,
  container: props.container,
  controller,
  'onUpdate:open': (open: boolean) => emit('update:open', open),
  onOpenChange: (open: boolean, details: PopoverOpenChangeDetails) =>
    emit('openChange', open, details),
  onOpenChangeComplete: (open: boolean) => emit('openChangeComplete', open),
  onDismissAttempt: (details: PopoverDismissAttemptDetails) => emit('dismissAttempt', details),
}))

const triggerPartProps = computed(() => ({
  disabled: props.disabled,
  shortcut: props.shortcut || undefined,
}))

function triggerProps(attrs: Record<string, unknown>) {
  return { ...attrs, type: undefined }
}

const contentPartProps = computed(() => ({
  side: oneOf(props.side, popoverSides, popoverDefaults.side),
  align: oneOf(props.align, popoverAligns, popoverDefaults.align),
  sideOffset: props.sideOffset ?? (props.arrow ? 8 : 4),
  alignOffset: props.alignOffset,
  collisionPadding: props.collisionPadding,
  arrowPadding: props.arrowPadding,
  anchor: props.anchor,
  initialFocus: props.initialFocus,
  finalFocus: props.finalFocus,
  keepMounted: props.keepMounted,
}))

function contentProps(attrs: Record<string, unknown>, state: PopoverContentState) {
  return useUi(
    [
      {
        class: popoverContentVariants(),
        style: getRadiusVariables(props.radius, 'popover', popoverDefaults.radius),
      },
      attrs,
    ],
    props.ui?.content?.(state),
  )
}

function labelProps(state: PopoverContentState) {
  return useUi({ class: popoverLabelVariants() }, props.ui?.label?.(state))
}

function descriptionProps(state: PopoverContentState) {
  return useUi({ class: popoverDescriptionVariants() }, props.ui?.description?.(state))
}

function arrowProps(state: PopoverContentState) {
  return useUi({ class: popoverArrowVariants() }, props.ui?.arrow?.(state))
}

function close() {
  controller.close({ reason: 'close-press' })
}

defineExpose<PopoverExpose>({
  setOpen: (open, options) => controller.setOpen(open, options),
  close: (options) => controller.close(options),
  toggle: (options) => controller.toggle(options),
  isOpen: () => controller.isOpen(),
  focus: () => controller.focus(),
})
</script>

<template>
  <PopoverRoot v-bind="rootProps">
    <PopoverTrigger v-bind="triggerPartProps">
      <template #render="{ props: attrs, state }">
        <AsChild v-bind="triggerProps(attrs)">
          <slot v-bind="state" :shortcut="shortcutText" />
        </AsChild>
      </template>
    </PopoverTrigger>
    <PopoverContent v-bind="contentPartProps">
      <template #render="{ props: attrs, state, children }">
        <div data-ui="popover-content" v-bind="contentProps(attrs, state)">
          <component :is="children" />
        </div>
      </template>
      <template #default="{ state }">
        <PopoverTitle v-if="hasLabel" data-ui="popover-label" v-bind="labelProps(state)">
          <slot name="label">{{ label }}</slot>
        </PopoverTitle>
        <PopoverDescription
          v-if="hasDescription"
          data-ui="popover-description"
          v-bind="descriptionProps(state)"
        >
          <slot name="description">{{ description }}</slot>
        </PopoverDescription>
        <slot name="content" :open="state.open" :close="close" />
        <PopoverArrow v-if="arrow" data-ui="popover-arrow" v-bind="arrowProps(state)" />
      </template>
    </PopoverContent>
  </PopoverRoot>
</template>
