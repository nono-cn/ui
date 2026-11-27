<script setup lang="ts">
import type { AccordionState } from '@ui-sdk/core/accordion'
import {
  AccordionHeader,
  AccordionItem as AccordionItemPart,
  AccordionPanel,
  Accordion as AccordionRoot,
  AccordionTrigger,
  createAccordionController,
} from '@ui-sdk/vue/accordion'
import { computed, useAttrs } from 'vue'
import { oneOf } from '@/composables/useTheme'
import { useUi } from '@/composables/useUi'
import {
  accordionDefaults,
  accordionIndicatorPositions,
  accordionVariantNames,
} from '@/components/Accordion/constants'
import { accordionUiExclude } from '@/components/Accordion/exclude'
import type {
  AccordionEmits,
  AccordionExpose,
  AccordionItem,
  AccordionItemContext,
  AccordionProps,
  AccordionSlots,
  AccordionValueChangeDetails,
} from '@/components/Accordion/types'
import {
  accordionBodyVariants,
  accordionHeaderVariants,
  accordionIconVariants,
  accordionIndicatorIconVariants,
  accordionItemVariants,
  accordionPanelVariants,
  accordionSlotVariants,
  accordionTriggerVariants,
  accordionVariants,
} from '@/components/Accordion/variants'
import Icon from '@/components/Icon/Icon.vue'
import type { IconName } from '@/icons'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<AccordionProps>(), {
  items: () => [],
  modelValue: undefined,
  defaultValue: undefined,
  multiple: accordionDefaults.multiple,
  collapsible: accordionDefaults.collapsible,
  disabled: accordionDefaults.disabled,
  keepMounted: accordionDefaults.keepMounted,
  hiddenUntilFound: undefined,
  variant: accordionDefaults.variant,
  indicatorIcon: undefined,
  openIndicatorIcon: undefined,
  indicatorPosition: accordionDefaults.indicatorPosition,
})

const emit = defineEmits<AccordionEmits>()
const slots = defineSlots<AccordionSlots>()
const attrs = useAttrs()
const controller = createAccordionController()

const variant = computed(() =>
  oneOf(props.variant, accordionVariantNames, accordionDefaults.variant),
)
const indicatorPosition = computed(() =>
  oneOf(props.indicatorPosition, accordionIndicatorPositions, accordionDefaults.indicatorPosition),
)

const rootProps = computed(() => ({
  ...useUi({
    base: [{ class: accordionVariants({ variant: variant.value }) }, attrs],
    ui: props.ui?.root?.(),
    exclude: accordionUiExclude.root,
  }),
  value: props.modelValue,
  defaultValue: props.defaultValue,
  'onUpdate:value': (value: string[]) => emit('update:modelValue', value),
  onValueChange: (value: string[], details: AccordionValueChangeDetails) =>
    emit('valueChange', value, details),
  multiple: props.multiple,
  collapsible: props.collapsible,
  disabled: props.disabled,
  keepMounted: props.keepMounted,
  hiddenUntilFound: props.hiddenUntilFound,
  controller,
}))

function valueOf(item: AccordionItem, index: number) {
  return item.value ?? String(index)
}

function itemContexts(state: AccordionState): AccordionItemContext[] {
  return props.items.map((item, index) => {
    const value = valueOf(item, index)
    return {
      item,
      index,
      value,
      open: state.value.includes(value),
      disabled: state.disabled || Boolean(item.disabled),
    }
  })
}

function hasLeading({ item }: AccordionItemContext) {
  return Boolean(item.icon || slots.leading)
}

function hasLabel({ item }: AccordionItemContext) {
  return Boolean(item.label || slots.label)
}

function hasTrailing({ item }: AccordionItemContext) {
  return Boolean(item.trailingIcon || slots.trailing)
}

function contentSlot(item: AccordionItem) {
  const name = `${item.slot}-content` as const
  return item.slot && slots[name] ? name : 'content'
}

function itemProps(context: AccordionItemContext) {
  return {
    ...useUi({
      base: { class: accordionItemVariants({ variant: variant.value }) },
      ui: props.ui?.item?.(context),
      exclude: accordionUiExclude.item,
    }),
    value: context.value,
    disabled: context.item.disabled,
  }
}

function headerProps(context: AccordionItemContext) {
  return useUi({
    base: { class: accordionHeaderVariants() },
    ui: props.ui?.header?.(context),
    exclude: accordionUiExclude.header,
  })
}

function triggerProps(context: AccordionItemContext) {
  return useUi({
    base: { class: accordionTriggerVariants({ variant: variant.value }) },
    ui: props.ui?.trigger?.(context),
    exclude: accordionUiExclude.trigger,
  })
}

const leadingProps = { class: accordionSlotVariants() }

const trailingProps = { class: accordionSlotVariants({ end: true }) }

const indicatorProps = computed(() => ({
  class: accordionSlotVariants({ end: indicatorPosition.value === 'end' }),
}))

function iconProps(
  context: AccordionItemContext,
  key: 'leadingIcon' | 'trailingIcon',
  name: IconName | undefined,
) {
  return {
    ...useUi({
      base: { class: accordionIconVariants() },
      ui: props.ui?.[key]?.(context),
      exclude: accordionUiExclude[key],
    }),
    name: name!,
  }
}

function indicatorName({ open }: AccordionItemContext): IconName {
  if (open && props.openIndicatorIcon) return props.openIndicatorIcon
  if (props.indicatorIcon) return props.indicatorIcon
  return accordionDefaults.indicatorIcon[indicatorPosition.value]
}

function indicatorRotation() {
  if (props.openIndicatorIcon) return 0
  return !props.indicatorIcon && indicatorPosition.value === 'start' ? 90 : 180
}

function indicatorIconProps(context: AccordionItemContext) {
  return {
    ...useUi({
      base: {
        class: accordionIndicatorIconVariants({
          rotation: indicatorRotation(),
          open: context.open,
        }),
      },
      ui: props.ui?.indicatorIcon?.(context),
      exclude: accordionUiExclude.indicatorIcon,
    }),
    name: indicatorName(context),
  }
}

function labelProps(context: AccordionItemContext) {
  return useUi({
    base: { class: 'flex-1 break-words' },
    ui: props.ui?.label?.(context),
    exclude: accordionUiExclude.label,
  })
}

function panelProps(context: AccordionItemContext) {
  return useUi({
    base: { class: accordionPanelVariants() },
    ui: props.ui?.panel?.(context),
    exclude: accordionUiExclude.panel,
  })
}

function bodyProps(context: AccordionItemContext) {
  return useUi({
    base: { class: accordionBodyVariants({ variant: variant.value }) },
    ui: props.ui?.body?.(context),
    exclude: accordionUiExclude.body,
  })
}

defineExpose<AccordionExpose>({
  getValue: () => controller.getValue(),
  setValue: (value, options) => controller.setValue(value, options),
  isOpen: (value) => controller.isOpen(value),
  open: (value, options) => controller.open(value, options),
  close: (value, options) => controller.close(value, options),
  toggle: (value, options) => controller.toggle(value, options),
  openAll: (options) => controller.openAll(options),
  closeAll: (options) => controller.closeAll(options),
  focus: (value) => controller.focus(value),
})
</script>

<template>
  <AccordionRoot data-ui="accordion-root" v-bind="rootProps">
    <template #default="{ state }">
      <AccordionItemPart
        v-for="context in itemContexts(state)"
        :key="context.value"
        data-ui="accordion-item"
        v-bind="itemProps(context)"
      >
        <AccordionHeader data-ui="accordion-header" v-bind="headerProps(context)">
          <AccordionTrigger data-ui="accordion-trigger" v-bind="triggerProps(context)">
            <span
              v-if="indicatorPosition === 'start'"
              data-ui="accordion-indicator"
              v-bind="indicatorProps"
            >
              <slot name="indicator" v-bind="context">
                <Icon data-ui="accordion-indicator-icon" v-bind="indicatorIconProps(context)" />
              </slot>
            </span>
            <span v-if="hasLeading(context)" data-ui="accordion-leading" v-bind="leadingProps">
              <slot name="leading" v-bind="context">
                <Icon
                  v-if="context.item.icon"
                  data-ui="accordion-leading-icon"
                  v-bind="iconProps(context, 'leadingIcon', context.item.icon)"
                />
              </slot>
            </span>
            <span v-if="hasLabel(context)" data-ui="accordion-label" v-bind="labelProps(context)">
              <slot name="label" v-bind="context">{{ context.item.label }}</slot>
            </span>
            <span v-if="hasTrailing(context)" data-ui="accordion-trailing" v-bind="trailingProps">
              <slot name="trailing" v-bind="context">
                <Icon
                  v-if="context.item.trailingIcon"
                  data-ui="accordion-trailing-icon"
                  v-bind="iconProps(context, 'trailingIcon', context.item.trailingIcon)"
                />
              </slot>
            </span>
            <span
              v-if="indicatorPosition === 'end'"
              data-ui="accordion-indicator"
              v-bind="indicatorProps"
            >
              <slot name="indicator" v-bind="context">
                <Icon data-ui="accordion-indicator-icon" v-bind="indicatorIconProps(context)" />
              </slot>
            </span>
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel data-ui="accordion-panel" v-bind="panelProps(context)">
          <div data-ui="accordion-body" v-bind="bodyProps(context)">
            <slot :name="contentSlot(context.item)" v-bind="context">
              {{ context.item.content }}
            </slot>
          </div>
        </AccordionPanel>
      </AccordionItemPart>
    </template>
  </AccordionRoot>
</template>
