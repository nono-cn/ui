import { cva } from 'class-variance-authority'

export const popoverContentVariants = cva([
  'z-50 m-0 flex w-72 max-w-(--available-width) flex-col gap-1.5 overflow-visible rounded-(--popover-radius)',
  'border bg-popover p-4 text-sm text-popover-foreground shadow-md outline-none',
  'origin-(--transform-origin) transition-[opacity,scale] duration-150 motion-reduce:transition-opacity',
  'data-starting-style:scale-95 data-starting-style:opacity-0',
  'data-ending-style:scale-95 data-ending-style:opacity-0',
])

export const popoverLabelVariants = cva('m-0 text-sm leading-none font-medium')

export const popoverDescriptionVariants = cva('m-0 text-sm text-muted-foreground')

export const popoverArrowVariants = cva([
  'pointer-events-none size-2.5 rotate-45 border border-transparent bg-popover',
  'data-[side=bottom]:-top-[5px] data-[side=bottom]:border-t-border data-[side=bottom]:border-l-border',
  'data-[side=top]:-bottom-[5px] data-[side=top]:border-r-border data-[side=top]:border-b-border',
  'data-[side=right]:-left-[5px] data-[side=right]:border-b-border data-[side=right]:border-l-border',
  'data-[side=left]:-right-[5px] data-[side=left]:border-t-border data-[side=left]:border-r-border',
])
