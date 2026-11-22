import type { ComponentDocConfig, ExampleSlotContent } from '@docs/config/component-docs'
import {
  Button,
  ButtonGroup,
  buttonGroupDefaults,
  buttonGroupOrientations,
  buttonGroupSizes,
} from '@nono/ui'

const buttons: ExampleSlotContent[] = ['Copy', 'Paste', 'Cut'].map((label) => ({
  name: 'Button',
  component: Button,
  props: { label, variant: 'outline', color: 'neutral' },
}))

const buttonGroup: ComponentDocConfig = {
  slug: 'button-group',
  title: 'ButtonGroup',
  description: 'Joins related buttons into one control with shared corners and size.',
  component: ButtonGroup,
  slot: buttons,
  usage: [
    {
      title: 'Basic usage',
      description:
        'Put Button components in the default slot. Only the outer corners stay rounded and the borders overlap.',
      props: () => ({}),
    },
  ],
  examples: [
    {
      title: 'Size',
      description:
        'Set the size of every button at once. A size passed to a button wins over the group size.',
      controls: [
        {
          key: 'size',
          label: 'Size',
          type: 'select',
          options: buttonGroupSizes,
          default: 'md',
        },
      ],
      props: (state) => ({ size: state.size! }),
    },
    {
      title: 'Orientation',
      description: 'Stack the buttons in a column.',
      controls: [
        {
          key: 'orientation',
          label: 'Orientation',
          type: 'select',
          options: buttonGroupOrientations,
          default: 'vertical',
        },
      ],
      props: (state) => ({ orientation: state.orientation! }),
    },
    {
      title: 'Icon buttons',
      description:
        'Icon-only buttons turn square and follow the group size. Give them an aria-label.',
      controls: [],
      props: () => ({}),
      slot: [
        { icon: 'minus', label: 'Decrease' },
        { icon: 'plus', label: 'Increase' },
      ].map(({ icon, label }) => ({
        name: 'Button',
        component: Button,
        props: {
          icon: icon,
          variant: 'outline',
          color: 'neutral',
          'aria-label': label,
        },
      })),
    },
  ],
  accessibility: [
    {
      title: 'Roles and attributes',
      description:
        'ButtonGroup renders a native div with role="group". Attributes passed to ButtonGroup reach that element.',
      table: {
        columns: ['Attribute', 'Element', 'Value'],
        rows: [
          ['role="group"', 'Root', 'Groups related controls. Override it with the role attribute.'],
        ],
      },
    },
    {
      title: 'Labelling',
      description:
        'When the group has a purpose that its buttons do not tell, pass aria-label or aria-labelledby so screen readers announce it.',
    },
    {
      title: 'Keyboard',
      description:
        'Each button stays a separate tab stop. The focused button is lifted so its focus ring is not covered by its neighbors.',
    },
  ],
  api: {
    props: [
      {
        name: 'size',
        type: buttonGroupSizes.map((size) => `'${size}'`).join(' | '),
        description: 'Size of every Button inside that has no size of its own.',
      },
      {
        name: 'orientation',
        type: buttonGroupOrientations.map((value) => `'${value}'`).join(' | '),
        default: `'${buttonGroupDefaults.orientation}'`,
        description: 'Lays the buttons out in a row or a column.',
      },
      {
        name: 'ui',
        type: 'ButtonGroupUi',
        typeLink: '#ui',
        description: 'HTML attributes for the root. See UI.',
      },
    ],
    emits: [],
    ui: [{ node: 'root', tag: 'div' }],
    slots: [
      {
        name: 'default',
        type: '-',
        description: 'The grouped Button components.',
      },
    ],
    expose: [],
  },
}

export default buttonGroup
