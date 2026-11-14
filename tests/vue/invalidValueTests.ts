import { invalidValueSuite, type InvalidValueSuiteOptions } from '@test/shared/invalidValue'
import { mountRoot, type MountRootOptions } from '@test/vue/mountRoot'

interface InvalidValueTestsOptions
  extends MountRootOptions, Omit<InvalidValueSuiteOptions, 'mountRoot'> {
  prop: string
}

export function invalidValueTests({ prop, values, fallback, ...target }: InvalidValueTestsOptions) {
  invalidValueSuite({
    values,
    fallback,
    mountRoot: (value) => mountRoot(target, { [prop]: value }),
  })
}
