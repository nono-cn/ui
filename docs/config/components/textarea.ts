import type { ComponentDocConfig } from '@docs/config/component-docs'
import {
  Textarea,
  textareaDefaults,
  textareaSizes,
  textareaVariantNames,
  themeColors,
  themeRadii,
} from '@nono/ui'

const booleans = ['false', 'true']
const placeholder = 'Write a message'

const textarea: ComponentDocConfig = {
  slug: 'textarea',
  title: 'Textarea',
  description: 'Takes text over several lines, and can grow with it.',
  component: Textarea,
  usage: [
    {
      title: 'Basic usage',
      description:
        'Bind the text with v-model, or set defaultValue to leave it uncontrolled. Name it with a Label.',
      props: () => ({ placeholder }),
    },
  ],
  examples: [
    {
      title: 'Variant',
      description: 'Choose how the field stands out from the page.',
      controls: [
        {
          key: 'variant',
          label: 'Variant',
          type: 'select',
          options: textareaVariantNames,
          default: textareaDefaults.variant,
        },
      ],
      props: (state) => ({ placeholder, variant: state.variant! }),
    },
    {
      title: 'Color',
      description: 'Color of the border and ring on focus. Every variant keeps a neutral surface.',
      controls: [
        {
          key: 'color',
          label: 'Color',
          type: 'select',
          options: [...themeColors, 'custom'],
          default: textareaDefaults.color,
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
          options: textareaVariantNames,
          default: textareaDefaults.variant,
        },
      ],
      props: (state) => ({
        placeholder,
        color: state.color === 'custom' ? state.custom! : state.color!,
        variant: state.variant!,
      }),
    },
    {
      title: 'Size',
      description: 'Adjust the padding, text size and minimum height.',
      controls: [
        {
          key: 'size',
          label: 'Size',
          type: 'select',
          options: textareaSizes,
          default: textareaDefaults.size,
        },
      ],
      props: (state) => ({ placeholder, size: state.size! }),
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
          default: textareaDefaults.radius,
        },
      ],
      props: (state) => ({ placeholder, radius: state.radius! }),
    },
    {
      title: 'Auto resize',
      description:
        'Grow and shrink with the text instead of scrolling, up to a maximum height. Bound it with min-h and max-h classes.',
      controls: [
        {
          key: 'autoResize',
          label: 'Auto resize',
          type: 'select',
          options: booleans,
          default: 'true',
        },
      ],
      props: (state) => ({ placeholder, autoResize: state.autoResize === 'true' }),
    },
    {
      title: 'Highlight',
      description: 'Keep the border in the textarea color, even without focus.',
      controls: [
        {
          key: 'color',
          label: 'Color',
          type: 'select',
          options: themeColors,
          default: textareaDefaults.color,
        },
      ],
      props: (state) => ({ placeholder, highlight: true, color: state.color! }),
    },
    {
      title: 'Invalid',
      description: 'Mark the value as wrong. Point aria-describedby at the error message.',
      controls: [],
      props: () => ({ invalid: true, defaultValue: 'Too short' }),
    },
    {
      title: 'Disabled',
      description: 'Stop editing and remove the field from the tab order.',
      controls: [],
      props: () => ({ placeholder, disabled: true }),
    },
  ],
  accessibility: [
    {
      title: 'Roles and attributes',
      description:
        'Textarea renders the ui-sdk textarea, a native textarea element. Attributes passed to Textarea reach that element.',
      table: {
        columns: ['Attribute', 'Element', 'Value'],
        rows: [
          ['textarea', 'Root', 'Native textarea element, with the textbox role.'],
          ['data-slot="textarea"', 'Root', 'Lets you style every textarea from CSS.'],
          ['data-filled', 'Root', 'Present while the textarea has text.'],
          ['data-disabled', 'Root', 'Present when disabled, by the prop or a disabled fieldset.'],
          ['data-readonly', 'Root', 'Present when readOnly is set.'],
          ['data-required', 'Root', 'Present when required is set.'],
          ['aria-invalid="true"', 'Root', 'Set when invalid is set.'],
        ],
      },
    },
    {
      title: 'Naming the field',
      description:
        'A placeholder is not a name. Give the textarea a visible Label pointing at its id, or an aria-label.',
    },
  ],
  api: {
    props: [
      { name: 'modelValue', type: 'string', description: 'Text of the textarea, for v-model.' },
      {
        name: 'defaultValue',
        type: 'string',
        description: 'Initial text when the textarea is uncontrolled.',
      },
      { name: 'placeholder', type: 'string', description: 'Hint shown while it is empty.' },
      {
        name: 'variant',
        type: textareaVariantNames.map((variant) => `'${variant}'`).join(' | '),
        default: `'${textareaDefaults.variant}'`,
        description: 'How the field stands out from the page.',
      },
      {
        name: 'color',
        type: 'string',
        default: `'${textareaDefaults.color}'`,
        description:
          'Theme token such as primary or error, a custom token, or a CSS color such as #6366f1. Only the focus border and ring use it.',
      },
      {
        name: 'size',
        type: textareaSizes.map((size) => `'${size}'`).join(' | '),
        default: `'${textareaDefaults.size}'`,
        description: 'Padding, text size and minimum height.',
      },
      {
        name: 'radius',
        type: 'string | number',
        default: `'${textareaDefaults.radius}'`,
        description:
          'Theme radius such as sm or lg, none, full, a number in pixels, or a CSS length.',
      },
      {
        name: 'rows',
        type: 'number',
        default: String(textareaDefaults.rows),
        description: 'Visible lines of text.',
      },
      {
        name: 'autoResize',
        type: 'boolean',
        default: 'false',
        description: 'Grows and shrinks with the text; past the maximum height, it scrolls.',
      },
      {
        name: 'highlight',
        type: 'boolean',
        default: 'false',
        description: 'Shows the border in the textarea color, even without focus.',
      },
      {
        name: 'invalid',
        type: 'boolean',
        default: 'false',
        description: 'Marks the value as wrong with aria-invalid and the error color.',
      },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Stops editing.' },
      {
        name: 'readOnly',
        type: 'boolean',
        default: 'false',
        description: 'Keeps the text selectable but not editable.',
      },
      {
        name: 'required',
        type: 'boolean',
        default: 'false',
        description: 'Needs text before its form submits.',
      },
    ],
    emits: [
      {
        name: 'update:modelValue',
        type: '(value: string) => void',
        description: 'Runs as the text changes.',
      },
    ],
    slots: [],
    expose: [],
  },
}

export default textarea
