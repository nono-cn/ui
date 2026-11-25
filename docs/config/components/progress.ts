import type { ComponentDocConfig } from '@docs/config/component-docs'
import {
  Progress,
  progressAnimations,
  progressDefaults,
  progressOrientations,
  progressSizes,
  progressStatuses,
  progressValuePositions,
  themeColors,
} from '@nono/ui'

const booleans = ['false', 'true']

const statusType = progressStatuses.map((status) => `'${status}'`).join(' | ')

const state = `{
  value: number | null
  percent: number | null
  status: ${statusType}
  min: number
  max: number
}`

const valueState = `{
  value: number | null
  percent: number | null
  status: ${statusType}
  min: number
  max: number
  text: string
}`

const progress: ComponentDocConfig = {
  slug: 'progress',
  title: 'Progress',
  description:
    'Shows how far a task has come, like an upload or an export, or that it is under way when how far is unknown.',
  component: Progress,
  usage: [
    {
      title: 'Basic usage',
      description:
        'Set value between min and max. Name it with label or an aria-label, and add showValue to show the formatted value.',
      props: () => ({ value: 60, label: 'Exporting video', showValue: true }),
    },
  ],
  examples: [
    {
      title: 'Indeterminate',
      description:
        'Leave out value, or set it to null, while how far the task has come is unknown. The bar moves instead of filling.',
      controls: [
        {
          key: 'animation',
          label: 'Animation',
          type: 'select',
          options: progressAnimations,
          default: progressDefaults.animation,
        },
      ],
      props: (state) => ({ label: 'Loading', animation: state.animation! }),
    },
    {
      title: 'Max',
      description:
        'Set min and max to count in your own units, like files. The fill and the percentage follow where the value sits between them.',
      controls: [
        {
          key: 'value',
          label: 'Value',
          type: 'select',
          options: ['0', '1', '2', '3', '4', '5'],
          default: '3',
        },
      ],
      props: (state) => ({
        value: Number(state.value),
        max: 5,
        label: 'Uploading files',
        showValue: true,
      }),
    },
    {
      title: 'Format',
      description:
        'Pass Intl.NumberFormat options to read the value in other units, or a function for custom text. It sets both the visible value and what screen readers hear.',
      controls: [],
      props: () => ({
        value: 2.4,
        max: 8,
        format: { style: 'unit', unit: 'gigabyte', maximumFractionDigits: 1 },
        label: 'Downloading',
        showValue: true,
      }),
    },
    {
      title: 'Value position',
      description:
        'Put the value inside the bar with inside. The bar grows to fit it, and the text takes the contrast color over the fill. A vertical bar always shows it outside.',
      controls: [
        {
          key: 'valuePosition',
          label: 'Position',
          type: 'select',
          options: progressValuePositions,
          default: 'inside',
        },
        {
          key: 'size',
          label: 'Size',
          type: 'select',
          options: progressSizes,
          default: progressDefaults.size,
        },
        {
          key: 'value',
          label: 'Value',
          type: 'select',
          options: ['0', '5', '25', '50', '75', '95', '100'],
          default: '50',
        },
      ],
      props: (state) => ({
        value: Number(state.value),
        label: 'Uploading',
        showValue: true,
        valuePosition: state.valuePosition!,
        size: state.size!,
      }),
    },
    {
      title: 'Color',
      description: 'Choose a palette token or use a hexadecimal color for the fill.',
      controls: [
        {
          key: 'color',
          label: 'Color',
          type: 'select',
          options: [...themeColors, 'custom'],
          default: 'success',
        },
        {
          key: 'custom',
          label: 'Custom color',
          type: 'color',
          default: '#6366f1',
          visible: (state) => state.color === 'custom',
        },
      ],
      props: (state) => ({
        value: 60,
        'aria-label': 'Progress',
        color: state.color === 'custom' ? state.custom! : state.color!,
      }),
    },
    {
      title: 'Size',
      description: 'Adjust the thickness of the bar and the size of its text.',
      controls: [
        {
          key: 'size',
          label: 'Size',
          type: 'select',
          options: progressSizes,
          default: 'lg',
        },
      ],
      props: (state) => ({ value: 60, label: 'Syncing', showValue: true, size: state.size! }),
    },
    {
      title: 'Orientation',
      description:
        'A vertical bar fills from the bottom and takes the height of its container, so give it one.',
      controls: [
        {
          key: 'orientation',
          label: 'Orientation',
          type: 'select',
          options: progressOrientations,
          default: 'vertical',
        },
      ],
      props: (state) => ({
        value: 60,
        showValue: true,
        'aria-label': 'Battery',
        orientation: state.orientation!,
        class: state.orientation === 'vertical' ? 'h-48' : '',
      }),
    },
    {
      title: 'Inverted',
      description:
        'Fill from the other end: the right, or the left in right-to-left text, and the top when vertical. The indeterminate animation follows it: carousel always runs the way the bar fills, carousel-inverse the opposite way.',
      controls: [
        {
          key: 'inverted',
          label: 'Inverted',
          type: 'select',
          options: booleans,
          default: 'true',
        },
      ],
      props: (state) => ({
        value: 40,
        'aria-label': 'Progress',
        inverted: state.inverted === 'true',
      }),
    },
  ],
  accessibility: [
    {
      title: 'Roles and attributes',
      description:
        'Progress renders the ui-sdk progress. Every attribute, such as id or aria-label, reaches the root.',
      table: {
        columns: ['Attribute', 'Element', 'Value'],
        rows: [
          ['role="progressbar"', 'Root', 'The bar.'],
          ['aria-valuemin, aria-valuemax', 'Root', 'min and max.'],
          [
            'aria-valuenow',
            'Root',
            'The value, kept between min and max. Left out while indeterminate.',
          ],
          ['aria-valuetext', 'Root', 'The formatted value, or getValueLabel when set.'],
          ['aria-labelledby', 'Root', 'Points to the label when there is one.'],
        ],
      },
    },
    {
      title: 'Naming the bar',
      description:
        'Pass label, use the label slot, or pass an aria-label. The visible value is hidden from screen readers, as the bar already reads it.',
    },
    {
      title: 'Reduced motion',
      description:
        'With reduced motion, an indeterminate bar fills the track and pulses instead of moving, and the fill does not animate as the value changes.',
    },
  ],
  api: {
    props: [
      {
        name: 'value',
        type: 'number | null',
        default: 'null',
        description:
          'How far the task has come, between min and max. null means under way but unknown: the bar is indeterminate.',
      },
      {
        name: 'min',
        type: 'number',
        default: String(progressDefaults.min),
        description: 'The lowest value.',
      },
      {
        name: 'max',
        type: 'number',
        default: String(progressDefaults.max),
        description: 'The highest value. The bar is complete once value reaches it.',
      },
      {
        name: 'format',
        type: 'Intl.NumberFormatOptions | ((value: number) => string)',
        default: "{ style: 'percent' }",
        description:
          'How the value reads, on screen and for screen readers. A percent style shows where the value sits between min and max; any other style shows the value itself.',
      },
      {
        name: 'locale',
        type: 'string',
        description: 'Locale the value is formatted in. Defaults to the one from provideLocale.',
      },
      {
        name: 'getValueLabel',
        type: '(value: number | null, details: GaugeLabelDetails) => string',
        description:
          'What screen readers hear for the value, when the formatted one says too little, like "3 of 12 files". details holds formatted, percent, min and max.',
      },
      { name: 'label', type: 'string', description: 'Visible name of the bar.' },
      {
        name: 'showValue',
        type: 'boolean',
        default: 'false',
        description: 'Shows the formatted value, where valuePosition says.',
      },
      {
        name: 'valuePosition',
        type: progressValuePositions.map((value) => `'${value}'`).join(' | '),
        default: `'${progressDefaults.valuePosition}'`,
        description:
          'outside shows the value next to the label; inside shows it in the bar, which grows to fit it. Vertical bars always use outside.',
      },
      {
        name: 'color',
        type: 'string',
        default: `'${progressDefaults.color}'`,
        description:
          'Theme token such as primary or success, a custom token, or a CSS color such as #6366f1. Colors the fill.',
      },
      {
        name: 'size',
        type: progressSizes.map((size) => `'${size}'`).join(' | '),
        default: `'${progressDefaults.size}'`,
        description: 'Thickness of the bar and size of its text.',
      },
      {
        name: 'orientation',
        type: progressOrientations.map((value) => `'${value}'`).join(' | '),
        default: `'${progressDefaults.orientation}'`,
        description: 'horizontal fills from the start; vertical fills from the bottom.',
      },
      {
        name: 'inverted',
        type: 'boolean',
        default: 'false',
        description:
          'Fills from the other end, and runs the indeterminate animation the other way.',
      },
      {
        name: 'animation',
        type: progressAnimations.map((value) => `'${value}'`).join(' | '),
        default: `'${progressDefaults.animation}'`,
        description:
          'How the bar moves while indeterminate, relative to the end it fills from: carousel runs the way it fills, carousel-inverse the opposite way.',
      },
      {
        name: 'ui',
        type: 'ProgressUi',
        typeLink: '#ui',
        description: 'HTML attributes for the root and each inner node. See UI.',
      },
    ],
    emits: [],
    ui: [
      { node: 'root', tag: 'div', kept: 'role' },
      { node: 'label', tag: 'span', state, kept: 'id' },
      { node: 'value', tag: 'span', state: valueState },
      { node: 'track', tag: 'div', state },
      { node: 'indicator', tag: 'div', state },
    ],
    slots: [
      {
        name: 'label',
        type: state,
        typePre: true,
        description: 'Content of the label; overrides label.',
      },
      {
        name: 'value',
        type: valueState,
        typePre: true,
        description: 'Content of the value; overrides the formatted text, which comes as text.',
      },
    ],
    expose: [],
  },
}

export default progress
