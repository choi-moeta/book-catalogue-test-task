<script setup lang="ts">
import { Book, BookData } from '../firebase'
import { useBooksStore } from '../store/books'

const props = withDefaults(defineProps<{
  groupBy?: 'year' | 'rating' | 'authors'
}>(), {
  groupBy: 'year',
})

const books = useBooksStore()

const groupedBooks = computed(() => {
  if (books.isEmpty) {
    return []
  }

  const groupBy = props.groupBy

  const groupedObj = books.all!.reduce<Record<string, Book[]>>((booksAcc, book) => {
    const groupNames: string[] = groupBy === 'authors'
      ? book[groupBy]
      : book[groupBy] === undefined
        ? ['None']
        : [String(book[groupBy]!)]

    return groupNames.reduce<Record<string, Book[]>>((groupAcc, groupName) => {
      return groupAcc[groupName]
        ? { ...groupAcc, [groupName]: [...groupAcc[groupName], book] }
        : { ...groupAcc, [groupName]: [book] }
    }, booksAcc)
  }, {})

  // converting into { year, books }[]
  const groupedArr = Object.entries(groupedObj)
    .map(([groupName, books]) => ({ groupName, books }))
    // sort groups
    .sort((a, b) => {
      if (groupBy === 'rating' || groupBy === 'year') {
        if (a.groupName === 'None') {
          return 1
        }
        return Number(a.groupName) > Number(b.groupName) ? -1 : 1
      }
      return a.groupName.toLowerCase() > b.groupName.toLowerCase() ? -1 : 1
    })
    // sort books in groups
    .map(({ groupName, books }) => ({
      groupName,
      books: books.sort((a, b) => a.name.toLowerCase().trim() > b.name.toLowerCase().trim() ? 1 : -1),
    }))

  return groupedArr
})
</script>

<template>
  <template v-if="books.isLoading">
    <div>⌛ Fetching books</div>
  </template>
  <template v-else>
    <div class="flex flex-col gap-4">
      <template v-for="(group, groupIdx) of groupedBooks" :key="group.groupName">
        <details :open="groupIdx == 0" class="flex flex-col">
          <summary class="text-bright mx-4 tracking-wider">
            {{ group.groupName }}
          </summary>
          <div
            class="
              mt-2
              grid grid-cols-1 lg:grid-cols-2
              gap-4 items-stretch
            "
          >
            <template v-for="book of group.books" :key="book.id">
              <app-book :book="book"></app-book>
            </template>
          </div>
        </details>
      </template>
    </div>
  </template>
</template>
