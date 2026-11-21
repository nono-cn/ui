import type { ComponentDocConfig } from '@docs/config/component-docs'
import { Switch, switchDefaults, switchSizes, iconNames, themeColors, themeRadii } from '@nono/ui'

const icons = ['none', ...iconNames]
const name = { 'aria-label': 'Email notifications' }

function icon(state: Record<string, string | undefined>, key: string) {
  return state[key] && state[key] !== 'none' ? { [key]: state[key] } : {}
}

const thumbState = `{
  checked: boolean
  loading: boolean
}`

const switchDocs: ComponentDocConfig = {
  slug: 'switch',
  title: 'Switch',
  description: 'Turns a setting on or off as soon as it changes.',
  component: Switch,
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
      description: 'Color of the track while it is on, and of the focus ring.',
      controls: [
        {
          key: 'color',
          label: 'Color',
          type: 'select',
          options: [...themeColors, 'custom'],
          default: switchDefaults.color,
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
      description: 'Adjust the track and thumb size. Inside a FormField, it follows the field.',
      controls: [
        {
          key: 'size',
          label: 'Size',
          type: 'select',
          options: switchSizes,
          default: switchDefaults.size,
        },
      ],
      props: (state) => ({ ...name, defaultValue: true, size: state.size! }),
    },
    {
      title: 'Radius',
      description:
        'Use a theme radius, none, full, or any CSS length. The thumb follows the track.',
      controls: [
        {
          key: 'radius',
          label: 'Radius',
          type: 'select',
          options: themeRadii,
          default: switchDefaults.radius,
        },
      ],
      props: (state) => ({ ...name, defaultValue: true, radius: state.radius! }),
    },
    {
      title: 'Icons',
      description:
        'Show an icon in the thumb for each state. Use the thumb slot for anything else.',
      controls: [
        {
          key: 'checkedIcon',
          label: 'Checked icon',
          type: 'select',
          options: icons,
          default: 'check',
        },
        {
          key: 'uncheckedIcon',
          label: 'Unchecked icon',
          type: 'select',
          options: icons,
          default: 'x',
        },
      ],
      props: (state) => ({
        ...name,
        size: 'lg',
        ...icon(state, 'checkedIcon'),
        ...icon(state, 'uncheckedIcon'),
      }),
    },
    {
      title: 'Loading',
      description:
        'Show a spinner in the thumb while a change is saved. It stays focusable but ignores presses; calls to its exposed methods still go through.',
      controls: [],
      props: () => ({ ...name, loading: true }),
    },
    {
      title: 'Read-only',
      description:
        'Keep it focusable and submitted, but stop changes. Use it for a setting managed elsewhere.',
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
        'Switch renders the ui-sdk switch: a button with the switch role and a hidden native checkbox for forms. Every attribute, such as id or aria-label, reaches the button.',
      table: {
        columns: ['Attribute', 'Element', 'Value'],
        rows: [
          ['role="switch"', 'Root', 'Button with aria-checked.'],
          ['aria-busy="true"', 'Root', 'Present while loading.'],
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
        'Tab moves to the switch and Space turns it on or off. Enter submits its form and never toggles it.',
    },
    {
      title: 'Naming the switch',
      description:
        'The switch has no text of its own. Put it in a FormField, wrap it in a label with the setting name, or pass an aria-label. Keep the name the same in both states.',
    },
    {
      title: 'Saving on toggle',
      description:
        'To save before the change shows, call details.cancel() in @checked-change and set loading. When the save ends, call setChecked(next, { reason: "imperative" }) on the component ref, and let that reason through in the handler.',
    },
  ],
  api: {
    props: [
      { name: 'modelValue', type: 'boolean', description: 'Whether it is on, for v-model.' },
      {
        name: 'defaultValue',
        type: 'boolean',
        description: 'Whether it starts on when uncontrolled. A form reset returns to it.',
      },
      {
        name: 'color',
        type: 'string',
        default: `'${switchDefaults.color}'`,
        description:
          'Theme token such as primary or error, a custom token, or a CSS color such as #6366f1. Colors the track while on and the focus ring.',
      },
      {
        name: 'size',
        type: switchSizes.map((size) => `'${size}'`).join(' | '),
        default: `'${switchDefaults.size}'`,
        description: 'Track and thumb size. Inside a FormField, it defaults to the field size.',
      },
      {
        name: 'radius',
        type: 'string | number',
        default: `'${switchDefaults.radius}'`,
        description:
          'Theme radius such as sm or lg, none, full, a number in pixels, or a CSS length.',
      },
      { name: 'checkedIcon', type: 'IconName', description: 'Icon in the thumb while on.' },
      { name: 'uncheckedIcon', type: 'IconName', description: 'Icon in the thumb while off.' },
      {
        name: 'loading',
        type: 'boolean',
        default: 'false',
        description:
          'Shows loadingIcon in the thumb, sets aria-busy and ignores presses, form resets and restores. Calls to its exposed methods still go through. It stays focusable and submitted.',
      },
      {
        name: 'loadingIcon',
        type: 'IconName',
        default: "'spinner'",
        description: 'Icon in the thumb while loading.',
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
        description: 'Blocks its form until it is on. Inside a FormField, it follows the field.',
      },
      { name: 'name', type: 'string', description: 'Name it submits under while on.' },
      {
        name: 'value',
        type: 'string',
        default: "'on'",
        description: 'What it submits while on.',
      },
      {
        name: 'form',
        type: 'string',
        description: 'Id of a form to join, when it is not inside that form.',
      },
      {
        name: 'ui',
        type: 'SwitchUi',
        typeLink: '#ui',
        description: 'HTML attributes for the root and each inner node. See UI.',
      },
    ],
    emits: [
      {
        name: 'update:modelValue',
        type: '(value: boolean) => void',
        description: 'Runs when it turns on or off. Not when the change is canceled.',
      },
      {
        name: 'checkedChange',
        type: '(checked: boolean, details: SwitchChangeDetails) => void',
        description:
          'Runs before a change. details.reason says why (press, reset, restore or imperative), and details.cancel() stops it. While loading, only imperative changes reach it.',
      },
    ],
    ui: [
      {
        node: 'root',
        tag: 'button',
        kept: 'role, tabindex, aria-checked, aria-disabled, aria-busy',
      },
      {
        node: 'thumb',
        tag: 'span',
        state: thumbState,
      },
      { node: 'icon', tag: 'svg', state: thumbState },
    ],
    slots: [
      {
        name: 'thumb',
        type: `{
  checked: boolean
  loading: boolean
}`,
        typePre: true,
        description: 'Content of the thumb; overrides the icons and the spinner.',
      },
    ],
    expose: [
      {
        name: 'toggle',
        type: '(details?: { reason?, event? }) => boolean',
        description:
          'Turns it on or off, as a press would. Returns false when the change is canceled.',
      },
      {
        name: 'setChecked',
        type: '(checked: boolean, details?: { reason?, event? }) => boolean',
        description: 'Turns it on or off. Returns false when the change is canceled.',
      },
      { name: 'getChecked', type: '() => boolean', description: 'Whether it is on.' },
      { name: 'focus', type: '() => void', description: 'Moves focus to it.' },
    ],
  },
}

export default switchDocs
