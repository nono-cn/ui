export interface Messages {
  close: string
  clear: string
  ratingValue: string
  showPassword: string
}

export type MessageKey = keyof Messages

export type MessageParams = Record<string, string | number>
