import type { ComponentDocConfig, ExampleSlotContent } from '@docs/config/component-docs'
import {
  Avatar,
  Button,
  Empty,
  emptyDefaults,
  emptySizes,
  emptyVariantNames,
  IconTile,
  Input,
  themeRadii,
} from '@nono/ui'

const text = {
  icon: 'folder',
  label: 'No projects yet',
  description: 'Create your first project to start organizing your work.',
} as const

const actions: ExampleSlotContent[] = [
  { name: 'Button', component: Button, props: { label: 'Create project', icon: 'plus' } },
  {
    name: 'Button',
    component: Button,
    props: { label: 'Import', variant: 'outline', color: 'neutral' },
  },
]

const empty: ComponentDocConfig = {
  slug: 'empty',
  title: 'Empty',
  description: 'Fills a view that has no content yet, and tells what to do next.',
  component: Empty,
  slot: actions,
  usage: [
    {
      title: 'Basic usage',
      description:
        'Pass the icon, label and description as props. Put the actions in the default slot.',
      props: () => ({ ...text }),
    },
  ],
  examples: [
    {
      title: 'Variant',
      description:
        'Plain has no frame, for views that already have one. Outline draws a dashed border, soft a muted background, subtle both, and elevated a card with a shadow.',
      controls: [
        {
          key: 'variant',
          label: 'Variant',
          type: 'select',
          options: emptyVariantNames,
          default: 'outline',
        },
      ],
      props: (state) => ({ ...text, variant: state.variant! }),
    },
    {
      title: 'Size',
      description: 'Adjust the padding, the gaps, the text and the icon tile.',
      controls: [
        {
          key: 'size',
          label: 'Size',
          type: 'select',
          options: emptySizes,
          default: emptyDefaults.size,
        },
      ],
      props: (state) => ({ ...text, size: state.size!, variant: 'outline' }),
    },
    {
      title: 'Radius',
      description:
        'Use a theme radius, none, full, or any CSS length. It shows with every variant but plain.',
      controls: [
        {
          key: 'radius',
          label: 'Radius',
          type: 'select',
          options: themeRadii,
          default: emptyDefaults.radius,
        },
      ],
      props: (state) => ({ ...text, radius: state.radius!, variant: 'soft' }),
    },
    {
      title: 'Media',
      description:
        'Replace the icon with the media slot, such as an IconTile with another variant or an illustration.',
      controls: [],
      props: () => ({
        label: 'Cloud storage is empty',
        description: 'Upload files to your cloud storage to access them anywhere.',
        variant: 'outline',
      }),
      slot: [
        {
          slot: 'media',
          name: 'IconTile',
          component: IconTile,
          props: { icon: 'upload', variant: 'frame', size: 'lg' },
        },
        {
          name: 'Button',
          component: Button,
          props: { label: 'Upload files', variant: 'outline', color: 'neutral' },
        },
      ],
    },
    {
      title: 'Avatar',
      description: 'Put an Avatar in the media slot for states about a person.',
      controls: [],
      props: () => ({
        label: 'Ada is offline',
        description: 'Leave a message to read when Ada is back.',
      }),
      slot: [
        {
          slot: 'media',
          name: 'Avatar',
          component: Avatar,
          props: { 'aria-label': 'Ada Lovelace', text: 'AL', size: 'xl' },
        },
        { name: 'Button', component: Button, props: { label: 'Leave a message' } },
      ],
    },
    {
      title: 'With input',
      description: 'Put an Input in the default slot, such as a search on a not found page.',
      controls: [],
      props: () => ({
        icon: 'search',
        label: 'Page not found',
        description: 'The page you are looking for does not exist. Try searching for it.',
      }),
      slot: [
        {
          name: 'Input',
          component: Input,
          props: { placeholder: 'Search pages...', icon: 'search' },
        },
      ],
    },
    {
      title: 'Without actions',
      description: 'Leave the default slot empty when there is nothing to do yet.',
      controls: [],
      props: () => ({
        icon: 'file',
        label: 'No documents',
        description: 'Documents shared with you will show up here.',
        size: 'sm',
      }),
      slot: [],
    },
  ],
  accessibility: [
    {
      title: 'Roles and attributes',
      description:
        'Empty renders native divs with no role. Attributes passed to Empty reach the root.',
      table: {
        columns: ['Attribute', 'Element', 'Value'],
        rows: [
          ['div', 'Root', 'Block element with no role.'],
          ['aria-hidden="true"', 'Icon', 'The icon is decorative.'],
        ],
      },
    },
    {
      title: 'Heading',
      description:
        'The label is not a heading, since only the page knows the right level. When it should be one, pass role="heading" and aria-level through ui.label.',
    },
    {
      title: 'Live updates',
      description:
        'When the state shows up after an action, such as a search with no results, pass role="status" so screen readers announce it.',
    },
  ],
  api: {
    props: [
      { name: 'icon', type: 'IconName', description: 'Icon shown in an IconTile above the label.' },
      { name: 'label', type: 'string', description: 'Short line that says what is missing.' },
      { name: 'description', type: 'string', description: 'Text under the label.' },
      {
        name: 'variant',
        type: emptyVariantNames.map((variant) => `'${variant}'`).join(' | '),
        default: `'${emptyDefaults.variant}'`,
        description: 'Frame around the state.',
      },
      {
        name: 'size',
        type: emptySizes.map((size) => `'${size}'`).join(' | '),
        default: `'${emptyDefaults.size}'`,
        description: 'Padding, gaps, text size and icon tile size.',
      },
      {
        name: 'radius',
        type: 'string | number',
        default: `'${emptyDefaults.radius}'`,
        description:
          'Theme radius such as sm or lg, none, full, a number in pixels, or a CSS length.',
      },
      {
        name: 'ui',
        type: 'EmptyUi',
        typeLink: '#ui',
        description: 'HTML attributes for the root and each inner node. See UI.',
      },
    ],
    emits: [],
    ui: [
      { node: 'root', tag: 'div' },
      { node: 'media', tag: 'div' },
      { node: 'icon', tag: 'span' },
      { node: 'label', tag: 'div' },
      { node: 'description', tag: 'div' },
      { node: 'content', tag: 'div' },
    ],
    slots: [
      { name: 'default', type: '-', description: 'Actions, such as buttons, links or an input.' },
      { name: 'media', type: '-', description: 'Media above the label; overrides the icon.' },
      { name: 'label', type: '-', description: 'Label content; overrides the label prop.' },
      {
        name: 'description',
        type: '-',
        description: 'Description content; overrides the description prop.',
      },
    ],
    expose: [],
  },
}

export default empty
