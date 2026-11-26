import { cva } from 'class-variance-authority'
import { timelineDefaults } from '@/components/Timeline/constants'
import type { TimelineOrientation, TimelineSize } from '@/components/Timeline/types'
import type { AvatarSize } from '@/components/Avatar/types'

type MarkerStatus = 'complete' | 'current' | 'upcoming' | 'none'

type MarkerKind = 'dot' | 'icon' | 'avatar'

export const timelineVariants = cva('flex', {
  variants: {
    orientation: {
      vertical: 'flex-col',
      horizontal: 'w-full flex-row',
    } satisfies Record<TimelineOrientation, string>,
    size: {
      xs: '[--timeline-box:--spacing(6)] [--timeline-dot:--spacing(2)]',
      sm: '[--timeline-box:--spacing(7)] [--timeline-dot:--spacing(2.5)]',
      md: '[--timeline-box:--spacing(8)] [--timeline-dot:--spacing(3)]',
      lg: '[--timeline-box:--spacing(10)] [--timeline-dot:--spacing(3.5)]',
      xl: '[--timeline-box:--spacing(12)] [--timeline-dot:--spacing(4)]',
    } satisfies Record<TimelineSize, string>,
  },
  defaultVariants: {
    orientation: timelineDefaults.orientation,
    size: timelineDefaults.size,
  },
})

export const timelineItemVariants = cva(
  'flex min-w-0 rounded-md outline-none focus-visible:ring-[3px] focus-visible:ring-(--timeline-color)/30',
  {
    variants: {
      orientation: {
        vertical: 'flex-row',
        horizontal: 'flex-1 flex-col',
      } satisfies Record<TimelineOrientation, string>,
      size: {
        xs: 'gap-2',
        sm: 'gap-2.5',
        md: 'gap-3',
        lg: 'gap-3.5',
        xl: 'gap-4',
      } satisfies Record<TimelineSize, string>,
    },
    defaultVariants: {
      orientation: timelineDefaults.orientation,
      size: timelineDefaults.size,
    },
  },
)

export const timelineRailVariants = cva('flex shrink-0 items-center', {
  variants: {
    orientation: {
      vertical: 'w-(--timeline-box) flex-col',
      horizontal: 'h-(--timeline-box) flex-row',
    } satisfies Record<TimelineOrientation, string>,
  },
  defaultVariants: { orientation: timelineDefaults.orientation },
})

export const timelineMarkerVariants = cva(
  'relative flex shrink-0 items-center justify-center rounded-full transition-[background-color,box-shadow] motion-reduce:transition-none',
  {
    variants: {
      kind: {
        dot: 'size-(--timeline-dot)',
        icon: 'size-(--timeline-box)',
        avatar: 'size-(--timeline-box)',
      } satisfies Record<MarkerKind, string>,
      status: {
        complete: '',
        current: '',
        upcoming: '',
        none: '',
      } satisfies Record<MarkerStatus, string>,
      orientation: {
        vertical: '',
        horizontal: '',
      } satisfies Record<TimelineOrientation, string>,
    },
    compoundVariants: [
      {
        kind: 'dot',
        orientation: 'vertical',
        class: 'my-[calc((var(--timeline-box)-var(--timeline-dot))/2)]',
      },
      {
        kind: ['dot', 'icon'],
        status: ['complete', 'current'],
        class: 'bg-(--timeline-color) text-(--timeline-color-foreground)',
      },
      { kind: ['dot', 'icon'], status: 'current', class: 'ring-4 ring-(--timeline-color)/20' },
      { kind: 'dot', status: 'upcoming', class: 'bg-border' },
      {
        kind: 'icon',
        status: 'upcoming',
        class: 'border border-border bg-background text-muted-foreground',
      },
      { kind: 'dot', status: 'none', class: 'bg-(--timeline-color)' },
      { kind: 'icon', status: 'none', class: 'bg-(--timeline-color)/10 text-(--timeline-color)' },
      {
        kind: 'avatar',
        status: 'current',
        class: 'ring-2 ring-(--timeline-color) ring-offset-2 ring-offset-background',
      },
      { kind: 'avatar', status: 'upcoming', class: 'opacity-50' },
    ],
    defaultVariants: {
      kind: 'dot',
      status: 'none',
      orientation: timelineDefaults.orientation,
    },
  },
)

export const timelineIconVariants = cva('size-1/2')

export const timelineAvatarSizes = {
  xs: 'xs',
  sm: 'xs',
  md: 'sm',
  lg: 'md',
  xl: 'lg',
} as const satisfies Record<TimelineSize, AvatarSize>

export const timelineConnectorVariants = cva(
  'flex-1 rounded-full transition-colors motion-reduce:transition-none',
  {
    variants: {
      orientation: {
        vertical: 'my-1 min-h-4 w-0.5',
        horizontal: 'mx-1 min-w-4 h-0.5',
      } satisfies Record<TimelineOrientation, string>,
      filled: {
        true: 'bg-(--timeline-color)',
        false: 'bg-border',
      },
    },
    defaultVariants: {
      orientation: timelineDefaults.orientation,
      filled: false,
    },
  },
)

export const timelineContentVariants = cva('flex min-w-0 flex-1 flex-col gap-0.5', {
  variants: {
    orientation: {
      vertical: 'pt-[max(0px,calc((var(--timeline-box)-1lh)/2))]',
      horizontal: '',
    } satisfies Record<TimelineOrientation, string>,
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-sm',
      lg: 'text-base',
      xl: 'text-base',
    } satisfies Record<TimelineSize, string>,
    last: { true: '', false: '' },
  },
  compoundVariants: [
    { orientation: 'vertical', last: false, size: 'xs', class: 'pb-4' },
    { orientation: 'vertical', last: false, size: 'sm', class: 'pb-5' },
    { orientation: 'vertical', last: false, size: 'md', class: 'pb-6' },
    { orientation: 'vertical', last: false, size: 'lg', class: 'pb-7' },
    { orientation: 'vertical', last: false, size: 'xl', class: 'pb-8' },
    { orientation: 'horizontal', last: false, class: 'pe-4' },
  ],
  defaultVariants: {
    orientation: timelineDefaults.orientation,
    size: timelineDefaults.size,
    last: false,
  },
})

export const timelineDateVariants = cva('text-muted-foreground tabular-nums', {
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-xs',
      md: 'text-xs',
      lg: 'text-sm',
      xl: 'text-sm',
    } satisfies Record<TimelineSize, string>,
  },
  defaultVariants: { size: timelineDefaults.size },
})

export const timelineTitleVariants = cva('font-medium text-foreground')

export const timelineDescriptionVariants = cva('text-muted-foreground', {
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-sm',
      xl: 'text-base',
    } satisfies Record<TimelineSize, string>,
  },
  defaultVariants: { size: timelineDefaults.size },
})
