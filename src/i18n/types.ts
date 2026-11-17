export interface Messages {
  close: string
  clear: string
}

export type MessageKey = keyof Messages

export type MessageParams = Record<string, string | number>
