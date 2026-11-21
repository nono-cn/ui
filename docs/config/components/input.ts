import type { ComponentDocConfig } from '@docs/config/component-docs'
import {
  Input,
  inputDefaults,
  inputSizes,
  inputVariantNames,
  iconNames,
  themeColors,
  themeRadii,
} from '@nono/ui'

const icons = ['none', ...iconNames]
const placeholder = 'Search'

function icon(state: Record<string, string | undefined>, key: string) {
  return state[key] && state[key] !== 'none' ? { [key]: state[key] } : {}
}

const input: ComponentDocConfig = {
  slug: 'input',
  title: 'Input',
  description: 'Takes a single line of text, with optional icons on either side.',
  component: Input,
  usage: [
    {
      title: 'Basic usage',
      description:
        'Bind the text with v-model, or set defaultValue to leave it uncontrolled. Name it with a FormField or a Label.',
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
          options: inputVariantNames,
          default: inputDefaults.variant,
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
          default: inputDefaults.color,
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
        placeholder,
        color: state.color === 'custom' ? state.custom! : state.color!,
      }),
    },
    {
      title: 'Size',
      description: 'Adjust the height, padding and text size. Icons follow the input size.',
      controls: [
        {
          key: 'size',
          label: 'Size',
          type: 'select',
          options: inputSizes,
          default: inputDefaults.size,
        },
      ],
      props: (state) => ({ placeholder, leadingIcon: 'search', size: state.size! }),
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
          default: inputDefaults.radius,
        },
      ],
      props: (state) => ({ placeholder, radius: state.radius! }),
    },
    {
      title: 'Icons',
      description: 'Place an icon before or after the text. Use the slots for anything else.',
      controls: [
        {
          key: 'leadingIcon',
          label: 'Leading icon',
          type: 'select',
          options: icons,
          default: 'search',
        },
        {
          key: 'trailingIcon',
          label: 'Trailing icon',
          type: 'select',
          options: icons,
          default: 'none',
        },
      ],
      props: (state) => ({
        placeholder,
        ...icon(state, 'leadingIcon'),
        ...icon(state, 'trailingIcon'),
      }),
    },
    {
      title: 'Clearable',
      description:
        'Show a button that empties the input while it has text. It sits before the trailing icon or slot.',
      controls: [
        {
          key: 'trailingIcon',
          label: 'Trailing icon',
          type: 'select',
          options: icons,
          default: 'none',
        },
      ],
      props: (state) => ({
        placeholder,
        clearable: true,
        defaultValue: 'Clear me',
        ...icon(state, 'trailingIcon'),
      }),
    },
    {
      title: 'Highlight',
      description: 'Keep the border in the input color, even without focus.',
      controls: [
        {
          key: 'color',
          label: 'Color',
          type: 'select',
          options: themeColors,
          default: inputDefaults.color,
        },
      ],
      props: (state) => ({ placeholder, highlight: true, color: state.color! }),
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
        'Input renders the ui-sdk input group around a native input. class and style reach the group; every other attribute, such as id, name or autocomplete, reaches the input.',
      table: {
        columns: ['Attribute', 'Element', 'Value'],
        rows: [
          ['div', 'Root', 'Group that holds the input and its icons.'],
          ['input', 'Input', 'Native input element, type="text" by default.'],
          [
            'aria-invalid="true"',
            'Input',
            'Passed as an attribute, or set by FormField while it shows as invalid. Shows the error color.',
          ],
          [
            'button',
            'Clear',
            'Native button, named by clearLabel ("Clear" by default). Present while the input has text and is editable.',
          ],
        ],
      },
    },
    {
      title: 'Naming the field',
      description:
        'A placeholder is not a name. Give the input a visible label with a FormField, a Label pointing at its id, or an aria-label.',
    },
    {
      title: 'Icons',
      description:
        'Icons are decorative and ignore the pointer, so a press on them reaches the input. Put anything interactive in the leading or trailing slot, and give it an accessible name.',
    },
  ],
  api: {
    props: [
      { name: 'modelValue', type: 'string', description: 'Text of the input, for v-model.' },
      {
        name: 'defaultValue',
        type: 'string',
        description: 'Initial text when the input is uncontrolled.',
      },
      {
        name: 'type',
        type: 'string',
        default: `'${inputDefaults.type}'`,
        description: 'Native input type, such as email, password, search or url.',
      },
      { name: 'placeholder', type: 'string', description: 'Hint shown while it is empty.' },
      {
        name: 'variant',
        type: inputVariantNames.map((variant) => `'${variant}'`).join(' | '),
        default: `'${inputDefaults.variant}'`,
        description: 'How the field stands out from the page.',
      },
      {
        name: 'color',
        type: 'string',
        default: `'${inputDefaults.color}'`,
        description:
          'Theme token such as primary or error, a custom token, or a CSS color such as #6366f1. Only the focus border and ring use it.',
      },
      {
        name: 'size',
        type: inputSizes.map((size) => `'${size}'`).join(' | '),
        default: `'${inputDefaults.size}'`,
        description:
          'Height, padding, text and icon size. Inside a FormField, it defaults to the field size.',
      },
      {
        name: 'radius',
        type: 'string | number',
        default: `'${inputDefaults.radius}'`,
        description:
          'Theme radius such as sm or lg, none, full, a number in pixels, or a CSS length.',
      },
      { name: 'leadingIcon', type: 'IconName', description: 'Icon before the text.' },
      { name: 'trailingIcon', type: 'IconName', description: 'Icon after the text.' },
      {
        name: 'clearable',
        type: 'boolean',
        default: 'false',
        description:
          'Shows a button that empties the input and returns focus to it, while it has text and is editable.',
      },
      {
        name: 'clearLabel',
        type: 'string',
        default: "'Clear'",
        description: 'Accessible name of the clear button. Translated by the locale.',
      },
      {
        name: 'highlight',
        type: 'boolean',
        default: 'false',
        description: 'Shows the border in the input color, even without focus.',
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
      {
        name: 'ui',
        type: 'InputUi',
        typeLink: '#ui',
        description: 'HTML attributes for the root and each inner node. See UI.',
      },
    ],
    emits: [
      {
        name: 'update:modelValue',
        type: '(value: string) => void',
        description: 'Runs as the text changes.',
      },
    ],
    ui: [
      { node: 'root', tag: 'div' },
      { node: 'input', tag: 'input' },
      { node: 'leading', tag: 'span' },
      { node: 'leadingIcon', tag: 'svg' },
      { node: 'trailing', tag: 'span' },
      { node: 'trailingIcon', tag: 'svg' },
      { node: 'clear', tag: 'button' },
      { node: 'clearIcon', tag: 'svg' },
    ],
    slots: [
      {
        name: 'leading',
        type: '-',
        description: 'Content displayed before the text; overrides the leadingIcon fallback.',
      },
      {
        name: 'trailing',
        type: '-',
        description: 'Content displayed after the text; overrides the trailingIcon fallback.',
      },
      {
        name: 'iconClear',
        type: '-',
        description:
          'Content of the clear button, such as another icon; overrides the x icon. The button keeps its name, visibility and behavior.',
      },
    ],
    expose: [],
  },
}

export default input
