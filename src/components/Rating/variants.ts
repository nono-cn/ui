import { cva } from 'class-variance-authority'
import { ratingDefaults } from '@/components/Rating/constants'
import type { RatingOrientation, RatingSize } from '@/components/Rating/types'

export const ratingVariants = cva(
  [
    'inline-flex items-center gap-0.5 outline-none',
    'data-disabled:cursor-not-allowed data-disabled:opacity-50',
  ],
  {
    variants: {
      orientation: {
        horizontal: 'flex-row',
        vertical: 'flex-col',
      } satisfies Record<RatingOrientation, string>,
    },
    defaultVariants: { orientation: ratingDefaults.orientation },
  },
)

export const ratingItemVariants = cva(
  [
    'relative inline-flex shrink-0 cursor-pointer rounded-xs outline-none select-none',
    'transition-[scale,box-shadow] duration-150',
    'has-focus-visible:ring-[3px] has-focus-visible:ring-(--rating-color)/30',
    'not-data-disabled:not-data-readonly:hover:scale-110',
    'data-disabled:pointer-events-none data-readonly:cursor-default',
    '[&_[role=radio]]:cursor-[inherit] [&_[role=radio]]:outline-none',
  ],
  {
    variants: {
      size: {
        xs: 'size-3',
        sm: 'size-4',
        md: 'size-5',
        lg: 'size-6',
        xl: 'size-7',
      } satisfies Record<RatingSize, string>,
    },
    defaultVariants: { size: ratingDefaults.size },
  },
)

export const ratingEmptyIconVariants = cva('pointer-events-none size-full text-input')

export const ratingIconVariants = cva([
  'pointer-events-none absolute inset-0 size-full text-(--rating-color)',
  '[clip-path:inset(0_calc((1-var(--rating-fill))*100%)_0_0)]',
  'rtl:[clip-path:inset(0_0_0_calc((1-var(--rating-fill))*100%))]',
])
