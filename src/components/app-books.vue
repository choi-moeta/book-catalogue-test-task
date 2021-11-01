<script setup lang="ts">
import { Book, BookData } from '../firebase'
import { useBooksStore } from '../store/books'

const props = withDefaults(defineProps<{
  groupBy?: 'year' | 'rating' | 'authors',
  sortBy?: 'year' | 'rating' | 'name' | 'ISBN',
  sortGroupsDescending?: boolean,
  sortBooksDescending?: boolean,
}>(), {
  groupBy: 'year',
  sortBy: 'name',
  // sortGroupsDescending?: boolean,
  // sortBooksDescending?: boolean,
})

const books = useBooksStore()

const groupedBooks = computed(() => {
  if (!books.isEmpty) {
    const groupBy = props.groupBy

    const groupedObj: Record<string, Book[]> = {}

    for (const book of books.all!) {
      let groupNames: string[] = []

      if (groupBy === 'authors') {
        groupNames = book[groupBy]
      }
      else {
        groupNames = [book[groupBy] === undefined ? 'None' : String(book[groupBy]!)]
      }

      groupNames.forEach((name) => {
        if (groupedObj[name]) {
          groupedObj[name] = [...groupedObj[name], book]
        }
        else {
          groupedObj[name] = [book]
        }
      })
    }

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
        books: books.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1),
      }))

    return groupedArr
  }

  return []
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
