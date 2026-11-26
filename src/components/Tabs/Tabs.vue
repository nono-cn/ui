<script setup lang="ts">
import type { TabsState } from '@ui-sdk/core/tabs'
import {
  createTabsController,
  Tabs as TabsRoot,
  TabsIndicator,
  TabsList,
  TabsPanel,
  TabsTab,
  TabsTabIcon,
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
  TabsItemState,
  TabsProps,
  TabsSlots,
  TabsValueChangeDetails,
} from '@/components/Tabs/types'
import {
  tabsIconVariants,
  tabsIndicatorVariants,
  tabsLabelVariants,
  tabsListVariants,
  tabsPanelVariants,
  tabsSlotVariants,
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

const slotProps = computed(() => ({ class: tabsSlotVariants({ size: size.value }) }))

function itemStates(state: TabsState): TabsItemState[] {
  return props.items.map((item, index) => ({
    item,
    index,
    selected: state.value === item.value,
    disabled: Boolean(item.disabled),
  }))
}

function hasLeading({ item }: TabsItemState) {
  return Boolean(item.icon || slots.leading)
}

function hasTrailing({ item }: TabsItemState) {
  return Boolean(item.trailingIcon || slots.trailing)
}

function panelSlot(item: TabsItem) {
  return item.slot && slots[item.slot] ? item.slot : 'content'
}

function tabProps(itemState: TabsItemState) {
  return {
    ...useUi({
      base: {
        class: tabsTabVariants({
          variant: variant.value,
          orientation: orientation.value,
          size: size.value,
        }),
      },
      ui: props.ui?.tab?.(itemState),
      exclude: tabsUiExclude.tab,
    }),
    value: itemState.item.value,
    disabled: itemState.item.disabled,
  }
}

function leadingIconProps(itemState: TabsItemState) {
  return {
    ...useUi({
      base: { class: tabsIconVariants() },
      ui: props.ui?.leadingIcon?.(itemState),
      exclude: tabsUiExclude.leadingIcon,
    }),
    name: itemState.item.icon!,
  }
}

function labelProps(itemState: TabsItemState) {
  return useUi({
    base: { class: tabsLabelVariants() },
    ui: props.ui?.label?.(itemState),
    exclude: tabsUiExclude.label,
  })
}

function trailingIconProps(itemState: TabsItemState) {
  return {
    ...useUi({
      base: { class: tabsIconVariants() },
      ui: props.ui?.trailingIcon?.(itemState),
      exclude: tabsUiExclude.trailingIcon,
    }),
    name: itemState.item.trailingIcon!,
  }
}

function panelProps(itemState: TabsItemState) {
  return {
    ...useUi({
      base: { class: tabsPanelVariants({ orientation: orientation.value }) },
      ui: props.ui?.panel?.(itemState),
      exclude: tabsUiExclude.panel,
    }),
    value: itemState.item.value,
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
          v-for="itemState in itemStates(state)"
          :key="itemState.item.value"
          data-ui="tabs-tab"
          v-bind="tabProps(itemState)"
        >
          <TabsTabIcon v-if="hasLeading(itemState)" data-ui="tabs-leading" v-bind="slotProps">
            <slot name="leading" v-bind="itemState">
              <Icon
                v-if="itemState.item.icon"
                data-ui="tabs-leading-icon"
                v-bind="leadingIconProps(itemState)"
              />
            </slot>
          </TabsTabIcon>
          <slot name="label" v-bind="itemState">
            <span v-if="itemState.item.label" data-ui="tabs-label" v-bind="labelProps(itemState)">
              {{ itemState.item.label }}
            </span>
          </slot>
          <span v-if="hasTrailing(itemState)" data-ui="tabs-trailing" v-bind="slotProps">
            <slot name="trailing" v-bind="itemState">
              <Icon
                v-if="itemState.item.trailingIcon"
                data-ui="tabs-trailing-icon"
                v-bind="trailingIconProps(itemState)"
              />
            </slot>
          </span>
        </TabsTab>
        <TabsIndicator data-ui="tabs-indicator" v-bind="indicatorProps" />
      </TabsList>
      <template v-if="content">
        <TabsPanel
          v-for="itemState in itemStates(state)"
          :key="itemState.item.value"
          data-ui="tabs-panel"
          v-bind="panelProps(itemState)"
        >
          <slot :name="panelSlot(itemState.item)" v-bind="itemState">
            {{ itemState.item.content }}
          </slot>
        </TabsPanel>
      </template>
    </template>
  </TabsRoot>
</template>
