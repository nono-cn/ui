import type { FunctionalComponent, VNodeChild } from 'vue'
import { describe, expect, it } from 'vitest'
import {
  Bubble,
  bubbleAligns,
  BubbleGroup,
  bubbleReactionsAligns,
  bubbleReactionsSides,
  bubbleVariantNames,
  Button,
  type UiAttributes,
} from '@nono/ui'
import { attrsTests, invalidValueTests, Part, render, showcase, userEvent } from '@test/vue'

const colors = ['primary', 'secondary', 'neutral', 'info', 'success', 'warning', 'error', '#db2777']
const text = 'Can you send me the report before Friday?'

const interactiveStates: [string, UiAttributes][] = [
  ['link', {}],
  ['button', {}],
  ['hover', { 'data-showcase-force': 'hover' }],
  ['focus-visible', { 'data-showcase-force': 'focus-visible' }],
]

const Thread: FunctionalComponent = (_, { slots }) => (
  <div class="flex w-80 flex-col gap-4">{slots.default?.()}</div>
)

async function mount(content: () => VNodeChild) {
  const screen = await render(() => <Thread>{content()}</Thread>)
  const root = (name: string) =>
    screen.container.querySelector<HTMLElement>(`[data-bubble="${name}"]`)!
  const node = (name: string, part: string) =>
    root(name).querySelector<HTMLElement>(`[data-ui="bubble-${part}"]`)!

  return { container: screen.container.firstElementChild as HTMLElement, root, node }
}

describe('Bubble', () => {
  showcase({
    stories: {
      Variants: () =>
        bubbleVariantNames.map((variant) => (
          <Part name={variant} caption>
            <Thread>
              <Bubble variant={variant} text={text} />
            </Thread>
          </Part>
        )),
      Colors: () =>
        colors.map((color) => (
          <Part name={color} caption>
            <Thread>
              <Bubble color={color} text="Solid" />
              <Bubble color={color} variant="soft" text="Soft" />
            </Thread>
          </Part>
        )),
      Align: () =>
        bubbleAligns.map((align) => (
          <Part name={align} caption>
            <Thread>
              <Bubble align={align} variant="soft" color="neutral" text={text} />
            </Thread>
          </Part>
        )),
      Reactions: () =>
        bubbleReactionsSides.flatMap((side) =>
          bubbleReactionsAligns.map((align) => (
            <Part name={`${side}-${align}`} caption>
              <Thread>
                <Bubble
                  variant="soft"
                  color="neutral"
                  text={text}
                  reactions="👍 🔥 +2"
                  reactionsSide={side}
                  reactionsAlign={align}
                />
                <Bubble align="end" text="Next message" />
              </Thread>
            </Part>
          )),
        ),
      'Reaction action': () => (
        <Part name="button" caption>
          <Thread>
            <Bubble color="error" variant="soft" text="The deploy failed on step 3.">
              {{
                reactions: () => (
                  <Button label="Retry" size="xs" radius="full" variant="plain" color="error" />
                ),
              }}
            </Bubble>
          </Thread>
        </Part>
      ),
      Group: () => (
        <Part name="end" caption>
          <Thread>
            <Bubble variant="soft" color="neutral" text="How did the deploy go?" />
            <BubbleGroup align="end">
              <Bubble text="Deploy is done." />
              <Bubble text="All checks passed." reactions="👀" reactionsAlign="start" />
              <Bubble text="Can you take a look at the logs?" />
            </BubbleGroup>
          </Thread>
        </Part>
      ),
      Interactive: () =>
        interactiveStates.map(([name, force]) => (
          <Part name={name} caption>
            <Thread>
              <Bubble
                variant="soft"
                text="Yes, schedule it"
                href={name === 'link' ? '#report' : undefined}
                onClick={name === 'link' ? undefined : () => {}}
                ui={{ content: () => force }}
              />
            </Thread>
          </Part>
        )),
      Plain: () => (
        <Part name="prose" caption>
          <Thread>
            <Bubble variant="plain" color="neutral">
              The build failed because the lockfile was out of date. Run{' '}
              <code class="font-mono text-xs">npm install</code> and <strong>push again</strong>.
            </Bubble>
          </Thread>
        </Part>
      ),
      Radius: () =>
        ['none', 'md', '2xl', 'full'].map((radius) => (
          <Part name={radius} caption>
            <Thread>
              <Bubble radius={radius} text="Sure, see you there." />
            </Thread>
          </Part>
        )),
    },
  })

  it('renders the text in a div with its data-ui nodes', async () => {
    const { root, node } = await mount(() => <Bubble data-bubble="a" text="Hello" reactions="👍" />)

    expect({
      root: root('a').dataset.ui,
      content: [node('a', 'content').tagName, node('a', 'content').textContent],
      reactions: node('a', 'reactions').textContent,
    }).toEqual({ root: 'bubble-root', content: ['DIV', 'Hello'], reactions: '👍' })
  })

  it('leaves out the reactions node without reactions', async () => {
    const { root } = await mount(() => <Bubble data-bubble="a" text="Hello" />)

    expect(root('a').querySelector('[data-ui="bubble-reactions"]')).toBeNull()
  })

  it('slots replace the text and the reactions', async () => {
    const { node } = await mount(() => (
      <Bubble data-bubble="a" text="Hello" reactions="👍">
        {{ default: () => <strong>Bold</strong>, reactions: () => <span>🔥</span> }}
      </Bubble>
    ))

    expect([node('a', 'content').innerHTML, node('a', 'reactions').innerHTML]).toEqual([
      '<strong>Bold</strong>',
      '<span>🔥</span>',
    ])
  })

  it('renders a link when href is set', async () => {
    const { node } = await mount(() => (
      <Bubble
        data-bubble="a"
        text="Open"
        href="/report"
        ui={{ content: () => ({ target: '_blank' }) }}
      />
    ))
    const content = node('a', 'content')

    expect([content.tagName, content.getAttribute('href'), content.getAttribute('target')]).toEqual(
      ['A', '/report', '_blank'],
    )
  })

  it('renders a native button that emits click when it has a click listener', async () => {
    const clicks: MouseEvent[] = []
    const { node } = await mount(() => (
      <Bubble data-bubble="a" text="Reply" onClick={(event: MouseEvent) => clicks.push(event)} />
    ))
    const content = node('a', 'content')

    await userEvent.click(content)

    expect([content.tagName, content.getAttribute('type'), clicks.length]).toEqual([
      'BUTTON',
      'button',
      1,
    ])
  })

  it('sits at the start or the end of the row, in RTL too', async () => {
    const { container, root } = await mount(() => [
      <Bubble data-bubble="start" text="Hi" />,
      <Bubble data-bubble="end" text="Hi" align="end" />,
      <div dir="rtl" class="flex flex-col">
        <Bubble data-bubble="rtl" text="Hi" align="end" />
      </div>,
    ])
    const box = container.getBoundingClientRect()

    expect({
      start: root('start').getBoundingClientRect().left,
      end: root('end').getBoundingClientRect().right,
      rtl: root('rtl').getBoundingClientRect().left,
    }).toEqual({ start: box.left, end: box.right, rtl: box.left })
  })

  it('takes the align of its group unless it has its own', async () => {
    const { container, root } = await mount(() => (
      <BubbleGroup align="end">
        <Bubble data-bubble="group" text="Hi" />
        <Bubble data-bubble="own" text="Hi" align="start" />
      </BubbleGroup>
    ))
    const box = container.getBoundingClientRect()

    expect({
      group: root('group').getBoundingClientRect().right,
      own: root('own').getBoundingClientRect().left,
    }).toEqual({ group: box.right, own: box.left })
  })

  it('caps its width at 80% of the row, except plain', async () => {
    const long = 'word '.repeat(80)
    const { container, root } = await mount(() => [
      <Bubble data-bubble="solid" text={long} />,
      <Bubble data-bubble="plain" text={long} variant="plain" />,
    ])
    const width = container.getBoundingClientRect().width

    expect({
      solid: root('solid').getBoundingClientRect().width,
      plain: root('plain').getBoundingClientRect().width,
    }).toEqual({ solid: width * 0.8, plain: width })
  })

  it('keeps room for the reactions outside the content', async () => {
    const { root, node } = await mount(() => [
      <Bubble data-bubble="bottom" text="Hi" reactions="👍" />,
      <Bubble data-bubble="top" text="Hi" reactions="👍" reactionsSide="top" />,
    ])

    expect({
      bottom: root('bottom').getBoundingClientRect().bottom,
      top: root('top').getBoundingClientRect().top,
    }).toEqual({
      bottom: node('bottom', 'reactions').getBoundingClientRect().bottom,
      top: node('top', 'reactions').getBoundingClientRect().top,
    })
  })

  describe('attributes', () => {
    attrsTests({
      component: Bubble,
      props: { text: 'Hello' },
      root: '[data-ui="bubble-root"]',
      class: { value: 'max-w-none', expected: { maxWidth: 'none' } },
      keeps: ['maxWidth', 'marginInlineEnd'],
    })
  })

  describe('with an invalid variant', () => {
    invalidValueTests({
      component: Bubble,
      props: { text: 'Hello' },
      root: '[data-ui="bubble-root"]',
      prop: 'variant',
      values: ['ghost', 'SOLID', ''],
      fallback: 'solid',
    })
  })

  describe('with an invalid align', () => {
    invalidValueTests({
      component: Bubble,
      props: { text: 'Hello' },
      root: '[data-ui="bubble-root"]',
      prop: 'align',
      values: ['center', 'END'],
      fallback: 'start',
    })
  })

  describe('with an invalid reactions side', () => {
    invalidValueTests({
      component: Bubble,
      props: { text: 'Hello', reactions: '👍' },
      root: '[data-ui="bubble-root"]',
      prop: 'reactionsSide',
      values: ['left', ''],
      fallback: 'bottom',
    })
  })
})
