import { cva } from 'class-variance-authority'
import { badgeDefaults } from '@/components/Badge/constants'
import type { BadgeSize, BadgeVariant } from '@/components/Badge/types'

export const badgeVariants = cva(
  'inline-flex w-fit shrink-0 items-center justify-center overflow-hidden rounded-(--badge-radius) border font-medium whitespace-nowrap',
  {
    variants: {
      size: {
        xs: 'gap-0.5 px-0.5 text-xs',
        sm: 'gap-0.5 px-0.5 text-sm',
        md: 'gap-1 px-1 text-base',
        lg: 'gap-1.5 px-2 text-lg',
        xl: 'gap-2 px-2.5 text-xl',
      } satisfies Record<BadgeSize, string>,
      variant: {
        solid: 'border-transparent bg-(--badge-color) text-(--badge-color-foreground)',
        outline: 'border-(--badge-color)/40 bg-transparent text-(--badge-color)',
        plain: 'border-transparent bg-transparent text-(--badge-color)',
        subtle: 'border-(--badge-color)/20 bg-(--badge-color)/10 text-(--badge-color)',
        soft: 'border-transparent bg-(--badge-color)/10 text-(--badge-color)',
      } satisfies Record<BadgeVariant, string>,
    },
    defaultVariants: {
      size: badgeDefaults.size,
      variant: badgeDefaults.variant,
    },
  },
)

const slotSizes = {
  xs: 'size-3',
  sm: 'size-4',
  md: 'size-5',
  lg: 'size-6',
  xl: 'size-7',
} satisfies Record<BadgeSize, string>

export const badgeLeadingVariants = cva('inline-flex shrink-0 items-center justify-center', {
  variants: { size: slotSizes },
  defaultVariants: { size: badgeDefaults.size },
})

export const badgeTrailingVariants = cva('inline-flex shrink-0 items-center justify-center', {
  variants: { size: slotSizes },
  defaultVariants: { size: badgeDefaults.size },
})

export const badgeIconVariants = cva('size-full')
