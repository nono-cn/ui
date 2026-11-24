import { cva } from 'class-variance-authority'
import { passwordDefaults } from '@/components/Password/constants'
import type { InputSize } from '@/components/Input/types'

export const passwordTrailingPaddingVariants = cva('', {
  variants: {
    size: {
      xs: 'pe-11',
      sm: 'pe-14',
      md: 'pe-17',
      lg: 'pe-19',
      xl: 'pe-22',
    } satisfies Record<InputSize, string>,
  },
  defaultVariants: { size: passwordDefaults.size },
})

export const passwordToggleVariants = cva(
  [
    'inline-flex shrink-0 cursor-pointer items-center justify-center rounded-sm text-muted-foreground',
    'transition-[color,box-shadow] outline-none interactive:hover:text-foreground',
    'focus-visible:ring-[3px] focus-visible:ring-(--input-color)/30',
    'data-disabled:cursor-not-allowed data-disabled:interactive:hover:text-muted-foreground',
  ],
  {
    variants: {
      size: {
        xs: 'size-3',
        sm: 'size-4',
        md: 'size-5',
        lg: 'size-6',
        xl: 'size-7',
      } satisfies Record<InputSize, string>,
    },
    defaultVariants: { size: passwordDefaults.size },
  },
)
