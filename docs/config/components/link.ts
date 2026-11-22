import type { ComponentDocConfig } from '@docs/config/component-docs'
import { buttonSizes, buttonVariantNames, Link, linkDefaults, themeColors } from '@nono/ui'

const to = '/components/button'

const link: ComponentDocConfig = {
  slug: 'link',
  title: 'Link',
  description: 'Navigates to a route or a URL, as inline text or with the look of a button.',
  component: Link,
  usage: [
    {
      title: 'Basic usage',
      description:
        'Pass to for a route. With vue-router installed it navigates through RouterLink; without it, to is used as the href.',
      props: () => ({ to, label: 'Button docs' }),
    },
    {
      title: 'URL',
      description: 'Pass href for a plain link that never goes through the router.',
      props: () => ({ href: 'https://ui-sdk.dev', label: 'ui-sdk' }),
    },
  ],
  examples: [
    {
      title: 'Color',
      description: 'Color of the text, or of the button with a variant.',
      controls: [
        {
          key: 'color',
          label: 'Color',
          type: 'select',
          options: [...themeColors, 'custom'],
          default: linkDefaults.color,
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
        to,
        label: 'Button docs',
        color: state.color === 'custom' ? state.custom! : state.color!,
      }),
    },
    {
      title: 'Variant',
      description:
        'Without a variant it is inline text. With one, it takes the look of a Button of that variant.',
      controls: [
        {
          key: 'variant',
          label: 'Variant',
          type: 'select',
          options: ['none', ...buttonVariantNames],
          default: 'none',
        },
        {
          key: 'size',
          label: 'Size',
          type: 'select',
          options: buttonSizes,
          default: linkDefaults.size,
        },
      ],
      props: (state) => ({
        to,
        label: 'Button docs',
        ...(state.variant === 'none' ? {} : { variant: state.variant! }),
        size: state.size!,
      }),
    },
    {
      title: 'Icons',
      description: 'Add an icon before or after the label. Inline, icons follow the font size.',
      controls: [],
      props: () => ({ to, label: 'Button docs', trailingIcon: 'chevronRight' }),
    },
    {
      title: 'New tab',
      description:
        'Set the native target attribute. With _blank, rel="noopener noreferrer" is added unless you pass your own rel.',
      controls: [],
      props: () => ({ href: 'https://ui-sdk.dev', target: '_blank', label: 'ui-sdk' }),
    },
    {
      title: 'Disabled',
      description: 'Stop navigation and remove it from the tab order.',
      controls: [],
      props: () => ({ to, label: 'Button docs', disabled: true }),
    },
  ],
  accessibility: [
    {
      title: 'Links and buttons',
      description:
        'Link always renders an a element, so it keeps link semantics: Enter follows it, and the browser can open it in a new tab. Use it for navigation, and a Button for actions, even when it looks like one.',
    },
    {
      title: 'Active route',
      description:
        'With vue-router, it gets data-active while its route matches, or only on an exact match with exact. Style it with ui.root or a data-active: class.',
    },
    {
      title: 'Disabled links',
      description:
        'A disabled link gets aria-disabled, leaves the tab order and does not navigate. Prefer hiding a link the user can never follow.',
    },
  ],
  api: {
    props: [
      { name: 'label', type: 'string', description: 'Text of the link.' },
      {
        name: 'to',
        type: 'string | RouteLocationRaw',
        description:
          'Route to navigate to through vue-router. Without a router, or for a URL with a protocol, it is used as the href.',
      },
      {
        name: 'href',
        type: 'string',
        description: 'URL for a plain link. Takes precedence over to.',
      },
      {
        name: 'external',
        type: 'boolean',
        description:
          'Skips the router. Detected for strings in to that start with a protocol or //.',
      },
      {
        name: 'replace',
        type: 'boolean',
        default: 'false',
        description: 'Replaces the current history entry instead of adding one.',
      },
      {
        name: 'exact',
        type: 'boolean',
        default: 'false',
        description: 'Sets data-active only when the route matches exactly.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Stops navigation and removes it from the tab order.',
      },
      {
        name: 'variant',
        type: buttonVariantNames.map((variant) => `'${variant}'`).join(' | '),
        description:
          'Without it, inline text with no height or padding. With it, the look of a Button of that variant.',
      },
      {
        name: 'color',
        type: 'string',
        default: `'${linkDefaults.color}'`,
        description:
          'Theme token such as primary or error, a custom token, or a CSS color such as #6366f1.',
      },
      {
        name: 'size',
        type: buttonSizes.map((size) => `'${size}'`).join(' | '),
        default: `'${linkDefaults.size}'`,
        description:
          'Button size. Only applies with a variant; inline, it takes the surrounding font size.',
      },
      {
        name: 'radius',
        type: 'string | number',
        default: `'${linkDefaults.radius}'`,
        description: 'Button radius. Only applies with a variant.',
      },
      { name: 'leadingIcon', type: 'IconName', description: 'Icon before the label.' },
      { name: 'trailingIcon', type: 'IconName', description: 'Icon after the label.' },
      {
        name: 'block',
        type: 'boolean',
        default: 'false',
        description: 'Takes the full width. Only applies with a variant.',
      },
      {
        name: 'square',
        type: 'boolean',
        description:
          'Makes the link as wide as it is tall. On by default when it has an icon and no label or default slot. Only applies with a variant.',
      },
      {
        name: 'ui',
        type: 'LinkUi',
        typeLink: '#ui',
        description: 'HTML attributes for the root and each inner node. See UI.',
      },
    ],
    emits: [],
    ui: [
      { node: 'root', tag: 'a' },
      { node: 'leading', tag: 'span' },
      { node: 'leadingIcon', tag: 'svg' },
      { node: 'label', tag: 'span' },
      { node: 'trailing', tag: 'span' },
      { node: 'trailingIcon', tag: 'svg' },
    ],
    slots: [
      { name: 'default', type: '{}', description: 'Content of the link; overrides the label.' },
      { name: 'leading', type: '{}', description: 'Content before the label.' },
      { name: 'trailing', type: '{}', description: 'Content after the label.' },
    ],
    expose: [],
  },
}

export default link
