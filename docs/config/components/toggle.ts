import type { ComponentDocConfig, ExampleState } from '@docs/config/component-docs'
import {
  Toggle,
  toggleDefaults,
  toggleSizes,
  toggleVariantNames,
  iconNames,
  themeColors,
  themeRadii,
} from '@nono/ui'

const icons = ['none', ...iconNames]
const booleans = ['false', 'true']
const variants = (value: readonly string[]) => value.map((item) => `'${item}'`).join(' | ')

function option(state: ExampleState, key: string) {
  return state[key] && state[key] !== 'none' ? { [key]: state[key] } : {}
}

function flag(state: ExampleState, key: string) {
  return state[key] === 'true' ? { [key]: true } : {}
}

const toggle: ComponentDocConfig = {
  slug: 'toggle',
  title: 'Toggle',
  description: 'A button that stays pressed until it is pressed again.',
  component: Toggle,
  usage: [
    {
      title: 'Basic usage',
      description:
        'Bind the pressed state with v-model, or set defaultValue to leave it uncontrolled. Keep the label the same in both states.',
      props: () => ({ label: 'Favorite', icon: 'heart' }),
    },
  ],
  examples: [
    {
      title: 'Variant and color',
      description:
        'variant and color apply while unpressed, activeVariant and activeColor while pressed. A color is a palette token or a hexadecimal color for the text, the border, the fill and the focus ring. Press it to compare.',
      controls: [
        {
          key: 'variant',
          label: 'Variant',
          type: 'select',
          options: toggleVariantNames,
          default: toggleDefaults.variant,
        },
        {
          key: 'activeVariant',
          label: 'Active variant',
          type: 'select',
          options: toggleVariantNames,
          default: toggleDefaults.activeVariant,
        },
        {
          key: 'color',
          label: 'Color',
          type: 'select',
          options: [...themeColors, 'custom'],
          default: toggleDefaults.color,
        },
        {
          key: 'custom',
          label: 'Custom color',
          type: 'color',
          default: '#6366f1',
          visible: (state) => state.color === 'custom',
        },
        {
          key: 'activeColor',
          label: 'Active color',
          type: 'select',
          options: [...themeColors, 'custom'],
          default: toggleDefaults.activeColor,
        },
        {
          key: 'activeCustom',
          label: 'Custom active color',
          type: 'color',
          default: '#6366f1',
          visible: (state) => state.activeColor === 'custom',
        },
      ],
      props: (state) => ({
        label: 'Bold',
        variant: state.variant!,
        activeVariant: state.activeVariant!,
        color: state.color === 'custom' ? state.custom! : state.color!,
        activeColor: state.activeColor === 'custom' ? state.activeCustom! : state.activeColor!,
      }),
    },
    {
      title: 'Size',
      description: 'Adjust the height, padding and text size. Icons follow the toggle size.',
      controls: [
        {
          key: 'size',
          label: 'Size',
          type: 'select',
          options: toggleSizes,
          default: toggleDefaults.size,
        },
      ],
      props: (state) => ({ label: 'Favorite', icon: 'heart', size: state.size! }),
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
          default: toggleDefaults.radius,
        },
      ],
      props: (state) => ({ label: 'Favorite', defaultValue: true, radius: state.radius! }),
    },
    {
      title: 'Icons',
      description:
        'Place an icon before or after the label. Screen readers skip it, so the label names the toggle.',
      controls: [
        {
          key: 'icon',
          label: 'Icon',
          type: 'select',
          options: icons,
          default: 'heart',
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
        label: 'Favorite',
        ...option(state, 'icon'),
        ...option(state, 'trailingIcon'),
      }),
    },
    {
      title: 'Icon only',
      description:
        'Without a label the toggle turns square. Its size follows the size prop, and it needs an aria-label.',
      controls: [
        {
          key: 'size',
          label: 'Size',
          type: 'select',
          options: toggleSizes,
          default: toggleDefaults.size,
        },
      ],
      props: (state) => ({ icon: 'star', 'aria-label': 'Star', size: state.size! }),
    },
    {
      title: 'Disabled',
      description:
        'Disable the toggle to stop presses. It can still start pressed. With focusableWhenDisabled it stays in the tab order.',
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
        label: 'Favorite',
        defaultValue: true,
        disabled: true,
        ...flag(state, 'focusableWhenDisabled'),
      }),
    },
  ],
  accessibility: [
    {
      title: 'Roles and attributes',
      description:
        'Toggle renders the ui-sdk toggle: a native button that reports its state with aria-pressed. Attributes passed to Toggle reach that button.',
      table: {
        columns: ['Attribute', 'Element', 'Value'],
        rows: [
          ['button', 'Root', 'Native button, always type="button", so it never submits a form.'],
          ['aria-pressed', 'Root', '"true" while pressed, "false" otherwise.'],
          [
            'aria-disabled="true"',
            'Root',
            'Set instead of the native disabled attribute when focusableWhenDisabled is set.',
          ],
          ['aria-hidden="true"', 'Leading, trailing', 'Icons are hidden from screen readers.'],
        ],
      },
    },
    {
      title: 'Keyboard',
      description: 'Tab moves to the toggle. Enter or Space presses or unpresses it.',
    },
    {
      title: 'Naming the toggle',
      description:
        'Keep the same label in both states: screen readers already announce whether it is pressed. An icon-only toggle needs an aria-label.',
    },
    {
      title: 'Forms',
      description:
        'A toggle does not submit a value. Use a Checkbox or a Switch for a form choice.',
    },
  ],
  api: {
    props: [
      { name: 'modelValue', type: 'boolean', description: 'Whether it is pressed, for v-model.' },
      {
        name: 'defaultValue',
        type: 'boolean',
        description: 'Whether it starts pressed when uncontrolled.',
      },
      {
        name: 'label',
        type: 'string',
        description: 'Text of the toggle. The default slot replaces it.',
      },
      {
        name: 'variant',
        type: variants(toggleVariantNames),
        default: `'${toggleDefaults.variant}'`,
        description: 'How the toggle looks while unpressed.',
      },
      {
        name: 'activeVariant',
        type: variants(toggleVariantNames),
        default: `'${toggleDefaults.activeVariant}'`,
        description: 'How the toggle looks while pressed.',
      },
      {
        name: 'color',
        type: 'string',
        default: `'${toggleDefaults.color}'`,
        description:
          'Color while unpressed: a theme token such as primary or error, a custom token, or a CSS color such as #6366f1. Colors the text, border, fill and focus ring.',
      },
      {
        name: 'activeColor',
        type: 'string',
        default: `'${toggleDefaults.activeColor}'`,
        description: 'Color while pressed. Takes the same values as color.',
      },
      {
        name: 'size',
        type: variants(toggleSizes),
        default: `'${toggleDefaults.size}'`,
        description: 'Height, padding and text size.',
      },
      {
        name: 'radius',
        type: 'string | number',
        default: `'${toggleDefaults.radius}'`,
        description:
          'Theme radius such as sm or lg, none, full, a number in pixels, or a CSS length.',
      },
      { name: 'icon', type: 'IconName', description: 'Icon before the label.' },
      { name: 'trailingIcon', type: 'IconName', description: 'Icon after the label.' },
      {
        name: 'square',
        type: 'boolean',
        description:
          'Makes the toggle as wide as it is tall. On by default when it has an icon and no label or default slot.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Stops presses and removes the toggle from the tab order.',
      },
      {
        name: 'focusableWhenDisabled',
        type: 'boolean',
        default: 'false',
        description: 'Keeps a disabled toggle focusable with aria-disabled instead of disabled.',
      },
      {
        name: 'ui',
        type: 'ToggleUi',
        typeLink: '#ui',
        description: 'HTML attributes for the root and each inner node. See UI.',
      },
    ],
    emits: [
      {
        name: 'update:modelValue',
        type: '(value: boolean) => void',
        description: 'Runs when it is pressed or unpressed. Not when the change is canceled.',
      },
      {
        name: 'pressedChange',
        type: '(pressed: boolean, details: TogglePressedChangeDetails) => void',
        description:
          'Runs before a change. details.reason says why (press or imperative), and details.cancel() stops it.',
      },
    ],
    ui: [
      {
        node: 'root',
        tag: 'button',
        kept: 'aria-pressed',
      },
      { node: 'leadingIcon', tag: 'svg' },
      { node: 'label', tag: 'span' },
      { node: 'trailingIcon', tag: 'svg' },
    ],
    slots: [
      {
        name: 'default',
        type: `{
  pressed: boolean
}`,
        typePre: true,
        description: 'Main content; overrides the label fallback.',
      },
      {
        name: 'leading',
        type: `{
  pressed: boolean
}`,
        typePre: true,
        description:
          'Content before the label, hidden from screen readers; overrides the icon fallback.',
      },
      {
        name: 'trailing',
        type: `{
  pressed: boolean
}`,
        typePre: true,
        description:
          'Content after the label, hidden from screen readers; overrides the trailingIcon fallback.',
      },
    ],
    expose: [
      {
        name: 'toggle',
        type: '(options?: { reason?, event? }) => boolean',
        description:
          'Presses or unpresses it, as a user would. Returns false when the change is canceled.',
      },
      {
        name: 'setPressed',
        type: '(pressed: boolean, options?: { reason?, event? }) => boolean',
        description: 'Presses or unpresses it. Returns false when the change is canceled.',
      },
      { name: 'isPressed', type: '() => boolean', description: 'Whether it is pressed.' },
      { name: 'focus', type: '() => void', description: 'Moves focus to it.' },
    ],
  },
}

export default toggle
