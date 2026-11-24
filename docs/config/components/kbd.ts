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
      description:
        'Pass the keys with the shortcut prop. They are shown the way the platform writes them, so the same Kbd reads ⌘K on Apple and Ctrl+K elsewhere.',
      props: () => ({ shortcut: 'mod+k' }),
    },
    {
      title: 'Any content',
      description: 'Put anything else, such as a word, in the default slot.',
      props: () => ({}),
      slot: { text: 'Fn' },
    },
  ],
  examples: [
    {
      title: 'Shortcut',
      description:
        'Join keys with +. mod is Command on Apple and Control elsewhere, and named keys such as escape, enter or arrowup get their symbol or short name. It only shows the keys: register what they do with useShortcut.',
      controls: [
        {
          key: 'shortcut',
          label: 'Shortcut',
          type: 'select',
          options: ['mod+k', 'mod+shift+p', 'alt+enter', 'escape', 'shift+arrowup', '?'],
          default: 'mod+k',
        },
      ],
      props: (state) => ({ shortcut: state.shortcut! }),
    },
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
      props: (state) => ({ shortcut: 'k', variant: state.variant! }),
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
        shortcut: 'k',
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
      props: (state) => ({ shortcut: 'mod+k', size: state.size! }),
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
      props: (state) => ({ shortcut: 'k', radius: state.radius! }),
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
        'Keep the shortcut visible. Symbols such as ⌘ or ⇧ may be read literally or not at all. Inside a button, hide the Kbd with aria-hidden and put aria-keyshortcuts on the button, which useShortcut returns. Elsewhere, give it a readable name with aria-label or nearby text, such as "Control K". Do not rely on color alone to communicate an action.',
    },
  ],
  api: {
    props: [
      {
        name: 'shortcut',
        type: 'string',
        description:
          'Keys joined with +, like mod+k, shown the way the platform writes them: ⌘K on Apple and Ctrl+K elsewhere. The server and the first client render agree. The default slot replaces it.',
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
      {
        name: 'ui',
        type: 'KbdUi',
        typeLink: '#ui',
        description: 'HTML attributes for the root. See UI.',
      },
    ],
    emits: [],
    slots: [
      {
        name: 'default',
        type: '-',
        description: 'Content of the key; overrides the shortcut.',
      },
    ],
    ui: [{ node: 'root', tag: 'kbd' }],
    expose: [],
  },
}

export default kbd
