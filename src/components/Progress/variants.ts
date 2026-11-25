import { cva } from 'class-variance-authority'
import { progressDefaults } from '@/components/Progress/constants'
import type {
  ProgressAnimation,
  ProgressOrientation,
  ProgressSize,
  ProgressValuePosition,
} from '@/components/Progress/types'

export const progressVariants = cva('gap-1.5', {
  variants: {
    orientation: {
      horizontal: 'grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-x-2',
      vertical: 'flex h-full flex-col items-center',
    } satisfies Record<ProgressOrientation, string>,
  },
  defaultVariants: { orientation: progressDefaults.orientation },
})

const textSizes = {
  xs: 'text-xs',
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-sm',
  xl: 'text-base',
} satisfies Record<ProgressSize, string>

export const progressLabelVariants = cva('min-w-0 truncate font-medium text-foreground', {
  variants: { size: textSizes },
  defaultVariants: { size: progressDefaults.size },
})

export const progressValueVariants = cva('tabular-nums', {
  variants: {
    size: textSizes,
    orientation: {
      horizontal: '',
      vertical: '',
    } satisfies Record<ProgressOrientation, string>,
    position: {
      outside: 'text-muted-foreground',
      inside: [
        'pointer-events-none absolute inset-0 flex items-center justify-center px-2 font-medium',
        'bg-clip-text text-transparent [--progress-fill:var(--progress-value)]',
        'transition-[--progress-fill] duration-300 ease-out motion-reduce:transition-none',
      ],
    } satisfies Record<ProgressValuePosition, string | string[]>,
    inverted: { true: '', false: '' },
  },
  compoundVariants: [
    { orientation: 'horizontal', position: 'outside', class: 'col-start-2 text-end' },
    { position: 'inside', size: ['xs', 'sm', 'md'], class: 'text-xs' },
    { position: 'inside', size: ['lg', 'xl'], class: 'text-sm' },
    {
      position: 'inside',
      inverted: false,
      class: [
        'bg-[linear-gradient(to_right,var(--progress-color-foreground)_var(--progress-fill),var(--foreground)_var(--progress-fill))]',
        'rtl:bg-[linear-gradient(to_left,var(--progress-color-foreground)_var(--progress-fill),var(--foreground)_var(--progress-fill))]',
      ],
    },
    {
      position: 'inside',
      inverted: true,
      class: [
        'bg-[linear-gradient(to_left,var(--progress-color-foreground)_var(--progress-fill),var(--foreground)_var(--progress-fill))]',
        'rtl:bg-[linear-gradient(to_right,var(--progress-color-foreground)_var(--progress-fill),var(--foreground)_var(--progress-fill))]',
      ],
    },
  ],
  defaultVariants: {
    size: progressDefaults.size,
    orientation: progressDefaults.orientation,
    position: progressDefaults.valuePosition,
    inverted: false,
  },
})

export const progressTrackVariants = cva(
  'relative shrink-0 overflow-hidden rounded-full bg-input',
  {
    variants: {
      orientation: {
        horizontal: 'col-span-2 w-full',
        vertical: 'min-h-0 flex-1',
      } satisfies Record<ProgressOrientation, string>,
      size: {
        xs: '',
        sm: '',
        md: '',
        lg: '',
        xl: '',
      } satisfies Record<ProgressSize, string>,
      inside: { true: '', false: '' },
    },
    compoundVariants: [
      { orientation: 'horizontal', inside: false, size: 'xs', class: 'h-1' },
      { orientation: 'horizontal', inside: false, size: 'sm', class: 'h-1.5' },
      { orientation: 'horizontal', inside: false, size: 'md', class: 'h-2' },
      { orientation: 'horizontal', inside: false, size: 'lg', class: 'h-3' },
      { orientation: 'horizontal', inside: false, size: 'xl', class: 'h-4' },
      { orientation: 'horizontal', inside: true, size: 'xs', class: 'h-4' },
      { orientation: 'horizontal', inside: true, size: 'sm', class: 'h-4.5' },
      { orientation: 'horizontal', inside: true, size: 'md', class: 'h-5' },
      { orientation: 'horizontal', inside: true, size: 'lg', class: 'h-6' },
      { orientation: 'horizontal', inside: true, size: 'xl', class: 'h-7' },
      { orientation: 'vertical', size: 'xs', class: 'w-1' },
      { orientation: 'vertical', size: 'sm', class: 'w-1.5' },
      { orientation: 'vertical', size: 'md', class: 'w-2' },
      { orientation: 'vertical', size: 'lg', class: 'w-3' },
      { orientation: 'vertical', size: 'xl', class: 'w-4' },
    ],
    defaultVariants: {
      orientation: progressDefaults.orientation,
      size: progressDefaults.size,
      inside: false,
    },
  },
)

export const progressIndicatorVariants = cva(
  [
    'absolute rounded-full bg-(--progress-color)',
    'transition-[width,height] duration-300 ease-out motion-reduce:transition-none',
    'data-indeterminate:inset-0 data-indeterminate:transition-none',
    'motion-reduce:data-indeterminate:animate-pulse',
  ],
  {
    variants: {
      orientation: {
        horizontal: 'inset-y-0',
        vertical: 'inset-x-0 h-(--progress-value) w-full!',
      } satisfies Record<ProgressOrientation, string>,
      inverted: { true: '', false: '' },
      animation: {
        carousel: '',
        'carousel-inverse': '',
        swing: '',
        elastic: '',
      } satisfies Record<ProgressAnimation, string>,
    },
    compoundVariants: [
      {
        orientation: 'horizontal',
        inverted: true,
        class: 'not-data-indeterminate:start-auto! end-0',
      },
      { orientation: 'vertical', inverted: false, class: 'bottom-0' },
      { orientation: 'vertical', inverted: true, class: 'top-0' },
      {
        orientation: 'horizontal',
        animation: ['carousel', 'carousel-inverse'],
        class: 'motion-safe:data-indeterminate:animate-progress-carousel-inline',
      },
      {
        orientation: 'vertical',
        animation: ['carousel', 'carousel-inverse'],
        class: 'motion-safe:data-indeterminate:animate-progress-carousel-block',
      },
      {
        inverted: true,
        animation: ['carousel', 'swing', 'elastic'],
        class: 'motion-safe:data-indeterminate:[animation-direction:reverse]',
      },
      {
        inverted: false,
        animation: 'carousel-inverse',
        class: 'motion-safe:data-indeterminate:[animation-direction:reverse]',
      },
      {
        orientation: 'horizontal',
        animation: 'swing',
        class: 'motion-safe:data-indeterminate:animate-progress-swing-inline',
      },
      {
        orientation: 'vertical',
        animation: 'swing',
        class: 'motion-safe:data-indeterminate:animate-progress-swing-block',
      },
      {
        orientation: 'horizontal',
        animation: 'elastic',
        class: 'motion-safe:data-indeterminate:animate-progress-elastic-inline',
      },
      {
        orientation: 'vertical',
        animation: 'elastic',
        class: 'motion-safe:data-indeterminate:animate-progress-elastic-block',
      },
    ],
    defaultVariants: {
      orientation: progressDefaults.orientation,
      inverted: false,
      animation: progressDefaults.animation,
    },
  },
)
