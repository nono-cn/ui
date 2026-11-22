<script setup lang="ts">
import { Button, Link } from '@nono/ui'
import { dark } from '@docs/components/useDocsTheme'
</script>

<template>
  <a href="https://example.com" target="_blank">asdadas</a>

  <main class="mx-auto flex max-w-3xl flex-col gap-8 p-8 text-foreground">
    <header class="flex items-center justify-between">
      <h1 class="text-2xl font-semibold">Playground</h1>
      <Button variant="outline" size="sm" :label="dark ? 'Light' : 'Dark'" @click="dark = !dark" />
    </header>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Link</h2>

      <div class="flex gap-2">
        <Link
          trailing-icon="user"
          href="https://nono-ui.com"
          target="_blank"
          variant="outline"
          size="icon-xl"
        />
        <Link
          trailing-icon="user"
          to="https://www.youtube.com/watch?v=WsWXequbzQ8&list=RDFHDw3Lg7X3o&index=6"
          target="_blank"
          variant="subtle"
          size="icon-xl"
        />
      </div>
    </section>
  </main>
</template>
