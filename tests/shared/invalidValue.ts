import { expect, it } from 'vitest'
import { differences, snapshot } from './styles'

export interface InvalidValueSuiteOptions {
  mountRoot: (value: unknown) => Promise<Element>
  values: unknown[]
  fallback: unknown
}

function describeValue(value: unknown) {
  return typeof value === 'string' ? `'${value}'` : String(value)
}

export function invalidValueSuite({ mountRoot, values, fallback }: InvalidValueSuiteOptions) {
  for (const value of values) {
    it(`with ${describeValue(value)} renders the same as with ${describeValue(fallback)}`, async () => {
      const expected = snapshot(await mountRoot(fallback))
      const actual = snapshot(await mountRoot(value))

      expect(differences(actual, expected)).toEqual([])
    })
  }
}
