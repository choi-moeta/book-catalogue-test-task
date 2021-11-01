<script setup lang="ts">
import { BookData } from '../firebase'
import {
  BOOK_YEAR_MAX,
  BOOK_YEAR_MIN,
  BOOK_RATING_MAX,
  BOOK_RATING_MIN,
} from '../utils/constants'

const props = withDefaults(defineProps<{
  book: BookData
  hideCancel?: boolean
  saveText: string
}>(), {
  hideCancel: false,
  saveText: 'Save',
})

const emit = defineEmits<{
  (event: 'save', book: BookData): void
  (event: 'cancel'): void
}>()

// validate on mount
onMounted(handleChange)

type FormBookData = {
  name: string
  authors: string[]
  year: number
  // rating can be empty string (empty input)
  rating?: number | ''
  ISBN?: string
}

// copy book
const innerBook = reactive<FormBookData>({
  rating: undefined,
  ISBN: undefined,
  ...unref(props.book),
})

function handleCancel() {
  emit('cancel')
}

function handleSave() {
  emit('save', normalizeBook(innerBook))
}

function normalizeBook(book: FormBookData) {
  const bookCopy = { ...book }
  // delete rating, isbn, because firebase can't add docs with fields that are explicitly undefined
  if (bookCopy.rating === '' || bookCopy.rating === undefined) {
    delete bookCopy.rating
  }
  if (bookCopy.ISBN === '' || bookCopy.ISBN === undefined) {
    delete bookCopy.ISBN
  }

  return bookCopy as BookData
}

function handleAuthorChange(i: number, e: Event) {
  innerBook.authors[i] = (e.target as HTMLInputElement).value
  handleChange()
}

function handleAuthorDelete(idx: number) {
  // filter out by index
  innerBook.authors = innerBook.authors.filter((_, aIdx) => idx !== aIdx)
}

function addEmptyAuthor() {
  innerBook.authors.push('')
}

type Errors = Record<string, string | null>

const errors = reactive<Errors>({})
const isError = computed(() => Boolean(Object.values(errors).find(e => typeof e === 'string')))

function handleChange() {
  validateBook(innerBook, errors)
}

function validateBook(book: FormBookData, errors: Errors) {
  // reset
  Object.keys(errors).map(key => errors[key] = null)

  if (book.name === '') {
    errors.name = 'Name shouldn\'t be empty.'
  }
  if (book.authors.length === 0) {
    errors.authors = 'Book should have at least one author.'
  }
  if (book.authors.find(a => a === '') !== undefined) {
    errors.authors = 'Author shouldn\'t be empty.'
  }
  if (book.rating
    && (book.rating > BOOK_RATING_MAX
    || book.rating < BOOK_RATING_MIN)) {
    errors.rating = 'Rating must be between 0 and 10'
  }
  if (book.year
    && (book.year > BOOK_YEAR_MAX
    || book.year < BOOK_YEAR_MIN)) {
    errors.year = 'Year must be between 0 and 3000'
  }
  if (book.ISBN && !isValidISBN(book.ISBN)) {
    errors.ISBN = 'Invalid ISBN'
  }
}

function isValidISBN(str: string) {
  const digits = str
    .split('-')
    .join('')
    .split('')
    .map(Number)

  if (digits.length === 11) {
    return digits.reduce((acc, cur, idx, arr) => acc + (arr.length - idx) * cur, 0) % 11 === 0
  }
  else if (digits.length === 13) {
    return digits.reduce((acc, cur, idx) => acc + (idx % 2 === 0 ? 1 : 3) * cur, 0) % 10 === 0
  }

  return false
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <app-block class="flex flex-col gap-2 group">
      <app-book-editable-entry
        name="name"
        :error="errors.name"
      >
        <input
          v-model="innerBook.name"
          :class="{ 'border-red-500': errors.name }"
          @change="handleChange"
        >
      </app-book-editable-entry>
      <app-book-editable-entry
        name="authors"
        :error="errors.authors"
      >
        <template v-for="(author, i) of innerBook.authors" :key="author">
          <div class="flex gap-2">
            <input
              :class="{ 'border-red-500': errors.authors }"
              :value="author"
              @change="handleAuthorChange(i, $event)"
            >
            <app-button :icon="true" type="transparent" @click="handleAuthorDelete(i)">
              <icon-carbon:close />
            </app-button>
          </div>
        </template>
        <app-button :icon="true" type="secondary" @click="addEmptyAuthor">
          <icon-carbon:add />
        </app-button>
      </app-book-editable-entry>
      <app-book-editable-entry
        name="year"
        :error="errors.year"
      >
        <input
          v-model="innerBook.year"
          type="number"
          :min="BOOK_YEAR_MIN"
          :max="BOOK_YEAR_MAX"
          :class="{ 'border-red-500': errors.year }"
          @change="handleChange"
        >
      </app-book-editable-entry>
      <app-book-editable-entry
        name="rating"
        :error="errors.rating"
      >
        <input
          v-model="innerBook.rating"
          type="number"
          :min="BOOK_RATING_MIN"
          :max="BOOK_RATING_MAX"
          :class="{ 'border-red-500': errors.rating }"
          @change="handleChange"
        >
      </app-book-editable-entry>
      <app-book-editable-entry
        name="ISBN"
        :error="errors.ISBN"
      >
        <input
          v-model="innerBook.ISBN"
          :class="{ 'border-red-500': errors.ISBN }"
          @change="handleChange"
        >
      </app-book-editable-entry>
    </app-block>
    <div class="flex justify-end gap-4">
      <template v-if="!hideCancel">
        <app-button type="secondary" @click="handleCancel">
          Cancel
        </app-button>
      </template>
      <app-button
        type="primary"
        :disabled="isError"
        @click="handleSave"
      >
        Save
      </app-button>
    </div>
  </div>
</template>
