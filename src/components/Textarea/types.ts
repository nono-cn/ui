import type { TextareaSubmitDetails } from '@ui-sdk/vue/textarea'
import type { textareaSizes, textareaVariantNames } from '@/components/Textarea/constants'
import type { Radius } from '@/composables/useTheme'
import type { UiResolver } from '@/composables/useUi'

export type TextareaSize = (typeof textareaSizes)[number]

export type TextareaVariant = (typeof textareaVariantNames)[number]

export interface TextareaUi {
  root?: UiResolver
}

export interface TextareaProps {
  modelValue?: string
  defaultValue?: string
  variant?: TextareaVariant
  color?: string
  size?: TextareaSize
  radius?: Radius
  autoResize?: boolean
  highlight?: boolean
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  submitShortcut?: 'enter' | 'mod+enter'
  onSubmit?: (value: string, details: TextareaSubmitDetails) => void
  ui?: TextareaUi
}

export interface TextareaEmits {
  'update:modelValue': [value: string]
}
