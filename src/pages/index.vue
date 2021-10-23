<script setup lang="ts">
</script>

<template>
  <div
    class="mx-auto flex flex-row-reverse gap-8 justify-center items-start"
  >
    <aside class="self-stretch">
      <div class="flex flex-col gap-8 mt-100px sticky top-8">
        <app-recomendation />
        <app-profile />
      </div>
    </aside>
    <app-books class="mt-100px max-w-screen-lg w-full" />
  </div>
</template>
