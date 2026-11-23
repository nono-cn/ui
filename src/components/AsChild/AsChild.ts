import { cloneVNode, Comment, defineComponent, Fragment, Text, type VNode } from 'vue'

function firstElement(nodes: VNode[]): VNode | undefined {
  for (const node of nodes) {
    if (node.type === Fragment) {
      const child = firstElement(node.children as VNode[])
      if (child) return child
    } else if (node.type !== Comment && node.type !== Text) {
      return node
    }
  }
}

function elementOf(value: unknown): Element | null {
  let node = (value as { $el?: Node } | null)?.$el ?? (value as Node | null)
  while (node && !(node instanceof Element)) node = node.nextSibling
  return node
}

export default defineComponent({
  name: 'AsChild',
  inheritAttrs: false,
  setup(_, { attrs, slots, expose }) {
    let element: Element | null = null
    const setElement = (value: unknown) => {
      element = elementOf(value)
    }

    /* A ref on AsChild gets this $el: the child's own $el can be a fragment's text node. */
    expose({
      get $el() {
        return element
      },
    })

    return () => {
      const child = firstElement(slots.default?.() ?? [])
      return child ? cloneVNode(child, { ...attrs, ref: setElement }, true) : null
    }
  },
})
