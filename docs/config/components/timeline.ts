import type { ComponentDocConfig, ExampleValue } from '@docs/config/component-docs'
import { withSource } from '@docs/config/component-docs'
import {
  Timeline,
  type TimelineItemContext,
  timelineAligns,
  timelineDefaults,
  timelineOrientations,
  timelineSizes,
  timelineStatuses,
  themeColors,
} from '@nono/ui'

const booleans = ['false', 'true']
const variants = (value: readonly string[]) => value.map((item) => `'${item}'`).join(' | ')

const itemContext = { state: 'TimelineItemContext', stateLink: '#timeline-item-context' }

const itemContextSlot = { type: 'TimelineItemContext', typeLink: '#timeline-item-context' }

const order: ExampleValue = [
  {
    value: 'ordered',
    date: '2026-03-02T09:00:00Z',
    label: 'Order placed',
    description: 'Paid by card.',
  },
  { value: 'packed', date: '2026-03-03T14:30:00Z', label: 'Packed' },
  {
    value: 'shipped',
    date: '2026-03-04T08:15:00Z',
    label: 'Shipped',
    description: 'Handed to the carrier.',
  },
  { value: 'delivered', label: 'Delivered' },
]

const project: ExampleValue = [
  { value: 'kickoff', label: 'Kickoff', description: 'Scope and goals agreed.', icon: 'fileText' },
  { value: 'design', label: 'Design', description: 'Wireframes and mockups.', icon: 'image' },
  { value: 'build', label: 'Build', description: 'Features and tests.', icon: 'folderOpen' },
  { value: 'launch', label: 'Launch', description: 'Released to everyone.', icon: 'upload' },
]

const activity: ExampleValue = [
  {
    date: '2026-03-04T10:12:00Z',
    label: 'Ana Ruiz commented',
    description: 'Looks good, just one question about the totals.',
  },
  { date: '2026-03-04T09:40:00Z', label: 'Luis Gómez approved the changes' },
  { date: '2026-03-03T17:05:00Z', label: 'Eva Martín opened the request' },
]

const releases: ExampleValue = [
  { value: 'v3', date: '2026-03-01', label: 'v3.0', description: 'New editor.' },
  { value: 'v2', date: '2025-09-15', label: 'v2.0', description: 'Dark mode.' },
  { value: 'v1', date: '2025-01-20', label: 'v1.0', description: 'First release.' },
]

const mixed: ExampleValue = [
  { label: 'Submitted', status: 'complete' },
  { label: 'In review', status: 'current' },
  { label: 'Translated', status: 'complete' },
  { label: 'Published', status: 'upcoming' },
]

const emphasizeCurrent: ExampleValue = {
  label: withSource(
    "({ status }) => ({ class: status === 'current' ? 'text-primary' : '' })",
    ({ status }: TimelineItemContext) => ({ class: status === 'current' ? 'text-primary' : '' }),
  ),
}

const timeline: ComponentDocConfig = {
  slug: 'timeline',
  title: 'Timeline',
  description:
    'A list of dated events, like the steps of an order or an activity feed, with one tab stop and arrow keys between events.',
  component: Timeline,
  usage: [
    {
      title: 'Basic usage',
      description:
        'Pass the events as items. Set value to the current one: the events before it are complete and the ones after it upcoming. Name the timeline with an aria-label.',
      props: () => ({ items: order, value: 'shipped', 'aria-label': 'Order history' }),
    },
  ],
  examples: [
    {
      title: 'Value',
      description:
        'Move value to move the current event. Without value the events have no status, as in an activity feed.',
      controls: [
        {
          key: 'value',
          label: 'Value',
          type: 'select',
          options: ['none', 'kickoff', 'design', 'build', 'launch'],
          default: 'design',
        },
      ],
      props: (state) => ({
        items: project,
        ...(state.value === 'none' ? {} : { value: state.value! }),
        'aria-label': 'Project',
      }),
    },
    {
      title: 'Reverse',
      description:
        'Run the progress from the last event to the first, for lists that put the newest event on top: the events after value are complete.',
      controls: [
        {
          key: 'reverse',
          label: 'Reverse',
          type: 'select',
          options: booleans,
          default: 'true',
        },
      ],
      props: (state) => ({
        items: releases,
        value: 'v2',
        reverse: state.reverse === 'true',
        dateOptions: { dateStyle: 'medium' },
        'aria-label': 'Releases',
      }),
    },
    {
      title: 'Status',
      description:
        'Give an item its own status when the steps do not follow one another. It wins over the one value gives.',
      controls: [],
      props: () => ({ items: mixed, 'aria-label': 'Review' }),
    },
    {
      title: 'Feed',
      description:
        'Make the events a feed of articles, such as an activity feed. Without value the events have no status.',
      controls: [],
      props: () => ({
        items: activity,
        feed: true,
        dateOptions: { dateStyle: 'medium', timeStyle: 'short', timeZone: 'UTC' },
        'aria-label': 'Activity',
      }),
    },
    {
      title: 'Date',
      description:
        'date takes a Date, a timestamp or an ISO string and renders as a Time under the label, formatted for the locale with dateOptions. A string that is not a date shows as it is.',
      controls: [
        {
          key: 'dateStyle',
          label: 'Date style',
          type: 'select',
          options: ['full', 'long', 'medium', 'short'],
          default: 'long',
        },
      ],
      props: (state) => ({
        items: order,
        value: 'shipped',
        dateOptions: { dateStyle: state.dateStyle! },
        'aria-label': 'Order history',
      }),
    },
    {
      title: 'Align',
      description:
        'Put the content after the line, before it, or alternate the sides from one event to the next. With alternate, or with the opposite slot, the line sits in the middle.',
      controls: [
        {
          key: 'align',
          label: 'Align',
          type: 'select',
          options: timelineAligns,
          default: 'alternate',
        },
        {
          key: 'orientation',
          label: 'Orientation',
          type: 'select',
          options: timelineOrientations,
          default: 'vertical',
        },
      ],
      props: (state) => ({
        items: order,
        value: 'shipped',
        align: state.align!,
        orientation: state.orientation!,
        'aria-label': 'Order history',
      }),
    },
    {
      title: 'Orientation',
      description:
        'Lay the events out in a row. Left and Right move between them instead of Up and Down.',
      controls: [
        {
          key: 'orientation',
          label: 'Orientation',
          type: 'select',
          options: timelineOrientations,
          default: 'horizontal',
        },
      ],
      props: (state) => ({
        items: order,
        value: 'shipped',
        orientation: state.orientation!,
        'aria-label': 'Order history',
      }),
    },
    {
      title: 'Color',
      description:
        'Choose a palette token or a hexadecimal color for the complete and current markers and the lines between complete events.',
      controls: [
        {
          key: 'color',
          label: 'Color',
          type: 'select',
          options: [...themeColors, 'custom'],
          default: 'success',
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
        items: project,
        value: 'build',
        color: state.color === 'custom' ? state.custom! : state.color!,
        'aria-label': 'Project',
      }),
    },
    {
      title: 'Size',
      description: 'Adjust the markers, the text and the space between events.',
      controls: [
        {
          key: 'size',
          label: 'Size',
          type: 'select',
          options: timelineSizes,
          default: 'lg',
        },
      ],
      props: (state) => ({
        items: project,
        value: 'build',
        size: state.size!,
        'aria-label': 'Project',
      }),
    },
    {
      title: 'UI',
      description:
        'Every ui key but root receives the item context, so one function can style each event by its status.',
      controls: [],
      props: () => ({
        items: project,
        value: 'design',
        ui: emphasizeCurrent,
        'aria-label': 'Project',
      }),
    },
  ],
  accessibility: [
    {
      title: 'Roles and attributes',
      description:
        'Timeline renders the ui-sdk timeline. Attributes passed to Timeline reach the root. Markers and lines are hidden from assistive technology.',
      table: {
        columns: ['Attribute', 'Element', 'Value'],
        rows: [
          ['role="list"', 'Root', 'The events. role="feed" with feed.'],
          ['role="listitem"', 'Item', 'Each event. role="article" with feed.'],
          ['aria-labelledby', 'Item', 'Points to the label, which names the event.'],
          ['aria-describedby', 'Item', 'Points to the date and description.'],
          ['aria-current="step"', 'Item', 'Set on the current event.'],
          ['aria-hidden="true"', 'Marker, connector', 'Decorative.'],
          ['aria-busy', 'Root', 'Set from busy while a feed loads.'],
        ],
      },
    },
    {
      title: 'Keyboard',
      description:
        'The timeline is one tab stop. Tab enters on the current event, or the first one. Arrow keys move between events, Home and End jump to the ends, and Tab moves on to links and buttons inside an event. In a feed, Page Down and Page Up move between articles from inside one.',
    },
    {
      title: 'Labelling',
      description:
        'Give the timeline an aria-label or aria-labelledby. Give each event a label, which names it.',
    },
  ],
  api: {
    props: [
      {
        name: 'items',
        type: 'TimelineItem[]',
        typeLink: '#timeline-item',
        default: '[]',
        description: 'The events, in order.',
      },
      {
        name: 'value',
        type: 'string',
        description:
          'Value of the current event. The events before it are complete and the ones after it upcoming, or the other way with reverse. Without it the events have no status.',
      },
      {
        name: 'reverse',
        type: 'boolean',
        default: String(timelineDefaults.reverse),
        description: 'Runs the progress from the last event to the first.',
      },
      {
        name: 'dateOptions',
        type: 'Intl.DateTimeFormatOptions & { locale?: string }',
        description: 'How item dates are formatted. Without it, the short date of the locale.',
      },
      {
        name: 'orientation',
        type: variants(timelineOrientations),
        default: `'${timelineDefaults.orientation}'`,
        description: 'Lays the events out in a column or a row, and picks the arrow keys.',
      },
      {
        name: 'align',
        type: variants(timelineAligns),
        default: `'${timelineDefaults.align}'`,
        description:
          'Puts the content after the line, before it, or alternates the sides. The opposite slot fills the other side.',
      },
      {
        name: 'loop',
        type: 'boolean',
        default: 'true',
        description: 'Whether the arrow keys wrap from the last event to the first.',
      },
      {
        name: 'feed',
        type: 'boolean',
        default: 'false',
        description:
          'Makes the events a feed of articles that loads more as people scroll, with Page Down and Page Up between them.',
      },
      {
        name: 'busy',
        type: 'boolean',
        default: 'false',
        description: 'Sets aria-busy while a feed loads or changes events. Only a feed reads it.',
      },
      {
        name: 'color',
        type: 'string',
        default: `'${timelineDefaults.color}'`,
        description:
          'Theme token such as primary or success, a custom token, or a CSS color such as #6366f1.',
      },
      {
        name: 'size',
        type: variants(timelineSizes),
        default: `'${timelineDefaults.size}'`,
        description: 'Size of the markers and text, and space between events.',
      },
      {
        name: 'ui',
        type: 'TimelineUi',
        typeLink: '#ui',
        description:
          'HTML attributes for the root and each node of every event, which receive the item context. See UI.',
      },
    ],
    configs: [
      {
        id: 'timeline-item',
        title: 'TimelineItem',
        rows: [
          {
            name: 'value',
            type: 'string',
            description: 'Identifies the event for value and focus().',
          },
          {
            name: 'date',
            type: 'Date | number | string',
            description: 'When it happened, shown under the label as a Time with dateOptions.',
          },
          { name: 'label', type: 'string', description: 'What happened. It names the event.' },
          { name: 'description', type: 'string', description: 'More about the event.' },
          { name: 'icon', type: 'IconName', description: 'Icon in the marker.' },
          {
            name: 'status',
            type: variants(timelineStatuses),
            description: 'Status of the event; wins over the one from value.',
          },
        ],
      },
      {
        id: 'timeline-item-context',
        title: 'TimelineItemContext',
        rows: [
          {
            name: 'item',
            type: 'TimelineItem',
            typeLink: '#timeline-item',
            description: 'The event, as passed in items.',
          },
          { name: 'index', type: 'number', description: 'Position of the event in items.' },
          {
            name: 'status',
            type: `${variants(timelineStatuses)} | undefined`,
            description: 'The status of the item, or the one value gives. Undefined without both.',
          },
          { name: 'last', type: 'boolean', description: 'Whether it is the last event.' },
          {
            name: 'formatted',
            type: 'string',
            description: 'Only in the date slot: the date as Time formats it.',
          },
        ],
      },
    ],
    emits: [],
    ui: [
      { node: 'root', tag: 'div', kept: 'role' },
      { node: 'item', tag: 'div', ...itemContext, kept: 'role, tabindex, aria-current' },
      { node: 'marker', tag: 'div', ...itemContext, kept: 'aria-hidden' },
      { node: 'icon', tag: 'svg', ...itemContext },
      { node: 'connector', tag: 'div', ...itemContext, kept: 'aria-hidden' },
      { node: 'label', tag: 'div', ...itemContext },
      { node: 'date', tag: 'time', ...itemContext },
      { node: 'description', tag: 'div', ...itemContext },
    ],
    slots: [
      {
        name: 'marker',
        ...itemContextSlot,
        description:
          'Content of each marker; overrides the icon. Use it for an avatar or a number.',
      },
      {
        name: 'label',
        ...itemContextSlot,
        description: 'Content of each label; overrides item.label.',
      },
      {
        name: 'date',
        type: 'TimelineItemContext & { formatted: string }',
        typeLink: '#timeline-item-context',
        description: 'Content of each date; Time gives the formatted date as formatted.',
      },
      {
        name: 'description',
        ...itemContextSlot,
        description: 'Content of each description; overrides item.description.',
      },
      {
        name: 'content',
        ...itemContextSlot,
        description: 'Extra content of each event after the description, such as links or buttons.',
      },
      {
        name: 'opposite',
        ...itemContextSlot,
        description:
          'Content on the other side of the line from each event, such as its date. Setting it centers the line.',
      },
    ],
    expose: [
      {
        name: 'focus',
        type: '(value?: string) => void',
        description: 'Moves focus to an event, or to the one holding the tab stop.',
      },
    ],
  },
}

export default timeline
