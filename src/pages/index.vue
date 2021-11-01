<script setup lang="ts">
</script>

<template>
  <div
    class="
      mx-auto
      px-4 pb-8 md:(px-8)
      md:mt-100px
      max-w-screen-xl
      grid gap-4 grid-cols-1
      md:(gap-8 grid-cols-[1fr,minmax(240px,320px)])
    "
  >
    <aside class="self-stretch md:order-2">
      <div class="flex flex-col gap-4 sticky top-0 pt-4">
        <app-title>⭐ Recommendation</app-title>
        <app-recommendation />
        <div class="flex justify-center">
          <a class="text-lg text-dim hover:text-purple-500" href="https://github.com/choi-moeta/book-catalogue-test-task" title="source code"><icon-carbon:logo-github /></a>
        </div>
      </div>
    </aside>
    <main class="flex flex-col">
      <div class="flex justify-between sticky top-0 bg-white dark:bg-hex-111 pt-4 pb-4">
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
