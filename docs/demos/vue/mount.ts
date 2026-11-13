import { createApp, type Component } from 'vue'

export function mountDemo(selector: string, component: Component) {
  const target = document.querySelector(selector)
  if (target) createApp(component).mount(target)
}
