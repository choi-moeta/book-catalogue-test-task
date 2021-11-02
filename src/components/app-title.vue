<script setup lang="ts">
withDefaults(defineProps<{
  level?: 1 | 2 | 3 | 4 | 5 | 6
}>(), {
  level: 1,
})
</script>

<template>
  <component :is="`h${level}`" class="text-2xl font-semibold text-bright">
    <slot />
  </component>
</template>
