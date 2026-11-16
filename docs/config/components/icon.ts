import type { ComponentDocConfig } from '@docs/config/component-docs'
import { Icon, iconSizes } from '@nono/ui'

const names = ['check', 'info', 'warning', 'error', 'success', 'search', 'heart']
const colors = ['currentColor', 'primary', 'neutral', 'secondary', 'warning', 'success', 'error']

const icon: ComponentDocConfig = {
  slug: 'icon',
  title: 'Icon',
  description: 'Renders a Lucide icon with a compact, consistent API.',
  component: Icon,
  usage: [
    {
      title: 'Basic usage',
      description: 'Start by specifying the name of the icon to render.',
      props: () => ({ name: 'check' }),
    },
  ],
  examples: [
    {
      title: 'Name',
      description: 'Select an icon by its registered library name.',
      controls: [{ key: 'name', label: 'Name', type: 'select', options: names, default: 'check' }],
      props: (state) => ({ name: state.name! }),
    },
    {
      title: 'Size',
      description: 'Adjust the icon’s visual size.',
      controls: [{ key: 'size', label: 'Size', type: 'select', options: iconSizes, default: 'md' }],
      props: (state) => ({ name: 'check', size: state.size! }),
    },
    {
      title: 'Color',
      description: 'Choose a palette token, inherit currentColor, or use a hexadecimal color.',
      controls: [
        {
          key: 'color',
          label: 'Color',
          type: 'select',
          options: [...colors, 'custom'],
          default: 'primary',
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
        name: 'check',
        color: state.color === 'custom' ? state.custom! : state.color!,
      }),
    },
    {
      title: 'Stroke',
      description: 'Set the width of the icon’s lines.',
      controls: [
        {
          key: 'stroke',
          label: 'Stroke',
          type: 'select',
          options: ['1', '1.5', '2', '2.5', '3'],
          default: '2',
        },
      ],
      props: (state) => ({ name: 'check', stroke: Number(state.stroke) }),
    },
  ],
  accessibility: [
    {
      title: 'Roles and attributes',
      description:
        'Icons are decorative by default. Attributes passed to Icon reach the svg, so you can override the defaults.',
      table: {
        columns: ['Attribute', 'Element', 'Value'],
        rows: [
          ['svg', 'Root', 'Inline svg element.'],
          [
            'aria-hidden="true"',
            'Root',
            'Hides the icon from assistive technology. It is dropped when you pass aria-label or aria-labelledby, and you can pass another value.',
          ],
          ['data-slot="icon"', 'Root', 'Lets you style every icon from CSS.'],
        ],
      },
    },
    {
      title: 'Informative icons',
      description:
        'When an icon carries meaning on its own, prefer visible text next to it. Otherwise give it role="img" and an accessible name with aria-label or aria-labelledby. Do not rely on the icon or its color alone to communicate information.',
    },
  ],
  api: {
    props: [
      {
        name: 'name',
        type: 'IconName',
        required: true,
        description: 'Name of the icon to render. iconNames lists every registered name.',
      },
      {
        name: 'size',
        type: iconSizes.map((size) => `'${size}'`).join(' | '),
        default: "'md'",
        description: 'Visual size of the icon.',
      },
      {
        name: 'color',
        type: 'string',
        default: "'currentColor'",
        description:
          'Theme token such as primary or success, a custom token, or a CSS color such as #6366f1. Unknown tokens fall back to primary. currentColor inherits the surrounding text color.',
      },
      {
        name: 'stroke',
        type: 'number',
        default: '2',
        description: 'SVG stroke width. The line scales with the rendered icon size.',
      },
    ],
    emits: [],
    slots: [],
    expose: [],
  },
}

export default icon
