<script setup lang="ts">
type Criteria = 'year' | 'rating' | 'authors'

withDefaults(defineProps<{
  groupBy?: Criteria
}>(), {
  groupBy: 'year',
})

const emit = defineEmits<{
  (event: 'update:groupBy', criteria: Criteria): void,
}>()

function handleChange(e: Event) {
  const criteria = (e.target as HTMLSelectElement).value
  if (['year', 'rating', 'authors'].includes(criteria)) {
    emit('update:groupBy', criteria as Criteria)
  }
}
</script>

<template>
  <div class="flex">
    <div class="flex  gap-2 items-center">
      <select name="Group by" @change="handleChange">
        <option value="year">
          Year
        </option>
        <option value="rating">
          Rating
        </option>
        <option value="authors">
          Authors
        </option>
      </select>
      <div class="ml-2 font-semibold">
        Group criteria
      </div>
    </div>
  </div>
</template>
