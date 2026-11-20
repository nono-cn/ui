import { cva } from 'class-variance-authority'
import { checkboxDefaults } from '@/components/Checkbox/constants'
import type { CheckboxSize } from '@/components/Checkbox/types'

export const checkboxVariants = cva(
  [
    'relative inline-flex shrink-0 cursor-pointer items-center justify-center overflow-hidden',
    'rounded-(--checkbox-radius) border border-input bg-background shadow-xs',
    'transition-[background-color,border-color,box-shadow] outline-none',
    'data-checked:border-(--checkbox-color) data-checked:bg-(--checkbox-color)',
    'data-indeterminate:border-(--checkbox-color) data-indeterminate:bg-(--checkbox-color)',
    'focus-visible:border-(--checkbox-color) focus-visible:ring-[3px] focus-visible:ring-(--checkbox-color)/30',
    'aria-invalid:border-error aria-invalid:ring-[3px] aria-invalid:ring-error/30',
    'data-disabled:cursor-not-allowed data-disabled:opacity-50 data-readonly:cursor-default',
  ],
  {
    variants: {
      size: {
        xs: 'size-3',
        sm: 'size-3.5',
        md: 'size-4',
        lg: 'size-4.5',
        xl: 'size-5',
      } satisfies Record<CheckboxSize, string>,
    },
    defaultVariants: { size: checkboxDefaults.size },
  },
)

export const checkboxIndicatorVariants = cva([
  'pointer-events-none flex size-full items-center justify-center text-(--checkbox-color-foreground)',
  'transition-[opacity,scale] duration-150',
  'data-starting-style:scale-50 data-starting-style:opacity-0',
  'data-ending-style:scale-50 data-ending-style:opacity-0',
])

export const checkboxIconVariants = cva('size-[85%] shrink-0')
