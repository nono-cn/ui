import { Label as LabelRoot } from '@ui-sdk/vue/label'
import { propsOf } from '@/composables/useUi'
import type { LabelUi } from '@/components/Label/types'

export const labelUiExclude = {
  root: propsOf(LabelRoot),
} satisfies Record<keyof LabelUi, readonly string[]>
