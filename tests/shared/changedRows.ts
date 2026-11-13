import { commands } from 'vitest/browser'

export interface ShowcaseBox {
  title: string
  top: number
  bottom: number
  left: number
  right: number
  parts: ShowcaseBox[]
}

const TOLERANCE = 8
const NOISE_PIXELS = 32
const MAX_SHIFT_X = 64

async function loadPixels(path: string) {
  const image = new Image()
  image.src = `data:image/png;base64,${await commands.readImageBase64(path)}`
  await image.decode()

  const canvas = document.createElement('canvas')
  canvas.width = image.width
  canvas.height = image.height
  const context = canvas.getContext('2d')!
  context.drawImage(image, 0, 0)

  return context.getImageData(0, 0, image.width, image.height)
}

function differsAt(
  reference: ImageData,
  actual: ImageData,
  box: ShowcaseBox,
  dx: number,
  dy: number,
) {
  const right = Math.min(box.right, actual.width)
  const bottom = Math.min(box.bottom, actual.height)

  if (box.left - dx < 0 || box.top - dy < 0) return true
  if (right - dx > reference.width || bottom - dy > reference.height) return true

  let differing = 0
  for (let y = box.top; y < bottom; y++) {
    for (let x = box.left; x < right; x++) {
      const a = ((y - dy) * reference.width + (x - dx)) * 4
      const b = (y * actual.width + x) * 4
      for (let channel = 0; channel < 4; channel++) {
        if (Math.abs(reference.data[a + channel]! - actual.data[b + channel]!) > TOLERANCE) {
          if (++differing > NOISE_PIXELS) return true
          break
        }
      }
    }
  }

  return false
}

function contains(outer: ShowcaseBox, inner: ShowcaseBox) {
  return (
    inner.left >= outer.left &&
    inner.right <= outer.right &&
    inner.top >= outer.top &&
    inner.bottom <= outer.bottom
  )
}

function range(to: number) {
  return Array.from({ length: Math.abs(to) + 1 }, (_, i) => i * Math.sign(to || 1))
}

function around(max: number) {
  return [0, ...Array.from({ length: max }, (_, i) => [-(i + 1), i + 1]).flat()]
}

function boxDiffers(
  reference: ImageData,
  actual: ImageData,
  box: ShowcaseBox,
  shiftsX: number[],
  shiftsY: number[],
) {
  return !shiftsY.some((dy) => shiftsX.some((dx) => !differsAt(reference, actual, box, dx, dy)))
}

function screenshotPath(message: string, label: string) {
  return message.match(new RegExp(`${label} screenshot:\\s*(.+?\\.png)`))?.[1]
}

export async function describeChanges(error: unknown, rows: ShowcaseBox[]) {
  if (!(error instanceof Error)) return

  // eslint-disable-next-line no-control-regex
  const message = error.message.replace(/\x1b\[[0-9;]*m/g, '')
  const referencePath = screenshotPath(message, 'Reference')
  const actualPath = screenshotPath(message, 'Actual')
  if (!referencePath || !actualPath) return

  try {
    const [reference, actual] = await Promise.all([
      loadPixels(referencePath),
      loadPixels(actualPath),
    ])
    const shiftsY = range(actual.height - reference.height)
    const shiftsX = around(MAX_SHIFT_X)

    const changed = rows
      .filter((row) => boxDiffers(reference, actual, row, [0], shiftsY))
      .map((row) => {
        const differing = row.parts.filter((part) =>
          boxDiffers(reference, actual, part, shiftsX, shiftsY),
        )
        const parts = differing.filter(
          (part) => !differing.some((inner) => inner !== part && contains(part, inner)),
        )
        return parts.length ? `${row.title} > ${parts.map((p) => p.title).join(', ')}` : row.title
      })
    if (!changed.length) return

    const lines = ['Changed:', ...changed.map((title) => `  ${title}`)]
    if (reference.height !== actual.height) {
      lines.push(`The page height changed (${reference.height}px → ${actual.height}px).`)
    }
    error.message = `${lines.join('\n')}\n\n${error.message}`
  } catch (reason) {
    const detail = reason instanceof Error ? reason.message : String(reason)
    error.message = `Could not compare the screenshots (${detail}). If you are in watch mode, restart it.\n\n${error.message}`
  }
}
