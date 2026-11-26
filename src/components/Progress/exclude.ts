import {
  ProgressIndicator,
  ProgressLabel,
  Progress as ProgressRoot,
  ProgressTrack,
} from '@ui-sdk/vue/progress'
import { propsOf } from '@/composables/useUi'
import type { ProgressUi } from '@/components/Progress/types'

export const progressUiExclude = {
  root: propsOf(ProgressRoot),
  label: propsOf(ProgressLabel),
  value: [],
  track: propsOf(ProgressTrack),
  indicator: propsOf(ProgressIndicator),
} satisfies Record<keyof ProgressUi, readonly string[]>
