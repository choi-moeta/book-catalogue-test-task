<script setup lang="ts">
import { useRouter } from 'vue-router'
import { BookData } from '../../firebase'
import { useBooksStore } from '../../store/books'

const props = defineProps<{ id: string }>()

const books = useBooksStore()
const { book, isLoading } = toRefs(books.getOne(props.id))
const router = useRouter()

async function handleDelete() {
  if (book.value) {
    await books.delete(book.value.id)
    router.push('/')
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
  <book-page-wrap>
    <template v-if="isLoading">
      <app-title>📖 Book</app-title>
      <div>⌛ Loading</div>
    </template>
    <template v-else-if="book">
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
  </book-page-wrap>
</template>
