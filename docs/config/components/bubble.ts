import type { ComponentDocConfig } from '@docs/config/component-docs'
import {
  Bubble,
  bubbleAligns,
  bubbleDefaults,
  bubbleReactionsAligns,
  bubbleReactionsSides,
  bubbleVariantNames,
  Button,
  Link,
  themeColors,
  themeRadii,
} from '@nono/ui'

const text = 'Can you send me the report before Friday?'

const bubble: ComponentDocConfig = {
  slug: 'bubble',
  title: 'Bubble',
  description: 'Shows the body of a chat message, with optional reactions on its edge.',
  component: Bubble,
  usage: [
    {
      title: 'Basic usage',
      description: 'Pass the message with the text prop.',
      props: () => ({ text }),
    },
    {
      title: 'Any content',
      description:
        'Put anything in the default slot, such as formatted text or a link. It renders inside the bubble and keeps its own look.',
      props: () => ({ variant: 'soft', color: 'neutral' }),
      slot: [
        { text: 'The report is ready. ' },
        {
          name: 'Link',
          component: Link,
          props: { href: '#bubble', label: 'Open it' },
        },
      ],
    },
    {
      title: 'Interactive',
      description:
        'Set interactive to make the whole bubble a native button, such as a suggested reply. It takes hover, press and focus styles from its variant. Listen with @click.',
      props: () => ({
        text: 'Yes, schedule it',
        variant: 'outline',
        align: 'end',
        interactive: true,
      }),
      handlers: [
        {
          event: 'click',
          name: 'reply',
          source: "const reply = () => console.log('Replied')",
          handler: () => console.log('Replied'),
        },
      ],
    },
  ],
  examples: [
    {
      title: 'Variant',
      description: 'Choose how much visual weight the bubble has.',
      controls: [
        {
          key: 'variant',
          label: 'Variant',
          type: 'select',
          options: bubbleVariantNames,
          default: bubbleDefaults.variant,
        },
      ],
      props: (state) => ({ text, variant: state.variant! }),
    },
    {
      title: 'Color',
      description:
        'Choose a palette token or use a hexadecimal color. neutral with soft reads as the other side of the conversation, error as a failed message.',
      controls: [
        {
          key: 'color',
          label: 'Color',
          type: 'select',
          options: [...themeColors, 'custom'],
          default: bubbleDefaults.color,
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
          options: bubbleVariantNames,
          default: bubbleDefaults.variant,
        },
      ],
      props: (state) => ({
        text,
        color: state.color === 'custom' ? state.custom! : state.color!,
        variant: state.variant!,
      }),
    },
    {
      title: 'Align',
      description:
        'Put the bubble at the start or the end of the row. It pushes itself with an auto margin, so it aligns in block, flex and grid parents.',
      controls: [
        {
          key: 'align',
          label: 'Align',
          type: 'select',
          options: bubbleAligns,
          default: 'end',
        },
      ],
      props: (state) => ({ text, align: state.align! }),
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
          default: bubbleDefaults.radius,
        },
      ],
      props: (state) => ({ text, radius: state.radius! }),
    },
    {
      title: 'Reactions',
      description:
        'Pin reactions to the top or bottom edge of the bubble. The bubble keeps room for them, so they do not cover the next message. Give static emoji role="img" and a label through ui.reactions.',
      controls: [
        {
          key: 'reactionsSide',
          label: 'Side',
          type: 'select',
          options: bubbleReactionsSides,
          default: bubbleDefaults.reactionsSide,
        },
        {
          key: 'reactionsAlign',
          label: 'Align',
          type: 'select',
          options: bubbleReactionsAligns,
          default: bubbleDefaults.reactionsAlign,
        },
      ],
      props: (state) => ({
        text,
        variant: 'soft',
        color: 'neutral',
        reactionsSide: state.reactionsSide!,
        reactionsAlign: state.reactionsAlign!,
        ui: { reactions: () => ({ role: 'img', 'aria-label': 'Reactions: thumbs up, fire' }) },
      }),
      slot: { slot: 'reactions', text: '👍 🔥' },
    },
    {
      title: 'Reaction action',
      description:
        'Put one control in the reactions slot, such as a Button. The reactions drop their padding around it.',
      props: () => ({ color: 'error', variant: 'soft' }),
      slot: [
        { text: 'The deploy failed on step 3.' },
        {
          slot: 'reactions',
          name: 'Button',
          component: Button,
          props: { label: 'Retry', size: 'xs', radius: 'full', variant: 'plain', color: 'error' },
        },
      ],
    },
  ],
  accessibility: [
    {
      title: 'Roles and attributes',
      description:
        'Bubble renders native divs with no role, so the message is read as part of the conversation. With interactive, the content is a native button with type="button", read with its text as the label. Attributes passed to Bubble reach the root; pass attributes for the button, such as aria-label, with ui.content.',
    },
    {
      title: 'Reactions',
      description:
        'Static emoji are read one by one. Pass role="img" and an aria-label such as "Reactions: thumbs up, fire" with ui.reactions to read them as one. For interactive reactions use real buttons, and give icon-only ones an aria-label.',
    },
    {
      title: 'Keyboard',
      description:
        'The bubble does not take focus. A control in the default slot or in its reactions does, with its own keys. With interactive, the content takes focus, shows a focus ring and runs @click with Enter or Space. Do not put links or buttons inside an interactive bubble: use the reactions slot for them.',
    },
    {
      title: 'Meaning',
      description:
        'Do not rely on color or alignment alone to tell who wrote a message or that it failed: say it with text, an avatar or an icon nearby.',
    },
  ],
  api: {
    props: [
      {
        name: 'text',
        type: 'string',
        description: 'The message. The default slot replaces it.',
      },
      {
        name: 'variant',
        type: bubbleVariantNames.map((variant) => `'${variant}'`).join(' | '),
        default: `'${bubbleDefaults.variant}'`,
        description: 'Visual weight of the bubble.',
      },
      {
        name: 'color',
        type: 'string',
        default: `'${bubbleDefaults.color}'`,
        description:
          'Theme token such as primary or error, a custom token, or a CSS color such as #6366f1. The foreground color is picked for contrast.',
      },
      {
        name: 'radius',
        type: 'string | number',
        default: `'${bubbleDefaults.radius}'`,
        description:
          'Theme radius such as sm or lg, none, full, a number in pixels, or a CSS length.',
      },
      {
        name: 'align',
        type: bubbleAligns.map((align) => `'${align}'`).join(' | '),
        default: `'${bubbleDefaults.align}'`,
        description: 'Side of the row the bubble sits on.',
      },
      {
        name: 'reactionsSide',
        type: bubbleReactionsSides.map((side) => `'${side}'`).join(' | '),
        default: `'${bubbleDefaults.reactionsSide}'`,
        description: 'Edge of the bubble the reactions sit on.',
      },
      {
        name: 'reactionsAlign',
        type: bubbleReactionsAligns.map((align) => `'${align}'`).join(' | '),
        default: `'${bubbleDefaults.reactionsAlign}'`,
        description: 'End of that edge the reactions sit at.',
      },
      {
        name: 'interactive',
        type: 'boolean',
        default: 'false',
        description:
          'Renders the content as a native button with hover, press and focus styles. Listen with @click.',
      },
      {
        name: 'ui',
        type: 'BubbleUi',
        typeLink: '#ui',
        description: 'HTML attributes for the root and each inner node. See UI.',
      },
    ],
    emits: [
      {
        name: 'click',
        type: '(event: MouseEvent) => void',
        description: 'Runs on press when interactive.',
      },
    ],
    ui: [
      { node: 'root', tag: 'div' },
      { node: 'content', tag: 'div | button' },
      { node: 'reactions', tag: 'div' },
    ],
    slots: [
      {
        name: 'default',
        type: '-',
        description:
          'Content of the message inside the bubble; overrides the text. With interactive, only phrasing content such as text, strong or code.',
      },
      {
        name: 'reactions',
        type: '-',
        description: 'Content on the edge of the bubble, such as emoji or a control.',
      },
    ],
    expose: [],
  },
}

export default bubble
