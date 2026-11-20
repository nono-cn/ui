import type { ComponentDocConfig } from '@docs/config/component-docs'
import { iconNames, Rating, ratingDefaults, ratingSizes, themeColors } from '@nono/ui'

const name = { 'aria-label': 'Rate your stay' }

const rating: ComponentDocConfig = {
  slug: 'rating',
  title: 'Rating',
  description:
    'Picks a score from a row of stars, whole or partial, with a preview while the pointer moves over them.',
  component: Rating,
  usage: [
    {
      title: 'Basic usage',
      description:
        'Bind the score with v-model, or set defaultValue to leave it uncontrolled. null means no score yet. Name it with a FormField or an aria-label.',
      props: () => ({ ...name, defaultValue: 3 }),
    },
  ],
  examples: [
    {
      title: 'Color',
      description: 'Color of the filled stars and of the focus ring.',
      controls: [
        {
          key: 'color',
          label: 'Color',
          type: 'select',
          options: [...themeColors, 'custom'],
          default: 'warning',
        },
        {
          key: 'custom',
          label: 'Custom color',
          type: 'color',
          default: '#f59e0b',
          visible: (state) => state.color === 'custom',
        },
      ],
      props: (state) => ({
        ...name,
        defaultValue: 4,
        color: state.color === 'custom' ? state.custom! : state.color!,
      }),
    },
    {
      title: 'Size',
      description: 'Adjust the star size. Inside a FormField, it follows the field.',
      controls: [
        {
          key: 'size',
          label: 'Size',
          type: 'select',
          options: ratingSizes,
          default: ratingDefaults.size,
        },
      ],
      props: (state) => ({ ...name, defaultValue: 3, size: state.size! }),
    },
    {
      title: 'Max',
      description: 'Set how many stars there are.',
      controls: [
        {
          key: 'max',
          label: 'Max',
          type: 'select',
          options: ['3', '5', '10'],
          default: '10',
        },
      ],
      props: (state) => ({ ...name, defaultValue: 3, max: Number(state.max) }),
    },
    {
      title: 'Step',
      description:
        'Split each star into parts: 0.5 makes half stars, each half its own radio. A press on the first half of a star picks the half score.',
      controls: [
        {
          key: 'step',
          label: 'Step',
          type: 'select',
          options: ['1', '0.5', '0.25'],
          default: '0.5',
        },
      ],
      props: (state) => ({ ...name, defaultValue: 2.5, step: Number(state.step) }),
    },
    {
      title: 'Icons',
      description:
        'Change the icon of the stars, and of the empty part when it differs. Use the item slot for anything else.',
      controls: [
        {
          key: 'icon',
          label: 'Icon',
          type: 'select',
          options: iconNames,
          default: 'heart',
        },
      ],
      props: (state) => ({ ...name, defaultValue: 3, color: 'error', icon: state.icon! }),
    },
    {
      title: 'Deselectable',
      description:
        'Let people clear their score: a press on the checked star sets it back to null.',
      controls: [],
      props: () => ({ ...name, defaultValue: 4, deselectable: true }),
    },
    {
      title: 'Read-only',
      description:
        'Show a score that cannot change, like an average. Any value fills its share of the last star, and the rating becomes one image for screen readers.',
      controls: [],
      props: () => ({ 'aria-label': 'Rated 4.2 out of 5', defaultValue: 4.2, readOnly: true }),
    },
    {
      title: 'Disabled',
      description: 'Stop focus and changes, and leave it out of its form.',
      controls: [],
      props: () => ({ ...name, defaultValue: 2, disabled: true }),
    },
  ],
  accessibility: [
    {
      title: 'Roles and attributes',
      description:
        'Rating renders the ui-sdk rating: a radio group with a button with the radio role per score, and a hidden native radio for forms. Every attribute, such as id or aria-label, reaches the group.',
      table: {
        columns: ['Attribute', 'Element', 'Value'],
        rows: [
          ['role="radiogroup"', 'Root', 'The group of scores. role="img" while read-only.'],
          ['role="radio"', 'Radio', 'One per score, named by getValueLabel.'],
          ['data-slot="rating"', 'Root', 'Lets you style every rating from CSS.'],
          ['data-slot="rating-item"', 'Item', 'Lets you style every star from CSS.'],
          ['data-filled', 'Item', 'Present on stars the shown score covers whole.'],
          ['data-partial', 'Item', 'Present on the star the shown score ends partway through.'],
          ['data-checked', 'Item', 'Present on the star the score ends in.'],
          ['data-highlighted', 'Item', 'Present on the stars up to the score a pointer previews.'],
          ['--rating-fill', 'Item', 'How much of the star the shown score covers, from 0 to 1.'],
          [
            'data-disabled',
            'Root, Item',
            'Present when disabled, by the prop or a disabled fieldset.',
          ],
          ['data-readonly', 'Root, Item', 'Present when read-only.'],
          ['data-required', 'Root', 'Present when required.'],
        ],
      },
    },
    {
      title: 'Keyboard',
      description:
        'Tab moves onto the checked star, or the first one. Arrow keys move to the next or previous score and check it, stopping at the ends unless loop is set. Space checks the focused star, or clears it when deselectable. Enter submits its form.',
    },
    {
      title: 'Naming the rating',
      description:
        'Put it in a FormField or pass an aria-label. A read-only rating is named by getValueLabel, so its name includes the score; an aria-label replaces it.',
    },
  ],
  api: {
    props: [
      {
        name: 'modelValue',
        type: 'number | null',
        description: 'The score, for v-model. null means no score yet.',
      },
      {
        name: 'defaultValue',
        type: 'number | null',
        description: 'The score at first when uncontrolled. A form reset returns to it.',
      },
      {
        name: 'max',
        type: 'number',
        default: String(ratingDefaults.max),
        description: 'How many stars there are.',
      },
      {
        name: 'step',
        type: 'number',
        default: String(ratingDefaults.step),
        description:
          'The smallest change, as a fraction of a star: 0.5 makes half stars, each half its own radio.',
      },
      {
        name: 'color',
        type: 'string',
        default: `'${ratingDefaults.color}'`,
        description:
          'Theme token such as primary or warning, a custom token, or a CSS color such as #f59e0b. Colors the filled stars and the focus ring.',
      },
      {
        name: 'size',
        type: ratingSizes.map((size) => `'${size}'`).join(' | '),
        default: `'${ratingDefaults.size}'`,
        description: 'Star size. Inside a FormField, it defaults to the field size.',
      },
      {
        name: 'icon',
        type: 'IconName',
        default: `'${ratingDefaults.icon}'`,
        description: 'Icon of each star, filled up to the score.',
      },
      {
        name: 'emptyIcon',
        type: 'IconName',
        description: 'Icon behind the filled part. Defaults to icon.',
      },
      {
        name: 'deselectable',
        type: 'boolean',
        default: 'false',
        description: 'Lets a press on the checked star, or Space on it, clear the score.',
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
        description:
          'Shows the score as an image that cannot change. Any score shows, like an average of 4.2.',
      },
      {
        name: 'required',
        type: 'boolean',
        default: 'false',
        description:
          'Blocks its form until there is a score. Inside a FormField, it follows the field.',
      },
      { name: 'name', type: 'string', description: 'Name the score submits under.' },
      {
        name: 'form',
        type: 'string',
        description: 'Id of a form to join, when it is not inside that form.',
      },
      {
        name: 'loop',
        type: 'boolean',
        default: 'false',
        description: 'Lets the arrow keys wrap from the last star to the first.',
      },
      {
        name: 'getValueLabel',
        type: '(value: number, max: number) => string',
        description:
          'Names a score, for each radio and for a read-only rating. Says "3 stars" by default.',
      },
      {
        name: 'ui',
        type: `{
  item?: (state: RatingItemState) => HTMLAttributes
  emptyIcon?: (state: RatingItemState) => HTMLAttributes
  icon?: (state: RatingItemState) => HTMLAttributes
}`,
        typePre: true,
        description:
          'Attributes for the inner nodes: item (each star), and emptyIcon and icon inside it. Each one receives the state of its star. Classes are merged with the defaults and win on conflict, styles are combined, and other attributes replace the default. The root takes class, style and every other attribute directly.',
      },
    ],
    emits: [
      {
        name: 'update:modelValue',
        type: '(value: number | null) => void',
        description: 'Runs when the score changes. Not when the change is canceled.',
      },
      {
        name: 'valueChange',
        type: '(value: number | null, details: RatingChangeDetails) => void',
        description:
          'Runs before a change. details.reason says why (item-press, list-navigation, reset, restore or imperative), and details.cancel() stops it.',
      },
    ],
    slots: [
      {
        name: 'item',
        type: `{
  index: number
  fill: number
  checked: boolean
  highlighted: boolean
  disabled: boolean
  readOnly: boolean
}`,
        typePre: true,
        description:
          'Content of each star; overrides icon and emptyIcon. fill goes from 0 to 1 and follows the pointer preview.',
      },
    ],
    expose: [
      {
        name: 'getValue',
        type: '() => number | null',
        description: 'The current score.',
      },
      {
        name: 'setValue',
        type: '(value: number | null, details?: { reason?, event? }) => boolean',
        description:
          'Sets the score, as a user would. Disabled and read-only ratings ignore it. Returns false when the change is canceled.',
      },
      {
        name: 'focus',
        type: '() => void',
        description: 'Moves focus to the checked star, or the first one.',
      },
    ],
  },
}

export default rating
