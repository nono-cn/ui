import type { ComponentDocConfig } from '@docs/config/component-docs'
import {
  ProgressCircular,
  progressCircularDefaults,
  progressCircularSizes,
  progressCircularThickness,
  progressStatuses,
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

const thicknessDefault = progressCircularSizes
  .map((size) => `${size}: ${progressCircularThickness[size]}`)
  .join(', ')

const progressCircular: ComponentDocConfig = {
  slug: 'progress-circular',
  title: 'ProgressCircular',
  description:
    'Shows how far a task has come as a ring that fills clockwise, or spins while how far is unknown.',
  component: ProgressCircular,
  usage: [
    {
      title: 'Basic usage',
      description:
        'Set value between min and max. Name it with label or an aria-label, and add showValue to show the formatted value in the middle.',
      props: () => ({ value: 60, label: 'Exporting', showValue: true }),
    },
  ],
  examples: [
    {
      title: 'Indeterminate',
      description:
        'Leave out value, or set it to null, while how far the task has come is unknown. The ring spins instead of filling.',
      controls: [],
      props: () => ({ 'aria-label': 'Loading' }),
    },
    {
      title: 'Max',
      description:
        'Set min and max to count in your own units, like files. The ring and the percentage follow where the value sits between them.',
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
      title: 'Color',
      description: 'Choose a palette token or use a hexadecimal color for the ring.',
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
        showValue: true,
        'aria-label': 'Progress',
        color: state.color === 'custom' ? state.custom! : state.color!,
      }),
    },
    {
      title: 'Size',
      description: 'Adjust the diameter of the ring, its thickness and the size of its text.',
      controls: [
        {
          key: 'size',
          label: 'Size',
          type: 'select',
          options: progressCircularSizes,
          default: 'xl',
        },
      ],
      props: (state) => ({ value: 60, label: 'Syncing', showValue: true, size: state.size! }),
    },
    {
      title: 'Thickness',
      description: 'Set the stroke width yourself, as a percentage of the diameter, from 1 to 25.',
      controls: [
        {
          key: 'thickness',
          label: 'Thickness',
          type: 'select',
          options: ['4', '8', '12', '16', '24'],
          default: '16',
        },
      ],
      props: (state) => ({
        value: 75,
        size: 'xl',
        showValue: true,
        'aria-label': 'Progress',
        thickness: Number(state.thickness),
      }),
    },
    {
      title: 'Inverted',
      description: 'Fill counterclockwise, from the top.',
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
        showValue: true,
        'aria-label': 'Progress',
        inverted: state.inverted === 'true',
      }),
    },
  ],
  accessibility: [
    {
      title: 'Roles and attributes',
      description:
        'ProgressCircular renders the ui-sdk progress. Every attribute, such as id or aria-label, reaches the root. The ring is an SVG hidden from screen readers.',
      table: {
        columns: ['Attribute', 'Element', 'Value'],
        rows: [
          ['role="progressbar"', 'Root', 'The ring.'],
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
      title: 'Naming the ring',
      description:
        'Pass label, use the label slot, or pass an aria-label. The visible value is hidden from screen readers, as the ring already reads it.',
    },
    {
      title: 'Reduced motion',
      description:
        'With reduced motion, an indeterminate ring shows a still arc that pulses instead of spinning, and the ring does not animate as the value changes.',
    },
  ],
  api: {
    props: [
      {
        name: 'value',
        type: 'number | null',
        default: 'null',
        description:
          'How far the task has come, between min and max. null means under way but unknown: the ring is indeterminate.',
      },
      {
        name: 'min',
        type: 'number',
        default: String(progressCircularDefaults.min),
        description: 'The lowest value.',
      },
      {
        name: 'max',
        type: 'number',
        default: String(progressCircularDefaults.max),
        description: 'The highest value. The ring is complete once value reaches it.',
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
      { name: 'label', type: 'string', description: 'Visible name, under the ring.' },
      {
        name: 'showValue',
        type: 'boolean',
        default: 'false',
        description: 'Shows the formatted value in the middle of the ring.',
      },
      {
        name: 'color',
        type: 'string',
        default: `'${progressCircularDefaults.color}'`,
        description:
          'Theme token such as primary or success, a custom token, or a CSS color such as #6366f1. Colors the ring.',
      },
      {
        name: 'size',
        type: progressCircularSizes.map((size) => `'${size}'`).join(' | '),
        default: `'${progressCircularDefaults.size}'`,
        description: 'Diameter and thickness of the ring and size of its text.',
      },
      {
        name: 'thickness',
        type: 'number',
        default: `{ ${thicknessDefault} }`,
        description:
          'Stroke width as a percentage of the diameter, from 1 to 25. Defaults to the one for size.',
      },
      {
        name: 'inverted',
        type: 'boolean',
        default: 'false',
        description: 'Fills counterclockwise.',
      },
      {
        name: 'ui',
        type: 'ProgressCircularUi',
        typeLink: '#ui',
        description: 'HTML attributes for the root and each inner node. See UI.',
      },
    ],
    emits: [],
    ui: [
      { node: 'root', tag: 'div', kept: 'role' },
      { node: 'indicator', tag: 'circle', state },
      { node: 'value', tag: 'span', state: valueState },
      { node: 'label', tag: 'span', state, kept: 'id' },
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

export default progressCircular
