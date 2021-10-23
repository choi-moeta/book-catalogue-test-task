<script setup lang="ts">
import { Book } from '../firebase'

defineProps<{book: Book}>()
</script>

<template>
  <app-block class="whitespace-pre-wrap break-words">
    {{ JSON.stringify(book, null, 2) }}
  </app-block>
</template>
