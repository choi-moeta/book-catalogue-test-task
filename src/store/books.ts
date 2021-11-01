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

  const isLoading = ref(true)

  // methods
  async function fetch() {
    books.value = await fetchBooks()
    isLoading.value = false
  }

  function getOne(id: string) {
    const existingBook = computed(() => books.value?.find(b => b.id === id))

    if (existingBook) {
      return reactive({ book: existingBook, isLoading: false })
    }

    const book = ref<Book | null>()
    const isLoading = ref(true)

    // done this way so i can push book into books
    fetchBook(id).then((fetchedBook) => {
      book.value = fetchedBook
      isLoading.value = false

      if (fetchedBook) {
        books.value?.push(fetchedBook)
      }
    })

    return reactive({ book, isLoading })
  }

  async function create(book: BookData) {
    const bookRef = await createBook(book)

    // update locally and refetch
    books.value?.push({
      id: bookRef.id,
      ...book,
    })
    fetch()

    return bookRef
  }

  async function edit(id: string, book: BookData) {
    const bookRef = await editBook(id, book)

    // changing this way so the reactivity works
    const idx = books.value?.reduce<number | undefined>((acc, cur, idx) => cur.id === id ? idx : acc, undefined)
    if (books.value && idx !== undefined) {
      books.value[idx] = { id, ...book }
    }
    fetch()

    return bookRef
  }

  async function del(id: string) {
    const bookRef = await deleteBook(id)

    books.value = books.value?.filter(b => b.id !== id)
    fetch()

    return bookRef
  }

  // initialization
  fetch()

  return {
    all: books,
    isEmpty,
    isLoading,
    getOne,
    create,
    edit,
    delete: del,
  }
})

if (import.meta.hot) { import.meta.hot.accept(acceptHMRUpdate(useBooksStore, import.meta.hot)) }
