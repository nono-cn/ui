export interface Messages {
  close: string
  clear: string
  ratingValue: string
}

export type MessageKey = keyof Messages

export type MessageParams = Record<string, string | number>
