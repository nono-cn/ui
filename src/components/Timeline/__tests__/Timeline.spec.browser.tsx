import { describe, expect, it } from 'vitest'
import { h, ref } from 'vue'
import { Timeline, timelineSizes, type TimelineExpose, type TimelineItem } from '@nono/ui'
import {
  attrsTests,
  avatarImage,
  invalidValueTests,
  Part,
  render,
  showcase,
  userEvent,
} from '@test/vue'

const steps: TimelineItem[] = [
  { value: 'ordered', date: '2026-03-02T09:00:00Z', title: 'Ordered', description: 'Paid by card' },
  { value: 'packed', date: '2026-03-03T14:30:00Z', title: 'Packed' },
  { value: 'shipped', date: '2026-03-04T08:15:00Z', title: 'Shipped', description: 'On its way' },
  { value: 'delivered', title: 'Delivered' },
]

const withIcons: TimelineItem[] = [
  { value: 'created', title: 'Created', icon: 'plus' },
  { value: 'reviewed', title: 'Reviewed', icon: 'search' },
  { value: 'saved', title: 'Saved', icon: 'save' },
]

const withAvatars: TimelineItem[] = [
  { value: 'ana', title: 'Ana commented', avatar: { image: avatarImage } },
  { value: 'luis', title: 'Luis approved', avatar: { text: 'LG' } },
  { value: 'eva', title: 'Eva merged', avatar: { text: 'EV' } },
]

const colors = ['primary', 'success', 'warning', 'error', 'neutral', '#db2777']

async function mount(props: Record<string, unknown> = {}, slots = {}) {
  const screen = await render(() => h(Timeline, { items: steps, ...props }, slots))
  return screen.container.querySelector<HTMLElement>('[data-ui="timeline-root"]')!
}

function items(root: Element) {
  return [...root.querySelectorAll<HTMLElement>('[data-ui="timeline-item"]')]
}

function statuses(root: Element) {
  return items(root).map((item) =>
    ['complete', 'current', 'upcoming'].find((status) => item.hasAttribute(`data-${status}`)),
  )
}

describe('Timeline', () => {
  showcase({
    stories: {
      Statuses: () => (
        <Part name="value" caption="value: shipped">
          <Timeline items={steps} value="shipped" class="w-72" />
        </Part>
      ),
      Reverse: () => (
        <Part name="reverse" caption="reverse">
          <Timeline items={steps} value="packed" reverse class="w-72" />
        </Part>
      ),
      Markers: () => [
        <Part name="icons" caption="icon">
          <Timeline items={withIcons} value="reviewed" class="w-56" />
        </Part>,
        <Part name="avatars" caption="avatar">
          <Timeline items={withAvatars} value="luis" class="w-56" />
        </Part>,
        <Part name="none" caption="no value">
          <Timeline items={withIcons} class="w-56" />
        </Part>,
      ],
      Sizes: () =>
        timelineSizes.map((size) => (
          <Part name={size} caption>
            <Timeline items={withIcons} value="reviewed" size={size} class="w-40" />
          </Part>
        )),
      Colors: () =>
        colors.map((color) => (
          <Part name={color} caption>
            <Timeline items={steps.slice(0, 3)} value="packed" color={color} class="w-32" />
          </Part>
        )),
      Horizontal: () => (
        <Part name="horizontal" caption="horizontal">
          <Timeline items={steps} value="shipped" orientation="horizontal" class="w-[40rem]" />
        </Part>
      ),
    },
  })

  describe('with an invalid size', () => {
    invalidValueTests({
      component: Timeline,
      props: { items: withIcons, value: 'reviewed' },
      root: '[data-ui="timeline-root"]',
      prop: 'size',
      values: ['xxl', 'MD', ''],
      fallback: 'md',
    })
  })

  describe('with an invalid orientation', () => {
    invalidValueTests({
      component: Timeline,
      props: { items: steps, value: 'packed' },
      root: '[data-ui="timeline-root"]',
      prop: 'orientation',
      values: ['diagonal', ''],
      fallback: 'vertical',
    })
  })

  describe('attributes', () => {
    attrsTests({
      component: Timeline,
      props: { items: steps },
      root: '[data-ui="timeline-root"]',
      class: { value: 'gap-8', expected: { rowGap: '32px' } },
      keeps: ['display', 'flexDirection'],
    })
  })

  it('renders a list of events', async () => {
    const root = await mount({ 'aria-label': 'Order' })

    expect(root.getAttribute('role')).toBe('list')
    expect(root.getAttribute('aria-label')).toBe('Order')
    expect(items(root).map((item) => item.getAttribute('role'))).toEqual(Array(4).fill('listitem'))
  })

  it('marks the events before value as complete and after it as upcoming', async () => {
    const root = await mount({ value: 'shipped' })

    expect(statuses(root)).toEqual(['complete', 'complete', 'current', 'upcoming'])
    expect(items(root)[2]!.getAttribute('aria-current')).toBe('step')
  })

  it('runs the other way with reverse', async () => {
    const root = await mount({ value: 'packed', reverse: true })

    expect(statuses(root)).toEqual(['upcoming', 'current', 'complete', 'complete'])
  })

  it('has no statuses without value', async () => {
    const root = await mount()

    expect(statuses(root)).toEqual([undefined, undefined, undefined, undefined])
  })

  it('an item status wins over the one from value', async () => {
    const root = await mount({
      value: 'packed',
      items: steps.map((step, index) => (index === 3 ? { ...step, status: 'complete' } : step)),
    })

    expect(statuses(root)).toEqual(['complete', 'current', 'upcoming', 'complete'])
  })

  it('renders a connector between events, not after the last one', async () => {
    const root = await mount()

    expect(
      items(root).map((item) => Boolean(item.querySelector('[data-ui="timeline-connector"]'))),
    ).toEqual([true, true, true, false])
  })

  it('renders the date in a time element with its datetime', async () => {
    const root = await mount({ dateOptions: { dateStyle: 'medium', timeZone: 'UTC' } })
    const date = root.querySelector('[data-ui="timeline-date"]')!

    expect(date.tagName).toBe('TIME')
    expect(date.getAttribute('datetime')).toBe('2026-03-02T09:00:00.000Z')
    expect(date.textContent?.trim()).toBe('Mar 2, 2026')
  })

  it('shows a date that is not a date as it is', async () => {
    const root = await mount({ items: [{ title: 'Joined', date: 'Two days ago' }] })
    const date = root.querySelector('[data-ui="timeline-date"]')!

    expect(date.textContent?.trim()).toBe('Two days ago')
    expect(date.hasAttribute('datetime')).toBe(false)
  })

  it('names each event by its title and describes it by its date and description', async () => {
    const root = await mount()
    const item = items(root)[0]!
    const title = item.querySelector('[data-ui="timeline-title"]')!

    expect(item.getAttribute('aria-labelledby')).toBe(title.id)
    expect(item.getAttribute('aria-describedby')?.split(' ')).toHaveLength(2)
  })

  it('moves between events with the arrow keys', async () => {
    const root = await mount({ value: 'packed' })
    const [first, second, third] = items(root)

    await userEvent.tab()
    expect(document.activeElement).toBe(second)

    await userEvent.keyboard('{ArrowDown}')
    expect(document.activeElement).toBe(third)

    await userEvent.keyboard('{Home}')
    expect(document.activeElement).toBe(first)
  })

  it('uses Left and Right when horizontal', async () => {
    const root = await mount({ orientation: 'horizontal' })
    const [first, second] = items(root)

    first!.focus()
    await userEvent.keyboard('{ArrowRight}')
    expect(document.activeElement).toBe(second)
  })

  it('focuses an event from outside with focus', async () => {
    const timeline = ref<TimelineExpose>()
    const screen = await render(() => h(Timeline, { items: steps, ref: timeline }))

    timeline.value!.focus('shipped')

    expect(document.activeElement).toBe(
      screen.container.querySelectorAll('[data-ui="timeline-item"]')[2],
    )
  })

  it('renders the marker icon or avatar', async () => {
    const icons = await mount({ items: withIcons })
    const avatars = await mount({ items: withAvatars })

    expect(icons.querySelectorAll('[data-ui="timeline-icon"]')).toHaveLength(3)
    expect(avatars.querySelectorAll('[data-ui="timeline-avatar"]')).toHaveLength(3)
  })

  it('hands each item state to ui and the slots', async () => {
    const root = await mount(
      {
        value: 'packed',
        ui: {
          item: ({ index, status }: { index: number; status?: string }) => ({
            'data-test': `${index}-${status}`,
          }),
        },
      },
      {
        title: ({ item, status }: { item: TimelineItem; status?: string }) =>
          `${item.title} (${status})`,
      },
    )

    expect(items(root).map((item) => item.getAttribute('data-test'))).toEqual([
      '0-complete',
      '1-current',
      '2-upcoming',
      '3-upcoming',
    ])
    expect(root.querySelector('[data-ui="timeline-title"]')!.textContent).toBe('Ordered (complete)')
  })

  it('ui cannot set the datetime or the item props', async () => {
    const root = await mount({
      ui: {
        item: () => ({ status: 'current', value: 'other' }),
        date: () => ({ datetime: '2000-01-01', class: 'italic' }),
      },
    })
    const date = root.querySelector('[data-ui="timeline-date"]')!

    expect(statuses(root)).toEqual([undefined, undefined, undefined, undefined])
    expect(date.getAttribute('datetime')).toBe('2026-03-02T09:00:00.000Z')
    expect(getComputedStyle(date).fontStyle).toBe('italic')
  })
})
