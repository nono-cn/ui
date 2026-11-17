import type { ComponentDocConfig } from '@docs/config/component-docs'
import { Label } from '@nono/ui'

const label: ComponentDocConfig = {
  slug: 'label',
  title: 'Label',
  description: 'Names any form control, and lets a press on the label reach it.',
  component: Label,
  usage: [
    {
      title: 'Basic usage',
      description:
        'Pass the text with the label prop, or put it in the default slot. Point for at the id of the control.',
      props: () => ({ label: 'Email', for: 'email' }),
    },
  ],
  examples: [],
  accessibility: [
    {
      title: 'Roles and attributes',
      description:
        'Label renders the ui-sdk label, a native label element. Attributes passed to Label reach that element.',
      table: {
        columns: ['Attribute', 'Element', 'Value'],
        rows: [
          ['label', 'Root', 'Native label element.'],
          ['for', 'Root', 'Id of the control the label names.'],
          ['data-slot="label"', 'Root', 'Lets you style every label from CSS.'],
        ],
      },
    },
    {
      title: 'Naming any control',
      description:
        'A native label only names inputs, buttons and selects. Label also names controls such as a radio group or a slider through aria-labelledby, unless they have an aria-label or aria-labelledby of their own. A press on the label focuses the control, or checks it when it is a checkbox, switch or radio, and does nothing when the control is disabled.',
    },
    {
      title: 'Wrapping a control',
      description:
        'Put the control inside the label instead of pointing at it, and no id is needed. Keep the text visible and descriptive.',
    },
  ],
  api: {
    props: [
      {
        name: 'label',
        type: 'string',
        description: 'Text of the label. The default slot replaces it.',
      },
      {
        name: 'for',
        type: 'string',
        description: 'Id of the control the label names.',
      },
    ],
    emits: [],
    slots: [
      {
        name: 'default',
        type: '-',
        description:
          'Label content, such as text or a wrapped control; overrides the label fallback.',
      },
    ],
    expose: [],
  },
}

export default label
