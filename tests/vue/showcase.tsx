import { defineComponent, type VNodeChild } from 'vue'
import { render } from 'vitest-browser-vue'
import { showcaseSuite } from '../shared/showcase'

interface ShowcaseOptions {
  stories: Record<string, () => VNodeChild>
  mobile?: boolean
}

export function showcase({ stories, mobile }: ShowcaseOptions) {
  const Gallery = defineComponent(() => () => (
    <main data-showcase>
      {Object.entries(stories).map(([title, story]) => (
        <section data-showcase-row={title}>
          <h3>{title}</h3>
          {story()}
        </section>
      ))}
    </main>
  ))

  showcaseSuite({
    mobile,
    mount: async () => {
      const screen = await render(Gallery)

      return screen.container.querySelector<HTMLElement>('[data-showcase]')!
    },
  })
}
