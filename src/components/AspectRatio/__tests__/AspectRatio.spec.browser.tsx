import { describe, expect, it } from 'vitest'
import { h, nextTick, ref } from 'vue'
import { AspectRatio, type AspectRatioProps } from '@nono/ui'
import { attrsTests, invalidValueTests, landscapeImage, Part, render, showcase } from '@test/vue'

const ratios = [
  { name: '16/9', value: 16 / 9 },
  { name: '4/3', value: 4 / 3 },
  { name: '1', value: 1 },
  { name: '9/16', value: 9 / 16 },
]

const image = () => <img src={landscapeImage} alt="" class="size-full rounded-md object-cover" />

async function mount(props: AspectRatioProps & Record<string, unknown> = {}, content = image) {
  const screen = await render(() =>
    h(AspectRatio, { style: { width: '320px' }, ...props }, content),
  )

  return screen.container.querySelector<HTMLElement>('[data-ui=aspect-ratio-root]')!
}

function sizeOf(element: Element) {
  const { width, height } = element.getBoundingClientRect()

  return { width, height }
}

describe('AspectRatio', () => {
  showcase({
    stories: {
      Ratios: () =>
        ratios.map(({ name, value }) => (
          <Part name={name} caption>
            <AspectRatio ratio={value} style={{ width: '10rem' }}>
              {image()}
            </AspectRatio>
          </Part>
        )),
      Content: () => [
        <Part name="text" caption>
          <AspectRatio
            ratio={16 / 9}
            class="grid place-items-center rounded-lg bg-muted text-sm text-muted-foreground"
            style={{ width: '16rem' }}
          >
            16 / 9
          </AspectRatio>
        </Part>,
        <Part name="clipped" caption>
          <AspectRatio ratio={4 / 3} class="overflow-hidden rounded-xl" style={{ width: '12rem' }}>
            <img src={landscapeImage} alt="" class="size-full object-cover" />
          </AspectRatio>
        </Part>,
      ],
    },
  })

  describe('sizing', () => {
    it('sets its height from its width and the ratio', async () => {
      const root = await mount({ ratio: 16 / 9 })

      expect(sizeOf(root)).toEqual({ width: 320, height: 180 })
    })

    it('is square by default', async () => {
      const root = await mount()

      expect(sizeOf(root)).toEqual({ width: 320, height: 320 })
    })

    it('keeps the ratio when its content is taller', async () => {
      const root = await mount({ ratio: 2 }, () => <div style={{ height: '500px' }} />)

      expect(sizeOf(root)).toEqual({ width: 320, height: 160 })
    })

    it('follows a new ratio', async () => {
      const ratio = ref(1)
      const screen = await render(() =>
        h(AspectRatio, { ratio: ratio.value, style: { width: '320px' } }),
      )
      const root = screen.container.querySelector('[data-ui=aspect-ratio-root]')!

      ratio.value = 4
      await nextTick()

      expect(sizeOf(root)).toEqual({ width: 320, height: 80 })
    })

    it('lets its content fill the box', async () => {
      const root = await mount({ ratio: 4 / 3 })

      expect(sizeOf(root.querySelector('img')!)).toEqual({ width: 320, height: 240 })
    })
  })

  describe('ui', () => {
    it('passes the attributes of ui.root to the root', async () => {
      const root = await mount({
        ui: { root: () => ({ id: 'cover', class: 'rounded-lg', 'aria-label': 'Cover' }) },
      })

      expect({
        id: root.id,
        label: root.getAttribute('aria-label'),
        radius: getComputedStyle(root).borderTopLeftRadius,
      }).toEqual({ id: 'cover', label: 'Cover', radius: '8px' })
    })

    it('lets a class in ui.root replace the ratio', async () => {
      const root = await mount({ ratio: 1, ui: { root: () => ({ class: 'aspect-video' }) } })

      expect(sizeOf(root)).toEqual({ width: 320, height: 180 })
    })

    it('keeps its data-ui', async () => {
      const root = await mount({ ui: { root: () => ({ 'data-ui': 'other' }) as never } })

      expect(root.getAttribute('data-ui')).toBe('aspect-ratio-root')
    })
  })

  describe('attributes', () => {
    attrsTests({
      component: AspectRatio,
      props: { ratio: 16 / 9 },
      root: '[data-ui=aspect-ratio-root]',
      class: { value: 'aspect-square', expected: { aspectRatio: '1 / 1' } },
      keeps: ['aspectRatio', 'position'],
    })
  })

  describe('with an invalid ratio', () => {
    invalidValueTests({
      component: AspectRatio,
      props: { style: { width: '200px' } },
      root: '[data-ui=aspect-ratio-root]',
      prop: 'ratio',
      values: [0, -1, Number.NaN, Number.POSITIVE_INFINITY],
      fallback: 1,
    })
  })
})
