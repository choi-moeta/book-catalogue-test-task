<script setup lang="ts">
import { Book, BookData } from '../firebase'
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
  (event: 'change', book: BookData): void
  (event: 'error', error?: Error): void
  (event: 'save', book: BookData): void
  (event: 'cancel'): void
}>()

type FormBookData = {
  name: string
  authors: string[]
  year: number
  rating?: number | ''
  ISBN?: string
}

// copy book
const innerBook = reactive<FormBookData>({
  rating: undefined,
  ISBN: undefined,
  ...unref(props.book),
})

const errors = reactive<Record<string, string | null>>({
  name: null,
  authors: null,
  rating: null,
  year: null,
  ISBN: null,
})

const isError = computed(() => Boolean(Object.values(errors).find(e => typeof e === 'string')))

// validate form
onMounted(handleChange)

function handleChange() {
  // reset
  Object.keys(errors).map(key => errors[key] = null)

  if (innerBook.name === '') {
    errors.name = 'Name shouldn\'t be empty.'
  }
  if (innerBook.authors.length === 0) {
    errors.authors = 'Book should have at least one author.'
  }
  if (innerBook.authors.find(a => a === '')) {
    errors.authors = 'Author shouldn\'t be empty.'
  }
  if (innerBook.rating
    && (innerBook.rating > BOOK_RATING_MAX
    || innerBook.rating < BOOK_RATING_MIN)) {
    errors.rating = 'Rating must be between 0 and 10'
  }
  if (innerBook.year
    && (innerBook.year > BOOK_YEAR_MAX
    || innerBook.year < BOOK_YEAR_MIN)) {
    errors.year = 'Year must be between 0 and 3000'
  }
  if (innerBook.ISBN && !validateISBN(innerBook.ISBN)) {
    errors.ISBN = 'Invalid ISBN'
  }

  if (innerBook.rating === '' || innerBook.rating === undefined) {
    delete innerBook.rating
  }
  if (innerBook.ISBN === '' || innerBook.ISBN === undefined) {
    delete innerBook.ISBN
  }

  if (isError.value) {
    return emit('error')
  }
  return emit('change', { ...innerBook } as BookData)
}

function validateISBN(str: string) {
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

function handleAuthorChange(i: number, e: Event) {
  innerBook.authors[i] = (e.target as HTMLInputElement).value
  handleChange()
}

function deleteAuthor(i: number) {
  // filter out by index
  innerBook.authors = innerBook.authors.filter((_, _i) => i !== _i)
}

function addEmptyAuthor() {
  innerBook.authors.push('')
}

function handleCancel() {
  emit('cancel')
}

function handleSave() {
  emit('save', innerBook as BookData)
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
            <app-button :icon="true" type="transparent" @click="deleteAuthor(i)">
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
