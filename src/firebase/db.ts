import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  CollectionReference,
} from 'firebase/firestore/lite'
import { app } from './app'
import { BookData } from './types'

export const db = getFirestore(app)

export const booksRef = collection(db, 'books') as CollectionReference<BookData>

export async function fetchBooks() {
  const snap = await getDocs(booksRef)
  const books = snap.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }))
  return books
}

export async function fetchBook(id: string) {
  const snap = await getDoc(doc(booksRef, id))
  if (snap.exists()) {
    return {
      id: snap.id,
      ...snap.data(),
    }
  }
  return null
}

export async function createBook(book: BookData) {
  const bookDoc = doc(booksRef)
  await setDoc(doc(booksRef), book)
  return bookDoc
}

export async function editBook(id: string, book: BookData) {
  const bookDoc = doc(booksRef, id)
  await setDoc(bookDoc, book)
  return bookDoc
}

export async function deleteBook(id: string) {
  const bookDoc = doc(booksRef, id)
  await deleteDoc(bookDoc)
  return bookDoc
}
