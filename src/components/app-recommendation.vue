<script setup lang="ts">
import { useBooksStore } from '../store/books'

const books = useBooksStore()

const recommendedBook = computed(() => {
  if (!books.isEmpty) {
    const booksByRating = books.all!
      .filter(b => b.year < new Date().getFullYear() - 3)
      .sort((b1, b2) => (b2.rating ?? -1) - (b1.rating ?? -1))

    const bestRating = booksByRating[0].rating
    const bestBooks = booksByRating.filter(b => b.rating === bestRating)

    const randomIndex = Math.floor(Math.random() * bestBooks.length)
    return bestBooks[randomIndex]
  }
  return null
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <app-title>⭐ Recommendation</app-title>
    <template v-if="recommendedBook">
      <app-book :book="recommendedBook" />
    </template>
    <template v-else>
      <app-block>Nothing relevant found.</app-block>
    </template>
  </div>
</template>
