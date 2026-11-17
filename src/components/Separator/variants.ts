import { cva } from 'class-variance-authority'
import { separatorDefaults } from '@/components/Separator/constants'
import type {
  SeparatorOrientation,
  SeparatorPosition,
  SeparatorSize,
  SeparatorType,
} from '@/components/Separator/types'

export const separatorVariants = cva('flex shrink-0 items-center border-(--separator-color)', {
  variants: {
    type: {
      solid: 'border-solid',
      dashed: 'border-dashed',
      dotted: 'border-dotted',
    } satisfies Record<SeparatorType, string>,
    orientation: {
      horizontal: 'w-full flex-row',
      vertical: 'h-full flex-col self-stretch',
    } satisfies Record<SeparatorOrientation, string>,
    position: {
      left: 'justify-start',
      center: 'justify-center',
      right: 'justify-end',
    } satisfies Record<SeparatorPosition, string>,
    size: {
      xs: '',
      sm: '',
      md: '',
      lg: '',
      xl: '',
    } satisfies Record<SeparatorSize, string>,
  },
  compoundVariants: [
    { orientation: 'horizontal', size: 'xs', class: 'h-px border-t' },
    { orientation: 'horizontal', size: 'sm', class: 'h-[2px] border-t-[2px]' },
    { orientation: 'horizontal', size: 'md', class: 'h-[3px] border-t-[3px]' },
    { orientation: 'horizontal', size: 'lg', class: 'h-[4px] border-t-[4px]' },
    { orientation: 'horizontal', size: 'xl', class: 'h-[5px] border-t-[5px]' },
    { orientation: 'vertical', size: 'xs', class: 'w-px border-l' },
    { orientation: 'vertical', size: 'sm', class: 'w-[2px] border-l-[2px]' },
    { orientation: 'vertical', size: 'md', class: 'w-[3px] border-l-[3px]' },
    { orientation: 'vertical', size: 'lg', class: 'w-[4px] border-l-[4px]' },
    { orientation: 'vertical', size: 'xl', class: 'w-[5px] border-l-[5px]' },
  ],
  defaultVariants: {
    type: separatorDefaults.type,
    orientation: separatorDefaults.orientation,
    position: separatorDefaults.position,
    size: separatorDefaults.size,
  },
})

export const separatorLabelVariants = cva(
  'relative bg-background px-2 text-sm text-muted-foreground whitespace-nowrap',
)
