import { createApp, h, shallowRef, type Component } from 'vue'
import type { DemoMount } from '@docs/config/component-docs'

export function vueDemo(component: Component): DemoMount {
  return (element, props) => {
    const current = shallowRef(props)
    const app = createApp({ render: () => h(component, current.value) })
    app.mount(element)

    return {
      update: (next) => (current.value = next),
      unmount: () => app.unmount(),
    }
  }
}
