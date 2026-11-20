import type { FileLike } from '@ui-sdk/core/file-input'
import { formatFileSize } from '@ui-sdk/core/file-input'
import type { IconName } from '@/icons'

export type { FileLike }

const archives = /\.(zip|rar|7z|tar|gz|tgz|bz2|xz)$/i
const spreadsheets = /\.(csv|tsv|xls|xlsx|xlsm|ods|numbers)$/i
const documents = /\.(pdf|txt|md|rtf|doc|docx|odt|pages|json|xml|html?)$/i

export function getFileExtension(name: string): string {
  const dot = name.lastIndexOf('.')
  return dot > 0 ? name.slice(dot + 1).toLowerCase() : ''
}

export function getFileIcon(file: Pick<FileLike, 'name' | 'type'>): IconName {
  const type = file.type.toLowerCase()
  if (type.startsWith('image/')) return 'image'
  if (type.startsWith('video/')) return 'video'
  if (type.startsWith('audio/')) return 'audio'
  if (archives.test(file.name) || /zip|compressed|x-tar|x-7z|x-rar/.test(type)) {
    return 'fileArchive'
  }
  if (spreadsheets.test(file.name) || /spreadsheet|ms-excel|text\/csv/.test(type)) {
    return 'fileSpreadsheet'
  }
  if (documents.test(file.name) || type.startsWith('text/') || /pdf|document|msword/.test(type)) {
    return 'fileText'
  }
  return 'file'
}

export function getFileDescription(file: FileLike, locale?: string): string {
  const extension = getFileExtension(file.name).toUpperCase()
  const size = formatFileSize(file.size, locale)
  return extension ? `${extension} · ${size}` : size
}

export function isImageFile(file: Pick<FileLike, 'type'>): boolean {
  return file.type.toLowerCase().startsWith('image/')
}
