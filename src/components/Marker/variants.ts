import { cva } from 'class-variance-authority'
import { markerDefaults } from '@/components/Marker/constants'
import type { MarkerVariant } from '@/components/Marker/types'

export const markerVariants = cva(
  [
    'flex min-w-0 items-start gap-2 text-start text-sm text-muted-foreground',
    '[&:is(a,button)]:cursor-pointer [&:is(a,button)]:rounded-sm [&:is(a,button)]:outline-none [&:is(a,button)]:transition-[color,box-shadow]',
    '[&:is(a,button)]:hover:text-foreground [&:is(a,button)]:focus-visible:text-foreground',
    '[&:is(a,button)]:focus-visible:ring-[3px] [&:is(a,button)]:focus-visible:ring-neutral/30',
    '[a&]:underline-offset-4 [a&]:hover:underline',
  ],
  {
    variants: {
      variant: {
        plain: 'w-fit max-w-full',
        border: 'w-full border-b border-border pb-2.5',
        separator: [
          'w-full justify-center text-center',
          'before:h-px before:min-w-4 before:flex-1 before:self-center before:bg-border',
          'after:h-px after:min-w-4 after:flex-1 after:self-center after:bg-border',
        ],
      } satisfies Record<MarkerVariant, string | string[]>,
    },
    defaultVariants: { variant: markerDefaults.variant },
  },
)

export const markerLeadingVariants = cva('inline-flex h-5 shrink-0 items-center justify-center')

export const markerIconVariants = cva('size-4')

export const markerLabelVariants = cva('min-w-0 break-words', {
  variants: {
    shimmer: {
      true: [
        'motion-safe:animate-marker-shimmer motion-safe:bg-size-[200%_100%] motion-safe:bg-clip-text motion-safe:text-transparent',
        'motion-safe:bg-[linear-gradient(90deg,var(--color-muted-foreground)_40%,var(--color-foreground)_50%,var(--color-muted-foreground)_60%)]',
      ],
      false: '',
    },
  },
  defaultVariants: { shimmer: markerDefaults.shimmer },
})
