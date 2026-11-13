export type StyleProperty = Exclude<
  {
    [K in keyof CSSStyleDeclaration]: CSSStyleDeclaration[K] extends string ? K : never
  }[keyof CSSStyleDeclaration],
  number
>

export type StyleSnapshot = Map<string, Map<string, string>>

export function measure(element: Element, properties: StyleProperty[]) {
  const style = getComputedStyle(element)

  return Object.fromEntries(properties.map((property) => [property, style[property]]))
}

export function snapshot(root: Element): StyleSnapshot {
  const nodes: StyleSnapshot = new Map()

  function visit(element: Element, path: string) {
    const style = getComputedStyle(element)
    const properties = new Map<string, string>()

    for (let index = 0; index < style.length; index++) {
      const property = style.item(index)
      if (property.startsWith('--')) continue
      properties.set(property, style.getPropertyValue(property))
    }

    nodes.set(path, properties)
    Array.from(element.children).forEach((child, index) =>
      visit(child, `${path} > ${child.tagName.toLowerCase()}:${index}`),
    )
  }

  visit(root, root.tagName.toLowerCase())

  return nodes
}

export function differences(actual: StyleSnapshot, expected: StyleSnapshot) {
  const paths = new Set([...actual.keys(), ...expected.keys()])

  return [...paths].flatMap((path) => {
    const actualStyle = actual.get(path)
    const expectedStyle = expected.get(path)

    if (!actualStyle) return [`${path}: missing`]
    if (!expectedStyle) return [`${path}: unexpected`]

    return [...expectedStyle.keys()]
      .filter((property) => actualStyle.get(property) !== expectedStyle.get(property))
      .map(
        (property) =>
          `${path} ${property}: ${actualStyle.get(property)} instead of ${expectedStyle.get(property)}`,
      )
  })
}
