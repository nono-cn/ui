<script setup lang="ts">
import { createTooltipController } from '@ui-sdk/core/tooltip'
import {
  Tooltip as TooltipRoot,
  TooltipArrow,
  TooltipContent,
  TooltipShortcut,
  TooltipTrigger,
} from '@ui-sdk/vue/tooltip'
import {
  cloneVNode,
  Comment,
  computed,
  Fragment,
  Text,
  type FunctionalComponent,
  type VNode,
} from 'vue'
import Kbd from '@/components/Kbd/Kbd.vue'
import { getRadiusVariables, oneOf } from '@/composables/useTheme'
import { useUi } from '@/composables/useUi'
import {
  tooltipAligns,
  tooltipDefaults,
  tooltipSides,
  tooltipTypes,
} from '@/components/Tooltip/constants'
import type {
  TooltipArrowState,
  TooltipContentState,
  TooltipEmits,
  TooltipExpose,
  TooltipOpenChangeDetails,
  TooltipProps,
  TooltipSlots,
} from '@/components/Tooltip/types'
import {
  tooltipArrowVariants,
  tooltipContentVariants,
  tooltipTextVariants,
} from '@/components/Tooltip/variants'

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

function elementOf(value: unknown): Element | null {
  let node = (value as { $el?: Node } | null)?.$el ?? (value as Node | null)
  while (node && !(node instanceof Element)) node = node.nextSibling
  return node
}

type ElementRef = (el: Element | null) => void

const elementRefs = new WeakMap<ElementRef, (value: unknown) => void>()

/* A component's $el can be a fragment's text node, and ui-sdk needs the element to position against. */
function elementRef(ref: ElementRef) {
  let wrapped = elementRefs.get(ref)
  if (!wrapped) {
    wrapped = (value) => ref(elementOf(value))
    elementRefs.set(ref, wrapped)
  }
  return wrapped
}

function firstElement(nodes: VNode[]): VNode | undefined {
  for (const node of nodes) {
    if (node.type === Fragment) {
      const child = firstElement(node.children as VNode[])
      if (child) return child
    } else if (node.type !== Comment && node.type !== Text) {
      return node
    }
  }
}

const SlotTrigger: FunctionalComponent<{ attrs: Record<string, unknown> }> = (
  { attrs },
  { slots },
) => {
  const child = firstElement(slots.default?.() ?? [])
  if (!child) return null
  const props = { ...attrs }
  delete props.type
  props.ref = elementRef(props.ref as ElementRef)
  return cloneVNode(child, props, true)
}
SlotTrigger.props = ['attrs']

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
  return useUi(
    [
      {
        class: tooltipContentVariants(),
        style: getRadiusVariables(props.radius, 'tooltip', tooltipDefaults.radius),
      },
      attrs,
    ],
    props.ui?.content?.(state),
  )
}

function textProps(state: TooltipContentState) {
  return useUi({ class: tooltipTextVariants() }, props.ui?.text?.(state))
}

function shortcutProps(attrs: Record<string, unknown>, state: TooltipContentState) {
  return useUi(attrs, props.ui?.shortcut?.(state))
}

function arrowProps(state: TooltipArrowState) {
  return useUi({ class: tooltipArrowVariants() }, props.ui?.arrow?.(state))
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
        <SlotTrigger :attrs="attrs">
          <slot v-bind="state" />
        </SlotTrigger>
      </template>
    </TooltipTrigger>
    <TooltipContent v-bind="positionProps">
      <template #render="{ props: attrs, state, children }">
        <div data-ui="tooltip-content" v-bind="contentProps(attrs, state)">
          <component :is="children" />
        </div>
      </template>
      <template #default="{ state }">
        <slot name="content" :open="state.open" :instant="state.instant">
          <span v-if="text" data-ui="tooltip-text" v-bind="textProps(state)">{{ text }}</span>
        </slot>
        <TooltipShortcut v-if="shortcut">
          <template #render="{ props: attrs, state: shortcutState }">
            <Kbd
              data-ui="tooltip-shortcut"
              size="sm"
              :label="shortcutState.text"
              v-bind="shortcutProps(attrs, state)"
            />
          </template>
        </TooltipShortcut>
        <TooltipArrow v-if="arrow" data-ui="tooltip-arrow" v-bind="arrowProps(state)" />
      </template>
    </TooltipContent>
  </TooltipRoot>
</template>
