import { Tabs as TabsRoot, TabsIndicator, TabsList, TabsPanel, TabsTab } from '@ui-sdk/vue/tabs'
import { propsOf } from '@/composables/useUi'
import type { TabsUi } from '@/components/Tabs/types'
import Icon from '@/components/Icon/Icon.vue'

export const tabsUiExclude = {
  root: propsOf(TabsRoot),
  list: propsOf(TabsList),
  indicator: propsOf(TabsIndicator),
  tab: propsOf(TabsTab),
  leadingIcon: propsOf(Icon),
  label: [],
  trailingIcon: propsOf(Icon),
  panel: propsOf(TabsPanel),
} satisfies Record<keyof TabsUi, readonly string[]>
