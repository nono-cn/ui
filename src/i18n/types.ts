export interface Messages {
  close: string
}

export type MessageKey = keyof Messages

export type MessageParams = Record<string, string | number>
