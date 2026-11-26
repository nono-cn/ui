import { ProgressLabel, Progress as ProgressRoot } from '@ui-sdk/vue/progress'
import { propsOf } from '@/composables/useUi'
import type { ProgressCircularUi } from '@/components/ProgressCircular/types'

export const progressCircularUiExclude = {
  root: propsOf(ProgressRoot),
  label: propsOf(ProgressLabel),
  value: [],
  indicator: [],
} satisfies Record<keyof ProgressCircularUi, readonly string[]>
