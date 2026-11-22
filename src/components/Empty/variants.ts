import { cva } from 'class-variance-authority'
import { emptyDefaults } from '@/components/Empty/constants'
import type { EmptySize, EmptyVariant } from '@/components/Empty/types'

export const emptyVariants = cva(
  'flex w-full min-w-0 flex-col items-center justify-center rounded-(--empty-radius) border border-transparent text-center text-balance',
  {
    variants: {
      size: {
        sm: 'gap-4 p-6',
        md: 'gap-6 p-8',
        lg: 'gap-8 p-12',
      } satisfies Record<EmptySize, string>,
      variant: {
        plain: '',
        outline: 'border-dashed border-border',
        soft: 'bg-muted/50',
        subtle: 'border-dashed border-border bg-muted/50',
        elevated: 'border-border bg-card shadow-xs',
      } satisfies Record<EmptyVariant, string>,
    },
    defaultVariants: {
      size: emptyDefaults.size,
      variant: emptyDefaults.variant,
    },
  },
)

export const emptyHeaderVariants = cva('flex max-w-sm flex-col items-center', {
  variants: {
    size: {
      sm: 'gap-1.5',
      md: 'gap-2',
      lg: 'gap-2.5',
    } satisfies Record<EmptySize, string>,
  },
  defaultVariants: { size: emptyDefaults.size },
})

export const emptyMediaVariants = cva('flex shrink-0 items-center justify-center', {
  variants: {
    size: {
      sm: 'mb-1.5',
      md: 'mb-2',
      lg: 'mb-3',
    } satisfies Record<EmptySize, string>,
  },
  defaultVariants: { size: emptyDefaults.size },
})

export const emptyLabelVariants = cva('font-medium tracking-tight text-foreground', {
  variants: {
    size: {
      sm: 'text-base',
      md: 'text-lg',
      lg: 'text-xl',
    } satisfies Record<EmptySize, string>,
  },
  defaultVariants: { size: emptyDefaults.size },
})

export const emptyDescriptionVariants = cva('text-muted-foreground', {
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-sm/relaxed',
      lg: 'text-base/relaxed',
    } satisfies Record<EmptySize, string>,
  },
  defaultVariants: { size: emptyDefaults.size },
})

export const emptyContentVariants = cva(
  'flex w-full max-w-sm min-w-0 flex-col items-center justify-center gap-2 sm:flex-row',
)
