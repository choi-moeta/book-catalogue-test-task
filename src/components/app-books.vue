<script setup lang="ts">
import { Book } from '../firebase'
import { useBooksStore } from '../store/books'

const books = useBooksStore()

const groupedBooks = computed(() => {
  if (!books.isEmpty) {
    // creating object { "year": books[] }
    const groupedObj = books.all!
      .reduce<Record<number, Book[]>>(
        (acc, cur) => acc[cur.year]
          ? { ...acc, [cur.year]: [...acc[cur.year], cur] }
          : { ...acc, [cur.year]: [cur] },
        {},
      )

    // converting into { year, books }[]
    return Object.entries(groupedObj)
      .map(([year, books]) => ({ year: Number(year), books }))
      .sort((a, b) => b.year - a.year)
      .map(({ year, books }) => ({ year, books: books.sort((a, b) => a.name > b.name ? 1 : -1) }))
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
      <template v-for="(group, groupIdx) of groupedBooks" :key="group.year">
        <details :open="groupIdx == 0" class="flex flex-col">
          <summary class="text-bright mx-4 tracking-wider">
            {{ group.year }}
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
