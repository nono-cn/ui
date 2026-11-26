import type { ComponentDocConfig } from '@docs/config/component-docs'
import { Avatar, Chip, chipDefaults, chipPositions, chipSizes, themeColors } from '@nono/ui'

const booleans = ['false', 'true']

const chip: ComponentDocConfig = {
  slug: 'chip',
  title: 'Chip',
  description: 'Compact indicator that can appear over an element or on its own.',
  component: Chip,
  slot: {
    name: 'Avatar',
    component: Avatar,
    props: { 'aria-label': 'Ada Lovelace', text: 'AL', size: 'lg' },
  },
  usage: [
    {
      title: 'Basic usage',
      description:
        'Wrap the element the indicator belongs to. The chip sits on its top-right corner.',
      props: () => ({}),
    },
  ],
  examples: [
    {
      title: 'Color',
      description: 'Choose a palette token or use a hexadecimal color.',
      controls: [
        {
          key: 'color',
          label: 'Color',
          type: 'select',
          options: [...themeColors, 'custom'],
          default: chipDefaults.color,
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
      title: 'Size',
      description: 'Choose the size of the indicator.',
      controls: [
        {
          key: 'size',
          label: 'Size',
          type: 'select',
          options: chipSizes,
          default: chipDefaults.size,
        },
      ],
      props: (state) => ({ size: state.size! }),
    },
    {
      title: 'Position',
      description: 'Choose the corner where the indicator appears.',
      controls: [
        {
          key: 'position',
          label: 'Position',
          type: 'select',
          options: chipPositions,
          default: chipDefaults.position,
        },
      ],
      props: (state) => ({ position: state.position! }),
    },
    {
      title: 'Show',
      description: 'Hide the indicator without removing the content it wraps.',
      controls: [
        {
          key: 'show',
          label: 'Show',
          type: 'select',
          options: booleans,
          default: String(chipDefaults.show),
        },
      ],
      props: (state) => ({ show: state.show === 'true' }),
    },
    {
      title: 'Inset',
      description:
        'Keep the indicator inside the corner instead of centering it on the edge, which suits round elements.',
      controls: [
        {
          key: 'inset',
          label: 'Inset',
          type: 'select',
          options: booleans,
          default: String(chipDefaults.inset),
        },
      ],
      props: (state) => ({ inset: state.inset === 'true' }),
    },
    {
      title: 'Standalone',
      description: 'Place the indicator in the flow next to the content instead of over it.',
      controls: [
        {
          key: 'standalone',
          label: 'Standalone',
          type: 'select',
          options: booleans,
          default: String(chipDefaults.standalone),
        },
      ],
      props: (state) => ({ standalone: state.standalone === 'true' }),
    },
  ],
  accessibility: [
    {
      title: 'Roles and attributes',
      description:
        'The indicator is a purely visual dot over the default slot. It has no text, role or name, so assistive technology does not notice it. Attributes passed to Chip reach the root.',
      table: {
        columns: ['Attribute', 'Element', 'Value'],
        rows: [['div', 'Root', 'Generic container that wraps the default slot.']],
      },
    },
    {
      title: 'Communicating the status',
      description:
        'When the indicator means something, such as unread messages, say it on the element it decorates, for example with aria-label="Inbox, 3 unread" on the button. Do not rely on color or size alone.',
    },
  ],
  api: {
    props: [
      {
        name: 'color',
        type: 'string',
        default: `'${chipDefaults.color}'`,
        description:
          'Theme token such as primary or error, a custom token, or a CSS color such as #6366f1.',
      },
      {
        name: 'size',
        type: chipSizes.map((size) => `'${size}'`).join(' | '),
        default: `'${chipDefaults.size}'`,
        description: 'Size of the indicator.',
      },
      {
        name: 'position',
        type: chipPositions.map((position) => `'${position}'`).join(' | '),
        default: `'${chipDefaults.position}'`,
        description: 'Corner where the indicator sits. Ignored when standalone.',
      },
      {
        name: 'show',
        type: 'boolean',
        default: String(chipDefaults.show),
        description: 'Whether the indicator is rendered.',
      },
      {
        name: 'inset',
        type: 'boolean',
        default: String(chipDefaults.inset),
        description: 'Keeps the indicator inside the corner instead of centering it on the edge.',
      },
      {
        name: 'standalone',
        type: 'boolean',
        default: String(chipDefaults.standalone),
        description: 'Places the indicator in the flow instead of positioning it over the content.',
      },
      {
        name: 'ui',
        type: 'ChipUi',
        typeLink: '#ui',
        description: 'HTML attributes for the root and each inner node. See UI.',
      },
    ],
    emits: [],
    ui: [
      { node: 'root', tag: 'div' },
      { node: 'indicator', tag: 'span' },
    ],
    slots: [{ name: 'default', type: '-', description: 'Element the indicator sits over.' }],
    expose: [],
  },
}

export default chip
