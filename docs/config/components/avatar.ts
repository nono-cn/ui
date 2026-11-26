import type { ComponentDocConfig, ExampleProps, ExampleState } from '@docs/config/component-docs'
import avatarImage from '@docs/assets/avatar.svg'
import {
  Avatar,
  avatarDefaults,
  avatarSizes,
  avatarVariantNames,
  iconNames,
  themeColors,
  themeRadii,
} from '@nono/ui'

const sources = ['image', 'broken', 'none']

function source(state: ExampleState): ExampleProps {
  if (state.source === 'image') return { image: avatarImage }
  if (state.source === 'broken') return { image: '/missing-avatar.png' }
  return {}
}

const avatar: ComponentDocConfig = {
  slug: 'avatar',
  title: 'Avatar',
  description: 'An image that represents a person, with a fallback while it loads or fails.',
  component: Avatar,
  usage: [
    {
      title: 'Basic usage',
      description:
        'Pass the image URL with the image prop and name the avatar with aria-label. Without an image, the text prop is shown.',
      props: () => ({ image: avatarImage, 'aria-label': 'Ada Lovelace', text: 'AL' }),
    },
  ],
  examples: [
    {
      title: 'Fallback',
      description:
        'When there is no image or it fails to load, the avatar shows the text prop, or the icon without it.',
      controls: [
        {
          key: 'source',
          label: 'Image',
          type: 'select',
          options: sources,
          default: 'broken',
        },
        {
          key: 'text',
          label: 'Text',
          type: 'select',
          options: ['AL', 'none'],
          default: 'AL',
        },
        {
          key: 'icon',
          label: 'Icon',
          type: 'select',
          options: iconNames,
          default: avatarDefaults.icon,
        },
      ],
      props: (state) => ({
        ...source(state),
        'aria-label': 'Ada Lovelace',
        ...(state.text === 'none' ? {} : { text: state.text! }),
        icon: state.icon!,
      }),
    },
    {
      title: 'Variant',
      description: 'Choose how much visual weight the fallback has.',
      controls: [
        {
          key: 'variant',
          label: 'Variant',
          type: 'select',
          options: avatarVariantNames,
          default: avatarDefaults.variant,
        },
      ],
      props: (state) => ({ 'aria-label': 'Ada Lovelace', text: 'AL', variant: state.variant! }),
    },
    {
      title: 'Color',
      description: 'Choose a palette token or use a hexadecimal color for the fallback.',
      controls: [
        {
          key: 'color',
          label: 'Color',
          type: 'select',
          options: [...themeColors, 'custom'],
          default: avatarDefaults.color,
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
          options: avatarVariantNames,
          default: avatarDefaults.variant,
        },
      ],
      props: (state) => ({
        'aria-label': 'Ada Lovelace',
        text: 'AL',
        color: state.color === 'custom' ? state.custom! : state.color!,
        variant: state.variant!,
      }),
    },
    {
      title: 'Size',
      description: 'Adjust the box and text size. The icon follows the avatar size.',
      controls: [
        {
          key: 'size',
          label: 'Size',
          type: 'select',
          options: avatarSizes,
          default: avatarDefaults.size,
        },
        {
          key: 'source',
          label: 'Image',
          type: 'select',
          options: sources,
          default: 'image',
        },
      ],
      props: (state) => ({
        ...source(state),
        'aria-label': 'Ada Lovelace',
        text: 'AL',
        size: state.size!,
      }),
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
          default: avatarDefaults.radius,
        },
      ],
      props: (state) => ({
        image: avatarImage,
        'aria-label': 'Ada Lovelace',
        text: 'AL',
        radius: state.radius!,
      }),
    },
  ],
  accessibility: [
    {
      title: 'Roles and attributes',
      description:
        'Avatar renders a span with a native img inside, hidden until it loads. Attributes passed to Avatar reach the root span.',
      table: {
        columns: ['Attribute', 'Element', 'Value'],
        rows: [
          [
            'role="img"',
            'Root',
            'The avatar is announced as one image, named by aria-label. Pass role="none" for a decorative avatar.',
          ],
          ['alt=""', 'Image', 'The name is on the root.'],
          ['aria-hidden="true"', 'Text and icon', 'The root label carries the meaning.'],
        ],
      },
    },
    {
      title: 'Alternative text',
      description:
        'Pass aria-label with the name of the person. Leave it out only when the name is already next to the avatar, and pass role="none" so the avatar is treated as decorative.',
    },
  ],
  api: {
    props: [
      {
        name: 'image',
        type: 'string',
        description: 'URL of the image, rendered as the src of the img.',
      },
      {
        name: 'text',
        type: 'string',
        description: 'Fallback text, such as initials.',
      },
      {
        name: 'icon',
        type: 'IconName',
        default: `'${avatarDefaults.icon}'`,
        description: 'Fallback icon, shown when there is no text.',
      },
      {
        name: 'variant',
        type: avatarVariantNames.map((variant) => `'${variant}'`).join(' | '),
        default: `'${avatarDefaults.variant}'`,
        description: 'Visual weight of the fallback.',
      },
      {
        name: 'color',
        type: 'string',
        default: `'${avatarDefaults.color}'`,
        description:
          'Theme token such as primary or error, a custom token, or a CSS color such as #6366f1. The foreground color is picked for contrast.',
      },
      {
        name: 'size',
        type: avatarSizes.map((size) => `'${size}'`).join(' | '),
        default: `'${avatarDefaults.size}'`,
        description: 'Box, text and icon size of the avatar.',
      },
      {
        name: 'radius',
        type: 'string | number',
        default: `'${avatarDefaults.radius}'`,
        description:
          'Theme radius such as sm or lg, none, full, a number in pixels, or a CSS length.',
      },
      {
        name: 'delay',
        type: 'number',
        default: String(avatarDefaults.delay),
        description:
          'Milliseconds to wait before showing the fallback, so a fast image does not flash it first.',
      },
      {
        name: 'ui',
        type: 'AvatarUi',
        typeLink: '#ui',
        description: 'HTML attributes for the root and each inner node. See UI.',
      },
    ],
    emits: [
      {
        name: 'loadingStatusChange',
        type: '(status: AvatarLoadingStatus, details: ChangeDetails) => void',
        description: 'Runs when the image status changes: idle, loading, loaded or error.',
      },
    ],
    ui: [
      { node: 'root', tag: 'span' },
      { node: 'image', tag: 'img', kept: 'src, aria-hidden' },
      { node: 'fallback', tag: 'span' },
      { node: 'text', tag: 'span' },
      { node: 'icon', tag: 'svg' },
    ],
    slots: [
      {
        name: 'default',
        type: '-',
        description: 'Fallback content; overrides the text, initials and icon.',
      },
    ],
    expose: [],
  },
}

export default avatar
