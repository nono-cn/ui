import { cva } from 'class-variance-authority'
import { textareaDefaults } from '@/components/Textarea/constants'
import type { TextareaSize, TextareaVariant } from '@/components/Textarea/types'

export const textareaVariants = cva(
  [
    'flex w-full min-w-0 rounded-(--textarea-radius) border border-transparent bg-transparent text-foreground',
    'placeholder:text-muted-foreground transition-[color,background-color,border-color,box-shadow] outline-none',
    'focus-visible:border-(--textarea-color) focus-visible:ring-[3px] focus-visible:ring-(--textarea-color)/30',
    'aria-invalid:border-error aria-invalid:focus-visible:ring-error/30',
    'data-disabled:cursor-not-allowed data-disabled:opacity-50',
  ],
  {
    variants: {
      size: {
        xs: 'min-h-12 px-2 py-1 text-xs',
        sm: 'min-h-14 px-2.5 py-1.5 text-sm',
        md: 'min-h-16 px-3 py-2 text-base',
        lg: 'min-h-20 px-3.5 py-2.5 text-lg',
        xl: 'min-h-24 px-4 py-3 text-xl',
      } satisfies Record<TextareaSize, string>,
      variant: {
        outline: 'border-input shadow-xs',
        soft: 'bg-muted/50 interactive:hover:bg-muted focus-visible:bg-muted',
        subtle: 'border-input bg-muted',
        plain: '',
      } satisfies Record<TextareaVariant, string>,
      autoResize: {
        true: 'max-h-80 resize-none',
        false: 'resize-y',
      },
      highlight: {
        true: 'border-(--textarea-color)',
        false: '',
      },
    },
    defaultVariants: {
      size: textareaDefaults.size,
      variant: textareaDefaults.variant,
      autoResize: false,
      highlight: false,
    },
  },
)
