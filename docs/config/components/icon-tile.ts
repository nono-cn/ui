import type { ComponentDocConfig } from '@docs/config/component-docs'
import {
  IconTile,
  iconNames,
  iconTileDefaults,
  iconTileSizes,
  iconTileVariantNames,
  themeColors,
  themeRadii,
} from '@nono/ui'

const iconTile: ComponentDocConfig = {
  slug: 'icon-tile',
  title: 'IconTile',
  description: 'A square tile that frames an icon, for lists, cards and empty states.',
  component: IconTile,
  usage: [
    {
      title: 'Basic usage',
      description: 'Pass the icon with the icon prop, or put any content in the default slot.',
      props: () => ({ icon: 'heart' }),
    },
  ],
  examples: [
    {
      title: 'Variant',
      description:
        'Choose how much visual weight the tile has. Frame insets a card inside a muted ring.',
      controls: [
        {
          key: 'variant',
          label: 'Variant',
          type: 'select',
          options: iconTileVariantNames,
          default: 'frame',
        },
      ],
      props: (state) => ({ icon: 'heart', variant: state.variant! }),
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
          default: iconTileDefaults.color,
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
          options: iconTileVariantNames,
          default: iconTileDefaults.variant,
        },
      ],
      props: (state) => ({
        icon: 'heart',
        color: state.color === 'custom' ? state.custom! : state.color!,
        variant: state.variant!,
      }),
    },
    {
      title: 'Size',
      description: 'Adjust the box and icon size. The frame inset follows the size.',
      controls: [
        {
          key: 'size',
          label: 'Size',
          type: 'select',
          options: iconTileSizes,
          default: iconTileDefaults.size,
        },
        {
          key: 'variant',
          label: 'Variant',
          type: 'select',
          options: iconTileVariantNames,
          default: 'frame',
        },
      ],
      props: (state) => ({ icon: 'heart', size: state.size!, variant: state.variant! }),
    },
    {
      title: 'Radius',
      description:
        'Use a theme radius, none, full, or any CSS length. The inner card of frame follows it.',
      controls: [
        {
          key: 'radius',
          label: 'Radius',
          type: 'select',
          options: themeRadii,
          default: iconTileDefaults.radius,
        },
        {
          key: 'variant',
          label: 'Variant',
          type: 'select',
          options: iconTileVariantNames,
          default: 'frame',
        },
      ],
      props: (state) => ({ icon: 'heart', radius: state.radius!, variant: state.variant! }),
    },
    {
      title: 'Icon',
      description: 'Pick any icon from the library. Its size follows the tile size.',
      controls: [
        {
          key: 'icon',
          label: 'Icon',
          type: 'select',
          options: iconNames,
          default: 'heart',
        },
      ],
      props: (state) => ({ icon: state.icon! }),
    },
  ],
  accessibility: [
    {
      title: 'Roles and attributes',
      description:
        'IconTile renders a native span with no role. Attributes passed to IconTile reach that element.',
      table: {
        columns: ['Attribute', 'Element', 'Value'],
        rows: [
          ['span', 'Root', 'Inline element with no role.'],
          ['aria-hidden="true"', 'Icon', 'The icon is decorative.'],
        ],
      },
    },
    {
      title: 'Meaning',
      description:
        'The tile is usually decorative next to a visible label. When it is the only content, pass role="img" and aria-label.',
    },
  ],
  api: {
    props: [
      { name: 'icon', type: 'IconName', description: 'Icon shown in the tile.' },
      {
        name: 'variant',
        type: iconTileVariantNames.map((variant) => `'${variant}'`).join(' | '),
        default: `'${iconTileDefaults.variant}'`,
        description: 'Visual weight of the tile.',
      },
      {
        name: 'color',
        type: 'string',
        default: `'${iconTileDefaults.color}'`,
        description:
          'Theme token such as primary or error, a custom token, or a CSS color such as #6366f1. The foreground color is picked for contrast.',
      },
      {
        name: 'size',
        type: iconTileSizes.map((size) => `'${size}'`).join(' | '),
        default: `'${iconTileDefaults.size}'`,
        description: 'Box and icon size of the tile.',
      },
      {
        name: 'radius',
        type: 'string | number',
        default: `'${iconTileDefaults.radius}'`,
        description:
          'Theme radius such as sm or lg, none, full, a number in pixels, or a CSS length.',
      },
      {
        name: 'ui',
        type: 'IconTileUi',
        typeLink: '#ui',
        description: 'HTML attributes for the root and each inner node. See UI.',
      },
    ],
    emits: [],
    ui: [
      { node: 'root', tag: 'span' },
      { node: 'icon', tag: 'svg' },
    ],
    slots: [
      {
        name: 'default',
        type: '-',
        description: 'Tile content; overrides the icon.',
      },
    ],
    expose: [],
  },
}

export default iconTile
