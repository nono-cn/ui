<script setup lang="ts">
import { X } from 'lucide'
import { useTemplateRef, watch } from 'vue'
import DocsIcon from '@docs/components/DocsIcon.vue'

defineProps<{
  label: string
  side: 'left' | 'right'
}>()

const open = defineModel<boolean>('open', { required: true })
const dialog = useTemplateRef<HTMLDialogElement>('dialog')

watch(open, (value) => {
  if (value) dialog.value?.showModal()
  else dialog.value?.close()
})

function closeOnBackdrop(event: MouseEvent) {
  if (event.target === dialog.value) open.value = false
}
</script>

<template>
  <dialog
    ref="dialog"
    class="docs-drawer"
    :data-side="side"
    :aria-label="label"
    @close="open = false"
    @click="closeOnBackdrop"
  >
    <div class="docs-drawer-body">
      <button
        type="button"
        class="docs-drawer-close docs-icon-button"
        aria-label="Close"
        @click="open = false"
      >
        <DocsIcon :icon="X" />
      </button>
      <slot />
    </div>
  </dialog>
</template>
