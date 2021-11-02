<script setup lang="ts">
import { Book } from '../firebase'

const props = defineProps<{ book: Book }>()

// [a,b,c] -> 'a, b and c'
const authorsStr = computed(() => props.book.authors.reduce((acc, cur, i, arr) => i + 1 < arr.length ? `${acc}, ${cur}` : `${acc} and ${cur}`))
</script>

<template>
  <app-block class="flex flex-col gap-1 group">
    <div class="flex gap-2 items-start justify-between">
      <router-link :to="`/book/${book.id}`" class="font-semibold text-regular">
        {{ book.name }}
      </router-link>
      <template v-if="book.rating !== undefined">
        <div class="border border-regular px-2 pt-0.5 pb-1 rounded text-xs flex-shrink-0">
          {{ book.rating }} / 10
        </div>
      </template>
    </div>
    <div class="text-dim">
      By {{ authorsStr }} in {{ book.year }}
    </div>
    <template v-if="book.ISBN !== undefined">
      <div class="text-xs self-end text-dim mt-auto" title="ISBN">
        {{ book.ISBN }}
      </div>
    </template>
  </app-block>
</template>
