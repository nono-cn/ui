import type { ComponentDocConfig } from '@docs/config/component-docs'
import {
  FormField,
  formFieldDefaults,
  formFieldOrientations,
  formFieldSizes,
  formFieldVariantNames,
  Input,
  Switch,
} from '@nono/ui'

const booleans = ['false', 'true']
const label = 'Email'
const setting = { label: 'Weekly digest', description: 'A summary of your week, every Monday.' }
const toggle = { name: 'Switch', component: Switch, props: {} }

const formField: ComponentDocConfig = {
  slug: 'form-field',
  title: 'FormField',
  description: 'Wraps a form control with its label, description and error message.',
  component: FormField,
  slot: { name: 'Input', component: Input, props: { placeholder: 'you@example.com' } },
  usage: [
    {
      title: 'Basic usage',
      description:
        'Put a control such as Input or Textarea in the default slot. The label points at it without an id.',
      props: () => ({ label }),
    },
  ],
  examples: [
    {
      title: 'Description',
      description:
        'Add a note under the control. Screen readers read it with the control, and the error message takes its place.',
      controls: [],
      props: () => ({ label, description: 'We never share your email.' }),
    },
    {
      title: 'Hint',
      description: 'Show a short note beside the label, such as Optional.',
      controls: [],
      props: () => ({ label, hint: 'Optional' }),
    },
    {
      title: 'Orientation',
      description:
        'Put the label and description beside the control, for a Switch or other choice control. The error takes the place of the description.',
      controls: [
        {
          key: 'orientation',
          label: 'Orientation',
          type: 'select',
          options: formFieldOrientations,
          default: 'horizontal',
        },
      ],
      slot: toggle,
      props: (state) => ({
        ...setting,
        orientation: state.orientation!,
        class: 'max-w-sm',
      }),
    },
    {
      title: 'Card',
      description:
        'Frame the field as a card. A click anywhere on it reaches the control, and the card tints while a Switch inside it is on.',
      controls: [
        {
          key: 'variant',
          label: 'Variant',
          type: 'select',
          options: formFieldVariantNames,
          default: 'card',
        },
      ],
      slot: toggle,
      props: (state) => ({
        ...setting,
        orientation: 'horizontal',
        variant: state.variant!,
        class: 'max-w-sm',
      }),
    },
    {
      title: 'Error',
      description:
        'Pass a message to show it and mark the control invalid, or true to mark it without a message.',
      controls: [
        {
          key: 'message',
          label: 'Message',
          type: 'select',
          options: booleans,
          default: 'true',
        },
      ],
      props: (state) => ({
        label,
        description: 'We never share your email.',
        error: state.message === 'true' ? 'Enter a valid email.' : true,
      }),
    },
    {
      title: 'Required',
      description: 'Make the control required, so its form needs a value before it submits.',
      controls: [],
      props: () => ({ label, required: true }),
    },
    {
      title: 'Size',
      description: 'Size the texts, and the control unless it sets its own size.',
      controls: [
        {
          key: 'size',
          label: 'Size',
          type: 'select',
          options: formFieldSizes,
          default: formFieldDefaults.size,
        },
      ],
      props: (state) => ({
        label,
        description: 'We never share your email.',
        size: state.size!,
      }),
    },
    {
      title: 'Disabled',
      description: 'Disable the control and dim the whole field.',
      controls: [],
      props: () => ({ label, disabled: true }),
    },
  ],
  accessibility: [
    {
      title: 'Roles and attributes',
      description:
        'FormField renders the ui-sdk field, which wires the label, description and error to the control. Attributes passed to FormField reach the root.',
      table: {
        columns: ['Attribute', 'Element', 'Value'],
        rows: [
          ['data-slot="field"', 'Root', 'Lets you style every field from CSS.'],
          ['data-orientation', 'Root', 'vertical or horizontal.'],
          ['data-variant', 'Root', 'default or card.'],
          ['data-invalid', 'Root and parts', 'Present while the field shows as invalid.'],
          ['data-required', 'Root and parts', 'Present while the control is required.'],
          ['data-disabled', 'Root and parts', 'Present when disabled, by the prop or a fieldset.'],
          ['for', 'Label', 'Id of the control, made for it when it has none.'],
          ['aria-describedby', 'Control', 'Ids of the description and the error.'],
          ['aria-invalid="true"', 'Control', 'Set while the field shows as invalid.'],
        ],
      },
    },
    {
      title: 'Validation',
      description:
        'Without error, the field follows the browser: once a submit finds the control invalid, the error shows its message, such as for a required control left empty. Pass error to decide yourself, for example from a form library or the server.',
    },
    {
      title: 'Hint',
      description:
        'The hint is not read with the control. Put what a screen reader needs in the label or the description.',
    },
  ],
  api: {
    props: [
      {
        name: 'label',
        type: 'string',
        description: 'Name of the control. The label slot replaces it.',
      },
      {
        name: 'description',
        type: 'string',
        description: 'Note under the control, hidden while the field shows as invalid.',
      },
      { name: 'hint', type: 'string', description: 'Short note beside the label.' },
      {
        name: 'error',
        type: 'string | boolean',
        description:
          'A message shows it and marks the field invalid; true marks it with the browser message; false hides every error. Leave it out to follow the browser validation.',
      },
      {
        name: 'name',
        type: 'string',
        description: 'Name the control submits under, when it has none of its own.',
      },
      {
        name: 'size',
        type: formFieldSizes.map((size) => `'${size}'`).join(' | '),
        default: `'${formFieldDefaults.size}'`,
        description: 'Text size of the parts, and size of a control that sets none.',
      },
      {
        name: 'orientation',
        type: formFieldOrientations.map((value) => `'${value}'`).join(' | '),
        default: `'${formFieldDefaults.orientation}'`,
        description:
          'vertical stacks the parts; horizontal puts the label and description beside the control.',
      },
      {
        name: 'variant',
        type: formFieldVariantNames.map((value) => `'${value}'`).join(' | '),
        default: `'${formFieldDefaults.variant}'`,
        description:
          'card frames the field and makes the whole card a target for the control. Meant for horizontal choice controls such as Switch.',
      },
      {
        name: 'required',
        type: 'boolean',
        default: 'false',
        description: 'Makes the control required, unless it sets required itself.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Disables the control and marks every part.',
      },
      {
        name: 'ui',
        type: `{
  header?: () => HTMLAttributes
  label?: () => HTMLAttributes
  hint?: () => HTMLAttributes
  description?: () => HTMLAttributes
  container?: () => HTMLAttributes
  error?: () => HTMLAttributes
}`,
        typePre: true,
        description:
          'Attributes for the inner nodes: header (the row with the label and hint), label, hint, description, container (the box around the control) and error. Classes are merged with the defaults and win on conflict, styles are combined, and other attributes replace the default. The root takes attributes directly.',
      },
    ],
    emits: [],
    slots: [
      { name: 'default', type: '-', description: 'The control, such as Input or Textarea.' },
      { name: 'label', type: '-', description: 'Label content; overrides the label fallback.' },
      { name: 'hint', type: '-', description: 'Hint content; overrides the hint fallback.' },
      {
        name: 'description',
        type: '-',
        description: 'Description content; overrides the description fallback.',
      },
      {
        name: 'error',
        type: '{ message: string }',
        description:
          'Error content. Receives message: the error prop when it is a string, or the browser message.',
      },
    ],
    expose: [],
  },
}

export default formField
