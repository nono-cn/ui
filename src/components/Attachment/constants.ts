export const attachmentStates = ['idle', 'uploading', 'processing', 'error', 'done'] as const

export const attachmentSizes = ['sm', 'md', 'lg'] as const

export const attachmentOrientations = ['horizontal', 'vertical'] as const

export const attachmentDefaults = {
  state: 'done',
  size: 'md',
  orientation: 'horizontal',
  radius: 'lg',
  removable: false,
} as const
