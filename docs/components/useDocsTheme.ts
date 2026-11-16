import { ref, watch } from 'vue'

export const neutralColors = ['neutral', 'slate', 'gray', 'zinc', 'stone'] as const

export type NeutralColor = (typeof neutralColors)[number]

function read(key: string) {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function write(key: string, value: string) {
  try {
    localStorage.setItem(key, value)
  } catch {
    return
  }
}

const savedDark = read('nono-ui-dark')

export const dark = ref(
  savedDark ? savedDark === 'true' : matchMedia('(prefers-color-scheme: dark)').matches,
)

export const neutral = ref<NeutralColor>(
  neutralColors.find((color) => color === read('nono-ui-neutral')) ?? 'neutral',
)

watch(
  dark,
  (value) => {
    document.documentElement.dataset.colorScheme = value ? 'dark' : 'light'
    write('nono-ui-dark', String(value))
  },
  { immediate: true },
)

watch(
  neutral,
  (value) => {
    if (value === 'neutral') delete document.documentElement.dataset.neutral
    else document.documentElement.dataset.neutral = value
    write('nono-ui-neutral', value)
  },
  { immediate: true },
)
