import { cva } from 'class-variance-authority'

export const labelVariants = cva([
  'flex items-center gap-2 text-sm leading-none font-medium select-none',
  'group-data-disabled:pointer-events-none group-data-disabled:opacity-50',
  'peer-disabled:cursor-not-allowed peer-disabled:opacity-50 peer-data-disabled:cursor-not-allowed peer-data-disabled:opacity-50',
])
