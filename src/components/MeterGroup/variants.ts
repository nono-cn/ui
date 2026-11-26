import { cva } from 'class-variance-authority'
import { meterGroupDefaults } from '@/components/MeterGroup/constants'
import type {
  MeterGroupLegend,
  MeterGroupOrientation,
  MeterGroupSize,
} from '@/components/MeterGroup/types'

const textSizes = {
  xs: 'text-xs',
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-sm',
  xl: 'text-base',
} satisfies Record<MeterGroupSize, string>

export const meterGroupVariants = cva('flex', {
  variants: {
    orientation: {
      horizontal: 'w-full flex-col gap-3',
      vertical: 'h-full flex-row gap-4',
    } satisfies Record<MeterGroupOrientation, string>,
  },
  defaultVariants: { orientation: meterGroupDefaults.orientation },
})

export const meterGroupMeterVariants = cva('gap-1.5', {
  variants: {
    orientation: {
      horizontal: 'grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-x-2',
      vertical: 'flex h-full flex-col items-center',
    } satisfies Record<MeterGroupOrientation, string>,
  },
  defaultVariants: { orientation: meterGroupDefaults.orientation },
})

export const meterGroupLabelVariants = cva('min-w-0 truncate font-medium text-foreground', {
  variants: { size: textSizes },
  defaultVariants: { size: meterGroupDefaults.size },
})

export const meterGroupValueVariants = cva('text-muted-foreground tabular-nums', {
  variants: {
    size: textSizes,
    orientation: {
      horizontal: 'col-start-2 text-end',
      vertical: '',
    } satisfies Record<MeterGroupOrientation, string>,
  },
  defaultVariants: { size: meterGroupDefaults.size, orientation: meterGroupDefaults.orientation },
})

export const meterGroupTrackVariants = cva(
  'relative flex shrink-0 overflow-hidden rounded-full bg-input',
  {
    variants: {
      orientation: {
        horizontal: 'col-span-2 w-full flex-row',
        vertical: 'min-h-0 flex-1 flex-col-reverse',
      } satisfies Record<MeterGroupOrientation, string>,
      size: {
        xs: '',
        sm: '',
        md: '',
        lg: '',
        xl: '',
      } satisfies Record<MeterGroupSize, string>,
    },
    compoundVariants: [
      { orientation: 'horizontal', size: 'xs', class: 'h-1' },
      { orientation: 'horizontal', size: 'sm', class: 'h-1.5' },
      { orientation: 'horizontal', size: 'md', class: 'h-2' },
      { orientation: 'horizontal', size: 'lg', class: 'h-3' },
      { orientation: 'horizontal', size: 'xl', class: 'h-4' },
      { orientation: 'vertical', size: 'xs', class: 'w-1' },
      { orientation: 'vertical', size: 'sm', class: 'w-1.5' },
      { orientation: 'vertical', size: 'md', class: 'w-2' },
      { orientation: 'vertical', size: 'lg', class: 'w-3' },
      { orientation: 'vertical', size: 'xl', class: 'w-4' },
    ],
    defaultVariants: { orientation: meterGroupDefaults.orientation, size: meterGroupDefaults.size },
  },
)

export const meterGroupSegmentVariants = cva(
  'shrink-0 border-background bg-(--meter-group-color) duration-300 ease-out motion-reduce:transition-none',
  {
    variants: {
      orientation: {
        horizontal: 'h-full transition-[width]',
        vertical: 'w-full transition-[height]',
      } satisfies Record<MeterGroupOrientation, string>,
      separated: { true: '', false: '' },
    },
    compoundVariants: [
      { orientation: 'horizontal', separated: true, class: 'not-first:border-s-2' },
      { orientation: 'vertical', separated: true, class: 'not-first:border-b-2' },
    ],
    defaultVariants: { orientation: meterGroupDefaults.orientation, separated: false },
  },
)

export const meterGroupLegendVariants = cva('flex min-w-0', {
  variants: {
    legend: {
      list: 'flex-col gap-1',
      inline: 'flex-wrap gap-x-4 gap-y-1',
      none: '',
    } satisfies Record<MeterGroupLegend, string>,
    size: textSizes,
  },
  defaultVariants: { legend: meterGroupDefaults.legend, size: meterGroupDefaults.size },
})

export const meterGroupItemVariants = cva('flex min-w-0 items-center gap-1.5')

export const meterGroupLeadingVariants = cva(
  'inline-flex shrink-0 items-center justify-center text-(--meter-group-color)',
  {
    variants: {
      size: {
        xs: 'size-3',
        sm: 'size-3.5',
        md: 'size-4',
        lg: 'size-4.5',
        xl: 'size-5',
      } satisfies Record<MeterGroupSize, string>,
    },
    defaultVariants: { size: meterGroupDefaults.size },
  },
)

export const meterGroupIconVariants = cva('size-full')

export const meterGroupDotVariants = cva('size-1/2 rounded-full bg-(--meter-group-color)')

export const meterGroupItemLabelVariants = cva('min-w-0 text-foreground')

export const meterGroupItemValueVariants = cva('text-muted-foreground tabular-nums', {
  variants: {
    legend: {
      list: 'ms-auto ps-2',
      inline: '',
      none: '',
    } satisfies Record<MeterGroupLegend, string>,
  },
  defaultVariants: { legend: meterGroupDefaults.legend },
})
