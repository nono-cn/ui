import { describe } from 'vitest'
import { Icon, iconSizes } from '@nono/ui'
import { invalidValueTests, Part, showcase } from '@test/vue'

const colors = ['primary', 'secondary', 'neutral', 'info', 'success', 'warning', 'error', '#db2777']
const strokes = [1, 1.5, 2, 3]

describe('Icon', () => {
  showcase({
    stories: {
      Sizes: () =>
        iconSizes.map((size) => (
          <Part name={size} caption>
            <Icon name="heart" size={size} />
          </Part>
        )),
      Colors: () => [
        <Part name="currentColor" caption>
          <span style={{ color: '#2563eb' }}>
            <Icon name="heart" size="lg" />
          </span>
        </Part>,
        ...colors.map((color) => (
          <Part name={color} caption>
            <Icon name="heart" size="lg" color={color} />
          </Part>
        )),
      ],
      Strokes: () =>
        strokes.map((stroke) => (
          <Part name={String(stroke)} caption>
            <Icon name="search" size="xl" stroke={stroke} />
          </Part>
        )),
    },
  })

  describe('with an invalid size', () => {
    invalidValueTests({
      component: Icon,
      props: { name: 'heart' },
      root: 'svg',
      prop: 'size',
      values: ['xxl', 'MD', ''],
      fallback: 'md',
    })
  })
})
