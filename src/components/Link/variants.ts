import { cva } from 'class-variance-authority'

export const linkVariants = cva([
  'inline-flex items-center gap-1 rounded-xs font-medium text-(--link-color) no-underline underline-offset-4',
  'transition-[color,box-shadow] outline-none',
  'interactive:hover:underline focus-visible:underline focus-visible:ring-[3px] focus-visible:ring-(--link-color)/30',
  'data-disabled:cursor-not-allowed data-disabled:opacity-50',
])

export const linkIconSlotVariants = cva(
  'inline-flex size-[1em] shrink-0 items-center justify-center',
)
