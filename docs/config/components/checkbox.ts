import type { ComponentDocConfig } from '@docs/config/component-docs'
import {
  Checkbox,
  checkboxDefaults,
  checkboxSizes,
  iconNames,
  themeColors,
  themeRadii,
} from '@nono/ui'

const name = { 'aria-label': 'Accept terms and conditions' }

const checkbox: ComponentDocConfig = {
  slug: 'checkbox',
  title: 'Checkbox',
  description: 'Checks or unchecks an option, with a mixed state for a partly checked set.',
  component: Checkbox,
  usage: [
    {
      title: 'Basic usage',
      description:
        'Bind the state with v-model, or set defaultValue to leave it uncontrolled. Name it with a FormField, a Label or an aria-label.',
      props: () => ({ ...name }),
    },
  ],
  examples: [
    {
      title: 'Color',
      description: 'Color of the box while it is checked, and of the focus ring.',
      controls: [
        {
          key: 'color',
          label: 'Color',
          type: 'select',
          options: [...themeColors, 'custom'],
          default: checkboxDefaults.color,
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
        ...name,
        defaultValue: true,
        color: state.color === 'custom' ? state.custom! : state.color!,
      }),
    },
    {
      title: 'Size',
      description: 'Adjust the box size. Inside a FormField, it follows the field.',
      controls: [
        {
          key: 'size',
          label: 'Size',
          type: 'select',
          options: checkboxSizes,
          default: checkboxDefaults.size,
        },
      ],
      props: (state) => ({ ...name, defaultValue: true, size: state.size! }),
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
          default: checkboxDefaults.radius,
        },
      ],
      props: (state) => ({ ...name, defaultValue: true, radius: state.radius! }),
    },
    {
      title: 'Indeterminate',
      description:
        'Pass "indeterminate" to v-model or defaultValue for a partly checked set. A press checks it, and only your code returns it to mixed.',
      controls: [],
      props: () => ({ ...name, defaultValue: 'indeterminate' }),
    },
    {
      title: 'Icons',
      description:
        'Change the icon shown while checked, and while indeterminate. Use the indicator slot for anything else.',
      controls: [
        {
          key: 'icon',
          label: 'Icon',
          type: 'select',
          options: iconNames,
          default: 'heart',
        },
        {
          key: 'indeterminateIcon',
          label: 'Indeterminate icon',
          type: 'select',
          options: iconNames,
          default: checkboxDefaults.indeterminateIcon,
        },
      ],
      props: (state) => ({
        ...name,
        size: 'lg',
        defaultValue: true,
        icon: state.icon!,
        indeterminateIcon: state.indeterminateIcon!,
      }),
    },
    {
      title: 'Read-only',
      description:
        'Keep it focusable and submitted, but stop changes. Use it for an option managed elsewhere.',
      controls: [],
      props: () => ({ ...name, defaultValue: true, readOnly: true }),
    },
    {
      title: 'Disabled',
      description: 'Stop changes, remove it from the tab order and leave it out of its form.',
      controls: [],
      props: () => ({ ...name, defaultValue: true, disabled: true }),
    },
  ],
  accessibility: [
    {
      title: 'Roles and attributes',
      description:
        'Checkbox renders the ui-sdk checkbox: a button with the checkbox role and a hidden native checkbox for forms. Every attribute, such as id or aria-label, reaches the button.',
      table: {
        columns: ['Attribute', 'Element', 'Value'],
        rows: [
          ['role="checkbox"', 'Root', 'Button with aria-checked.'],
          ['aria-checked="mixed"', 'Root', 'Present while indeterminate.'],
          ['data-slot="checkbox"', 'Root', 'Lets you style every checkbox from CSS.'],
          [
            'data-slot="checkbox-indicator"',
            'Indicator',
            'Lets you style every indicator from CSS.',
          ],
          [
            'data-checked / data-unchecked / data-indeterminate',
            'Root, Indicator',
            'Present while checked, unchecked or indeterminate.',
          ],
          [
            'data-disabled',
            'Root, Indicator',
            'Present when disabled, by the prop or a disabled fieldset.',
          ],
          ['data-readonly', 'Root, Indicator', 'Present when read-only.'],
          ['data-required', 'Root, Indicator', 'Present when required.'],
          [
            'data-starting-style / data-ending-style',
            'Indicator',
            'Present while the indicator animates in, or out.',
          ],
          [
            'aria-invalid="true"',
            'Root',
            'Set by FormField while it shows as invalid. Shows the error ring.',
          ],
        ],
      },
    },
    {
      title: 'Keyboard',
      description:
        'Tab moves to the checkbox and Space checks or unchecks it, or checks it when indeterminate. Enter submits its form and never toggles it.',
    },
    {
      title: 'Naming the checkbox',
      description:
        'The checkbox has no text of its own. Put it in a horizontal FormField, wrap it in a label with the option text, or pass an aria-label.',
    },
    {
      title: 'Required',
      description:
        'A required checkbox blocks its form with the browser message until it is checked. Indeterminate does not count as checked.',
    },
  ],
  api: {
    props: [
      {
        name: 'modelValue',
        type: "boolean | 'indeterminate'",
        description: 'Whether it is checked, unchecked or indeterminate, for v-model.',
      },
      {
        name: 'defaultValue',
        type: "boolean | 'indeterminate'",
        description: 'Its state at first when uncontrolled. A form reset returns to it.',
      },
      {
        name: 'color',
        type: 'string',
        default: `'${checkboxDefaults.color}'`,
        description:
          'Theme token such as primary or error, a custom token, or a CSS color such as #6366f1. Colors the box while checked or indeterminate, and the focus ring.',
      },
      {
        name: 'size',
        type: checkboxSizes.map((size) => `'${size}'`).join(' | '),
        default: `'${checkboxDefaults.size}'`,
        description: 'Box size. Inside a FormField, it defaults to the field size.',
      },
      {
        name: 'radius',
        type: 'string | number',
        default: `'${checkboxDefaults.radius}'`,
        description:
          'Theme radius such as sm or lg, none, full, a number in pixels, or a CSS length.',
      },
      {
        name: 'icon',
        type: 'IconName',
        default: `'${checkboxDefaults.icon}'`,
        description: 'Icon in the box while checked.',
      },
      {
        name: 'indeterminateIcon',
        type: 'IconName',
        default: `'${checkboxDefaults.indeterminateIcon}'`,
        description: 'Icon in the box while indeterminate.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Stops focus and changes, and leaves it out of its form.',
      },
      {
        name: 'readOnly',
        type: 'boolean',
        default: 'false',
        description: 'Keeps it focusable and submitted, but stops changes.',
      },
      {
        name: 'required',
        type: 'boolean',
        default: 'false',
        description:
          'Blocks its form until it is checked. Inside a FormField, it follows the field.',
      },
      { name: 'name', type: 'string', description: 'Name it submits under while checked.' },
      {
        name: 'value',
        type: 'string',
        default: "'on'",
        description: 'What it submits while checked.',
      },
      {
        name: 'form',
        type: 'string',
        description: 'Id of a form to join, when it is not inside that form.',
      },
      {
        name: 'ui',
        type: `{
  indicator?: (state: {
    checked: boolean
    indeterminate: boolean
  }) => HTMLAttributes
  icon?: (state: {
    checked: boolean
    indeterminate: boolean
  }) => HTMLAttributes
}`,
        typePre: true,
        description:
          'Attributes for the inner nodes: indicator and icon (inside it). Each one receives the same state as the indicator slot. Classes are merged with the defaults and win on conflict, styles are combined, and other attributes replace the default. The root takes class, style and every other attribute directly.',
      },
    ],
    emits: [
      {
        name: 'update:modelValue',
        type: "(value: boolean | 'indeterminate') => void",
        description: 'Runs when it is checked or unchecked. Not when the change is canceled.',
      },
      {
        name: 'checkedChange',
        type: "(checked: boolean | 'indeterminate', details: CheckboxChangeDetails) => void",
        description:
          'Runs before a change. details.reason says why (press, reset, restore or imperative), and details.cancel() stops it.',
      },
    ],
    slots: [
      {
        name: 'indicator',
        type: `{
  checked: boolean
  indeterminate: boolean
}`,
        typePre: true,
        description:
          'Content of the box while checked or indeterminate; overrides icon and indeterminateIcon.',
      },
    ],
    expose: [
      {
        name: 'toggle',
        type: '(details?: { reason?, event? }) => boolean',
        description:
          'Checks or unchecks it, as a press would; an indeterminate one becomes checked. Returns false when the change is canceled.',
      },
      {
        name: 'setChecked',
        type: "(checked: boolean | 'indeterminate', details?: { reason?, event? }) => boolean",
        description: 'Sets its state. Returns false when the change is canceled.',
      },
      {
        name: 'getChecked',
        type: "() => boolean | 'indeterminate'",
        description: 'Its current state.',
      },
      { name: 'focus', type: '() => void', description: 'Moves focus to it.' },
    ],
  },
}

export default checkbox
