import type { ComponentDocConfig, ExampleState } from '@docs/config/component-docs'
import {
  Badge,
  badgeDefaults,
  badgeSizes,
  badgeVariantNames,
  iconNames,
  themeColors,
  themeRadii,
} from '@nono/ui'

const icons = ['none', ...iconNames]

function icon(state: ExampleState, key: string) {
  return state[key] && state[key] !== 'none' ? { [key]: state[key] } : {}
}

const badge: ComponentDocConfig = {
  slug: 'badge',
  title: 'Badge',
  description: 'A compact label for statuses, categories and metadata.',
  component: Badge,
  usage: [
    {
      title: 'Basic usage',
      description: 'Pass the text to show with the label prop, or put it in the default slot.',
      props: () => ({ label: 'Badge' }),
    },
  ],
  examples: [
    {
      title: 'Variant',
      description: 'Choose how much visual weight the badge has.',
      controls: [
        {
          key: 'variant',
          label: 'Variant',
          type: 'select',
          options: badgeVariantNames,
          default: badgeDefaults.variant,
        },
      ],
      props: (state) => ({ label: 'Badge', variant: state.variant! }),
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
          default: badgeDefaults.color,
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
          options: badgeVariantNames,
          default: badgeDefaults.variant,
        },
      ],
      props: (state) => ({
        label: 'Badge',
        color: state.color === 'custom' ? state.custom! : state.color!,
        variant: state.variant!,
      }),
    },
    {
      title: 'Size',
      description: 'Adjust the padding and text size. Icons follow the badge size.',
      controls: [
        {
          key: 'size',
          label: 'Size',
          type: 'select',
          options: badgeSizes,
          default: badgeDefaults.size,
        },
      ],
      props: (state) => ({ label: 'Badge', icon: 'check', size: state.size! }),
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
          default: badgeDefaults.radius,
        },
      ],
      props: (state) => ({ label: 'Badge', radius: state.radius! }),
    },
    {
      title: 'Icons',
      description: 'Place an icon before or after the label.',
      controls: [
        {
          key: 'icon',
          label: 'Icon',
          type: 'select',
          options: icons,
          default: 'check',
        },
        {
          key: 'trailingIcon',
          label: 'Trailing icon',
          type: 'select',
          options: icons,
          default: 'none',
        },
      ],
      props: (state) => ({
        label: 'Badge',
        ...icon(state, 'icon'),
        ...icon(state, 'trailingIcon'),
      }),
    },
  ],
  accessibility: [
    {
      title: 'Roles and attributes',
      description:
        'Badge renders a native span with no role, so it is read as part of the surrounding content. Attributes passed to Badge reach that element.',
      table: {
        columns: ['Attribute', 'Element', 'Value'],
        rows: [
          ['span', 'Root', 'Inline element with no role.'],
          [
            'aria-hidden="true"',
            'Icons',
            'Icons are decorative, so the label must carry the meaning.',
          ],
        ],
      },
    },
    {
      title: 'Meaning',
      description:
        'Use visible text to communicate the status, and do not rely on color alone. Add ARIA only when the badge needs it, for example a live region when it updates.',
    },
  ],
  api: {
    props: [
      {
        name: 'label',
        type: 'string',
        description: 'Text of the badge. The default slot replaces it.',
      },
      {
        name: 'variant',
        type: badgeVariantNames.map((variant) => `'${variant}'`).join(' | '),
        default: `'${badgeDefaults.variant}'`,
        description: 'Visual weight of the badge.',
      },
      {
        name: 'color',
        type: 'string',
        default: `'${badgeDefaults.color}'`,
        description:
          'Theme token such as primary or error, a custom token, or a CSS color such as #6366f1. The foreground color is picked for contrast.',
      },
      {
        name: 'size',
        type: badgeSizes.map((size) => `'${size}'`).join(' | '),
        default: `'${badgeDefaults.size}'`,
        description: 'Padding, text size and icon size of the badge.',
      },
      {
        name: 'radius',
        type: 'string | number',
        default: `'${badgeDefaults.radius}'`,
        description:
          'Theme radius such as sm or lg, none, full, a number in pixels, or a CSS length.',
      },
      { name: 'icon', type: 'IconName', description: 'Icon before the label.' },
      { name: 'trailingIcon', type: 'IconName', description: 'Icon after the label.' },
      {
        name: 'ui',
        type: 'BadgeUi',
        typeLink: '#ui',
        description: 'HTML attributes for the root and each inner node. See UI.',
      },
    ],
    emits: [],
    ui: [
      { node: 'root', tag: 'span' },
      { node: 'leadingIcon', tag: 'svg' },
      { node: 'label', tag: 'span' },
      { node: 'trailingIcon', tag: 'svg' },
    ],
    slots: [
      {
        name: 'default',
        type: '-',
        description: 'Content of the label node; replaces the label text.',
      },
      {
        name: 'leading',
        type: '-',
        description: 'Content displayed before the label; overrides the icon fallback.',
      },
      {
        name: 'trailing',
        type: '-',
        description: 'Content displayed after the label; overrides the trailingIcon fallback.',
      },
    ],
    expose: [],
  },
}

export default badge
