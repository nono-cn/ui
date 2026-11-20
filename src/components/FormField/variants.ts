import { cva } from 'class-variance-authority'
import { formFieldDefaults } from '@/components/FormField/constants'
import type {
  FormFieldOrientation,
  FormFieldSize,
  FormFieldVariant,
} from '@/components/FormField/types'

const textSizes = {
  xs: 'text-xs',
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-sm',
  xl: 'text-base',
} satisfies Record<FormFieldSize, string>

export const formFieldVariants = cva('group/field grid w-full data-disabled:opacity-50', {
  variants: {
    orientation: {
      vertical: 'gap-1.5',
      horizontal: 'grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3',
    } satisfies Record<FormFieldOrientation, string>,
    variant: {
      default: '',
      card: 'relative rounded-lg border border-input p-4 shadow-xs transition-colors has-data-checked:bg-muted/50 data-invalid:border-error',
    } satisfies Record<FormFieldVariant, string>,
  },
  defaultVariants: {
    orientation: formFieldDefaults.orientation,
    variant: formFieldDefaults.variant,
  },
})

export const formFieldHeaderVariants = cva('flex items-center justify-between gap-2', {
  variants: {
    orientation: {
      vertical: '',
      horizontal: 'col-start-1 row-start-1',
    } satisfies Record<FormFieldOrientation, string>,
  },
  defaultVariants: { orientation: formFieldDefaults.orientation },
})

export const formFieldLabelVariants = cva(
  'flex items-center gap-2 leading-none font-medium text-foreground select-none',
  {
    variants: {
      size: textSizes,
      variant: {
        default: '',
        card: 'cursor-pointer after:absolute after:inset-0 group-data-disabled/field:cursor-not-allowed',
      } satisfies Record<FormFieldVariant, string>,
    },
    defaultVariants: { size: formFieldDefaults.size, variant: formFieldDefaults.variant },
  },
)

export const formFieldHintVariants = cva('leading-none text-muted-foreground', {
  variants: { size: textSizes },
  defaultVariants: { size: formFieldDefaults.size },
})

const textOrientations = {
  vertical: '',
  horizontal: 'col-start-1 row-start-2 mt-1.5',
} satisfies Record<FormFieldOrientation, string>

export const formFieldDescriptionVariants = cva('text-muted-foreground', {
  variants: { size: textSizes, orientation: textOrientations },
  defaultVariants: { size: formFieldDefaults.size, orientation: formFieldDefaults.orientation },
})

export const formFieldContainerVariants = cva('relative', {
  variants: {
    orientation: {
      vertical: '',
      horizontal: 'col-start-2 row-span-2 row-start-1 flex items-center',
    } satisfies Record<FormFieldOrientation, string>,
  },
  defaultVariants: { orientation: formFieldDefaults.orientation },
})

export const formFieldErrorVariants = cva('text-error empty:hidden', {
  variants: { size: textSizes, orientation: textOrientations },
  defaultVariants: { size: formFieldDefaults.size, orientation: formFieldDefaults.orientation },
})
