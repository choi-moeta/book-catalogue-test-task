<script setup lang="ts">
const groupBy = ref<'year' | 'rating' | 'authors'>('year')
</script>

<template>
  <div
    class="
      mx-auto
      px-4 pb-8 md:(px-8)
      md:mt-100px
      max-w-screen-xl
      grid gap-8 grid-cols-1
      md:(grid-cols-[1fr,minmax(240px,320px)])
    "
  >
    <aside class="self-stretch md:order-2">
      <div class="flex flex-col gap-12 sticky top-0 pt-4">
        <div class="flex flex-col gap-4">
          <app-title :level="2">
            ⭐ Recommendation
          </app-title>
          <app-recommendation />
        </div>
        <div class="flex flex-col gap-4">
          <app-title :level="2">
            🔧 Filters
          </app-title>
          <app-filters v-model:group-by="groupBy" />
        </div>
        <app-footer class="<md:hidden" />
      </div>
    </aside>
    <main class="flex flex-col">
      <div class="flex justify-between sticky top-0 bg-white dark:bg-hex-111 pt-4 pb-4">
        <app-title>📚 Books</app-title>
        <app-button
          tag="router-link"
          to="/book/new"
          class="flex items-center gap-2"
          type="secondary"
        >
          New book
        </app-button>
      </div>
      <app-books
        :group-by="groupBy"
        class="w-full md:order-1"
      />
    </main>
    <app-footer class="md:hidden" />
  </div>
</template>
