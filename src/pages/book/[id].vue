<script setup lang="ts">
import { BookData } from '../../firebase'
import { useBooksStore } from '../../store/books'

const props = defineProps<{ id: string }>()

const books = useBooksStore()
const book = books.getOne(props.id)

function handleDelete() {
  if (book.value) {
    books.delete(book.value.id)
  }
}

const isEditing = ref(false)

function startEditing() {
  if (book.value) {
    isEditing.value = true
  }
}

function stopEditing() {
  if (book.value) {
    isEditing.value = false
  }
}

function saveEditing(newBook: BookData) {
  if (book.value) {
    books.edit(book.value.id, newBook)

    book.value = {
      ...book.value,
      ...newBook,
    }

    stopEditing()
  }
}
</script>

<template>
  <div class="max-w-screen-sm mx-auto mt-100px flex flex-col gap-4">
    <template v-if="book">
      <template v-if="isEditing">
        <app-title>📝 Editing book</app-title>
        <app-book-editable
          :book="book"
          @cancel="stopEditing"
          @save="saveEditing"
        />
      </template>
      <template v-else>
        <app-title>📖 Book</app-title>
        <app-book :book="book" />
        <div class="flex justify-end gap-4">
          <app-button type="secondary" @click="startEditing">
            Edit
          </app-button>
          <app-button type="danger" @click="handleDelete">
            Delete
          </app-button>
        </div>
      </template>
    </template>
    <template v-else>
      no book
    </template>
  </div>
</template>
