import type { ComponentDocConfig, ExampleValue } from '@docs/config/component-docs'
import { withSource } from '@docs/config/component-docs'
import {
  Tabs,
  type TabsItemState,
  tabsActivations,
  tabsDefaults,
  tabsOrientations,
  tabsSizes,
  tabsVariantNames,
  themeColors,
  themeRadii,
} from '@nono/ui'

const booleans = ['false', 'true']
const variants = (value: readonly string[]) => value.map((item) => `'${item}'`).join(' | ')
const width = 'w-full max-w-md'

const itemState = `{
  item: TabsItem
  index: number
  selected: boolean
  disabled: boolean
}`

const settings: ExampleValue = [
  { value: 'account', label: 'Account', content: 'Update your name, photo and email address.' },
  { value: 'password', label: 'Password', content: 'Choose a new password of 12 characters.' },
  { value: 'billing', label: 'Billing', content: 'Change your plan and payment method.' },
]

const folders: ExampleValue = [
  { value: 'inbox', label: 'Inbox', icon: 'folder', content: '3 new messages this morning.' },
  { value: 'starred', label: 'Starred', icon: 'star', content: '12 starred conversations.' },
  { value: 'archive', label: 'Archive', icon: 'fileArchive', content: 'Archived mail stays here.' },
]

const withDisabled: ExampleValue = [
  { value: 'overview', label: 'Overview', content: 'Revenue and visitors of the last 30 days.' },
  { value: 'analytics', label: 'Analytics', content: 'Where visitors come from.' },
  {
    value: 'reports',
    label: 'Reports',
    content: 'Monthly reports come with the Pro plan.',
    disabled: true,
  },
]

const iconOnly: ExampleValue = [
  { value: 'Inbox', icon: 'folder', content: '3 new messages this morning.' },
  { value: 'Starred', icon: 'star', content: '12 starred conversations.' },
  { value: 'Archive', icon: 'fileArchive', content: 'Archived mail stays here.' },
]

const labelFromValue = withSource(
  "({ item }) => ({ 'aria-label': item.value })",
  ({ item }: TabsItemState) => ({ 'aria-label': item.value }),
)

function listLabel(label: string): ExampleValue {
  return withSource(`() => ({ 'aria-label': '${label}' })`, () => ({ 'aria-label': label }))
}

const tabs: ComponentDocConfig = {
  slug: 'tabs',
  title: 'Tabs',
  description: 'Layered panels of content, with one tab selected at a time.',
  component: Tabs,
  usage: [
    {
      title: 'Basic usage',
      description:
        'Pass the tabs as items, each with a unique value, a label and the content of its panel. Bind the selected value with v-model, or set defaultValue to leave it uncontrolled. Without either, the first enabled tab is selected.',
      props: () => ({
        items: settings,
        defaultValue: 'account',
        class: width,
        ui: { list: listLabel('Settings') },
      }),
    },
  ],
  examples: [
    {
      title: 'Variant and color',
      description:
        'pill fills the selected tab inside a muted track; link underlines it. The color is a palette token or a hexadecimal color for the marker and the focus ring.',
      controls: [
        {
          key: 'variant',
          label: 'Variant',
          type: 'select',
          options: tabsVariantNames,
          default: tabsDefaults.variant,
        },
        {
          key: 'color',
          label: 'Color',
          type: 'select',
          options: themeColors,
          default: tabsDefaults.color,
        },
      ],
      props: (state) => ({
        items: settings,
        variant: state.variant!,
        color: state.color!,
        class: width,
        ui: { list: listLabel('Settings') },
      }),
    },
    {
      title: 'Size and radius',
      description:
        'size sets the height, text and icons of every tab; radius rounds the track, marker and focus ring.',
      controls: [
        {
          key: 'size',
          label: 'Size',
          type: 'select',
          options: tabsSizes,
          default: tabsDefaults.size,
        },
        {
          key: 'radius',
          label: 'Radius',
          type: 'select',
          options: themeRadii,
          default: tabsDefaults.radius,
        },
      ],
      props: (state) => ({
        items: folders,
        size: state.size!,
        radius: state.radius!,
        class: width,
        ui: { list: listLabel('Mail') },
      }),
    },
    {
      title: 'Icons',
      description:
        'Give items an icon or a trailingIcon. Icon-only tabs need an aria-label: ui.tab receives each item, so one function names them all.',
      controls: [],
      props: () => ({
        items: iconOnly,
        variant: 'link',
        class: width,
        ui: { list: listLabel('Mail'), tab: labelFromValue },
      }),
    },
    {
      title: 'Orientation',
      description:
        'Stack the tabs in a column beside the panels. Up and Down move between tabs instead of Left and Right.',
      controls: [
        {
          key: 'orientation',
          label: 'Orientation',
          type: 'select',
          options: tabsOrientations,
          default: 'vertical',
        },
        {
          key: 'variant',
          label: 'Variant',
          type: 'select',
          options: tabsVariantNames,
          default: tabsDefaults.variant,
        },
      ],
      props: (state) => ({
        items: settings,
        orientation: state.orientation!,
        variant: state.variant!,
        class: width,
        ui: { list: listLabel('Settings') },
      }),
    },
    {
      title: 'Activation',
      description:
        'automatic selects a tab as soon as the arrow keys reach it. With manual, arrow keys only move focus and Enter or Space selects, for panels that take time to show.',
      controls: [
        {
          key: 'activation',
          label: 'Activation',
          type: 'select',
          options: tabsActivations,
          default: 'manual',
        },
        {
          key: 'loop',
          label: 'Loop',
          type: 'select',
          options: booleans,
          default: 'true',
        },
      ],
      props: (state) => ({
        items: settings,
        activation: state.activation!,
        loop: state.loop === 'true',
        class: width,
        ui: { list: listLabel('Settings') },
      }),
    },
    {
      title: 'Without content',
      description:
        'Set content to false to render only the tab list, such as a filter over a list you render yourself from the v-model value.',
      controls: [],
      props: () => ({
        items: folders,
        content: false,
        variant: 'link',
        class: width,
        ui: { list: listLabel('Mail') },
      }),
    },
    {
      title: 'Disabled',
      description:
        'A disabled item stays reachable with the arrow keys so people can discover it, but it is never selected.',
      controls: [],
      props: () => ({ items: withDisabled, class: width, ui: { list: listLabel('Dashboard') } }),
    },
  ],
  accessibility: [
    {
      title: 'Roles and attributes',
      description:
        'Tabs renders the ui-sdk tabs and follows the WAI-ARIA tabs pattern. Attributes passed to Tabs reach the root.',
      table: {
        columns: ['Attribute', 'Element', 'Value'],
        rows: [
          ['role="tablist"', 'List', 'Groups the tabs, with aria-orientation.'],
          ['role="tab"', 'Tab', 'A native button with aria-selected and aria-controls.'],
          ['role="tabpanel"', 'Panel', 'Labelled by its tab with aria-labelledby.'],
          [
            'aria-disabled="true"',
            'Tab',
            'Set on disabled tabs, which stay focusable with the arrow keys.',
          ],
        ],
      },
    },
    {
      title: 'Keyboard',
      description:
        'The list is one tab stop at the selected tab. Left and Right (Up and Down when vertical) move between tabs, Home and End jump to the ends, and with manual activation Enter or Space selects. Tab then moves into the panel, which is a tab stop only when it has no focusable content.',
    },
    {
      title: 'Labelling',
      description:
        'Name the tab list with an aria-label or aria-labelledby through ui.list. Icon-only tabs need an aria-label, set through ui.tab. Icons sit in the tab icon part, so screen readers skip them.',
    },
  ],
  api: {
    props: [
      {
        name: 'items',
        type: 'TabsItem[]',
        typeLink: '#tabs-item',
        default: '[]',
        description: 'The tabs and their panels. Each needs a unique value.',
      },
      {
        name: 'modelValue',
        type: 'string | null',
        description: 'Value of the selected tab, for v-model. null selects nothing.',
      },
      {
        name: 'defaultValue',
        type: 'string | null',
        description: 'Tab selected at first when uncontrolled. Defaults to the first enabled tab.',
      },
      {
        name: 'orientation',
        type: variants(tabsOrientations),
        default: `'${tabsDefaults.orientation}'`,
        description:
          'Lays the tabs out in a row above the panels or a column beside them, and picks the arrow keys.',
      },
      {
        name: 'activation',
        type: variants(tabsActivations),
        default: `'${tabsDefaults.activation}'`,
        description:
          'automatic selects a tab when the arrow keys focus it; manual waits for Enter or Space.',
      },
      {
        name: 'loop',
        type: 'boolean',
        default: 'true',
        description: 'Whether the arrow keys wrap from the last tab to the first.',
      },
      {
        name: 'content',
        type: 'boolean',
        default: String(tabsDefaults.content),
        description: 'Renders the panels. Set it to false to render only the tab list.',
      },
      {
        name: 'keepMounted',
        type: 'boolean',
        default: String(tabsDefaults.keepMounted),
        description:
          'Keeps hidden panels in the page, preserving their local state, instead of unmounting them.',
      },
      {
        name: 'hiddenUntilFound',
        type: 'boolean',
        default: 'false',
        description:
          'Keeps hidden panels findable with the browser find in page, which selects their tab. Implies keepMounted.',
      },
      {
        name: 'variant',
        type: variants(tabsVariantNames),
        default: `'${tabsDefaults.variant}'`,
        description: 'pill fills the selected tab inside a track; link underlines it.',
      },
      {
        name: 'color',
        type: 'string',
        default: `'${tabsDefaults.color}'`,
        description:
          'A palette token such as primary or error, or a hexadecimal color, for the marker and the focus ring.',
      },
      {
        name: 'size',
        type: variants(tabsSizes),
        default: `'${tabsDefaults.size}'`,
        description: 'Height, text and icon size of every tab.',
      },
      {
        name: 'radius',
        type: 'string | number',
        default: `'${tabsDefaults.radius}'`,
        description:
          'Radius of the tabs, the marker and the focus ring. A theme radius, a number of pixels or a CSS length.',
      },
      {
        name: 'ui',
        type: 'TabsUi',
        typeLink: '#ui',
        description:
          'HTML attributes for every node. The item keys receive each item state. See UI.',
      },
    ],
    configs: [
      {
        id: 'tabs-item',
        title: 'TabsItem',
        description: 'Each item renders a tab and, unless content is false, its panel.',
        rows: [
          {
            name: 'value',
            type: 'string',
            required: true,
            description: 'Identifies the tab and pairs it with its panel.',
          },
          { name: 'label', type: 'string', description: 'Text of the tab.' },
          { name: 'icon', type: 'IconName', description: 'Icon before the label.' },
          { name: 'trailingIcon', type: 'IconName', description: 'Icon after the label.' },
          { name: 'content', type: 'string', description: 'Text of the panel.' },
          {
            name: 'slot',
            type: 'string',
            description: 'Name of the slot that renders this panel instead of the content slot.',
          },
          {
            name: 'disabled',
            type: 'boolean',
            description: 'Keeps the tab focusable but stops it from being selected.',
          },
        ],
      },
    ],
    emits: [
      {
        name: 'update:modelValue',
        type: '(value: string | null) => void',
        description: 'Runs when another tab is selected. Not when the change is canceled.',
      },
      {
        name: 'valueChange',
        type: '(value: string | null, details: TabsValueChangeDetails) => void',
        description:
          'Runs before a change. details.reason says why (item-press, list-navigation, find-in-page, item-removed or imperative), and details.cancel() stops it.',
      },
    ],
    ui: [
      { node: 'root', tag: 'div' },
      { node: 'list', tag: 'div', kept: 'role' },
      { node: 'indicator', tag: 'span' },
      {
        node: 'tab',
        tag: 'button',
        state: itemState,
        kept: 'role, tabindex, aria-selected, aria-controls',
      },
      { node: 'leadingIcon', tag: 'svg', state: itemState },
      { node: 'label', tag: 'span', state: itemState },
      { node: 'trailingIcon', tag: 'svg', state: itemState },
      {
        node: 'panel',
        tag: 'div',
        state: itemState,
        kept: 'role',
      },
    ],
    slots: [
      {
        name: 'leading',
        type: itemState,
        typePre: true,
        description: 'Content before the label of each tab; replaces the item icon.',
      },
      {
        name: 'label',
        type: itemState,
        typePre: true,
        description: 'Label of each tab; replaces the item label.',
      },
      {
        name: 'trailing',
        type: itemState,
        typePre: true,
        description:
          'Content after the label of each tab, such as a count; replaces the trailing icon.',
      },
      {
        name: 'content',
        type: itemState,
        typePre: true,
        description: 'Content of each panel; replaces the item content.',
      },
      {
        name: '[item.slot]',
        type: itemState,
        typePre: true,
        description: 'Content of the panel of the item with that slot; wins over the content slot.',
      },
    ],
    expose: [
      {
        name: 'getValue',
        type: '() => string | null',
        description: 'Value of the selected tab.',
      },
      {
        name: 'setValue',
        type: '(value: string | null, options?: { reason?, event? }) => boolean',
        description:
          'Selects a tab, or nothing with null. Disabled tabs never select. Returns false when canceled.',
      },
      {
        name: 'select',
        type: '(value: string, options?: { reason?, event? }) => boolean',
        description: 'Selects a tab, the same as setValue.',
      },
      {
        name: 'focus',
        type: '() => void',
        description: 'Moves focus to the selected tab, or the tab holding the tab stop.',
      },
    ],
  },
}

export default tabs
