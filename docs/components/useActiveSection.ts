import { onBeforeUnmount, onMounted, ref, watch, type Ref } from 'vue'

export function useActiveSection(ids: Ref<string[]>) {
  const active = ref<string>()
  let frame = 0

  function update() {
    frame = 0
    const root = document.documentElement
    const threshold = root.clientHeight * 0.3

    if (root.scrollTop + root.clientHeight >= root.scrollHeight - 2) {
      active.value = ids.value.at(-1)
      return
    }

    active.value =
      ids.value
        .filter((id) => {
          const element = document.getElementById(id)
          return element && element.getBoundingClientRect().top <= threshold
        })
        .at(-1) ?? ids.value[0]
  }

  function schedule() {
    if (!frame) frame = requestAnimationFrame(update)
  }

  onMounted(() => {
    update()
    addEventListener('scroll', schedule, { passive: true })
    addEventListener('resize', schedule)
  })
  watch(ids, schedule, { flush: 'post' })
  onBeforeUnmount(() => {
    cancelAnimationFrame(frame)
    removeEventListener('scroll', schedule)
    removeEventListener('resize', schedule)
  })

  return active
}
