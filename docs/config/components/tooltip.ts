import type { ComponentDocConfig, ExampleSlotContent } from '@docs/config/component-docs'
import {
  Button,
  themeRadii,
  Tooltip,
  tooltipAligns,
  tooltipDefaults,
  tooltipSides,
  tooltipTypes,
} from '@nono/ui'

const button: ExampleSlotContent = {
  name: 'Button',
  component: Button,
  props: { label: 'Share', variant: 'outline' },
}

const iconButton: ExampleSlotContent = {
  name: 'Button',
  component: Button,
  props: { icon: 'save', variant: 'outline', 'aria-label': 'Save' },
}

const contentState = `{
  open: boolean
}`

const shortcutState = `{
  text: string
}`

const hint = 'Anyone with the link can view'

function union(values: readonly string[]) {
  return values.map((value) => `'${value}'`).join(' | ')
}

const tooltip: ComponentDocConfig = {
  slug: 'tooltip',
  title: 'Tooltip',
  description:
    'A short label or hint shown while the pointer rests on its trigger or it has focus.',
  component: Tooltip,
  slot: button,
  usage: [
    {
      title: 'Basic usage',
      description:
        'Put the trigger in the default slot and pass the hint with the text prop. The trigger needs no props: the tooltip attributes and listeners go straight onto it.',
      props: () => ({ text: hint }),
    },
    {
      title: 'Rich content',
      description: 'Use the content slot instead of text for anything beyond a plain string.',
      props: () => ({}),
      slot: [button, { slot: 'content', text: hint }],
    },
  ],
  examples: [
    {
      title: 'Shortcut',
      description:
        'Show the keyboard shortcut of what the trigger does, formatted for the platform: ⌘S on Apple and Ctrl+S elsewhere. It is a hint: it does not bind the keys.',
      controls: [],
      props: () => ({ text: 'Save', shortcut: 'mod+s' }),
      slot: iconButton,
    },
    {
      title: 'Position',
      description:
        'Choose the side and the alignment. The tooltip flips and shifts to stay on screen.',
      controls: [
        {
          key: 'side',
          label: 'Side',
          type: 'select',
          options: tooltipSides,
          default: tooltipDefaults.side,
        },
        {
          key: 'align',
          label: 'Align',
          type: 'select',
          options: tooltipAligns,
          default: tooltipDefaults.align,
        },
      ],
      props: (state) => ({ text: hint, side: state.side!, align: state.align! }),
    },
    {
      title: 'Arrow',
      description:
        'Point at the trigger. The gap grows to 8px to fit it, unless you set sideOffset.',
      controls: [],
      props: () => ({ text: hint, arrow: true }),
    },
    {
      title: 'Delays',
      description:
        'Change how long the pointer rests before it opens, and before it closes. Right after one tooltip closes, the next opens at once.',
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
          default: '0',
        },
      ],
      props: (state) => ({
        text: hint,
        delay: Number(state.delay),
        closeDelay: Number(state.closeDelay),
      }),
    },
    {
      title: 'Toggleable',
      description:
        'Let a press open and close it, so touch screens can show it too. For info buttons whose only job is the tip.',
      controls: [],
      props: () => ({ text: hint, toggleable: true }),
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
          default: tooltipDefaults.radius,
        },
      ],
      props: (state) => ({ text: hint, radius: state.radius! }),
    },
    {
      title: 'Disabled',
      description: 'Stop the tooltip from opening. The trigger keeps working.',
      controls: [],
      props: () => ({ text: hint, disabled: true }),
    },
  ],
  accessibility: [
    {
      title: 'Label or description',
      description:
        'The tooltip names a trigger that has no name of its own and describes any other. Set type to force one or the other.',
    },
    {
      title: 'Keyboard',
      description:
        'Keyboard focus on the trigger opens it, and focus leaving closes it. Escape closes it and keeps focus on the trigger. A press closes it, unless closeOnPress is false.',
    },
    {
      title: 'Disabled buttons',
      description:
        'A disabled button cannot take focus or pointer events, so its tooltip never opens. Use aria-disabled and ignore its presses instead.',
    },
    {
      title: 'Only a hint',
      description:
        'Touch has no hover and the tooltip holds nothing focusable. Keep anything important visible elsewhere, and use a popover for content that needs interaction.',
    },
  ],
  api: {
    props: [
      { name: 'text', type: 'string', description: 'The hint. The content slot replaces it.' },
      {
        name: 'shortcut',
        type: 'string',
        description:
          'Keyboard shortcut of what the trigger does, like mod+s. Shown in the tooltip and set as aria-keyshortcuts; it does not bind the keys.',
      },
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
        description:
          'Milliseconds the pointer rests on the trigger before it opens. None right after another tooltip closes.',
      },
      {
        name: 'closeDelay',
        type: 'number',
        default: '0',
        description: 'Milliseconds before it closes once the pointer leaves the trigger.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Stops it from opening.',
      },
      {
        name: 'toggleable',
        type: 'boolean',
        default: 'false',
        description: 'Whether pressing the trigger opens and closes it.',
      },
      {
        name: 'closeOnPress',
        type: 'boolean',
        default: 'true',
        description: 'Whether pressing the trigger closes it.',
      },
      {
        name: 'type',
        type: union(tooltipTypes),
        description:
          'Whether it names the trigger or describes it. By default it names a trigger without a name of its own.',
      },
      {
        name: 'side',
        type: union(tooltipSides),
        default: `'${tooltipDefaults.side}'`,
        description: 'Side of the trigger it opens on. It flips when there is no room.',
      },
      {
        name: 'align',
        type: union(tooltipAligns),
        default: `'${tooltipDefaults.align}'`,
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
          'Renders the tooltip inside this element, for shadow roots, iframes or a stacking context.',
      },
      {
        name: 'arrow',
        type: 'boolean',
        default: `${tooltipDefaults.arrow}`,
        description: 'Shows an arrow that points at the trigger.',
      },
      {
        name: 'radius',
        type: 'string | number',
        default: `'${tooltipDefaults.radius}'`,
        description:
          'Theme radius such as sm or lg, none, full, a number in pixels, or a CSS length.',
      },
      {
        name: 'ui',
        type: 'TooltipUi',
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
        type: '(open: boolean, details: TooltipOpenChangeDetails) => void',
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
      { node: 'content', tag: 'div', state: contentState, kept: 'id, role, popover, style' },
      { node: 'shortcut', tag: 'kbd', state: contentState },
      { node: 'arrow', tag: 'div', state: contentState, kept: 'aria-hidden, style' },
    ],
    slots: [
      {
        name: 'default',
        type: contentState,
        typePre: true,
        description:
          'The trigger. Its first element gets the tooltip attributes, listeners and ref, so put one element or component, not plain text.',
      },
      {
        name: 'content',
        type: contentState,
        typePre: true,
        description: 'Replaces text. open turns false while it animates out.',
      },
      {
        name: 'shortcut',
        type: shortcutState,
        typePre: true,
        description:
          'Replaces the shortcut kbd. Its first element gets the shortcut attributes, like aria-hidden, and ui.shortcut, so put one element or component, not plain text. text is the shortcut formatted for the platform, like ⌘S or Ctrl+S. Only renders with the shortcut prop.',
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
      { name: 'focus', type: '() => void', description: 'Moves focus to the trigger.' },
    ],
  },
}

export default tooltip
