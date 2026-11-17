import { cva } from 'class-variance-authority'
import { formFieldDefaults } from '@/components/FormField/constants'
import type { FormFieldSize } from '@/components/FormField/types'

const textSizes = {
  xs: 'text-xs',
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-sm',
  xl: 'text-base',
} satisfies Record<FormFieldSize, string>

export const formFieldVariants = cva('group/field grid w-full gap-1.5 data-disabled:opacity-50')

export const formFieldHeaderVariants = cva('flex items-center justify-between gap-2')

export const formFieldLabelVariants = cva(
  'flex items-center gap-2 leading-none font-medium text-foreground select-none',
  {
    variants: { size: textSizes },
    defaultVariants: { size: formFieldDefaults.size },
  },
)

export const formFieldHintVariants = cva('leading-none text-muted-foreground', {
  variants: { size: textSizes },
  defaultVariants: { size: formFieldDefaults.size },
})

export const formFieldDescriptionVariants = cva('text-muted-foreground', {
  variants: { size: textSizes },
  defaultVariants: { size: formFieldDefaults.size },
})

export const formFieldContainerVariants = cva('relative')

export const formFieldErrorVariants = cva('text-error empty:hidden', {
  variants: { size: textSizes },
  defaultVariants: { size: formFieldDefaults.size },
})
