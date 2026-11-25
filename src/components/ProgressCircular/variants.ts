import { cva } from 'class-variance-authority'
import { progressCircularDefaults } from '@/components/ProgressCircular/constants'
import type { ProgressCircularSize } from '@/components/ProgressCircular/types'

export const progressCircularVariants = cva(
  'group/progress-circular inline-grid shrink-0 justify-items-center gap-1.5',
)

export const progressCircularLabelVariants = cva(
  'row-start-2 max-w-full truncate font-medium text-foreground',
  {
    variants: {
      size: {
        xs: 'text-xs',
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-sm',
        xl: 'text-base',
      } satisfies Record<ProgressCircularSize, string>,
    },
    defaultVariants: { size: progressCircularDefaults.size },
  },
)

export const progressCircularValueVariants = cva(
  'col-start-1 row-start-1 self-center font-medium text-foreground tabular-nums',
  {
    variants: {
      size: {
        xs: 'text-[0.5625rem]',
        sm: 'text-[0.625rem]',
        md: 'text-xs',
        lg: 'text-sm',
        xl: 'text-base',
      } satisfies Record<ProgressCircularSize, string>,
    },
    defaultVariants: { size: progressCircularDefaults.size },
  },
)

export const progressCircularSvgVariants = cva(
  [
    'col-start-1 row-start-1 -rotate-90 overflow-visible',
    'motion-safe:group-data-indeterminate/progress-circular:animate-progress-circular-spin',
  ],
  {
    variants: {
      size: {
        xs: 'size-8',
        sm: 'size-10',
        md: 'size-12',
        lg: 'size-16',
        xl: 'size-20',
      } satisfies Record<ProgressCircularSize, string>,
      inverted: { true: '-scale-y-100', false: '' },
    },
    defaultVariants: { size: progressCircularDefaults.size, inverted: false },
  },
)

export const progressCircularTrackVariants = cva('fill-none stroke-input')

export const progressCircularIndicatorVariants = cva([
  'fill-none stroke-(--progress-circular-color) [stroke-dasharray:100_200]',
  'transition-[stroke-dashoffset] duration-300 ease-out motion-reduce:transition-none',
  'data-indeterminate:[stroke-dasharray:25_200] data-indeterminate:transition-none',
  'motion-safe:data-indeterminate:animate-progress-circular-dash',
  'motion-reduce:data-indeterminate:animate-pulse',
])
