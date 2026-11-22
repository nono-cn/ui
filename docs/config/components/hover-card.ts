import type { ComponentDocConfig, ExampleSlotContent } from '@docs/config/component-docs'
import {
  Avatar,
  HoverCard,
  hoverCardAligns,
  hoverCardDefaults,
  hoverCardSides,
  Link,
  themeRadii,
} from '@nono/ui'

const preview: ExampleSlotContent = {
  slot: 'content',
  text: 'Ada Lovelace wrote the first published program, for the Analytical Engine.',
}

const trigger: ExampleSlotContent[] = [
  {
    name: 'Link',
    component: Link,
    props: { label: 'Ada Lovelace', href: 'https://en.wikipedia.org/wiki/Ada_Lovelace' },
  },
  preview,
]

const contentState = `{
  open: boolean
}`

const hoverCard: ComponentDocConfig = {
  slug: 'hover-card',
  title: 'HoverCard',
  description: 'Previews more about its trigger while the pointer rests on it or it has focus.',
  component: HoverCard,
  slot: trigger,
  usage: [
    {
      title: 'Basic usage',
      description:
        'Put the trigger in the default slot and the preview in the content slot. The trigger needs no props: it is wrapped in a span, and focus on anything inside it opens the card.',
      props: () => ({}),
    },
    {
      title: 'Any component as trigger',
      description:
        'Put any component in the default slot, such as an Avatar. Content that cannot take focus opens the card only on hover.',
      props: () => ({}),
      slot: [{ name: 'Avatar', component: Avatar, props: { alt: 'Ada Lovelace' } }, preview],
    },
  ],
  examples: [
    {
      title: 'Position',
      description:
        'Choose the side and the alignment. The card flips and shifts to stay on screen.',
      controls: [
        {
          key: 'side',
          label: 'Side',
          type: 'select',
          options: hoverCardSides,
          default: hoverCardDefaults.side,
        },
        {
          key: 'align',
          label: 'Align',
          type: 'select',
          options: hoverCardAligns,
          default: hoverCardDefaults.align,
        },
      ],
      props: (state) => ({ side: state.side!, align: state.align! }),
    },
    {
      title: 'Arrow',
      description:
        'Point at the trigger. The gap grows to 8px to fit it, unless you set sideOffset.',
      controls: [],
      props: () => ({ arrow: true }),
    },
    {
      title: 'Delays',
      description:
        'Change how long the pointer or focus rests before it opens, and before it closes.',
      controls: [
        {
          key: 'delay',
          label: 'Delay',
          type: 'select',
          options: ['0', '300', '600', '1000'],
          default: '600',
        },
        {
          key: 'closeDelay',
          label: 'Close delay',
          type: 'select',
          options: ['0', '150', '300', '600'],
          default: '300',
        },
      ],
      props: (state) => ({
        delay: Number(state.delay),
        closeDelay: Number(state.closeDelay),
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
          default: hoverCardDefaults.radius,
        },
      ],
      props: (state) => ({ radius: state.radius! }),
    },
    {
      title: 'Disabled',
      description: 'Stop the card from opening. The trigger keeps working.',
      controls: [],
      props: () => ({ disabled: true }),
    },
  ],
  accessibility: [
    {
      title: 'A preview, not a dialog',
      description:
        'Touch has no hover, so a tap never opens the card, and screen readers may skip it. Keep everything in the card reachable elsewhere. For content opened by a press use a popover.',
    },
    {
      title: 'Keyboard',
      description:
        'Focus on anything inside the trigger opens the card after the same delay as hover. Tab then moves into the card, Escape closes it and focus leaving it closes it. Content that cannot take focus, such as an Avatar alone, opens it only on hover.',
    },
  ],
  api: {
    props: [
      { name: 'open', type: 'boolean', description: 'Whether it is open, for v-model:open.' },
      {
        name: 'defaultOpen',
        type: 'boolean',
        default: 'false',
        description: 'Whether it starts open when uncontrolled.',
      },
      {
        name: 'delay',
        type: 'number',
        default: '600',
        description: 'Milliseconds the pointer or focus rests on the trigger before it opens.',
      },
      {
        name: 'closeDelay',
        type: 'number',
        default: '300',
        description:
          'Milliseconds before it closes once the pointer leaves the trigger and the card.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Stops it from opening.',
      },
      {
        name: 'side',
        type: hoverCardSides.map((side) => `'${side}'`).join(' | '),
        default: `'${hoverCardDefaults.side}'`,
        description: 'Side of the trigger it opens on. It flips when there is no room.',
      },
      {
        name: 'align',
        type: hoverCardAligns.map((align) => `'${align}'`).join(' | '),
        default: `'${hoverCardDefaults.align}'`,
        description: 'Alignment along the trigger. start and end follow the reading direction.',
      },
      {
        name: 'sideOffset',
        type: 'number',
        default: '4, or 8 with arrow',
        description: 'Gap to the trigger, in pixels.',
      },
      {
        name: 'alignOffset',
        type: 'number',
        default: '0',
        description: 'Shift along the trigger, in pixels.',
      },
      {
        name: 'collisionPadding',
        type: 'number',
        description: 'Space to keep from the viewport edges, in pixels.',
      },
      {
        name: 'arrowPadding',
        type: 'number',
        description: 'Space to keep between the arrow and the corners, in pixels.',
      },
      {
        name: 'anchor',
        type: 'Anchor | string | null',
        description:
          'Positions it against another element, a CSS selector or a { x, y } point instead of the trigger.',
      },
      {
        name: 'container',
        type: 'Element | DocumentFragment | null',
        description:
          'Renders the card inside this element, for shadow roots, iframes or a stacking context.',
      },
      {
        name: 'keepMounted',
        type: 'boolean',
        default: 'false',
        description: 'Keeps the closed card in the page, hidden.',
      },
      {
        name: 'arrow',
        type: 'boolean',
        default: `${hoverCardDefaults.arrow}`,
        description: 'Shows an arrow that points at the trigger.',
      },
      {
        name: 'radius',
        type: 'string | number',
        default: `'${hoverCardDefaults.radius}'`,
        description:
          'Theme radius such as sm or lg, none, full, a number in pixels, or a CSS length.',
      },
      {
        name: 'ui',
        type: 'HoverCardUi',
        typeLink: '#ui',
        description:
          'HTML attributes for each node. Attributes on the component itself go nowhere, since it has no root.',
      },
    ],
    emits: [
      {
        name: 'update:open',
        type: '(open: boolean) => void',
        description: 'Runs when it opens or closes. Not when the change is canceled.',
      },
      {
        name: 'openChange',
        type: '(open: boolean, details: HoverCardOpenChangeDetails) => void',
        description:
          'Runs before it opens or closes. details.reason says why, such as trigger-hover or escape-key, and details.cancel() stops it.',
      },
      {
        name: 'openChangeComplete',
        type: '(open: boolean) => void',
        description: 'Runs once it has opened or closed, after the animation.',
      },
    ],
    ui: [
      {
        node: 'trigger',
        tag: 'span',
        state: contentState,
      },
      { node: 'content', tag: 'div', state: contentState, kept: 'id, tabindex, popover, style' },
      { node: 'arrow', tag: 'div', state: contentState, kept: 'aria-hidden, style' },
    ],
    slots: [
      {
        name: 'default',
        type: contentState,
        typePre: true,
        description: 'The trigger. Put text or any component; it needs no props.',
      },
      {
        name: 'content',
        type: contentState,
        typePre: true,
        description: 'The card. open turns false while it animates out.',
      },
    ],
    expose: [
      {
        name: 'setOpen',
        type: '(open: boolean, options?) => boolean',
        description: 'Opens or closes it. Returns false when the change is canceled or unchanged.',
      },
      { name: 'close', type: '(options?) => boolean', description: 'Closes it.' },
      { name: 'toggle', type: '(options?) => boolean', description: 'Opens or closes it.' },
      { name: 'isOpen', type: '() => boolean', description: 'Whether it is open.' },
      {
        name: 'focus',
        type: '() => void',
        description: 'Moves focus to the trigger.',
      },
    ],
  },
}

export default hoverCard
