import type { ComponentDocConfig, ExampleProps, ExampleState } from '@docs/config/component-docs'
import { alertDefaults, alertVariantNames, Alert, iconNames, themeColors } from '@nono/ui'

const booleans = ['false', 'true']
const icons = ['none', ...iconNames]
const label = 'Heads up!'
const description = 'You can add components to your app using the CLI.'

function icon(state: ExampleState): ExampleProps {
  return state.icon && state.icon !== 'none' ? { icon: state.icon } : {}
}

const alert: ComponentDocConfig = {
  slug: 'alert',
  title: 'Alert',
  description: 'Communicates important information, statuses and actions within an interface.',
  component: Alert,
  usage: [
    {
      title: 'Basic usage',
      description: 'Show a title with label and supporting text with description.',
      props: () => ({ label, description }),
    },
  ],
  examples: [
    {
      title: 'Icon',
      description: 'Choose the leading icon displayed in the alert.',
      controls: [{ key: 'icon', label: 'Icon', type: 'select', options: icons, default: 'info' }],
      props: (state) => ({ label, description, ...icon(state) }),
    },
    {
      title: 'Variant',
      description: 'Choose how much visual weight the alert has.',
      controls: [
        {
          key: 'variant',
          label: 'Variant',
          type: 'select',
          options: alertVariantNames,
          default: alertDefaults.variant,
        },
      ],
      props: (state) => ({ label, description, icon: 'info', variant: state.variant! }),
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
          default: alertDefaults.color,
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
          options: alertVariantNames,
          default: alertDefaults.variant,
        },
      ],
      props: (state) => ({
        label,
        description,
        icon: 'info',
        color: state.color === 'custom' ? state.custom! : state.color!,
        variant: state.variant!,
      }),
    },
    {
      title: 'Closable',
      description:
        'Show a close button that hides the alert and emits close. Reset brings it back.',
      controls: [
        {
          key: 'closable',
          label: 'Closable',
          type: 'select',
          options: booleans,
          default: 'true',
        },
      ],
      props: (state) => ({ label, description, icon: 'info', closable: state.closable === 'true' }),
    },
  ],
  accessibility: [
    {
      title: 'Roles and attributes',
      description:
        'An alert is announced as soon as it appears. Set decorative to true only for visual content that should not be announced. Attributes passed to Alert reach the root.',
      table: {
        columns: ['Attribute', 'Element', 'Value'],
        rows: [
          ['role="alert"', 'Root', 'Announces the content immediately.'],
          ['role="none"', 'Root', 'Used instead of alert when decorative is true.'],
          [
            'aria-label',
            'Close button',
            '"Close" in the locale from provideLocale; closeButton.ui.root overrides it. Left out when closeButton has a label.',
          ],
          ['aria-hidden="true"', 'Icon', 'The icon is decorative.'],
        ],
      },
    },
    {
      title: 'Keyboard',
      description: 'Only a closable alert has something to focus.',
      table: {
        columns: ['Key', 'Action'],
        rows: [
          ['Tab', 'Moves focus to the close button.'],
          ['Space, Enter', 'Closes the alert.'],
        ],
      },
    },
    {
      title: 'Meaning',
      description:
        'Do not rely on color alone to communicate meaning: say it in the label or description. Give informative custom icons an accessible name, and keep custom close controls named.',
    },
  ],
  api: {
    props: [
      { name: 'label', type: 'string', description: 'Short title on the first line.' },
      { name: 'description', type: 'string', description: 'Supporting text below the label.' },
      {
        name: 'icon',
        type: 'IconName',
        description: 'Icon at the start; the icon slot replaces it.',
      },
      {
        name: 'variant',
        type: alertVariantNames.map((variant) => `'${variant}'`).join(' | '),
        default: `'${alertDefaults.variant}'`,
        description: 'Visual weight of the alert.',
      },
      {
        name: 'color',
        type: 'string',
        default: `'${alertDefaults.color}'`,
        description:
          'Theme token such as primary or error, a custom token, or a CSS color such as #6366f1. The foreground color is picked for contrast.',
      },
      {
        name: 'closable',
        type: 'boolean',
        default: String(alertDefaults.closable),
        description: 'Shows the close button, or the close slot.',
      },
      {
        name: 'closeButton',
        type: 'ButtonProps',
        typeLink: '/components/button#props',
        description:
          'Props of the close Button, over the defaults (xs, full radius, the alert variant and color, x icon). Its accessible name is "Close" in the locale from provideLocale, unless it has a label or closeButton.ui.root returns an aria-label; the rest of closeButton.ui is kept. onClick is left out: the button always closes the alert.',
      },
      {
        name: 'decorative',
        type: 'boolean',
        default: String(alertDefaults.decorative),
        description:
          'Uses role="none" instead of role="alert" for purely visual content. A role passed as an attribute takes precedence.',
      },
      {
        name: 'ui',
        type: 'AlertUi',
        typeLink: '#ui',
        description: 'HTML attributes for the root and each inner node. See UI.',
      },
    ],
    emits: [
      {
        name: 'close',
        type: '[]',
        description: 'Emitted when the alert is closed with the button or the close slot.',
      },
    ],
    ui: [
      { node: 'root', tag: 'div' },
      { node: 'icon', tag: 'svg' },
      { node: 'label', tag: 'div' },
      { node: 'description', tag: 'div' },
    ],
    slots: [
      {
        name: 'icon',
        type: '-',
        description: 'Content at the start; overrides the icon fallback.',
      },
      { name: 'label', type: '-', description: 'Title content; overrides the label fallback.' },
      {
        name: 'description',
        type: '-',
        description: 'Description content; overrides the description fallback.',
      },
      {
        name: 'close',
        type: `{
  close: () => void
}`,
        typePre: true,
        description: 'Close control. Receives close, which hides the alert and emits close.',
      },
    ],
    expose: [],
  },
}

export default alert
