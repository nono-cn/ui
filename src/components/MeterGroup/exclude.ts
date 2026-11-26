import { Meter, MeterLabel, MeterTrack } from '@ui-sdk/vue/meter'
import { propsOf } from '@/composables/useUi'
import type { MeterGroupUi } from '@/components/MeterGroup/types'
import Icon from '@/components/Icon/Icon.vue'

export const meterGroupUiExclude = {
  root: [],
  meter: propsOf(Meter),
  label: propsOf(MeterLabel),
  value: [],
  track: propsOf(MeterTrack),
  segment: [],
  legend: [],
  item: [],
  itemIcon: propsOf(Icon),
  itemDot: [],
  itemLabel: [],
  itemValue: [],
} satisfies Record<keyof MeterGroupUi, readonly string[]>
