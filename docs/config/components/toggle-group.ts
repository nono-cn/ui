import type { ComponentDocConfig, ExampleValue } from '@docs/config/component-docs'
import { withSource } from '@docs/config/component-docs'
import {
  ToggleGroup,
  type ToggleGroupItemState,
  toggleDefaults,
  toggleGroupDefaults,
  toggleGroupOrientations,
  toggleSizes,
  toggleVariantNames,
  themeColors,
  themeRadii,
} from '@nono/ui'

const booleans = ['false', 'true']
const variants = (value: readonly string[]) => value.map((item) => `'${item}'`).join(' | ')

const itemState = `{
  item: ToggleGroupItem
  index: number
  pressed: boolean
  disabled: boolean
}`

const periods: ExampleValue = [
  { value: 'day', label: 'Day' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
]

const withDisabledMonth: ExampleValue = [
  { value: 'day', label: 'Day' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month', disabled: true },
]

const filters: ExampleValue = [
  { value: 'favorites', icon: 'heart' },
  { value: 'starred', icon: 'star' },
  { value: 'saved', icon: 'save' },
]

const labelFromValue: ExampleValue = {
  item: withSource(
    "({ item }) => ({ 'aria-label': item.value })",
    ({ item }: ToggleGroupItemState) => ({ 'aria-label': item.value }),
  ),
}

const toggleGroup: ComponentDocConfig = {
  slug: 'toggle-group',
  title: 'ToggleGroup',
  description:
    'A set of toggles that share one value, with one tab stop and arrow keys between them.',
  component: ToggleGroup,
  usage: [
    {
      title: 'Basic usage',
      description:
        'Pass the toggles as items, each with its own value. Bind the pressed values with v-model, or set defaultValue to leave it uncontrolled. The value is always an array.',
      props: () => ({ items: periods, defaultValue: ['week'], 'aria-label': 'Period' }),
    },
  ],
  examples: [
    {
      title: 'Multiple',
      description:
        'Let several toggles stay pressed. Icon-only items need an aria-label: ui.item receives each item, so one function names them all.',
      controls: [
        {
          key: 'multiple',
          label: 'Multiple',
          type: 'select',
          options: booleans,
          default: 'true',
        },
      ],
      props: (state) => ({
        items: filters,
        defaultValue: ['favorites'],
        multiple: state.multiple === 'true',
        'aria-label': 'Filters',
        ui: labelFromValue,
      }),
    },
    {
      title: 'Deselectable',
      description:
        'In single mode, pressing the pressed toggle clears the value. Set deselectable to false to keep one pressed.',
      controls: [
        {
          key: 'deselectable',
          label: 'Deselectable',
          type: 'select',
          options: booleans,
          default: 'false',
        },
      ],
      props: (state) => ({
        items: periods,
        defaultValue: ['week'],
        deselectable: state.deselectable === 'true',
        'aria-label': 'Period',
      }),
    },
    {
      title: 'Attached',
      description:
        'Join the toggles into one control: only the outer corners stay rounded and the borders overlap.',
      controls: [
        {
          key: 'orientation',
          label: 'Orientation',
          type: 'select',
          options: toggleGroupOrientations,
          default: toggleGroupDefaults.orientation,
        },
      ],
      props: (state) => ({
        items: periods,
        defaultValue: ['week'],
        attached: true,
        orientation: state.orientation!,
        'aria-label': 'Period',
      }),
    },
    {
      title: 'Orientation',
      description:
        'Stack the toggles in a column. Up and Down move focus instead of Left and Right.',
      controls: [
        {
          key: 'orientation',
          label: 'Orientation',
          type: 'select',
          options: toggleGroupOrientations,
          default: 'vertical',
        },
      ],
      props: (state) => ({
        items: periods,
        defaultValue: ['week'],
        orientation: state.orientation!,
        'aria-label': 'Period',
      }),
    },
    {
      title: 'Appearance',
      description:
        'Set the variants, colors, size and radius of every toggle at once. variant and color apply while unpressed, activeVariant and activeColor while pressed.',
      controls: [
        {
          key: 'variant',
          label: 'Variant',
          type: 'select',
          options: toggleVariantNames,
          default: toggleDefaults.variant,
        },
        {
          key: 'activeVariant',
          label: 'Active variant',
          type: 'select',
          options: toggleVariantNames,
          default: toggleDefaults.activeVariant,
        },
        {
          key: 'color',
          label: 'Color',
          type: 'select',
          options: themeColors,
          default: toggleDefaults.color,
        },
        {
          key: 'activeColor',
          label: 'Active color',
          type: 'select',
          options: themeColors,
          default: toggleDefaults.activeColor,
        },
        {
          key: 'size',
          label: 'Size',
          type: 'select',
          options: toggleSizes,
          default: toggleDefaults.size,
        },
        {
          key: 'radius',
          label: 'Radius',
          type: 'select',
          options: themeRadii,
          default: toggleDefaults.radius,
        },
      ],
      props: (state) => ({
        items: periods,
        defaultValue: ['week'],
        variant: state.variant!,
        activeVariant: state.activeVariant!,
        color: state.color!,
        activeColor: state.activeColor!,
        size: state.size!,
        radius: state.radius!,
        'aria-label': 'Period',
      }),
    },
    {
      title: 'Disabled',
      description:
        'Disable the whole group or a single item. Disabled toggles stay reachable with the arrow keys and ignore presses.',
      controls: [],
      props: () => ({
        items: withDisabledMonth,
        defaultValue: ['week'],
        'aria-label': 'Period',
      }),
    },
  ],
  accessibility: [
    {
      title: 'Roles and attributes',
      description:
        'ToggleGroup renders the ui-sdk toggle group: a div with role="group" around native buttons that report their state with aria-pressed. Attributes passed to ToggleGroup reach the root.',
      table: {
        columns: ['Attribute', 'Element', 'Value'],
        rows: [
          ['role="group"', 'Root', 'Groups the toggles. It is not a radiogroup.'],
          ['aria-pressed', 'Item', '"true" while pressed, "false" otherwise.'],
          [
            'aria-disabled="true"',
            'Item',
            'Set on disabled items, which stay focusable with the arrow keys.',
          ],
        ],
      },
    },
    {
      title: 'Keyboard',
      description:
        'The group is one tab stop. Tab enters on the first pressed toggle, or the first enabled one. Arrow keys move focus without pressing, Home and End jump to the ends, and Enter or Space presses or unpresses.',
    },
    {
      title: 'Labelling',
      description:
        'Give the group an aria-label or aria-labelledby. Icon-only items need an aria-label, set through ui.item.',
    },
    {
      title: 'Forms',
      description:
        'A toggle group does not submit a value. Use Checkbox for several choices in a form.',
    },
  ],
  api: {
    props: [
      {
        name: 'items',
        type: 'ToggleGroupItem[]',
        typeLink: '#toggle-group-item',
        default: '[]',
        description: 'The toggles. Each needs a unique value.',
      },
      {
        name: 'modelValue',
        type: 'string[]',
        description: 'Values of the pressed toggles, for v-model.',
      },
      {
        name: 'defaultValue',
        type: 'string[]',
        description: 'Values pressed at first when uncontrolled.',
      },
      {
        name: 'multiple',
        type: 'boolean',
        default: 'false',
        description:
          'Lets several toggles stay pressed. Otherwise pressing one unpresses the rest.',
      },
      {
        name: 'deselectable',
        type: 'boolean',
        default: 'true',
        description:
          'In single mode, whether pressing the pressed toggle clears the value. Ignored with multiple.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Stops presses on every toggle. They stay focusable with aria-disabled.',
      },
      {
        name: 'orientation',
        type: variants(toggleGroupOrientations),
        default: `'${toggleGroupDefaults.orientation}'`,
        description: 'Lays the toggles out in a row or a column, and picks the arrow keys.',
      },
      {
        name: 'loop',
        type: 'boolean',
        default: 'true',
        description: 'Whether the arrow keys wrap from the last toggle to the first.',
      },
      {
        name: 'attached',
        type: 'boolean',
        default: String(toggleGroupDefaults.attached),
        description: 'Joins the toggles: only the outer corners stay rounded and borders overlap.',
      },
      {
        name: 'variant',
        type: variants(toggleVariantNames),
        default: `'${toggleDefaults.variant}'`,
        description: 'Variant of every unpressed toggle.',
      },
      {
        name: 'activeVariant',
        type: variants(toggleVariantNames),
        default: `'${toggleDefaults.activeVariant}'`,
        description: 'Variant of every pressed toggle.',
      },
      {
        name: 'color',
        type: 'string',
        default: `'${toggleDefaults.color}'`,
        description: 'Color of every unpressed toggle. See Toggle.',
      },
      {
        name: 'activeColor',
        type: 'string',
        default: `'${toggleDefaults.activeColor}'`,
        description: 'Color of every pressed toggle.',
      },
      {
        name: 'size',
        type: variants(toggleSizes),
        default: `'${toggleDefaults.size}'`,
        description: 'Size of every toggle.',
      },
      {
        name: 'radius',
        type: 'string | number',
        default: `'${toggleDefaults.radius}'`,
        description: 'Radius of every toggle. See Toggle.',
      },
      {
        name: 'ui',
        type: 'ToggleGroupUi',
        typeLink: '#ui',
        description:
          'HTML attributes for the root and every item. ui.item receives each item state. See UI.',
      },
    ],
    configs: [
      {
        id: 'toggle-group-item',
        title: 'ToggleGroupItem',
        description: 'Each item renders a Toggle.',
        rows: [
          { name: 'value', type: 'string', required: true, description: 'Identifies the toggle.' },
          { name: 'label', type: 'string', description: 'Text of the toggle.' },
          { name: 'icon', type: 'IconName', description: 'Icon before the label.' },
          { name: 'trailingIcon', type: 'IconName', description: 'Icon after the label.' },
          {
            name: 'square',
            type: 'boolean',
            description: 'As wide as it is tall. On by default for icon-only items.',
          },
          { name: 'disabled', type: 'boolean', description: 'Stops presses on this toggle.' },
        ],
      },
    ],
    emits: [
      {
        name: 'update:modelValue',
        type: '(value: string[]) => void',
        description: 'Runs when a toggle is pressed or unpressed. Not when the change is canceled.',
      },
      {
        name: 'valueChange',
        type: '(value: string[], details: ToggleGroupValueChangeDetails) => void',
        description:
          'Runs before a change. details.reason says why (item-press or imperative), and details.cancel() stops it.',
      },
    ],
    ui: [
      { node: 'root', tag: 'div' },
      { node: 'item', tag: 'button', state: itemState, kept: 'aria-pressed' },
    ],
    slots: [
      {
        name: 'item',
        type: itemState,
        typePre: true,
        description:
          'Content of each toggle; overrides the label fallback. The item icons still render around it.',
      },
    ],
    expose: [
      {
        name: 'getValue',
        type: '() => string[]',
        description: 'Values of the pressed toggles, in order.',
      },
      {
        name: 'setValue',
        type: '(value: string[], options?: { reason?, event? }) => boolean',
        description:
          'Sets the pressed toggles. Only the first counts without multiple. Returns false when canceled.',
      },
      {
        name: 'isPressed',
        type: '(value: string) => boolean',
        description: 'Whether a toggle is pressed.',
      },
      {
        name: 'toggle',
        type: '(value: string, options?: { reason?, event? }) => boolean',
        description: 'Presses or unpresses a toggle, as a user would. Returns false when canceled.',
      },
      {
        name: 'focus',
        type: '(value?: string) => void',
        description: 'Moves focus to a toggle, or to the one holding the tab stop.',
      },
    ],
  },
}

export default toggleGroup
