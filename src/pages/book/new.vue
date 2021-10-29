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

async function handleCreate() {
  const { id } = await books.create(book.value)
  router.push(`/book/${id}`)
}
</script>

<template>
  <div class="max-w-screen-sm mx-auto mt-100px flex flex-col gap-4">
    <app-title>📕 New book</app-title>
    <app-book-editable
      :book="book"
      hide-cancel
      save-text="Create"
      @save="handleCreate"
    />
  </div>
</template>
