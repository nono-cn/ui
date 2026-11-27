import type { ComponentDocConfig, ExampleSlotContent } from '@docs/config/component-docs'
import { App, Button, buttonSizes, buttonVariantNames } from '@nono/ui'

function buttons(labels: string[], props: Record<string, string> = {}): ExampleSlotContent[] {
  return labels.map((label) => ({ name: 'Button', component: Button, props: { label, ...props } }))
}

const buttonAppDefaultsType = `Omit<ButtonProps, 'label' | 'disabled' | 'onClick'>`

const app: ComponentDocConfig = {
  slug: 'app',
  title: 'App',
  description:
    'Wraps the application to set default props for every component and keep preferences in sync.',
  component: App,
  slot: buttons(['Save', 'Cancel']),
  usage: [
    {
      title: 'Basic usage',
      description:
        'Wrap the application once. The defaults apply to every component inside that does not set that prop itself.',
      props: () => ({ defaults: { button: { variant: 'soft', radius: 'full' } } }),
    },
  ],
  examples: [
    {
      title: 'Button defaults',
      description:
        'Set the props of every Button inside. Props passed to a Button win, and so does the size of a ButtonGroup closer to it.',
      controls: [
        {
          key: 'variant',
          label: 'Variant',
          type: 'select',
          options: buttonVariantNames,
          default: 'outline',
        },
        { key: 'size', label: 'Size', type: 'select', options: buttonSizes, default: 'sm' },
        { key: 'color', label: 'Color', type: 'color', default: 'neutral' },
      ],
      props: (state) => ({
        defaults: { button: { variant: state.variant!, size: state.size!, color: state.color! } },
      }),
    },
    {
      title: 'Override one component',
      description: 'A prop on the component itself wins over the App default.',
      controls: [],
      props: () => ({ defaults: { button: { variant: 'outline', color: 'neutral' } } }),
      slot: [...buttons(['Cancel']), ...buttons(['Save'], { variant: 'solid', color: 'primary' })],
    },
  ],
  accessibility: [
    {
      title: 'Roles and attributes',
      description:
        'App renders a div with display: contents and no role, so it adds nothing to the layout or the accessibility tree.',
    },
  ],
  api: {
    props: [
      {
        name: 'defaults',
        type: 'AppDefaults',
        typeLink: '#appdefaults',
        description:
          'Default props per component. A nested App merges its defaults over the outer ones: undefined values keep the outer value, plain objects merge key by key, and ui resolvers of the same node are combined, the inner one over the outer one.',
      },
      {
        name: 'preferences',
        type: 'PreferenceLike[]',
        default: '[]',
        description:
          'Preferences from createPreference or createColorScheme in @ui-sdk/core. Each one is shown as its data attribute on the App root, or on <html> when global, from the first paint.',
      },
      {
        name: 'nonce',
        type: 'string',
        description:
          'Nonce your Content Security Policy gives inline scripts, for the preferences script.',
      },
    ],
    emits: [],
    slots: [{ name: 'default', type: '-', description: 'The application.' }],
    configs: [
      {
        id: 'appdefaults',
        title: 'AppDefaults',
        description: 'Each key holds the default props of one component.',
        rows: [
          {
            name: 'button',
            type: buttonAppDefaultsType,
            description:
              'Default props of Button. Its ui is combined with the ui passed to each Button, which wins on conflicts.',
          },
        ],
      },
    ],
    expose: [],
  },
}

export default app
