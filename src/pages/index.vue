<script setup lang="ts">
</script>

<template>
  <div
    class="
      mx-auto px-8 pb-8
      max-w-screen-xl
      grid gap-8
      grid-cols-1 md:grid-cols-[1fr,minmax(240px,320px)]
    "
  >
    <aside class="self-stretch md:order-2">
      <div class="flex flex-col gap-4 md:mt-100px sticky top-4">
        <app-title>⭐ Recommendation</app-title>
        <app-recommendation />
      </div>
    </aside>
    <main class="flex flex-col md:mt-80px">
      <div class="flex justify-between sticky top-0 bg-white dark:bg-hex-111 pt-4 pb-2">
        <app-title>📚 books</app-title>
        <app-button
          tag="router-link"
          to="/book/new"
          class="flex items-center gap-2"
          type="secondary"
        >
          New book
        </app-button>
      </div>
      <app-books class="w-full md:order-1" />
    </main>
  </div>
</template>
