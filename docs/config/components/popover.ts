import type { ComponentDocConfig, ExampleSlotContent } from '@docs/config/component-docs'
import {
  Button,
  Input,
  Popover,
  popoverAligns,
  popoverDefaults,
  popoverSides,
  themeRadii,
} from '@nono/ui'

const button: ExampleSlotContent = {
  name: 'Button',
  component: Button,
  props: { label: 'Share', variant: 'outline' },
}

const link: ExampleSlotContent = {
  slot: 'content',
  name: 'Input',
  component: Input,
  props: { defaultValue: 'nono.dev/d/q3-roadmap', readOnly: true, 'aria-label': 'Link' },
}

const header = { label: 'Share this document', description: 'Anyone with the link can view it.' }

const triggerState = `{
  open: boolean
  disabled: boolean
  shortcut: string
}`

const contentState = `{
  open: boolean
}`

const contentSlotProps = `{
  open: boolean
  close: () => void
}`

function union(values: readonly string[]) {
  return values.map((value) => `'${value}'`).join(' | ')
}

const popover: ComponentDocConfig = {
  slug: 'popover',
  title: 'Popover',
  description: 'A floating panel opened by pressing its trigger, for content people interact with.',
  component: Popover,
  slot: [button, link],
  usage: [
    {
      title: 'Basic usage',
      description:
        'Put the trigger in the default slot and the panel in the content slot. label names the panel and description adds context. The trigger needs no props: the popover attributes and listeners go straight onto it.',
      props: () => header,
    },
    {
      title: 'Only content',
      description:
        'Leave out label and description for a bare panel. Give it a name with aria-label through ui.content when nothing inside names it.',
      props: () => ({}),
      slot: [button, { slot: 'content', text: 'Anyone with the link can view this document.' }],
    },
  ],
  examples: [
    {
      title: 'Position',
      description:
        'Choose the side and the alignment. The panel flips and shifts to stay on screen.',
      controls: [
        {
          key: 'side',
          label: 'Side',
          type: 'select',
          options: popoverSides,
          default: popoverDefaults.side,
        },
        {
          key: 'align',
          label: 'Align',
          type: 'select',
          options: popoverAligns,
          default: popoverDefaults.align,
        },
      ],
      props: (state) => ({ ...header, side: state.side!, align: state.align! }),
    },
    {
      title: 'Arrow',
      description:
        'Point at the trigger. The gap grows to 8px to fit it, unless you set sideOffset.',
      controls: [],
      props: () => ({ ...header, arrow: true }),
    },
    {
      title: 'Modal',
      description:
        'trap-focus keeps Tab inside while the page stays usable. true also makes the rest of the page inert and locks scrolling.',
      controls: [
        {
          key: 'modal',
          label: 'Modal',
          type: 'select',
          options: ['false', 'trap-focus', 'true'],
          default: 'false',
        },
      ],
      props: (state) => ({
        ...header,
        modal: state.modal === 'trap-focus' ? 'trap-focus' : state.modal === 'true',
      }),
    },
    {
      title: 'Open on hover',
      description:
        'Open it when the pointer rests on the trigger too. Pressing still opens it, so keyboard and touch work. The pointer can cross the gap into the panel.',
      controls: [
        {
          key: 'delay',
          label: 'Delay',
          type: 'select',
          options: ['0', '150', '300', '600'],
          default: '300',
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
        ...header,
        openOnHover: true,
        delay: Number(state.delay),
        closeDelay: Number(state.closeDelay),
      }),
    },
    {
      title: 'Not dismissible',
      description:
        'Keep it open on Escape and outside presses, for unsaved work. Those emit dismissAttempt instead, so you can ask before closing. The trigger and close() from the content slot still close it.',
      controls: [],
      props: () => ({ ...header, dismissible: false }),
    },
    {
      title: 'Shortcut',
      description:
        'Open and close it from the keyboard, formatted for the platform: mod+i is ⌘I on Apple and Ctrl+I elsewhere. The trigger advertises it with aria-keyshortcuts.',
      controls: [],
      props: () => ({ ...header, shortcut: 'mod+i' }),
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
          default: popoverDefaults.radius,
        },
      ],
      props: (state) => ({ ...header, radius: state.radius! }),
    },
    {
      title: 'Disabled',
      description: 'Stop the trigger from opening it.',
      controls: [],
      props: () => ({ ...header, disabled: true }),
    },
  ],
  accessibility: [
    {
      title: 'A non-modal dialog',
      description:
        'The trigger is a button that opens a dialog, named by its label and described by its description. Without a label, name it with aria-label through ui.content.',
    },
    {
      title: 'Keyboard',
      description:
        'Enter or Space on the trigger opens it and moves focus to the first focusable element inside. Escape closes it and returns focus to the trigger. Unless it is modal, Tab leaving the panel closes it.',
    },
    {
      title: 'Hover is extra',
      description:
        'With openOnHover the trigger still opens on press, so touch and keyboard reach the same content. Opening on hover leaves focus where it is.',
    },
  ],
  api: {
    props: [
      {
        name: 'label',
        type: 'string',
        description: 'Names the panel, as an h2. The label slot replaces it.',
      },
      {
        name: 'description',
        type: 'string',
        description: 'Describes the panel, as a p. The description slot replaces it.',
      },
      { name: 'open', type: 'boolean', description: 'Whether it is open, for v-model:open.' },
      {
        name: 'defaultOpen',
        type: 'boolean',
        default: 'false',
        description: 'Whether it starts open when uncontrolled.',
      },
      {
        name: 'modal',
        type: "boolean | 'trap-focus'",
        default: `${popoverDefaults.modal}`,
        description:
          'false leaves the page usable and focus leaving closes it. trap-focus keeps Tab inside. true also makes the rest of the page inert and locks scrolling.',
      },
      {
        name: 'dismissible',
        type: 'boolean',
        default: 'true',
        description:
          'Whether Escape, an outside press or focus leaving close it. The trigger, close() from the content slot and the exposed methods always can.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Stops the trigger from opening it.',
      },
      {
        name: 'shortcut',
        type: 'string',
        description:
          'Keyboard shortcut that presses the trigger, like mod+i. Sets aria-keyshortcuts on it.',
      },
      {
        name: 'openOnHover',
        type: 'boolean',
        default: 'false',
        description: 'Whether resting the pointer on the trigger opens it. Pressing still does.',
      },
      {
        name: 'delay',
        type: 'number',
        default: '300',
        description:
          'Milliseconds the pointer rests on the trigger before it opens, with openOnHover.',
      },
      {
        name: 'closeDelay',
        type: 'number',
        default: '0',
        description:
          'Milliseconds before it closes once the pointer leaves the trigger and the panel, with openOnHover.',
      },
      {
        name: 'side',
        type: union(popoverSides),
        default: `'${popoverDefaults.side}'`,
        description: 'Side of the trigger it opens on. It flips when there is no room.',
      },
      {
        name: 'align',
        type: union(popoverAligns),
        default: `'${popoverDefaults.align}'`,
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
          'Renders the panel inside this element, for shadow roots, iframes or a stacking context.',
      },
      {
        name: 'initialFocus',
        type: "'auto' | 'content' | 'none' | string | HTMLElement | (() => HTMLElement | null | undefined)",
        default: "'auto'",
        description:
          'Where focus goes when it opens: the first focusable element, the panel, nowhere, or a selector or element.',
      },
      {
        name: 'finalFocus',
        type: "'trigger' | 'none' | string | HTMLElement | (() => HTMLElement | null | undefined)",
        default: "'trigger'",
        description: 'Where focus goes when it closes while focus is inside.',
      },
      {
        name: 'keepMounted',
        type: 'boolean',
        default: 'false',
        description: 'Keeps the closed panel in the page, hidden.',
      },
      {
        name: 'arrow',
        type: 'boolean',
        default: `${popoverDefaults.arrow}`,
        description: 'Shows an arrow that points at the trigger.',
      },
      {
        name: 'radius',
        type: 'string | number',
        default: `'${popoverDefaults.radius}'`,
        description:
          'Theme radius such as sm or lg, none, full, a number in pixels, or a CSS length.',
      },
      {
        name: 'ui',
        type: 'PopoverUi',
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
        type: '(open: boolean, details: PopoverOpenChangeDetails) => void',
        description:
          'Runs before it opens or closes. details.reason says why, such as trigger-press, outside-press or close-press, and details.cancel() stops it.',
      },
      {
        name: 'openChangeComplete',
        type: '(open: boolean) => void',
        description: 'Runs once it has opened or closed, after the animation.',
      },
      {
        name: 'dismissAttempt',
        type: '(details: PopoverDismissAttemptDetails) => void',
        description:
          'Runs when dismissible is false and Escape or an outside press tried to close it. details.reason says which.',
      },
    ],
    ui: [
      { node: 'content', tag: 'div', state: contentState, kept: 'id, role, popover, style' },
      { node: 'label', tag: 'h2', state: contentState, kept: 'id' },
      { node: 'description', tag: 'p', state: contentState, kept: 'id' },
      { node: 'arrow', tag: 'div', state: contentState, kept: 'aria-hidden, style' },
    ],
    slots: [
      {
        name: 'default',
        type: triggerState,
        typePre: true,
        description:
          'The trigger. Its first element gets the popover attributes, listeners and ref, so put one element or component, not plain text. shortcut is the shortcut prop formatted for the platform, like ⌘I or Ctrl+I, or empty without one.',
      },
      { name: 'label', type: '-', description: 'Replaces label.' },
      { name: 'description', type: '-', description: 'Replaces description.' },
      {
        name: 'content',
        type: contentSlotProps,
        typePre: true,
        description:
          'The panel body, below the label and description. open turns false while it animates out, and close() closes it, with reason close-press, for your own buttons.',
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

export default popover
