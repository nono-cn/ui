import type { TextareaSubmitDetails } from '@ui-sdk/vue/textarea'
import type { textareaSizes, textareaVariantNames } from '@/components/Textarea/constants'
import type { Radius } from '@/composables/useTheme'

export type TextareaSize = (typeof textareaSizes)[number]

export type TextareaVariant = (typeof textareaVariantNames)[number]

export interface TextareaProps {
  modelValue?: string
  defaultValue?: string
  placeholder?: string
  variant?: TextareaVariant
  color?: string
  size?: TextareaSize
  radius?: Radius
  rows?: number
  autoResize?: boolean
  highlight?: boolean
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  submitShortcut?: 'enter' | 'mod+enter'
  onSubmit?: (value: string, details: TextareaSubmitDetails) => void
}

export interface TextareaEmits {
  'update:modelValue': [value: string]
}
