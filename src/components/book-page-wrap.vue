<script setup lang="ts">
</script>

<template>
  <div class="max-w-screen-sm mx-auto flex flex-col gap-12">
    <header class="py-4">
      <app-button
        tag="router-link"
        to="/"
        type="transparent"
        size="md"
        class="hover:no-underline group px-2"
      >
        ⬅️ All books
      </app-button>
    </header>
    <div class="flex flex-col gap-4">
      <slot />
    </div>
  </div>
</template>
