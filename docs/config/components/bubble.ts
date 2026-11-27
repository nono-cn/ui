import type { ComponentDocConfig } from '@docs/config/component-docs'
import {
  Bubble,
  bubbleAligns,
  bubbleDefaults,
  bubbleReactionsAligns,
  bubbleReactionsSides,
  bubbleVariantNames,
  Button,
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
      description: 'Put anything else, such as formatted text, in the default slot.',
      props: () => ({ variant: 'soft', color: 'neutral' }),
      slot: { text: 'Sure, it is in the shared folder.' },
    },
  ],
  examples: [
    {
      title: 'Variant',
      description:
        'Choose how much visual weight the bubble has. plain drops the background, the padding and the 80% width cap, for prose that spans the row.',
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
        reactions: '👍 🔥',
        reactionsSide: state.reactionsSide!,
        reactionsAlign: state.reactionsAlign!,
        ui: { reactions: () => ({ role: 'img', 'aria-label': 'Reactions: thumbs up, fire' }) },
      }),
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
    {
      title: 'Clickable',
      description:
        'Listen to click and the content becomes a native button, for quick replies. Pass href instead and it becomes a link.',
      props: () => ({ text: 'Yes, schedule it', variant: 'soft', align: 'end' }),
      handlers: [
        {
          event: 'click',
          name: 'reply',
          source: "const reply = () => console.log('Yes, schedule it')",
          handler: () => console.log('Yes, schedule it'),
        },
      ],
    },
    {
      title: 'Link',
      description: 'Set href to render the content as a link. Pass target or rel with ui.content.',
      props: () => ({
        text: 'Open the report',
        variant: 'outline',
        color: 'neutral',
        href: '#bubble',
      }),
    },
  ],
  accessibility: [
    {
      title: 'Roles and attributes',
      description:
        'Bubble renders native divs with no role, so the message is read as part of the conversation. Attributes passed to Bubble reach the root.',
      table: {
        columns: ['Attribute', 'Element', 'Value'],
        rows: [
          ['a', 'Content', 'Used when href is set. The text is its accessible name.'],
          [
            'button',
            'Content',
            'Used when there is a click listener and no href, with type="button".',
          ],
        ],
      },
    },
    {
      title: 'Reactions',
      description:
        'Static emoji are read one by one. Pass role="img" and an aria-label such as "Reactions: thumbs up, fire" with ui.reactions to read them as one. For interactive reactions use real buttons, and give icon-only ones an aria-label.',
    },
    {
      title: 'Keyboard',
      description: 'Only a link or button bubble, or a control in its reactions, takes focus.',
      table: {
        columns: ['Key', 'Action'],
        rows: [
          ['Tab', 'Moves focus to the bubble or to the control in its reactions.'],
          ['Enter', 'Follows the link or presses the button.'],
          ['Space', 'Presses the button.'],
        ],
      },
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
        description:
          'Visual weight of the bubble. plain has no background or padding and may take the full row.',
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
        description:
          'Side of the row the bubble sits on. Without it, the bubble takes the align of its BubbleGroup.',
      },
      {
        name: 'href',
        type: 'string',
        description: 'Renders the content as a link to this URL.',
      },
      {
        name: 'reactions',
        type: 'string',
        description: 'Text of the reactions, such as emoji. The reactions slot replaces it.',
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
        name: 'ui',
        type: 'BubbleUi',
        typeLink: '#ui',
        description: 'HTML attributes for the root and each inner node. See UI.',
      },
    ],
    emits: [
      {
        name: 'click',
        type: '(event: MouseEvent) => unknown',
        description:
          'Runs when the content is pressed. A listener renders the content as a native button, unless href is set.',
      },
    ],
    ui: [
      { node: 'root', tag: 'div' },
      { node: 'content', tag: 'div | a | button' },
      { node: 'reactions', tag: 'div' },
    ],
    slots: [
      { name: 'default', type: '-', description: 'Content of the message; overrides the text.' },
      {
        name: 'reactions',
        type: '-',
        description: 'Content on the edge of the bubble; overrides the reactions text.',
      },
    ],
    expose: [],
  },
}

export default bubble
