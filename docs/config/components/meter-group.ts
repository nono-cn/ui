import type { ComponentDocConfig, ExampleValue } from '@docs/config/component-docs'
import { withSource } from '@docs/config/component-docs'
import {
  MeterGroup,
  meterGroupDefaults,
  meterGroupLegends,
  meterGroupOrientations,
  meterGroupSizes,
  themeColors,
} from '@nono/ui'

const booleans = ['false', 'true']
const variants = (value: readonly string[]) => value.map((item) => `'${item}'`).join(' | ')
const width = 'w-full max-w-md'

const context = { state: 'MeterGroupContext', stateLink: '#meter-group-context' }

const contextSlot = { type: 'MeterGroupContext', typeLink: '#meter-group-context' }

const itemContext = { state: 'MeterGroupItemContext', stateLink: '#meter-group-item-context' }

const itemContextSlot = { type: 'MeterGroupItemContext', typeLink: '#meter-group-item-context' }

const gigabytes: ExampleValue = { style: 'unit', unit: 'gigabyte', maximumFractionDigits: 1 }

const storage: ExampleValue = [
  { label: 'Photos', value: 48, color: 'primary', icon: 'image' },
  { label: 'Videos', value: 32, color: 'warning', icon: 'video' },
  { label: 'Music', value: 14, color: 'success', icon: 'audio' },
  { label: 'Documents', value: 6, color: 'info', icon: 'fileText' },
]

const budget: ExampleValue = [
  { label: 'Rent', value: 40, color: 'primary' },
  { label: 'Food', value: 20, color: 'success' },
  { label: 'Transport', value: 10, color: 'warning' },
  { label: 'Leisure', value: 8, color: 'error' },
]

const tokens: ExampleValue = [
  { label: 'System prompt', value: 12, color: '#6366f1' },
  { label: 'Messages', value: 38, color: '#0ea5e9' },
  { label: 'Tools', value: 9, color: '#f59e0b' },
]

const sprint: ExampleValue = [
  { label: 'Done', value: 45 },
  { label: 'Review', value: 20, color: 'warning' },
]

const capacity: ExampleValue = [
  { label: 'Planned', value: 70 },
  { label: 'Unplanned', value: 50, color: 'error' },
]

const usedOfTotal = withSource(
  '(value, { max }) => `${value} GB used of ${max} GB`',
  (value: number, { max }: { max: number }) => `${value} GB used of ${max} GB`,
)

const meterGroup: ComponentDocConfig = {
  slug: 'meter-group',
  title: 'MeterGroup',
  description:
    'Shows how a known total splits into parts, like storage used by kind of file, in one bar with a legend.',
  component: MeterGroup,
  usage: [
    {
      title: 'Basic usage',
      description:
        'Pass the parts as items, each with a value, a label and a color. They fill one bar from the start and add up against max. Name the bar with label, and add showValue to show the total.',
      props: () => ({
        items: budget,
        label: 'Monthly budget',
        showValue: true,
        class: width,
      }),
    },
  ],
  examples: [
    {
      title: 'Max and format',
      description:
        'Set max to count in your own units. With the default percent format the values read as their share of max; a unit format reads the values themselves, on screen and for screen readers.',
      controls: [
        {
          key: 'max',
          label: 'Max',
          type: 'select',
          options: ['100', '128', '256'],
          default: '128',
        },
        {
          key: 'format',
          label: 'Format',
          type: 'select',
          options: ['percent', 'gigabyte'],
          default: 'gigabyte',
        },
      ],
      props: (state) => ({
        items: storage,
        max: Number(state.max),
        ...(state.format === 'gigabyte' ? { format: gigabytes } : {}),
        label: 'Storage',
        showValue: true,
        class: width,
      }),
    },
    {
      title: 'Value label',
      description:
        'getValueLabel sets what screen readers hear for the total when the formatted value says too little.',
      controls: [],
      props: () => ({
        items: storage,
        max: 128,
        format: gigabytes,
        getValueLabel: usedOfTotal,
        label: 'Storage',
        showValue: true,
        class: width,
      }),
    },
    {
      title: 'Legend',
      description:
        'list stacks the parts under the bar with their values at the end, inline wraps them in a row, and none hides them. An item with an icon shows it instead of the dot.',
      controls: [
        {
          key: 'legend',
          label: 'Legend',
          type: 'select',
          options: meterGroupLegends,
          default: 'inline',
        },
      ],
      props: (state) => ({
        items: budget,
        legend: state.legend!,
        label: 'Monthly budget',
        showValue: true,
        class: width,
      }),
    },
    {
      title: 'Separated',
      description: 'Draws a thin gap between the parts, so neighbors of similar color stay apart.',
      controls: [
        {
          key: 'separated',
          label: 'Separated',
          type: 'select',
          options: booleans,
          default: 'true',
        },
      ],
      props: (state) => ({
        items: storage,
        max: 128,
        format: gigabytes,
        separated: state.separated === 'true',
        size: 'lg',
        label: 'Storage',
        class: width,
      }),
    },
    {
      title: 'Color',
      description:
        'Each item takes a palette token or a CSS color. color applies to the items without one.',
      controls: [
        {
          key: 'color',
          label: 'Color',
          type: 'select',
          options: themeColors,
          default: meterGroupDefaults.color,
        },
      ],
      props: (state) => ({
        items: sprint,
        color: state.color!,
        label: 'Sprint',
        showValue: true,
        class: width,
      }),
    },
    {
      title: 'Custom colors',
      description: 'A hexadecimal color colors the segment, the dot and the icon of its item.',
      controls: [],
      props: () => ({
        items: tokens,
        label: 'Context window',
        showValue: true,
        class: width,
      }),
    },
    {
      title: 'Size',
      description: 'Adjust the thickness of the bar and the size of the text, icons and dots.',
      controls: [
        {
          key: 'size',
          label: 'Size',
          type: 'select',
          options: meterGroupSizes,
          default: 'lg',
        },
      ],
      props: (state) => ({
        items: storage,
        max: 128,
        format: gigabytes,
        size: state.size!,
        label: 'Storage',
        showValue: true,
        class: width,
      }),
    },
    {
      title: 'Orientation',
      description:
        'A vertical bar fills from the bottom with the legend beside it, and takes the height of its container, so give it one. The legend is always a list there.',
      controls: [
        {
          key: 'orientation',
          label: 'Orientation',
          type: 'select',
          options: meterGroupOrientations,
          default: 'vertical',
        },
      ],
      props: (state) => ({
        items: budget,
        orientation: state.orientation!,
        label: 'Budget',
        showValue: true,
        class: state.orientation === 'vertical' ? 'h-48' : width,
      }),
    },
    {
      title: 'Overflow',
      description:
        'Values stay between 0 and max for the total. When the items add up to more than max, they share the bar in proportion.',
      controls: [],
      props: () => ({
        items: capacity,
        label: 'Capacity',
        showValue: true,
        class: width,
      }),
    },
    {
      title: 'Value slot',
      description:
        'The value slot replaces the total, and item-leading, item-label and item-value replace the parts of each legend item.',
      controls: [],
      props: () => ({
        items: budget,
        label: 'Monthly budget',
        showValue: true,
        class: width,
      }),
      slot: { slot: 'value', text: '78 of 100 €' },
    },
  ],
  accessibility: [
    {
      title: 'Roles and attributes',
      description:
        'MeterGroup renders the ui-sdk meter for the total, since it is a reading in a known range rather than the progress of a task. Attributes passed to MeterGroup reach the root; attributes for the meter go through ui.meter.',
      table: {
        columns: ['Attribute', 'Element', 'Value'],
        rows: [
          ['role="meter"', 'Meter', 'The bar, read as the sum of the items.'],
          ['aria-valuemin, aria-valuemax', 'Meter', '0 and max.'],
          ['aria-valuenow', 'Meter', 'The sum of the items, kept between 0 and max.'],
          ['aria-valuetext', 'Meter', 'The formatted total, or getValueLabel when set.'],
          ['aria-labelledby', 'Meter', 'Points to the label when there is one.'],
        ],
      },
    },
    {
      title: 'Naming the bar',
      description:
        'Pass label, use the label slot, or pass an aria-label through ui.meter. The segments are presentational; each part is read from the legend, a list outside the meter.',
    },
    {
      title: 'Color',
      description:
        'Colors alone do not tell the parts apart for everyone. Keep the legend, with labels and values, unless the page says them elsewhere.',
    },
    {
      title: 'Reduced motion',
      description: 'With reduced motion, the segments do not animate as the values change.',
    },
  ],
  api: {
    props: [
      {
        name: 'items',
        type: 'MeterGroupItem[]',
        typeLink: '#meter-group-item',
        default: '[]',
        description: 'The parts, in the order they fill the bar.',
      },
      {
        name: 'max',
        type: 'number',
        default: String(meterGroupDefaults.max),
        description:
          'The total the items add up against. When they add up to more, they share the bar in proportion.',
      },
      {
        name: 'format',
        type: 'Intl.NumberFormatOptions | ((value: number) => string)',
        default: "{ style: 'percent' }",
        description:
          'How the total and each item read. A percent style shows the share of max; any other style shows the value itself.',
      },
      {
        name: 'locale',
        type: 'string',
        description: 'Locale the values are formatted in. Defaults to the one from provideLocale.',
      },
      {
        name: 'getValueLabel',
        type: '(value: number, details: MeterLabelDetails) => string',
        description:
          'What screen readers hear for the total, like "86 GB used of 128 GB". details holds formatted, percent, min and max.',
      },
      { name: 'label', type: 'string', description: 'Visible name of the bar.' },
      {
        name: 'showValue',
        type: 'boolean',
        default: 'false',
        description: 'Shows the formatted total next to the label.',
      },
      {
        name: 'legend',
        type: variants(meterGroupLegends),
        default: `'${meterGroupDefaults.legend}'`,
        description:
          'list stacks the items under the bar, inline wraps them in a row, none hides them. Vertical bars use list for inline.',
      },
      {
        name: 'separated',
        type: 'boolean',
        default: 'false',
        description: 'Draws a gap between the segments.',
      },
      {
        name: 'color',
        type: 'string',
        default: `'${meterGroupDefaults.color}'`,
        description:
          'Theme token such as primary or success, or a CSS color, for the items without a color.',
      },
      {
        name: 'size',
        type: variants(meterGroupSizes),
        default: `'${meterGroupDefaults.size}'`,
        description: 'Thickness of the bar and size of the text, icons and dots.',
      },
      {
        name: 'orientation',
        type: variants(meterGroupOrientations),
        default: `'${meterGroupDefaults.orientation}'`,
        description:
          'horizontal fills from the start with the legend below; vertical fills from the bottom with the legend beside it.',
      },
      {
        name: 'ui',
        type: 'MeterGroupUi',
        typeLink: '#ui',
        description:
          'HTML attributes for every node. The item keys receive each item context. See UI.',
      },
    ],
    configs: [
      {
        id: 'meter-group-item',
        title: 'MeterGroupItem',
        rows: [
          {
            name: 'value',
            type: 'number',
            required: true,
            description: 'How much of max the part takes. Below 0 counts as 0.',
          },
          { name: 'label', type: 'string', description: 'Name of the part in the legend.' },
          {
            name: 'color',
            type: 'string',
            description:
              'Palette token or CSS color of the segment, dot and icon. Defaults to color.',
          },
          { name: 'icon', type: 'IconName', description: 'Icon in the legend instead of the dot.' },
        ],
      },
      {
        id: 'meter-group-item-context',
        title: 'MeterGroupItemContext',
        rows: [
          {
            name: 'item',
            type: 'MeterGroupItem',
            typeLink: '#meter-group-item',
            description: 'The part, as passed in items.',
          },
          { name: 'index', type: 'number', description: 'Position of the part in items.' },
          {
            name: 'percent',
            type: 'number',
            description: 'Share of the bar the segment takes, from 0 to 100.',
          },
          { name: 'text', type: 'string', description: 'The value of the part, formatted.' },
        ],
      },
      {
        id: 'meter-group-context',
        title: 'MeterGroupContext',
        rows: [
          { name: 'value', type: 'number', description: 'Sum of the item values.' },
          {
            name: 'percent',
            type: 'number',
            description: 'Where the sum sits between 0 and max, from 0 to 100.',
          },
          { name: 'max', type: 'number', description: 'The max prop.' },
          { name: 'text', type: 'string', description: 'The sum, formatted.' },
        ],
      },
    ],
    emits: [],
    ui: [
      { node: 'root', tag: 'div' },
      { node: 'meter', tag: 'div', ...context, kept: 'role, aria-value*, aria-labelledby' },
      { node: 'label', tag: 'span', ...context, kept: 'id' },
      { node: 'value', tag: 'span', ...context },
      { node: 'track', tag: 'div', ...context },
      { node: 'segment', tag: 'span', ...itemContext },
      { node: 'legend', tag: 'ul' },
      { node: 'item', tag: 'li', ...itemContext },
      { node: 'itemIcon', tag: 'svg', ...itemContext },
      { node: 'itemDot', tag: 'span', ...itemContext },
      { node: 'itemLabel', tag: 'span', ...itemContext },
      { node: 'itemValue', tag: 'span', ...itemContext },
    ],
    slots: [
      {
        name: 'label',
        ...contextSlot,
        description: 'Content of the label node; replaces label.',
      },
      {
        name: 'value',
        ...contextSlot,
        description: 'Content of the value node; replaces the formatted total.',
      },
      {
        name: 'item-leading',
        ...itemContextSlot,
        description: 'Content before the label of each legend item; replaces the icon or dot.',
      },
      {
        name: 'item-label',
        ...itemContextSlot,
        description: 'Content of the label node of each legend item; replaces item.label.',
      },
      {
        name: 'item-value',
        ...itemContextSlot,
        description: 'Content of the value node of each legend item; replaces the formatted value.',
      },
    ],
    expose: [],
  },
}

export default meterGroup
