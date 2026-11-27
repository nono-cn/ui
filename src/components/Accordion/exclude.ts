import {
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Accordion as AccordionRoot,
  AccordionTrigger,
} from '@ui-sdk/vue/accordion'
import { propsOf } from '@/composables/useUi'
import type { AccordionUi } from '@/components/Accordion/types'
import Icon from '@/components/Icon/Icon.vue'

export const accordionUiExclude = {
  root: propsOf(AccordionRoot),
  item: propsOf(AccordionItem),
  header: propsOf(AccordionHeader),
  trigger: propsOf(AccordionTrigger),
  leadingIcon: propsOf(Icon),
  label: [],
  trailingIcon: propsOf(Icon),
  indicatorIcon: propsOf(Icon),
  panel: propsOf(AccordionPanel),
  body: [],
} satisfies Record<keyof AccordionUi, readonly string[]>
