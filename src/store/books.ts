import { acceptHMRUpdate, defineStore } from 'pinia'
import { usePromise } from 'vue-promised'
import {
  Book,
  BookData,
  fetchBooks,
  fetchBook,
  createBook,
  deleteBook,
  editBook,
} from '../firebase'

export const useBooksStore = defineStore('books', () => {
  // getters
  const books = ref<Book[]>()

  const isEmpty = computed(() => !books.value || books.value.length === 0)

  // methods
  async function fetch() {
    books.value = await fetchBooks()
  }

  function getOne(id: string) {
    const book = books.value?.find(b => b.id === id)

    if (!book) {
      const { data: book } = usePromise(fetchBook(id))
      return book
    }

    return ref(book)
  }

  async function create(book: BookData) {
    return createBook(book)
  }

  async function edit(id: string, book: BookData) {
    return editBook(id, book)
  }

  function del(id: string) {
    deleteBook(id)
  }

  // initialization
  fetch()

  return {
    all: books,
    isEmpty,
    getOne,
    create,
    edit,
    delete: del,
  }
})

if (import.meta.hot) { import.meta.hot.accept(acceptHMRUpdate(useBooksStore, import.meta.hot)) }
