import { getFirestore, collection, doc, getDocs, query, setDoc, CollectionReference } from 'firebase/firestore/lite'
import { usePromise } from 'vue-promised'
import { app } from './app'
import { BookData } from './types'

export const db = getFirestore(app)

export async function fetchBooks() {
  const q = query<BookData>(collection(db, 'books') as CollectionReference<BookData>)
  const snapshot = await getDocs(q)
  const books = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }))
  return books
}

export function useBooks() {
  const { data: books } = usePromise(fetchBooks())
  return books
}

export async function createBook(book: BookData) {
  const booksRef = collection(db, 'books')
  return setDoc(doc(booksRef), book)
}
