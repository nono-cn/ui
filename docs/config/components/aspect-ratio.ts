import type {
  ComponentDocConfig,
  ExampleSlotContent,
  ExampleValue,
} from '@docs/config/component-docs'
import { withSource } from '@docs/config/component-docs'
import landscapeImage from '@docs/assets/landscape.svg'
import { AspectRatio, aspectRatioDefaults } from '@nono/ui'

const width = 'w-full max-w-md'

const ratios = ['16 / 9', '4 / 3', '1', '3 / 4', '9 / 16']

function ratio(text: string): ExampleValue {
  const [numerator, denominator = 1] = text.split('/').map(Number)
  return withSource(text, numerator! / denominator)
}

function image(className = 'size-full rounded-md object-cover'): ExampleSlotContent {
  return {
    name: 'img',
    component: 'img',
    props: { src: landscapeImage, alt: 'Mountains at sunset', class: className },
  }
}

const aspectRatio: ComponentDocConfig = {
  slug: 'aspect-ratio',
  title: 'AspectRatio',
  description: 'Displays content within a desired ratio.',
  component: AspectRatio,
  slot: image(),
  usage: [
    {
      title: 'Basic usage',
      description:
        'Set the ratio as width divided by height and put the content in the default slot. The width comes from the layout or a class; the height follows the ratio.',
      props: () => ({ ratio: ratio('16 / 9'), class: width }),
    },
  ],
  examples: [
    {
      title: 'Ratio',
      description:
        'Any positive number works: 1 makes a square, a number below 1 a portrait box and one above 1 a landscape box.',
      controls: [
        {
          key: 'ratio',
          label: 'Ratio',
          type: 'select',
          options: ratios,
          default: '16 / 9',
        },
      ],
      props: (state) => ({ ratio: ratio(state.ratio!), class: 'w-56' }),
    },
    {
      title: 'Rounded corners',
      description:
        'Round the box and hide its overflow, so the content is clipped to the corners without its own radius.',
      props: () => ({ ratio: ratio('4 / 3'), class: `${width} overflow-hidden rounded-xl` }),
      slot: image('size-full object-cover'),
    },
    {
      title: 'Any content',
      description:
        'The box keeps its ratio whatever it holds, such as a placeholder, a video or a map. Content taller than the box overflows instead of stretching it.',
      props: () => ({
        ratio: ratio('16 / 9'),
        class: `${width} grid place-items-center rounded-lg bg-muted text-sm text-muted-foreground`,
      }),
      slot: { text: '16 / 9' },
    },
  ],
  accessibility: [
    {
      title: 'Roles and attributes',
      description:
        'AspectRatio renders a div with no role, so it adds nothing to the accessibility tree. Attributes passed to AspectRatio reach that div.',
    },
    {
      title: 'Alternative text',
      description:
        'Describe an image inside with its alt attribute, or pass alt="" when it is decorative.',
    },
  ],
  api: {
    props: [
      {
        name: 'ratio',
        type: 'number',
        default: String(aspectRatioDefaults.ratio),
        description:
          'Width divided by height, such as 16 / 9. A value that is not a positive number falls back to 1.',
      },
      {
        name: 'ui',
        type: 'AspectRatioUi',
        typeLink: '#ui',
        description: 'HTML attributes for the root. See UI.',
      },
    ],
    emits: [],
    ui: [{ node: 'root', tag: 'div' }],
    slots: [
      {
        name: 'default',
        type: '-',
        description: 'Content to fit in the box, such as an img with size-full and object-cover.',
      },
    ],
    expose: [],
  },
}

export default aspectRatio
