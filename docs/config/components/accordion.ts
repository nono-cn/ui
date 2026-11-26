import type { ComponentDocConfig, ExampleValue } from '@docs/config/component-docs'
import {
  Accordion,
  accordionDefaults,
  accordionIndicatorPositions,
  accordionVariantNames,
} from '@nono/ui'

const booleans = ['false', 'true']
const indicators = ['chevron', 'plus']
const variants = (value: readonly string[]) => value.map((item) => `'${item}'`).join(' | ')
const width = 'w-full max-w-lg'

const itemContext = { state: 'AccordionItemContext', stateLink: '#accordion-item-context' }

const itemContextSlot = { type: 'AccordionItemContext', typeLink: '#accordion-item-context' }

const faq: ExampleValue = [
  {
    value: 'shipping',
    label: 'What are your shipping options?',
    content: 'Standard shipping takes 5 to 7 days and express 2 to 3. Orders over 50 € ship free.',
  },
  {
    value: 'returns',
    label: 'What is your return policy?',
    content: 'Return any unused item in its original packaging within 30 days.',
  },
  {
    value: 'support',
    label: 'How can I reach support?',
    content: 'Write to us by email or chat. We answer within 24 hours on business days.',
  },
]

const settings: ExampleValue = [
  {
    value: 'profile',
    label: 'Profile',
    icon: 'user',
    content: 'Update your name, photo and the email address people see.',
  },
  {
    value: 'favorites',
    label: 'Favorites',
    icon: 'star',
    trailingIcon: 'warning',
    content: 'Two of your saved searches no longer return results.',
  },
  {
    value: 'security',
    label: 'Security',
    icon: 'lock',
    content: 'Change your password and turn on two-factor authentication.',
  },
]

const withDisabled: ExampleValue = [
  {
    value: 'history',
    label: 'Can I see my account history?',
    content: 'Every payment, plan change and support ticket is listed in your dashboard.',
  },
  {
    value: 'premium',
    label: 'Premium features (locked)',
    content: 'Upgrade your plan to read this section.',
    disabled: true,
  },
  {
    value: 'email',
    label: 'How do I change my email address?',
    content: 'Change it in your account settings and confirm it from your new inbox.',
  },
]

const accordion: ComponentDocConfig = {
  slug: 'accordion',
  title: 'Accordion',
  description: 'A stack of headings that each show and hide a section of content.',
  component: Accordion,
  usage: [
    {
      title: 'Basic usage',
      description:
        'Pass the sections as items, each with a label and the content of its panel. Bind the open values with v-model, or set defaultValue to leave it uncontrolled. An item without value is identified by its index.',
      props: () => ({ items: faq, defaultValue: ['shipping'], class: width }),
    },
  ],
  examples: [
    {
      title: 'Variant',
      description:
        'plain separates the items with lines; outline frames them in one box and tints the open one; separated gives each item its own bordered card; frame sets each card inside a muted box.',
      controls: [
        {
          key: 'variant',
          label: 'Variant',
          type: 'select',
          options: accordionVariantNames,
          default: 'outline',
        },
      ],
      props: (state) => ({
        items: faq,
        defaultValue: ['shipping'],
        variant: state.variant!,
        class: width,
      }),
    },
    {
      title: 'Indicator',
      description:
        'indicatorIcon replaces the chevron and turns as the item opens; with openIndicatorIcon it switches icon instead, like plus to minus. indicatorPosition puts it before the label, where the default chevron points to the label and turns down.',
      controls: [
        {
          key: 'indicator',
          label: 'Indicator',
          type: 'select',
          options: indicators,
          default: 'plus',
        },
        {
          key: 'indicatorPosition',
          label: 'Position',
          type: 'select',
          options: accordionIndicatorPositions,
          default: accordionDefaults.indicatorPosition,
        },
      ],
      props: (state) => ({
        items: faq,
        ...(state.indicator === 'plus' && { indicatorIcon: 'plus', openIndicatorIcon: 'minus' }),
        indicatorPosition: state.indicatorPosition!,
        class: width,
      }),
    },
    {
      title: 'Multiple',
      description:
        'With multiple, opening an item leaves the others open. Without it, set collapsible to false to keep one item always open.',
      controls: [
        {
          key: 'multiple',
          label: 'Multiple',
          type: 'select',
          options: booleans,
          default: 'true',
        },
        {
          key: 'collapsible',
          label: 'Collapsible',
          type: 'select',
          options: booleans,
          default: String(accordionDefaults.collapsible),
        },
      ],
      props: (state) => ({
        items: faq,
        defaultValue: ['shipping'],
        multiple: state.multiple === 'true',
        collapsible: state.collapsible === 'true',
        class: width,
      }),
    },
    {
      title: 'Icons',
      description:
        'Give items an icon before the label or a trailingIcon after it, before the indicator.',
      controls: [],
      props: () => ({ items: settings, variant: 'outline', class: width }),
    },
    {
      title: 'Disabled',
      description:
        'A disabled item keeps its trigger focusable but never opens or closes. disabled on the accordion disables every item.',
      controls: [
        {
          key: 'disabled',
          label: 'Disabled',
          type: 'select',
          options: booleans,
          default: String(accordionDefaults.disabled),
        },
      ],
      props: (state) => ({
        items: withDisabled,
        defaultValue: ['history'],
        variant: 'outline',
        disabled: state.disabled === 'true',
        class: width,
      }),
    },
    {
      title: 'Find in page',
      description:
        'With hiddenUntilFound, closed panels stay in the page and the browser find in page opens the item that matches. Try searching for "packaging".',
      controls: [],
      props: () => ({ items: faq, hiddenUntilFound: true, class: width }),
    },
  ],
  accessibility: [
    {
      title: 'Roles and attributes',
      description:
        'Accordion renders the ui-sdk accordion and follows the WAI-ARIA accordion pattern. Attributes passed to Accordion reach the root.',
      table: {
        columns: ['Attribute', 'Element', 'Value'],
        rows: [
          ['h3', 'Header', 'Each trigger sits in a heading, so screen readers list the sections.'],
          ['aria-expanded', 'Trigger', 'A native button that says whether its panel is open.'],
          ['aria-controls', 'Trigger', 'Points to the panel the trigger opens.'],
          ['role="region"', 'Panel', 'Labelled by its trigger with aria-labelledby.'],
          [
            'aria-disabled="true"',
            'Trigger',
            'Set on disabled items and on the open item that cannot close, which stay focusable.',
          ],
        ],
      },
    },
    {
      title: 'Keyboard',
      description:
        'Every trigger is a tab stop, disabled ones included, and Tab moves from an open trigger into its panel. Enter or Space opens or closes its item. Closing a panel that holds focus moves focus to its trigger.',
    },
    {
      title: 'Labelling',
      description:
        'The label names the trigger and its panel. A trigger without label needs an aria-label through ui.trigger. Icons are hidden from screen readers.',
    },
  ],
  api: {
    props: [
      {
        name: 'items',
        type: 'AccordionItem[]',
        typeLink: '#accordion-item',
        default: '[]',
        description: 'The sections and their panels.',
      },
      {
        name: 'modelValue',
        type: 'string[]',
        description: 'Values of the open items, for v-model.',
      },
      {
        name: 'defaultValue',
        type: 'string[]',
        description: 'Items open at first when uncontrolled.',
      },
      {
        name: 'multiple',
        type: 'boolean',
        default: String(accordionDefaults.multiple),
        description:
          'Whether several items can be open at once. Otherwise opening one closes the others.',
      },
      {
        name: 'collapsible',
        type: 'boolean',
        default: String(accordionDefaults.collapsible),
        description:
          'Whether the open item can close when only one may be open. With false, one item always stays open.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: String(accordionDefaults.disabled),
        description: 'Stops every item from opening or closing. Triggers stay focusable.',
      },
      {
        name: 'keepMounted',
        type: 'boolean',
        default: String(accordionDefaults.keepMounted),
        description:
          'Keeps closed panels in the page, preserving their local state, instead of unmounting them.',
      },
      {
        name: 'hiddenUntilFound',
        type: 'boolean',
        default: 'false',
        description:
          'Keeps closed panels findable with the browser find in page, which opens their item. Implies keepMounted.',
      },
      {
        name: 'variant',
        type: variants(accordionVariantNames),
        default: `'${accordionDefaults.variant}'`,
        description:
          'plain divides the items with lines; outline frames them in one box; separated makes each item a bordered card; frame sets each card inside a muted box.',
      },
      {
        name: 'indicatorIcon',
        type: 'IconName',
        default: `'${accordionDefaults.indicatorIcon.end}'`,
        description: `Icon of the indicator, which turns as the item opens. '${accordionDefaults.indicatorIcon.start}' at the start, pointing to the label.`,
      },
      {
        name: 'openIndicatorIcon',
        type: 'IconName',
        description: 'Icon of the indicator while the item is open. Replaces the turn.',
      },
      {
        name: 'indicatorPosition',
        type: variants(accordionIndicatorPositions),
        default: `'${accordionDefaults.indicatorPosition}'`,
        description: 'Puts the indicator before the label or at the end of the trigger.',
      },
      {
        name: 'ui',
        type: 'AccordionUi',
        typeLink: '#ui',
        description:
          'HTML attributes for every node. The item keys receive each item context. See UI.',
      },
    ],
    configs: [
      {
        id: 'accordion-item',
        title: 'AccordionItem',
        rows: [
          {
            name: 'value',
            type: 'string',
            description: 'Identifies the item in modelValue. Defaults to its index.',
          },
          { name: 'label', type: 'string', description: 'Text of the trigger.' },
          { name: 'icon', type: 'IconName', description: 'Icon before the label.' },
          {
            name: 'trailingIcon',
            type: 'IconName',
            description: 'Icon after the label, before the indicator.',
          },
          { name: 'content', type: 'string', description: 'Text of the panel.' },
          {
            name: 'slot',
            type: 'string',
            description:
              'Renders this panel with the {slot}-content slot instead of the content slot.',
          },
          {
            name: 'disabled',
            type: 'boolean',
            description: 'Keeps the trigger focusable but stops the item from opening or closing.',
          },
        ],
      },
      {
        id: 'accordion-item-context',
        title: 'AccordionItemContext',
        rows: [
          {
            name: 'item',
            type: 'AccordionItem',
            typeLink: '#accordion-item',
            description: 'The item, as passed in items.',
          },
          { name: 'index', type: 'number', description: 'Position of the item in items.' },
          {
            name: 'value',
            type: 'string',
            description: 'item.value, or the index as a string when it has none.',
          },
          { name: 'open', type: 'boolean', description: 'Whether the item is open.' },
          {
            name: 'disabled',
            type: 'boolean',
            description: 'Whether the item, or the whole accordion, is disabled.',
          },
        ],
      },
    ],
    emits: [
      {
        name: 'update:modelValue',
        type: '(value: string[]) => void',
        description: 'Runs when items open or close. Not when the change is canceled.',
      },
      {
        name: 'valueChange',
        type: '(value: string[], details: AccordionValueChangeDetails) => void',
        description:
          'Runs before a change. details.reason says why (trigger-press, find-in-page or imperative), and details.cancel() stops it.',
      },
    ],
    ui: [
      { node: 'root', tag: 'div' },
      { node: 'item', tag: 'div', ...itemContext },
      { node: 'header', tag: 'h3', ...itemContext },
      {
        node: 'trigger',
        tag: 'button',
        ...itemContext,
        kept: 'id, type, aria-expanded, aria-controls, aria-disabled',
      },
      { node: 'leadingIcon', tag: 'svg', ...itemContext },
      { node: 'label', tag: 'span', ...itemContext },
      { node: 'trailingIcon', tag: 'svg', ...itemContext },
      { node: 'indicatorIcon', tag: 'svg', ...itemContext },
      {
        node: 'panel',
        tag: 'div',
        ...itemContext,
        kept: 'id, role, aria-labelledby, hidden',
      },
      { node: 'body', tag: 'div', ...itemContext },
    ],
    slots: [
      {
        name: 'leading',
        ...itemContextSlot,
        description: 'Content before the label of each trigger; replaces the item icon.',
      },
      {
        name: 'label',
        ...itemContextSlot,
        description: 'Content of the label node of each trigger; replaces item.label.',
      },
      {
        name: 'trailing',
        ...itemContextSlot,
        description:
          'Content after the label of each trigger, such as a badge; replaces the trailing icon.',
      },
      {
        name: 'indicator',
        ...itemContextSlot,
        description: 'Content of the indicator of each trigger; replaces the indicator icon.',
      },
      {
        name: 'content',
        ...itemContextSlot,
        description: 'Content of each panel; replaces the item content.',
      },
      {
        name: '{slot}-content',
        ...itemContextSlot,
        description:
          'Content of the panel of the item whose slot is {slot}; wins over the content slot.',
      },
    ],
    expose: [
      { name: 'getValue', type: '() => string[]', description: 'Values of the open items.' },
      {
        name: 'setValue',
        type: '(value: string[], options?: { reason?, event? }) => boolean',
        description:
          'Sets the open items. Only the first counts unless multiple is set. Returns false when canceled.',
      },
      {
        name: 'isOpen',
        type: '(value: string) => boolean',
        description: 'Whether an item is open.',
      },
      {
        name: 'open',
        type: '(value: string, options?: { reason?, event? }) => boolean',
        description: 'Opens an item. Without multiple, closes the others.',
      },
      {
        name: 'close',
        type: '(value: string, options?: { reason?, event? }) => boolean',
        description: 'Closes an item, unless it is the one that must stay open.',
      },
      {
        name: 'toggle',
        type: '(value: string, options?: { reason?, event? }) => boolean',
        description: 'Opens a closed item, or closes an open one.',
      },
      {
        name: 'openAll',
        type: '(options?: { reason?, event? }) => boolean',
        description: 'Opens every enabled item. Only with multiple.',
      },
      {
        name: 'closeAll',
        type: '(options?: { reason?, event? }) => boolean',
        description: 'Closes every item that may close.',
      },
      {
        name: 'focus',
        type: '(value?: string) => void',
        description: 'Moves focus to the trigger of an item, or the first trigger.',
      },
    ],
  },
}

export default accordion
