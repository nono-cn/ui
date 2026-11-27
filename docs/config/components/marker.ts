import type { ComponentDocConfig, ExampleProps, ExampleState } from '@docs/config/component-docs'
import { iconNames, Marker, markerDefaults, markerVariantNames } from '@nono/ui'

const booleans = ['false', 'true']
const icons = ['none', ...iconNames]
const elements = ['div', 'a', 'button']
const width = 'max-w-sm'

function icon(state: ExampleState): ExampleProps {
  return state.icon && state.icon !== 'none' ? { icon: state.icon } : {}
}

function element(state: ExampleState): ExampleProps {
  if (state.as === 'a') return { as: 'a', href: '#' }
  if (state.as === 'button') return { as: 'button', type: 'button' }
  return {}
}

const marker: ComponentDocConfig = {
  slug: 'marker',
  title: 'Marker',
  description:
    'An inline status, system note, bordered row or labeled separator in a conversation or log.',
  component: Marker,
  usage: [
    {
      title: 'Basic usage',
      description: 'Pass the text with the label prop, or put it in the default slot.',
      props: () => ({ label: 'A marker for inline notes.' }),
    },
  ],
  examples: [
    {
      title: 'Variant',
      description:
        'Plain is an inline row, border adds a rule under the row and separator draws a line on each side of the label.',
      controls: [
        {
          key: 'variant',
          label: 'Variant',
          type: 'select',
          options: markerVariantNames,
          default: 'separator',
        },
      ],
      props: (state) => ({
        label: 'Conversation compacted',
        variant: state.variant!,
        class: width,
      }),
    },
    {
      title: 'Icon',
      description: 'Place a decorative icon before the label. The icon slot replaces it.',
      controls: [{ key: 'icon', label: 'Icon', type: 'select', options: icons, default: 'search' }],
      props: (state) => ({ label: 'Reviewed 8 related files', ...icon(state) }),
    },
    {
      title: 'Loading',
      description:
        'Show a spinner in place of the icon while a step runs. Set role="status" so updates to the text are announced.',
      controls: [
        { key: 'loading', label: 'Loading', type: 'select', options: booleans, default: 'true' },
        {
          key: 'variant',
          label: 'Variant',
          type: 'select',
          options: markerVariantNames,
          default: markerDefaults.variant,
        },
      ],
      props: (state) => ({
        label: state.loading === 'true' ? 'Running tests' : 'Tests passed',
        icon: 'check',
        loading: state.loading === 'true',
        variant: state.variant!,
        role: 'status',
        class: width,
      }),
    },
    {
      title: 'Shimmer',
      description:
        'Sweep a highlight across the label for streaming text. It stays still when the user prefers reduced motion.',
      controls: [
        { key: 'shimmer', label: 'Shimmer', type: 'select', options: booleans, default: 'true' },
      ],
      props: (state) => ({
        label: 'Thinking...',
        shimmer: state.shimmer === 'true',
        role: 'status',
      }),
    },
    {
      title: 'Element',
      description:
        'Render the root as a link or a button with as. Attributes such as href or type reach that element. Links underline on hover.',
      controls: [
        { key: 'as', label: 'As', type: 'select', options: elements, default: 'a' },
        {
          key: 'variant',
          label: 'Variant',
          type: 'select',
          options: markerVariantNames,
          default: markerDefaults.variant,
        },
      ],
      props: (state) => ({
        label: 'View the pull request',
        icon: 'fileText',
        variant: state.variant!,
        class: width,
        ...element(state),
      }),
    },
    {
      title: 'Stacked',
      description: 'Add flex-col to the root to stack the icon above the label.',
      props: () => ({
        label: 'Syncing completed',
        icon: 'success',
        class: 'flex-col items-center',
      }),
    },
  ],
  accessibility: [
    {
      title: 'Roles and attributes',
      description:
        'Marker renders a div with no role, read as part of the surrounding content. Pick a role by intent. Attributes passed to Marker reach the root.',
      table: {
        columns: ['Attribute', 'Element', 'Value'],
        rows: [
          ['div', 'Root', 'Element with no role, or the element set with as.'],
          [
            'role="status"',
            'Root',
            'Set it on markers whose text updates, such as a running step, so assistive technology announces the change.',
          ],
          [
            'aria-hidden="true"',
            'Leading',
            'The icon, spinner or icon slot is decorative, so the label must carry the meaning.',
          ],
        ],
      },
    },
    {
      title: 'Separators',
      description:
        'Do not set role="separator" on the separator variant: a separator takes its name from aria-label and its content is presentational, so the visible label would not be announced.',
    },
    {
      title: 'Icon only',
      description:
        'A marker without a label has no text to read. Give it an aria-label, or keep visible text.',
    },
    {
      title: 'Interactive markers',
      description:
        'Use as="a" with an href, or as="button", so the marker is focusable and works with the keyboard. Its accessible name comes from the label.',
    },
  ],
  api: {
    props: [
      {
        name: 'label',
        type: 'string',
        description: 'Text of the marker. The default slot replaces it.',
      },
      {
        name: 'icon',
        type: 'IconName',
        description: 'Decorative icon before the label; the icon slot replaces it.',
      },
      {
        name: 'variant',
        type: markerVariantNames.map((variant) => `'${variant}'`).join(' | '),
        default: `'${markerDefaults.variant}'`,
        description:
          'Layout of the marker: an inline row, a row with a rule under it, or a label between two lines.',
      },
      {
        name: 'loading',
        type: 'boolean',
        default: String(markerDefaults.loading),
        description: 'Shows a spinner, or the loading slot, in place of the icon.',
      },
      {
        name: 'shimmer',
        type: 'boolean',
        default: String(markerDefaults.shimmer),
        description:
          'Sweeps a highlight across the label, for streaming text. Off when the user prefers reduced motion.',
      },
      {
        name: 'as',
        type: 'string | Component',
        default: `'${markerDefaults.as}'`,
        description:
          'Element or component of the root, such as a, button or RouterLink. Links and buttons get hover and focus styles.',
      },
      {
        name: 'ui',
        type: 'MarkerUi',
        typeLink: '#ui',
        description: 'HTML attributes for the root and each inner node. See UI.',
      },
    ],
    emits: [],
    ui: [
      { node: 'root', tag: 'div' },
      { node: 'icon', tag: 'svg' },
      { node: 'loadingIcon', tag: 'svg' },
      { node: 'label', tag: 'span' },
    ],
    slots: [
      {
        name: 'default',
        type: '-',
        description: 'Content of the label node; replaces the label text.',
      },
      {
        name: 'icon',
        type: '-',
        description: 'Decorative content before the label; overrides the icon fallback.',
      },
      {
        name: 'loading',
        type: '-',
        description: 'Content shown while loading; overrides the spinner.',
      },
    ],
    expose: [],
  },
}

export default marker
