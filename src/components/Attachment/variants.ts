import { cva } from 'class-variance-authority'
import { attachmentDefaults } from '@/components/Attachment/constants'
import type { AttachmentOrientation, AttachmentSize } from '@/components/Attachment/types'

const sizes = { sm: '', md: '', lg: '' } satisfies Record<AttachmentSize, string>

const orientations = {
  horizontal: '',
  vertical: '',
} satisfies Record<AttachmentOrientation, string>

export const attachmentVariants = cva(
  [
    'group/attachment relative flex max-w-full min-w-0 overflow-hidden rounded-(--attachment-radius) border bg-card text-card-foreground',
    'transition-[background-color,border-color,box-shadow]',
    'data-[state=idle]:border-dashed data-[state=error]:border-error/40',
    'has-[>[data-slot=trigger]:hover]:bg-muted/50',
    'has-[>[data-slot=trigger]:focus-visible]:border-ring has-[>[data-slot=trigger]:focus-visible]:ring-[3px] has-[>[data-slot=trigger]:focus-visible]:ring-ring/50',
  ],
  {
    variants: {
      size: sizes,
      orientation: {
        horizontal: 'items-center',
        vertical: 'flex-col',
      } satisfies Record<AttachmentOrientation, string>,
    },
    compoundVariants: [
      { orientation: 'horizontal', size: 'sm', class: 'w-48 gap-2 p-1 text-xs' },
      { orientation: 'horizontal', size: 'md', class: 'w-64 gap-3 p-2 text-sm' },
      { orientation: 'horizontal', size: 'lg', class: 'w-72 gap-3 p-2.5 text-sm' },
      { orientation: 'vertical', size: 'sm', class: 'w-28 gap-1.5 p-1 text-xs' },
      { orientation: 'vertical', size: 'md', class: 'w-36 gap-2 p-1.5 text-sm' },
      { orientation: 'vertical', size: 'lg', class: 'w-44 gap-2 p-2 text-sm' },
    ],
    defaultVariants: {
      size: attachmentDefaults.size,
      orientation: attachmentDefaults.orientation,
    },
  },
)

export const attachmentMediaVariants = cva(
  [
    'relative flex shrink-0 items-center justify-center overflow-hidden rounded-[max(0px,calc(var(--attachment-radius)-4px))] bg-muted text-muted-foreground',
    'group-data-[state=error]/attachment:bg-error/10 group-data-[state=error]/attachment:text-error',
  ],
  {
    variants: { size: sizes, orientation: orientations },
    compoundVariants: [
      { orientation: 'horizontal', size: 'sm', class: 'size-6' },
      { orientation: 'horizontal', size: 'md', class: 'size-10' },
      { orientation: 'horizontal', size: 'lg', class: 'size-12' },
      { orientation: 'vertical', class: 'aspect-4/3 w-full' },
    ],
    defaultVariants: {
      size: attachmentDefaults.size,
      orientation: attachmentDefaults.orientation,
    },
  },
)

export const attachmentImageVariants = cva('size-full object-cover')

export const attachmentIconVariants = cva('', {
  variants: { size: sizes, orientation: orientations },
  compoundVariants: [
    { orientation: 'horizontal', size: 'sm', class: 'size-3.5' },
    { orientation: 'horizontal', size: 'md', class: 'size-5' },
    { orientation: 'horizontal', size: 'lg', class: 'size-6' },
    { orientation: 'vertical', size: 'sm', class: 'size-6' },
    { orientation: 'vertical', size: 'md', class: 'size-8' },
    { orientation: 'vertical', size: 'lg', class: 'size-10' },
  ],
  defaultVariants: {
    size: attachmentDefaults.size,
    orientation: attachmentDefaults.orientation,
  },
})

export const attachmentSpinnerVariants = cva('absolute inset-0 flex items-center justify-center', {
  variants: {
    image: {
      true: 'bg-overlay text-foreground',
      false: '',
    },
  },
  defaultVariants: { image: false },
})

export const attachmentContentVariants = cva('grid min-w-0 flex-1 gap-0.5 text-start', {
  variants: {
    orientation: {
      horizontal: '',
      vertical: 'w-full px-0.5 pb-0.5',
    } satisfies Record<AttachmentOrientation, string>,
  },
  defaultVariants: { orientation: attachmentDefaults.orientation },
})

export const attachmentLabelVariants = cva([
  'truncate leading-tight font-medium',
  'group-aria-busy/attachment:animate-shimmer group-aria-busy/attachment:bg-[linear-gradient(90deg,var(--color-foreground)_40%,var(--color-muted-foreground)_50%,var(--color-foreground)_60%)] group-aria-busy/attachment:bg-size-[200%_100%] group-aria-busy/attachment:bg-clip-text group-aria-busy/attachment:text-transparent',
  'group-aria-busy/attachment:motion-reduce:animate-none',
])

export const attachmentDescriptionVariants = cva(
  'truncate text-xs leading-tight text-muted-foreground group-data-[state=error]/attachment:text-error',
)

export const attachmentActionsVariants = cva('z-10 flex shrink-0 items-center gap-1', {
  variants: {
    orientation: {
      horizontal: 'relative',
      vertical: 'absolute end-2 top-2 rounded-full bg-background/80 backdrop-blur-sm',
    } satisfies Record<AttachmentOrientation, string>,
  },
  defaultVariants: { orientation: attachmentDefaults.orientation },
})

export const attachmentRemoveButtonVariants = cva('', {
  variants: {
    compact: {
      true: 'size-6',
      false: '',
    },
  },
  defaultVariants: { compact: false },
})

export const attachmentTriggerVariants = cva(
  'absolute inset-0 cursor-pointer rounded-[inherit] outline-none',
)

export const attachmentProgressVariants = cva(
  'pointer-events-none absolute inset-x-0 bottom-0 h-0.5 bg-muted',
)

export const attachmentProgressIndicatorVariants = cva(
  'h-full bg-primary transition-[width] duration-300 motion-reduce:transition-none',
)

export const attachmentGroupVariants = cva(
  'flex max-w-full snap-x snap-mandatory scroll-p-1 gap-2 overflow-x-auto p-1 [scrollbar-width:none] *:shrink-0 *:snap-start [&::-webkit-scrollbar]:hidden',
)
