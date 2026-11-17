import type { ComponentDocConfig } from '@docs/config/component-docs'
import {
  Separator,
  separatorDefaults,
  separatorOrientations,
  separatorPositions,
  separatorSizes,
  separatorTypes,
  themeColors,
} from '@nono/ui'

const booleans = ['false', 'true']

const separator: ComponentDocConfig = {
  slug: 'separator',
  title: 'Separator',
  description: 'Divides groups of content with a horizontal or vertical line.',
  component: Separator,
  usage: [
    {
      title: 'Basic usage',
      description: 'Put a separator between two groups of content.',
      props: () => ({}),
    },
  ],
  examples: [
    {
      title: 'Color',
      description:
        'Choose a palette token or use a hexadecimal color. Neutral uses the border color.',
      controls: [
        {
          key: 'color',
          label: 'Color',
          type: 'select',
          options: [...themeColors, 'custom'],
          default: separatorDefaults.color,
        },
        {
          key: 'custom',
          label: 'Custom color',
          type: 'color',
          default: '#6366f1',
          visible: (state) => state.color === 'custom',
        },
      ],
      props: (state) => ({ color: state.color === 'custom' ? state.custom! : state.color! }),
    },
    {
      title: 'Type',
      description: 'Choose a solid, dashed or dotted line.',
      controls: [
        {
          key: 'type',
          label: 'Type',
          type: 'select',
          options: separatorTypes,
          default: separatorDefaults.type,
        },
      ],
      props: (state) => ({ type: state.type!, size: 'md' }),
    },
    {
      title: 'Size',
      description: 'Adjust the thickness of the line.',
      controls: [
        {
          key: 'size',
          label: 'Size',
          type: 'select',
          options: separatorSizes,
          default: separatorDefaults.size,
        },
      ],
      props: (state) => ({ size: state.size! }),
    },
    {
      title: 'Orientation',
      description: 'A vertical separator divides items in a row and takes the row’s height.',
      controls: [
        {
          key: 'orientation',
          label: 'Orientation',
          type: 'select',
          options: separatorOrientations,
          default: 'vertical',
        },
      ],
      props: (state) => ({ orientation: state.orientation! }),
    },
    {
      title: 'Label',
      description: 'Place a label over the line. The default slot replaces it.',
      controls: [
        {
          key: 'position',
          label: 'Position',
          type: 'select',
          options: separatorPositions,
          default: separatorDefaults.position,
        },
      ],
      props: (state) => ({ label: 'or', position: state.position! }),
    },
    {
      title: 'Decorative',
      description:
        'A decorative separator is hidden from assistive technology. Set decorative to false when the division carries meaning.',
      controls: [
        {
          key: 'decorative',
          label: 'Decorative',
          type: 'select',
          options: booleans,
          default: 'false',
        },
      ],
      props: (state) => ({ decorative: state.decorative === 'true' }),
    },
  ],
  accessibility: [
    {
      title: 'Roles and attributes',
      description:
        'Separator renders the ui-sdk separator, a div that never takes focus. It is decorative by default. Attributes passed to Separator reach that element.',
      table: {
        columns: ['Attribute', 'Element', 'Value'],
        rows: [
          ['role="none"', 'Root', 'Set while decorative is true, so screen readers skip the line.'],
          ['role="separator"', 'Root', 'Set when decorative is false.'],
          ['aria-orientation', 'Root', 'Orientation of a separator that is not decorative.'],
          ['data-orientation', 'Root', 'horizontal or vertical, set in both cases for styling.'],
          ['data-slot="separator"', 'Root', 'Lets you style every separator from CSS.'],
        ],
      },
    },
    {
      title: 'Labels',
      description:
        'A separator with role="separator" is announced as a single element, so screen readers may skip a label inside it. If the label matters, such as "or" between two options, repeat it in the content around the separator.',
    },
  ],
  api: {
    props: [
      {
        name: 'label',
        type: 'string',
        description: 'Text over the line. The default slot replaces it.',
      },
      {
        name: 'orientation',
        type: separatorOrientations.map((value) => `'${value}'`).join(' | '),
        default: `'${separatorDefaults.orientation}'`,
        description: 'Which way the line runs.',
      },
      {
        name: 'decorative',
        type: 'boolean',
        default: String(separatorDefaults.decorative),
        description:
          'Hides the separator from assistive technology with role="none". Set it to false to use role="separator".',
      },
      {
        name: 'type',
        type: separatorTypes.map((value) => `'${value}'`).join(' | '),
        default: `'${separatorDefaults.type}'`,
        description: 'Style of the line.',
      },
      {
        name: 'size',
        type: separatorSizes.map((value) => `'${value}'`).join(' | '),
        default: `'${separatorDefaults.size}'`,
        description: 'Thickness of the line.',
      },
      {
        name: 'color',
        type: 'string',
        default: `'${separatorDefaults.color}'`,
        description:
          'Theme token such as primary or error, a custom token, or a CSS color such as #6366f1. Neutral uses the border color.',
      },
      {
        name: 'position',
        type: separatorPositions.map((value) => `'${value}'`).join(' | '),
        default: `'${separatorDefaults.position}'`,
        description: 'Alignment of the label or default slot content along the line.',
      },
    ],
    emits: [],
    slots: [
      {
        name: 'default',
        type: '-',
        description: 'Content over the line; overrides the label fallback.',
      },
    ],
    expose: [],
  },
}

export default separator
