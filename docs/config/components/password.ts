import type { ComponentDocConfig } from '@docs/config/component-docs'
import { Password, inputSizes, inputVariantNames, passwordDefaults, themeColors } from '@nono/ui'

const placeholder = 'Password'

const password: ComponentDocConfig = {
  slug: 'password',
  title: 'Password',
  description: 'Takes a password, with a button that shows or hides it.',
  component: Password,
  usage: [
    {
      title: 'Basic usage',
      description:
        'Bind the password with v-model, or set defaultValue to leave it uncontrolled. Name it with a FormField or a Label.',
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
          default: passwordDefaults.variant,
        },
      ],
      props: (state) => ({ placeholder, variant: state.variant! }),
    },
    {
      title: 'Color',
      description: 'Color of the border and ring on focus.',
      controls: [
        {
          key: 'color',
          label: 'Color',
          type: 'select',
          options: themeColors,
          default: passwordDefaults.color,
        },
      ],
      props: (state) => ({ placeholder, color: state.color! }),
    },
    {
      title: 'Size',
      description: 'Adjust the height, padding and text size. The icon and toggle follow it.',
      controls: [
        {
          key: 'size',
          label: 'Size',
          type: 'select',
          options: inputSizes,
          default: passwordDefaults.size,
        },
      ],
      props: (state) => ({ placeholder, icon: 'lock', size: state.size! }),
    },
    {
      title: 'Icon',
      description: 'Place an icon before the text. Use the leading slot for anything else.',
      props: () => ({ placeholder, icon: 'lock' }),
    },
    {
      title: 'Shown at first',
      description: 'Start with the password shown. Bind v-model:visible to control it.',
      props: () => ({ defaultValue: 'correct horse', defaultVisible: true }),
    },
    {
      title: 'New password',
      description:
        'Set autoComplete to new-password on sign-up and change forms, so password managers offer a new one.',
      props: () => ({ placeholder: 'New password', autoComplete: 'new-password' }),
    },
    {
      title: 'Read-only',
      description:
        'Keep the password from changing. The toggle still shows it and it still submits.',
      props: () => ({ defaultValue: 'correct horse', readOnly: true }),
    },
    {
      title: 'Disabled',
      description: 'Stop editing and disable the toggle.',
      props: () => ({ placeholder, disabled: true }),
    },
  ],
  accessibility: [
    {
      title: 'Roles and attributes',
      description:
        'Password renders the ui-sdk password input. class and style reach the root; every other attribute, such as id or aria-label, reaches the input.',
      table: {
        columns: ['Attribute', 'Element', 'Value'],
        rows: [
          ['div', 'Root', 'Holds the input, its icon and the toggle.'],
          [
            'input',
            'Input',
            'Native input. type is password while hidden and text while shown; it cannot be overridden.',
          ],
          [
            'button',
            'Toggle',
            'Native button with type="button", named "Show password" in the locale from provideLocale; ui.toggle overrides it.',
          ],
          ['aria-pressed', 'Toggle', 'true while the password is shown.'],
          ['aria-controls', 'Toggle', 'Points at the input.'],
        ],
      },
    },
    {
      title: 'Naming the toggle',
      description:
        'The toggle keeps the same name in both states, and aria-pressed tells whether the password is shown. Name it by its action, like "Show password".',
    },
    {
      title: 'Keyboard and focus',
      description:
        'Tab moves from the input to the toggle. Space or Enter on the toggle shows or hides the password; Enter in the input submits the form. A pointer press on the toggle keeps focus and the caret in the input.',
    },
    {
      title: 'Hiding again',
      description:
        'Submitting or resetting the form and leaving the page hide a shown password. A shown password is not spellchecked, autocorrected or capitalized.',
    },
  ],
  api: {
    props: [
      { name: 'modelValue', type: 'string', description: 'Password, for v-model.' },
      {
        name: 'defaultValue',
        type: 'string',
        description: 'Initial password when uncontrolled. A form reset returns to it.',
      },
      {
        name: 'visible',
        type: 'boolean',
        description: 'Whether the password is shown, for v-model:visible.',
      },
      {
        name: 'defaultVisible',
        type: 'boolean',
        default: 'false',
        description: 'Shows the password at first when visible is uncontrolled.',
      },
      {
        name: 'autoComplete',
        type: "'current-password' | 'new-password' | 'off' | string",
        default: `'${passwordDefaults.autoComplete}'`,
        description: 'Tells password managers whether to fill a saved password or offer a new one.',
      },
      { name: 'name', type: 'string', description: 'Submits the password under this name.' },
      {
        name: 'form',
        type: 'string',
        description: 'Id of the form it belongs to, when it is not inside it.',
      },
      {
        name: 'variant',
        type: inputVariantNames.map((variant) => `'${variant}'`).join(' | '),
        default: `'${passwordDefaults.variant}'`,
        description: 'How the field stands out from the page.',
      },
      {
        name: 'color',
        type: 'string',
        default: `'${passwordDefaults.color}'`,
        description:
          'Theme token such as primary or error, a custom token, or a CSS color such as #6366f1. Only the focus border and ring use it.',
      },
      {
        name: 'size',
        type: inputSizes.map((size) => `'${size}'`).join(' | '),
        default: `'${passwordDefaults.size}'`,
        description:
          'Height, padding, text, icon and toggle size. Inside a FormField, it defaults to the field size.',
      },
      {
        name: 'radius',
        type: 'string | number',
        default: `'${passwordDefaults.radius}'`,
        description:
          'Theme radius such as sm or lg, none, full, a number in pixels, or a CSS length.',
      },
      { name: 'icon', type: 'IconName', description: 'Icon before the text.' },
      {
        name: 'highlight',
        type: 'boolean',
        default: 'false',
        description: 'Shows the border in the input color, even without focus.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Stops editing and disables the toggle.',
      },
      {
        name: 'readOnly',
        type: 'boolean',
        default: 'false',
        description: 'Keeps the password from changing; the toggle still works.',
      },
      {
        name: 'required',
        type: 'boolean',
        default: 'false',
        description: 'Needs a password before its form submits.',
      },
      {
        name: 'ui',
        type: 'PasswordUi',
        typeLink: '#ui',
        description: 'HTML attributes for the root and each inner node. See UI.',
      },
    ],
    emits: [
      {
        name: 'update:modelValue',
        type: '(value: string) => void',
        description: 'Runs as the password changes.',
      },
      {
        name: 'update:visible',
        type: '(visible: boolean) => void',
        description:
          'Runs when the password is shown or hidden, by the toggle, a form or the page.',
      },
    ],
    ui: [
      { node: 'root', tag: 'div' },
      { node: 'input', tag: 'input', kept: 'type' },
      { node: 'leadingIcon', tag: 'svg' },
      { node: 'toggle', tag: 'button', kept: 'type, aria-pressed, aria-controls' },
      { node: 'toggleIcon', tag: 'svg' },
    ],
    slots: [
      {
        name: 'leading',
        type: '-',
        description: 'Content displayed before the text; overrides the icon fallback.',
      },
      {
        name: 'trailing',
        type: `{
  visible: boolean
  capsLock: boolean
}`,
        typePre: true,
        description:
          'Content displayed before the toggle, such as a Caps Lock hint. capsLock is true while Caps Lock is on and the field has focus.',
      },
      {
        name: 'iconToggle',
        type: `{
  visible: boolean
}`,
        typePre: true,
        description:
          'Content of the toggle; overrides the eye and eye-off icons. The button keeps its name and behavior.',
      },
    ],
    expose: [],
  },
}

export default password
