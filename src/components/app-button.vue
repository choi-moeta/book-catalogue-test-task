<script setup lang="ts">
import type { PropType } from 'vue'

defineProps({
  type: {
    type: String as PropType<'primary' | 'transparent'>,
    default: 'primary',
  },
  size: {
    type: String as PropType<'sm' | 'md'>,
    default: 'md',
  },
})
</script>

<template>
  <button
    :class="{
      'px-4 py-2 rounded': size === 'md',
      'px-3 py-1.5 text-sm rounded-sm': size === 'sm',
      'bg-violet-400 hover:bg-violet-500 text-white': type === 'primary',
      'bg-transparent hover:(bg-gray-100 dark:bg-gray-800)': type === 'transparent',
    }"
  >
    <slot />
  </button>
</template>
