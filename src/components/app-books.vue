<script setup lang="ts">
import { useBooks } from '../firebase'

const books = useBooks()
</script>

<template>
  <div class="flex flex-col gap-4">
    <app-title>📖 books</app-title>
    <div class="grid gap-4 grid-cols-2 items-stretch">
      <template v-for="book of books" :key="book.id">
        <app-book :book="book"></app-book>
      </template>
    </div>
  </div>
</template>
