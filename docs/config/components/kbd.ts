import type { ComponentDocConfig } from '@docs/config/component-docs'
import { Kbd, kbdDefaults, kbdSizes, kbdVariantNames, themeColors, themeRadii } from '@nono/ui'

const kbd: ComponentDocConfig = {
  slug: 'kbd',
  title: 'Kbd',
  description: 'Displays a key or keyboard shortcut as keyboard input.',
  component: Kbd,
  usage: [
    {
      title: 'Basic usage',
      description: 'Pass the key to show with the label prop, or put it in the default slot.',
      props: () => ({ label: 'K' }),
    },
  ],
  examples: [
    {
      title: 'Variant',
      description: 'Choose how much visual weight the key has.',
      controls: [
        {
          key: 'variant',
          label: 'Variant',
          type: 'select',
          options: kbdVariantNames,
          default: kbdDefaults.variant,
        },
      ],
      props: (state) => ({ label: 'K', variant: state.variant! }),
    },
    {
      title: 'Color',
      description: 'Choose a palette token or use a hexadecimal color.',
      controls: [
        {
          key: 'color',
          label: 'Color',
          type: 'select',
          options: [...themeColors, 'custom'],
          default: kbdDefaults.color,
        },
        {
          key: 'custom',
          label: 'Custom color',
          type: 'color',
          default: '#6366f1',
          visible: (state) => state.color === 'custom',
        },
        {
          key: 'variant',
          label: 'Variant',
          type: 'select',
          options: kbdVariantNames,
          default: kbdDefaults.variant,
        },
      ],
      props: (state) => ({
        label: 'K',
        color: state.color === 'custom' ? state.custom! : state.color!,
        variant: state.variant!,
      }),
    },
    {
      title: 'Size',
      description: 'Adjust the height and text size of the key.',
      controls: [
        {
          key: 'size',
          label: 'Size',
          type: 'select',
          options: kbdSizes,
          default: kbdDefaults.size,
        },
      ],
      props: (state) => ({ label: 'Ctrl', size: state.size! }),
    },
    {
      title: 'Radius',
      description: 'Use a theme radius, none, full, or any CSS length.',
      controls: [
        {
          key: 'radius',
          label: 'Radius',
          type: 'select',
          options: themeRadii,
          default: kbdDefaults.radius,
        },
      ],
      props: (state) => ({ label: 'K', radius: state.radius! }),
    },
  ],
  accessibility: [
    {
      title: 'Roles and attributes',
      description:
        'Kbd renders a native kbd element. Attributes passed to Kbd reach that element. Wrap the keys of a shortcut in KbdGroup, which renders an outer kbd, the way HTML marks a key combination.',
      table: {
        columns: ['Attribute', 'Element', 'Value'],
        rows: [['kbd', 'Root', 'Marks the text as keyboard input.']],
      },
    },
    {
      title: 'Readable shortcuts',
      description:
        'Keep the shortcut visible. Symbols such as ⌘ or ⇧ may be read literally or not at all, so give them a readable name with aria-label or nearby text, such as "Control K". Do not rely on color alone to communicate an action.',
    },
  ],
  api: {
    props: [
      {
        name: 'label',
        type: 'string',
        description: 'Text of the key. The default slot replaces it.',
      },
      {
        name: 'variant',
        type: kbdVariantNames.map((variant) => `'${variant}'`).join(' | '),
        default: `'${kbdDefaults.variant}'`,
        description: 'Visual weight of the key.',
      },
      {
        name: 'color',
        type: 'string',
        default: `'${kbdDefaults.color}'`,
        description:
          'Theme token such as primary or error, a custom token, or a CSS color such as #6366f1. The foreground color is picked for contrast.',
      },
      {
        name: 'size',
        type: kbdSizes.map((size) => `'${size}'`).join(' | '),
        default: `'${kbdDefaults.size}'`,
        description: 'Height and text size of the key.',
      },
      {
        name: 'radius',
        type: 'string | number',
        default: `'${kbdDefaults.radius}'`,
        description:
          'Theme radius such as sm or lg, none, full, a number in pixels, or a CSS length.',
      },
    ],
    emits: [],
    slots: [
      {
        name: 'default',
        type: '-',
        description: 'Content of the key; overrides the label fallback.',
      },
    ],
    expose: [],
  },
}

export default kbd
