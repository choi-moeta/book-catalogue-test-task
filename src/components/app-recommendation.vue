<script setup lang="ts">
import { useBooksStore } from '../store/books'

const books = useBooksStore()

const recommendedBook = computed(() => {
  if (!books.isEmpty) {
    // sort books by rating
    const booksByRating = books.all!
      .filter(b => b.year < new Date().getFullYear() - 3)
      .sort((b1, b2) => (b2.rating ?? -1) - (b1.rating ?? -1))

    if (booksByRating.length === 0) {
      return null
    }

    // first book is book with highest rating
    const bestRating = booksByRating[0].rating
    // searching if there more books of highest rating
    const bestBooks = booksByRating.filter(b => b.rating === bestRating)

    // return random of best books
    const randomIndex = Math.floor(Math.random() * bestBooks.length)
    return bestBooks[randomIndex]
  }
  return null
})
</script>

<template>
  <template v-if="books.isLoading">
    <app-block>⌛ Thinking</app-block>
  </template>
  <template v-else-if="recommendedBook">
    <app-book :book="recommendedBook" />
  </template>
  <template v-else>
    <app-block>Nothing relevant found.</app-block>
  </template>
</template>
