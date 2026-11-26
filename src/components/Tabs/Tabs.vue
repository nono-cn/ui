<script setup lang="ts">
import type { TabsState } from '@ui-sdk/core/tabs'
import {
  createTabsController,
  Tabs as TabsRoot,
  TabsIndicator,
  TabsList,
  TabsPanel,
  TabsTab,
} from '@ui-sdk/vue/tabs'
import { computed, useAttrs } from 'vue'
import { getColorVariables, getRadiusVariables, oneOf } from '@/composables/useTheme'
import { useUi } from '@/composables/useUi'
import {
  tabsActivations,
  tabsDefaults,
  tabsOrientations,
  tabsSizes,
  tabsVariantNames,
} from '@/components/Tabs/constants'
import { tabsUiExclude } from '@/components/Tabs/exclude'
import type {
  TabsEmits,
  TabsExpose,
  TabsItem,
  TabsItemContext,
  TabsProps,
  TabsSlots,
  TabsValueChangeDetails,
} from '@/components/Tabs/types'
import {
  tabsIconVariants,
  tabsIndicatorVariants,
  tabsListVariants,
  tabsPanelVariants,
  tabsLeadingVariants,
  tabsTrailingVariants,
  tabsTabVariants,
  tabsVariants,
} from '@/components/Tabs/variants'
import Icon from '@/components/Icon/Icon.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<TabsProps>(), {
  items: () => [],
  modelValue: undefined,
  defaultValue: undefined,
  orientation: tabsDefaults.orientation,
  activation: tabsDefaults.activation,
  loop: undefined,
  content: tabsDefaults.content,
  keepMounted: tabsDefaults.keepMounted,
  hiddenUntilFound: undefined,
  variant: tabsDefaults.variant,
  color: tabsDefaults.color,
  size: tabsDefaults.size,
  radius: tabsDefaults.radius,
})

const emit = defineEmits<TabsEmits>()
const slots = defineSlots<TabsSlots>()
const attrs = useAttrs()
const controller = createTabsController()

const orientation = computed(() =>
  oneOf(props.orientation, tabsOrientations, tabsDefaults.orientation),
)
const variant = computed(() => oneOf(props.variant, tabsVariantNames, tabsDefaults.variant))
const size = computed(() => oneOf(props.size, tabsSizes, tabsDefaults.size))

const rootProps = computed(() => ({
  ...useUi({
    base: [
      {
        class: tabsVariants({ orientation: orientation.value }),
        style: [
          getColorVariables(props.color, 'tabs', tabsDefaults.color),
          getRadiusVariables(props.radius, 'tabs', tabsDefaults.radius),
        ],
      },
      attrs,
    ],
    ui: props.ui?.root?.(),
    exclude: tabsUiExclude.root,
  }),
  value: props.modelValue,
  defaultValue: props.defaultValue,
  'onUpdate:value': (value: string | null) => emit('update:modelValue', value),
  onValueChange: (value: string | null, details: TabsValueChangeDetails) =>
    emit('valueChange', value, details),
  orientation: orientation.value,
  activation: oneOf(props.activation, tabsActivations, tabsDefaults.activation),
  loop: props.loop,
  hiddenUntilFound: props.hiddenUntilFound,
  controller,
}))

const listProps = computed(() =>
  useUi({
    base: {
      class: tabsListVariants({ variant: variant.value, orientation: orientation.value }),
    },
    ui: props.ui?.list?.(),
    exclude: tabsUiExclude.list,
  }),
)

const indicatorProps = computed(() =>
  useUi({
    base: {
      class: tabsIndicatorVariants({ variant: variant.value, orientation: orientation.value }),
    },
    ui: props.ui?.indicator?.(),
    exclude: tabsUiExclude.indicator,
  }),
)

const leadingProps = computed(() => ({ class: tabsLeadingVariants({ size: size.value }) }))

const trailingProps = computed(() => ({ class: tabsTrailingVariants({ size: size.value }) }))

function itemContexts(state: TabsState): TabsItemContext[] {
  return props.items.map((item, index) => ({
    item,
    index,
    selected: state.value === item.value,
    disabled: Boolean(item.disabled),
  }))
}

function hasLeading({ item }: TabsItemContext) {
  return Boolean(item.icon || slots.leading)
}

function hasTrailing({ item }: TabsItemContext) {
  return Boolean(item.trailingIcon || slots.trailing)
}

function hasLabel({ item }: TabsItemContext) {
  return Boolean(item.label || slots.label)
}

function panelSlot(item: TabsItem) {
  const name = `item-${item.slot}` as const
  return item.slot && slots[name] ? name : 'content'
}

function tabProps(context: TabsItemContext) {
  return {
    ...useUi({
      base: {
        class: tabsTabVariants({
          variant: variant.value,
          orientation: orientation.value,
          size: size.value,
        }),
      },
      ui: props.ui?.tab?.(context),
      exclude: tabsUiExclude.tab,
    }),
    value: context.item.value,
    disabled: context.item.disabled,
  }
}

function leadingIconProps(context: TabsItemContext) {
  return {
    ...useUi({
      base: { class: tabsIconVariants() },
      ui: props.ui?.leadingIcon?.(context),
      exclude: tabsUiExclude.leadingIcon,
    }),
    name: context.item.icon!,
  }
}

function labelProps(context: TabsItemContext) {
  return useUi({
    base: {},
    ui: props.ui?.label?.(context),
    exclude: tabsUiExclude.label,
  })
}

function trailingIconProps(context: TabsItemContext) {
  return {
    ...useUi({
      base: { class: tabsIconVariants() },
      ui: props.ui?.trailingIcon?.(context),
      exclude: tabsUiExclude.trailingIcon,
    }),
    name: context.item.trailingIcon!,
  }
}

function panelProps(context: TabsItemContext) {
  return {
    ...useUi({
      base: { class: tabsPanelVariants({ orientation: orientation.value }) },
      ui: props.ui?.panel?.(context),
      exclude: tabsUiExclude.panel,
    }),
    value: context.item.value,
    keepMounted: props.keepMounted,
  }
}

defineExpose<TabsExpose>({
  getValue: () => controller.getValue(),
  setValue: (value, options) => controller.setValue(value, options),
  select: (value, options) => controller.select(value, options),
  focus: () => controller.focus(),
})
</script>

<template>
  <TabsRoot data-ui="tabs-root" v-bind="rootProps">
    <template #default="{ state }">
      <TabsList data-ui="tabs-list" v-bind="listProps">
        <TabsTab
          v-for="context in itemContexts(state)"
          :key="context.item.value"
          data-ui="tabs-tab"
          v-bind="tabProps(context)"
        >
          <span v-if="hasLeading(context)" data-ui="tabs-leading" v-bind="leadingProps">
            <slot name="leading" v-bind="context">
              <Icon
                v-if="context.item.icon"
                data-ui="tabs-leading-icon"
                v-bind="leadingIconProps(context)"
              />
            </slot>
          </span>
          <span v-if="hasLabel(context)" data-ui="tabs-label" v-bind="labelProps(context)">
            <slot name="label" v-bind="context">{{ context.item.label }}</slot>
          </span>
          <span v-if="hasTrailing(context)" data-ui="tabs-trailing" v-bind="trailingProps">
            <slot name="trailing" v-bind="context">
              <Icon
                v-if="context.item.trailingIcon"
                data-ui="tabs-trailing-icon"
                v-bind="trailingIconProps(context)"
              />
            </slot>
          </span>
        </TabsTab>
        <TabsIndicator data-ui="tabs-indicator" v-bind="indicatorProps" />
      </TabsList>
      <template v-if="content">
        <TabsPanel
          v-for="context in itemContexts(state)"
          :key="context.item.value"
          data-ui="tabs-panel"
          v-bind="panelProps(context)"
        >
          <slot :name="panelSlot(context.item)" v-bind="context">
            {{ context.item.content }}
          </slot>
        </TabsPanel>
      </template>
    </template>
  </TabsRoot>
</template>
