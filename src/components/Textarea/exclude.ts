import { Textarea as TextareaRoot } from '@ui-sdk/vue/textarea'
import { propsOf } from '@/composables/useUi'
import type { TextareaUi } from '@/components/Textarea/types'

export const textareaUiExclude = {
  root: propsOf(TextareaRoot),
} satisfies Record<keyof TextareaUi, readonly string[]>
