export interface Messages {
  close: string
  clear: string
  removeFile: string
  openFile: string
}

export type MessageKey = keyof Messages

export type MessageParams = Record<string, string | number>
