<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Book, BookData } from '../../firebase'
import { useBooksStore } from '../../store/books'

const book = ref<Book | BookData>({
  name: '',
  authors: [],
  year: new Date().getFullYear(),
})

const books = useBooksStore()
const router = useRouter()

async function handleCreate(newBook: BookData) {
  const { id } = await books.create(newBook)
  router.push(`/book/${id}`)
}
</script>

<template>
  <book-page-wrap>
    <app-title>📕 New book</app-title>
    <app-book-editable
      :book="book"
      hide-cancel
      save-text="Create"
      @save="handleCreate"
    />
  </book-page-wrap>
</template>
