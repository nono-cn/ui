<script setup lang="ts">
import { Preferences } from '@ui-sdk/vue/preferences'
import { provideAppDefaults } from '@/components/App/context'
import type { AppProps, AppSlots } from '@/components/App/types'

const props = withDefaults(defineProps<AppProps>(), {
  preferences: () => [],
  defaults: undefined,
  nonce: undefined,
})

defineSlots<AppSlots>()

provideAppDefaults(() => props.defaults)
</script>

<template>
  <Preferences data-ui="app-root" :preferences="preferences" :nonce="nonce">
    <slot />
  </Preferences>
</template>
