import { describe, expect, it } from 'vitest'
import { Marker, markerVariantNames } from '@nono/ui'
import { attrsTests, invalidValueTests, Part, render, showcase } from '@test/vue'

const stillSpinner = { loadingIcon: () => ({ class: 'animate-none' }) }

describe('Marker', () => {
  showcase({
    stories: {
      Variants: () =>
        markerVariantNames.map((variant) => (
          <Part name={variant} caption>
            <div style={{ width: '280px' }}>
              <Marker variant={variant} label="Conversation compacted" />
            </div>
          </Part>
        )),
      Icons: () =>
        markerVariantNames.map((variant) => (
          <Part name={variant} caption>
            <div style={{ width: '280px' }}>
              <Marker variant={variant} icon="search" label="Explored 4 files" />
            </div>
          </Part>
        )),
      Loading: () =>
        markerVariantNames.map((variant) => (
          <Part name={variant} caption>
            <div style={{ width: '280px' }}>
              <Marker variant={variant} loading label="Running tests" ui={stillSpinner} />
            </div>
          </Part>
        )),
      Elements: () => [
        <Part name="a" caption>
          <Marker as="a" {...{ href: '#' }} icon="fileText" label="View the pull request" />
        </Part>,
        <Part name="button" caption>
          <Marker as="button" {...{ type: 'button' }} icon="x" label="Revert this change" />
        </Part>,
        <Part name="focus-visible" caption>
          <Marker
            as="button"
            {...{ type: 'button' }}
            icon="x"
            label="Revert this change"
            data-showcase-force="focus-visible"
          />
        </Part>,
      ],
      Layout: () => [
        <Part name="stacked" caption>
          <Marker icon="success" label="Syncing completed" class="flex-col items-center" />
        </Part>,
        <Part name="wrapping" caption>
          <div style={{ width: '200px' }}>
            <Marker icon="info" label="A long note that wraps onto a second line" />
          </div>
        </Part>,
        <Part name="icon-only" caption>
          <Marker icon="check" aria-label="Synced" />
        </Part>,
      ],
    },
  })

  describe('with an invalid variant', () => {
    invalidValueTests({
      component: Marker,
      props: { label: 'Marker' },
      root: '[data-ui="marker-root"]',
      prop: 'variant',
      values: ['dashed', 'PLAIN', ''],
      fallback: 'plain',
    })
  })

  describe('attributes', () => {
    attrsTests({
      component: Marker,
      props: { label: 'Marker' },
      root: '[data-ui="marker-root"]',
      class: { value: 'text-lg', expected: { fontSize: '18px' } },
      keeps: ['display', 'gap'],
    })
  })

  it('renders the element set with as', async () => {
    const screen = await render(() => <Marker as="a" {...{ href: '/pull' }} label="View" />)
    const root = screen.container.querySelector('[data-ui="marker-root"]')!

    expect({ tag: root.tagName, href: root.getAttribute('href') }).toEqual({
      tag: 'A',
      href: '/pull',
    })
  })

  it('hides the leading node from assistive technology', async () => {
    const screen = await render(() => <Marker icon="check" label="Done" />)
    const leading = screen.container.querySelector('[data-ui="marker-leading"]')!

    expect(leading.getAttribute('aria-hidden')).toBe('true')
  })

  it('shows the spinner instead of the icon while loading', async () => {
    const screen = await render(() => <Marker icon="check" loading label="Running" />)

    expect({
      spinner: Boolean(screen.container.querySelector('[data-ui="marker-loading-icon"]')),
      icon: Boolean(screen.container.querySelector('[data-ui="marker-icon"]')),
    }).toEqual({ spinner: true, icon: false })
  })
})
