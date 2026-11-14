import { attrsSuite, type AttrsSuiteOptions } from '@test/shared/attrs'
import { mountRoot, type MountRootOptions } from '@test/vue/mountRoot'

interface AttrsTestsOptions extends MountRootOptions, Omit<AttrsSuiteOptions, 'mountRoot'> {
  toProps?: (attrs: Record<string, unknown>) => Record<string, unknown>
}

export function attrsTests({
  toProps = (attrs) => attrs,
  class: customClass,
  keeps,
  ...target
}: AttrsTestsOptions) {
  attrsSuite({
    class: customClass,
    keeps,
    mountRoot: (attrs = {}) => mountRoot(target, toProps(attrs)),
  })
}
