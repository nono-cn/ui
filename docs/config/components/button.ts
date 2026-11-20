import type { ComponentDocConfig, ExampleState } from '@docs/config/component-docs'
import {
  Button,
  buttonDefaults,
  buttonIconSizes,
  buttonSizes,
  buttonTextSizes,
  buttonVariantNames,
  iconNames,
  themeColors,
  themeRadii,
} from '@nono/ui'

const icons = ['none', ...iconNames]
const booleans = ['false', 'true']

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

function icon(state: ExampleState, key: string) {
  return state[key] && state[key] !== 'none' ? { [key]: state[key] } : {}
}

function flag(state: ExampleState, key: string) {
  return state[key] === 'true' ? { [key]: true } : {}
}

const button: ComponentDocConfig = {
  slug: 'button',
  title: 'Button',
  description: 'Runs an action, shows that it is working, and stays reachable when disabled.',
  component: Button,
  usage: [
    {
      title: 'Basic usage',
      description: 'Pass the text to show with the label prop, or put it in the default slot.',
      props: () => ({ label: 'Button' }),
    },
  ],
  examples: [
    {
      title: 'Variant',
      description: 'Choose how much visual weight the button has.',
      controls: [
        {
          key: 'variant',
          label: 'Variant',
          type: 'select',
          options: buttonVariantNames,
          default: buttonDefaults.variant,
        },
      ],
      props: (state) => ({ label: 'Button', variant: state.variant! }),
    },
    {
      title: 'Color',
      description: 'Choose a palette token or use a hexadecimal color.',
      controls: [
        {
          key: 'color',
          label: 'Color',
          type: 'select',
          options: [...themeColors, 'custom'],
          default: buttonDefaults.color,
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
          options: buttonVariantNames,
          default: buttonDefaults.variant,
        },
      ],
      props: (state) => ({
        label: 'Button',
        color: state.color === 'custom' ? state.custom! : state.color!,
        variant: state.variant!,
      }),
    },
    {
      title: 'Size',
      description: 'Adjust the height, padding and text size. Icons follow the button size.',
      controls: [
        {
          key: 'size',
          label: 'Size',
          type: 'select',
          options: buttonTextSizes,
          default: buttonDefaults.size,
        },
      ],
      props: (state) => ({ label: 'Button', leadingIcon: 'plus', size: state.size! }),
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
          default: buttonDefaults.radius,
        },
      ],
      props: (state) => ({ label: 'Button', radius: state.radius! }),
    },
    {
      title: 'Icons',
      description: 'Place an icon before or after the label.',
      controls: [
        {
          key: 'leadingIcon',
          label: 'Leading icon',
          type: 'select',
          options: icons,
          default: 'plus',
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
        label: 'Button',
        ...icon(state, 'leadingIcon'),
        ...icon(state, 'trailingIcon'),
      }),
    },
    {
      title: 'Icon size',
      description: 'Choose a square size for an icon-only button. Give it an aria-label.',
      controls: [
        { key: 'size', label: 'Size', type: 'select', options: buttonIconSizes, default: 'icon' },
        {
          key: 'variant',
          label: 'Variant',
          type: 'select',
          options: buttonVariantNames,
          default: buttonDefaults.variant,
        },
      ],
      props: (state) => ({
        leadingIcon: 'plus',
        'aria-label': 'Add',
        size: state.size!,
        variant: state.variant!,
      }),
    },
    {
      title: 'Block',
      description: 'Stretch the button to the full width of its container.',
      controls: [
        { key: 'block', label: 'Block', type: 'select', options: booleans, default: 'true' },
      ],
      props: (state) => ({ label: 'Button', ...flag(state, 'block') }),
    },
    {
      title: 'Pending',
      description:
        'Return a Promise from @click. The button shows a spinner, ignores presses and keeps focus until it settles.',
      controls: [
        {
          key: 'leadingIcon',
          label: 'Leading icon',
          type: 'select',
          options: icons,
          default: 'save',
        },
        {
          key: 'variant',
          label: 'Variant',
          type: 'select',
          options: buttonVariantNames,
          default: buttonDefaults.variant,
        },
      ],
      props: (state) => ({
        label: 'Save',
        pendingAnnouncement: 'Saving',
        variant: state.variant!,
        ...icon(state, 'leadingIcon'),
      }),
      handlers: [
        {
          event: 'click',
          name: 'save',
          source: 'const save = () => new Promise((resolve) => setTimeout(resolve, 2000))',
          handler: () => wait(2000),
        },
      ],
    },
    {
      title: 'Disabled',
      description:
        'Disable the button to stop presses. With focusableWhenDisabled it stays in the tab order.',
      controls: [
        {
          key: 'focusableWhenDisabled',
          label: 'Focusable when disabled',
          type: 'select',
          options: booleans,
          default: 'false',
        },
      ],
      props: (state) => ({
        label: 'Button',
        disabled: true,
        ...flag(state, 'focusableWhenDisabled'),
      }),
    },
  ],
  accessibility: [
    {
      title: 'Roles and attributes',
      description:
        'Button renders a native button through ui-sdk. Attributes passed to Button reach that element.',
      table: {
        columns: ['Attribute', 'Element', 'Value'],
        rows: [
          ['button', 'Root', 'Native button element, type="button" by default.'],
          [
            'aria-busy="true"',
            'Root',
            'Set while pending. The button also sets aria-disabled and keeps focus.',
          ],
          [
            'aria-disabled="true"',
            'Root',
            'Set while pending, and instead of the native disabled attribute when focusableWhenDisabled is set.',
          ],
        ],
      },
    },
    {
      title: 'Icon-only buttons',
      description:
        'A button with an icon size has no visible text, so give it an accessible name with aria-label or aria-labelledby.',
    },
    {
      title: 'Pending buttons',
      description:
        'After one second pending, the button announces pendingAnnouncement ("Loading" by default) through a polite live region. Keep the label while it waits: the spinner shows progress and the announcement tells assistive technology.',
    },
  ],
  api: {
    props: [
      {
        name: 'label',
        type: 'string',
        description: 'Text of the button. The default slot replaces it.',
      },
      {
        name: 'variant',
        type: buttonVariantNames.map((variant) => `'${variant}'`).join(' | '),
        default: `'${buttonDefaults.variant}'`,
        description: 'Visual weight of the button.',
      },
      {
        name: 'color',
        type: 'string',
        default: `'${buttonDefaults.color}'`,
        description:
          'Theme token such as primary or error, a custom token, or a CSS color such as #6366f1. The foreground color is picked for contrast.',
      },
      {
        name: 'size',
        type: buttonSizes.map((size) => `'${size}'`).join(' | '),
        default: `'${buttonDefaults.size}'`,
        description:
          'Text button size from xs to xl, or square icon-only size from icon-xs to icon-xl. Icon is the medium icon size.',
      },
      {
        name: 'radius',
        type: 'string | number',
        default: `'${buttonDefaults.radius}'`,
        description:
          'Theme radius such as sm or lg, none, full, a number in pixels, or a CSS length.',
      },
      { name: 'leadingIcon', type: 'IconName', description: 'Icon before the label.' },
      { name: 'trailingIcon', type: 'IconName', description: 'Icon after the label.' },
      { name: 'block', type: 'boolean', default: 'false', description: 'Takes the full width.' },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Stops presses and removes the button from the tab order.',
      },
      {
        name: 'focusableWhenDisabled',
        type: 'boolean',
        default: 'false',
        description: 'Keeps a disabled button focusable with aria-disabled instead of disabled.',
      },
      {
        name: 'type',
        type: "'button' | 'submit' | 'reset'",
        default: "'button'",
        description: 'What the button does in a form.',
      },
      {
        name: 'pendingAnnouncement',
        type: 'string',
        default: "'Loading'",
        description:
          'What screen readers hear once the button has been pending for a second. An empty string says nothing.',
      },
    ],
    emits: [
      {
        name: 'click',
        type: '(event: MouseEvent, details: ButtonActionDetails) => unknown',
        description: 'Runs on press. Return a Promise to keep the button pending until it settles.',
      },
    ],
    slots: [
      {
        name: 'default',
        type: '-',
        description: 'Main button content; overrides the label fallback.',
      },
      {
        name: 'leading',
        type: '-',
        description: 'Content displayed before the label; overrides the leadingIcon fallback.',
      },
      {
        name: 'loading',
        type: '-',
        description:
          'Content displayed before the label while pending, in place of the leading content; overrides the default spinner.',
      },
      {
        name: 'trailing',
        type: '-',
        description: 'Content displayed after the label; overrides the trailingIcon fallback.',
      },
    ],
    expose: [],
  },
}

export default button
