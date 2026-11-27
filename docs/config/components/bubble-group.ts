import type { ComponentDocConfig, ExampleSlotContent } from '@docs/config/component-docs'
import { Bubble, BubbleGroup, bubbleAligns } from '@nono/ui'

const messages = ['Deploy is done.', 'All checks passed.', 'Can you take a look at the logs?']

const bubbles: ExampleSlotContent[] = messages.map((text) => ({
  name: 'Bubble',
  component: Bubble,
  props: { text },
}))

const bubbleGroup: ComponentDocConfig = {
  slug: 'bubble-group',
  title: 'BubbleGroup',
  description: 'Stacks consecutive bubbles from one sender with a tighter gap.',
  component: BubbleGroup,
  slot: bubbles,
  usage: [
    {
      title: 'Basic usage',
      description:
        'Put Bubble components in the default slot. They stack in a column closer than the messages around them.',
      props: () => ({}),
    },
  ],
  examples: [
    {
      title: 'Align',
      description:
        'Set the side of every bubble at once. An align passed to a bubble wins over the group align.',
      controls: [
        {
          key: 'align',
          label: 'Align',
          type: 'select',
          options: bubbleAligns,
          default: 'end',
        },
      ],
      props: (state) => ({ align: state.align! }),
    },
    {
      title: 'Reactions',
      description: 'A bubble with reactions keeps room for them inside the group.',
      props: () => ({ align: 'end' }),
      slot: [
        { name: 'Bubble', component: Bubble, props: { text: 'Deploy is done.' } },
        {
          name: 'Bubble',
          component: Bubble,
          props: {
            text: 'All checks passed.',
            reactions: '👀',
            reactionsAlign: 'start',
            ui: { reactions: () => ({ role: 'img', 'aria-label': 'Reactions: eyes' }) },
          },
        },
        {
          name: 'Bubble',
          component: Bubble,
          props: { text: 'Can you take a look at the logs?' },
        },
      ],
    },
  ],
  accessibility: [
    {
      title: 'Roles and attributes',
      description:
        'BubbleGroup renders a native div with no role. Attributes passed to BubbleGroup reach that element.',
    },
    {
      title: 'Sender',
      description:
        'The group only changes the layout. Say who sent the messages with a name or an avatar next to the group, not with its side alone.',
    },
  ],
  api: {
    props: [
      {
        name: 'align',
        type: bubbleAligns.map((align) => `'${align}'`).join(' | '),
        description: 'Side of every Bubble inside that has no align of its own.',
      },
      {
        name: 'ui',
        type: 'BubbleGroupUi',
        typeLink: '#ui',
        description: 'HTML attributes for the root. See UI.',
      },
    ],
    emits: [],
    ui: [{ node: 'root', tag: 'div' }],
    slots: [
      {
        name: 'default',
        type: '-',
        description: 'The grouped Bubble components.',
      },
    ],
    expose: [],
  },
}

export default bubbleGroup
