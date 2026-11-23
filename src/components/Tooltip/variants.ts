import { cva } from 'class-variance-authority'

export const tooltipContentVariants = cva([
  'z-50 m-0 flex max-w-(--available-width) items-center gap-1.5 overflow-visible rounded-(--tooltip-radius)',
  'border bg-popover px-2 py-1 text-xs text-balance text-popover-foreground shadow-md outline-none',
  'origin-(--transform-origin) transition-[opacity,scale] duration-150 motion-reduce:transition-opacity',
  'data-starting-style:scale-95 data-starting-style:opacity-0',
  'data-ending-style:scale-95 data-ending-style:opacity-0',
  'data-instant:transition-none',
])

export const tooltipArrowVariants = cva([
  'pointer-events-none size-2.5 rotate-45 border border-transparent bg-popover',
  'data-[side=bottom]:-top-[5px] data-[side=bottom]:border-t-border data-[side=bottom]:border-l-border',
  'data-[side=top]:-bottom-[5px] data-[side=top]:border-r-border data-[side=top]:border-b-border',
  'data-[side=right]:-left-[5px] data-[side=right]:border-b-border data-[side=right]:border-l-border',
  'data-[side=left]:-right-[5px] data-[side=left]:border-t-border data-[side=left]:border-r-border',
])
