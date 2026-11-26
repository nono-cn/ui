<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { useDates } from '@/composables/useDates'
import { useUi } from '@/composables/useUi'
import { timeUiExclude } from '@/components/Time/exclude'
import type { TimeProps, TimeSlots } from '@/components/Time/types'

defineOptions({ inheritAttrs: false })

const props = defineProps<TimeProps>()

defineSlots<TimeSlots>()
const attrs = useAttrs()
const { toDate, format } = useDates()

const formatted = computed(() => format(props.datetime, props.options))

const rootProps = computed(() =>
  useUi({
    base: [{ datetime: toDate(props.datetime)?.toISOString() }, attrs],
    ui: props.ui?.root?.(),
    exclude: timeUiExclude.root,
  }),
)
</script>

<template>
  <time data-ui="time-root" v-bind="rootProps">
    <slot :formatted="formatted">{{ formatted }}</slot>
  </time>
</template>
